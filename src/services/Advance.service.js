import { prisma_Connector } from "../../index.js";
import { getConnection } from "../constants/db.connection.js";





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


export async function add_requestAdvance(req,res){
    console.log(req);
    
      const  data=req?.body?.data
    
           const connection = await getConnection(res)
           
                try {
                    const result=await  prisma_Connector.advanceRequest.create({data:data}) 

                    console.log(result);
                    
                //   var to=data?.toDate?.split("T")[0]
                //   var from=data?.fromDate?.split("T")[0]
                //   var createOn=formatDateToOracle(result?.createdOn)
                //   var Modified=formatDateToOracle(result?.modifiedOn)
        
        //             var auvit_data={
        //     CATNAME:result?.category,
        //     TLTYPE:data?.tltype,
        //     FLTYPE:data?.fltype,
        //     TODATE:to,
        //     DOCID:data?.docid,
        //     APPROVALSTATUS:data?.approvalStatus,
        //     REASON:data?.reason,
        //     LEAVETYPE:data?.ltype,    
        //     FROMDATE:from,
        //     EMPNAME:data?.empname,
        //     IDCARD:data?.userId,
        //     COMPCODE:data?.compCode,
        //     FINYEAR:data?.finyear,
        //     USERID :data?.userId ,
        //     MODIFIED_BY:data?.modified_By,
        //     MODIFIED_ON:Modified,
        //     CREATED_BY:data?.createdBy,
        //     CREATED_ON:createOn,
        //     UNIQUE_ID_FIELD:result?.leaveId,
        //     IS_CANCELLED:data?.isCancelled,
        //     HRLEAVEENTRYID:generateNumericId(),

        //   }
                 
                  
                  
//                     if(result?.id){
                        
//                 const sql =    `
//                        INSERT INTO HRLEAVEENTRY (HRLEAVEENTRYID,
//   CATNAME,
//   TLTYPE,
//   FLTYPE,
//   TODATE,
//   DOCID,
//   APPROVALSTATUS,
//   REASON,
//   LEAVETYPE,
//   FROMDATE,
//   EMPNAME,
//   IDCARD,
//   COMPCODE,
//   FINYEAR,
//   USERID,
//   MODIFIED_BY,
//   MODIFIED_ON,
//   CREATED_BY,
//   CREATED_ON,
//   UNIQUE_ID_FIELD,
//   IS_CANCELLED
// ) VALUES (
//  :HRLEAVEENTRYID
//  ,
//   :CATNAME,
//   :TLTYPE,
//   :FLTYPE,
//   TO_DATE(:TODATE, 'YYYY-MM-DD HH24:MI:SS'), 
//   :DOCID,
//   :APPROVALSTATUS,
//   :REASON,
//   :LEAVETYPE,
//   TO_DATE(:FROMDATE,'YYYY-MM-DD HH24:MI:SS'),
//   :EMPNAME,
//   :IDCARD,
//   :COMPCODE,
//   :FINYEAR,
//   :USERID,
//   :MODIFIED_BY,
//   TO_DATE(:MODIFIED_ON, 'YYYY-MM-DD HH24:MI:SS'),
//   :CREATED_BY,
//   TO_DATE(:CREATED_ON, 'YYYY-MM-DD HH24:MI:SS'),
//   :UNIQUE_ID_FIELD,
//   :IS_CANCELLED
// ) `     
//                  const result_auvit = await connection.execute(sql,auvit_data) 
                 
//                   if(result_auvit?.rowsAffected >0){
//                      console.log(result?.id);
                     
//                     await prisma_Connector?.leaveEntry?.update({where:{docid:result?.docid},data:{create:1}}).then(()=>{
//                       return  res.json({status:1,data:{...result,count:result?.id}})
//                     }).catch(()=>{
//                     return  res.json({status:0,data:{}})
//                       })
                        
//                     }else{
//                    await prisma_Connector?.leaveEntry?.update({where:{id:result?.id}})
//                     res.json({status:0,message:"Failed to Request !"})   
//                     }
//                  //   }else{
//                     //    prisma_Connector?.permissionEntry?.delete({where:{userId:result?.userId}}) 
//                     //    res.json({status:0,data:{}}) 
//                     }   
                   

             } catch (err) {
                   res.json({status:500,error:err})
                   console.log(err);
                   
                 } finally {
                    await connection?.commit()
                    await connection.close()
                }
                
                

}