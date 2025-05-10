import { prisma_Connector } from "../../index.js";
import { getConnection } from "../constants/db.connection.js";
import formatDateToOracle from "../Utiles/OracleDateFormat.js";
import { generateNumericId2 } from "../Utiles/Unique2.js";
import { generateNumericId } from "../Utiles/UniqueId.js";








export async function getDocId(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    
        try {
            const result=await  prisma_Connector.advanceRequest.findFirst({
                orderBy: {
                  id: 'desc',
                },
                select: {
                  id: true,
                },where:{compCode:COMPCODE}
              });
            
            
            res.json({status:1,data:{count:Number(result?.id || 0)+1}}) 
        }
        catch (err) {
           console.log(err);
           
        }
        
    }


export async function get_advance(req, res) {
    const connection = await getConnection(res)
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const Idcard=req?.query?.Idcard
    const adv=req?.query?.adv

   
    
    try {
        
        const result = await connection.execute(`
      Select * from(SELECT A.DOCID,A.DOCDATE,A.TODATE,A.PAYTYPE,A.TOT, A.IDCARD,A.IDNAME,A.TOTLOANAMT,A.PREDUEAMT,A.PRELOANAMT,A.DUEAMT,A.NOOFINS FROM HRMPAYTRANS A 
    JOIN GTCOMPMAST B ON B.GTCOMPMASTID=A.COMPCODE
    WHERE A.PTRANSACTION=:adv AND B.COMPCODE=:COMPCODE AND A.IDCARD=:IDCARD order by A.DOCDATE  DESC ) where  ROWNUM=1`,{COMPCODE,IDCARD:Idcard,adv})
     const transformedResult = result?.rows?.map(row => {
        const keyValuePair = {};
        // Assuming the first row contains the column names
        result.metaData.forEach((col, index) => {
          keyValuePair[col.name] = row[index];
        });
        return keyValuePair;
       });
    

        return res.json({ statusCode: 0, data: transformedResult })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}


export async function add_requestAdvance(req, res) {
    // Validate request body
    if (!req?.body?.data) {
        return res.status(400).json({ status: 0, message: "Missing required data in request body" });
    }
   const compid=req?.query?.companyid
    const data = req.body.data;
    let connection;


    
    try {
        // Validate required fields
        const requiredFields = [
            'toDate', 'fromDate', 'finyear', 'idcard', 'empname', 
            'preloan', 'compCode', 'total', 'advtype', 'docdate', 'docid'
        ];
        
        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                status: 0, 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        // Get database connection
        connection = await getConnection(res);
        if (!connection) {
            return res.status(500).json({ status: 0, message: "Database connection failed" });
        }


        // Create advance request in Prisma
        const result = await prisma_Connector.advanceRequest.create({ data });

        if (!result?.id) {
            throw new Error("Failed to create advance request in primary database");
        }
        // Prepare data for Oracle insertion
        const toDate = data.toDate.split("T")[0];
        const fromDate = data.fromDate.split("T")[0];
        const createdOn = formatDateToOracle(result?.createdOn);
        const modifiedOn = formatDateToOracle(result?.updatedOn);
         const docDate = formatDateToOracle(result?.docdate);
        //  const fin=String(result.finyear).split("-")[0]
      const auvitData = {
      COMPCODE:compid,
    HRMPAYTRANSID: generateNumericId(),
    TOTPAIDAMT: 0,
    IDCARD: result.idcard,
    IDNAME: result.empname,
    PRELOANAMT: Number(result.totalloan),
    TOT: Number(result.total),
    ACTIVE: 'YES',
    ADVTYPE: result.advtype,
    REMARK: result.remark || '',
    TODATE: toDate,
    NOOFINS: Number(result.ins) || 0,
    DUEAMT: Number(result.due) || 0,
    TOTLOANAMT: Number(result.totalloan) || 0,
    STDATE: fromDate,
    DOCDATE: docDate,
    DOCID: result.docid,
    USERID: result.createdBy,
    MODIFIED_BY: result.modified_By,
    MODIFIED_ON: modifiedOn,
    CREATED_BY: result.createdBy,
    CREATED_ON: createdOn,
    UNIQUE_ID_FIELD: generateNumericId2(), // Ensure string type
    IS_CANCELLED: result.isCancelled ? 'T' : 'F',
    PTRANSACTION: result.advtype?.split(" ")[0] || '',
    CATNAME: result.category || '', // Added this missing field
    PAYTYPE: result.paytype || '',
    APPROVALSTATUS: result.approvalStatus?.toUpperCase() || 'PENDING',
    PREDUEAMT: Number(result.predue) || 0,
    MIDCARD: result.idcard,
    MDOCID: result.docid
};


// SQL statement that exactly matches the parameters in auvitData
const sql = `
    INSERT INTO HRMPAYTRANS (
       COMPCODE, HRMPAYTRANSID, TOTPAIDAMT, IDCARD,
        IDNAME, PRELOANAMT, TOT,
        ACTIVE, ADVTYPE, REMARK, TODATE, NOOFINS,
        DUEAMT, TOTLOANAMT, STDATE, DOCDATE, DOCID,
        USERID, MODIFIED_BY, MODIFIED_ON, CREATED_BY, CREATED_ON,
        UNIQUE_ID_FIELD, IS_CANCELLED, PTRANSACTION, CATNAME, PAYTYPE,
        APPROVALSTATUS, PREDUEAMT, MIDCARD,MDOCID
    ) VALUES (
       :COMPCODE, :HRMPAYTRANSID, :TOTPAIDAMT, :IDCARD,
        :IDNAME, :PRELOANAMT, :TOT,
        :ACTIVE, :ADVTYPE, :REMARK, TO_DATE(:TODATE, 'YYYY-MM-DD HH24:MI:SS'), :NOOFINS,
        :DUEAMT, :TOTLOANAMT, TO_DATE(:STDATE, 'YYYY-MM-DD HH24:MI:SS'), TO_DATE(:DOCDATE, 'YYYY-MM-DD HH24:MI:SS'), :DOCID,
        :USERID, :MODIFIED_BY, TO_DATE(:MODIFIED_ON, 'YYYY-MM-DD HH24:MI:SS'), :CREATED_BY, TO_DATE(:CREATED_ON, 'YYYY-MM-DD HH24:MI:SS'),
        :UNIQUE_ID_FIELD, :IS_CANCELLED, :PTRANSACTION, :CATNAME, :PAYTYPE,
        :APPROVALSTATUS, :PREDUEAMT, :MIDCARD,:MDOCID
    )
`;
       
        

        // Execute Oracle insertion
        const oracleResult = await connection.execute(sql, auvitData);

        console.log(oracleResult);
        

        if (oracleResult.rowsAffected <= 0) {
            throw new Error("Failed to insert into Oracle database");
        }

        // Update leave entry status
        await prisma_Connector.advanceRequest.update({
            where: { docid: result.docid },
            data: { create: 1 }
        });

        return res.json({
            status: 1,
            data: { ...result, count: result.id },
            message: "Advance request created successfully"
        });

    } catch (err) {
        console.error("Error in add_requestAdvance:", err);
        
        // Rollback any transactions if needed
        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackErr) {
                console.error("Rollback failed:", rollbackErr);
            }
        }

        return res.status(500).json({ 
            status: 0, 
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });

    } finally {
        // Close connection if it exists
        if (connection) {
            try {
                await connection.commit();
                await connection.close();
            } catch (closeErr) {
                console.error("Failed to close connection:", closeErr);
            }
        }
    }
}