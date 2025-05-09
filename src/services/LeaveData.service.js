import { prisma_Connector } from "../../index.js";
import { getConnection } from "../constants/db.connection.js";
import formatDateToOracle from "../Utiles/OracleDateFormat.js";
import { generateNumericId } from "../Utiles/UniqueId.js";


export async function get(req, res) {
    const connection = await getConnection(res)
    try {
        const result = await connection.execute(`
        select * from (select finyr  from GTFINANCIALYEAR order by finyr desc) finyr     
        where rownum <= 3
     `)
        let resp = result.rows.map(po => ({
            finYear: po[0]
        }))

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}


export async function get_leave_available(req, res){
    const connection = await getConnection(res)
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()

    try {
        const result = await connection.execute(`
        SELECT IDCARD,FNAME,PAYCAT,LCODE,LDESC,SUM(LCOUNT) AVL,SUM(LT) LT,SUM(LCOUNT)-SUM(LT) LBAL 
FROM (SELECT A.LCODE, A.LDESC,D.IDCARD,DD.FNAME,B.LDAYS AVL,0 LT,B.LDAYS LCOUNT,C.BANDID PAYCAT FROM HRLEAVEMAST A
JOIN HRLEAVEDEPTDET B ON A.HRLEAVEMASTID = B.HRLEAVEMASTID
JOIN HRBANDMAST C ON C.HRBANDMASTID = A.PAYCAT
JOIN HREMPLOYDETAILS D ON D.IDACTIVE = 'YES' AND D.DOJ < A.STDT
JOIN HREMPLOYMAST DD ON D.HREMPLOYMASTID = DD.HREMPLOYMASTID  
JOIN HRBANDMAST E ON D.BAND = E.HRBANDMASTID AND E.BANDID = C.BANDID  
JOIN GTDEPTDESGMAST F ON F.GTDEPTDESGMASTID = D.DEPTNAME AND ( F.MNAME = B.DEPT OR 'All' = B.DEPT) AND DD.COMPCODE = F.COMPCODE
JOIN GTCOMPMAST G ON G.GTCOMPMASTID = F.COMPCODE AND B.COMPCODE1 = G.COMPCODE  
WHERE  B.COMPCODE1 = :COMPCODE
UNION ALL
SELECT B.LCODE,B.LDESC,D.IDCARD,C.FNAME, CASE WHEN A.LTYPE IN 'OPB' THEN A.OPBAL ELSE 0 END AVL,
CASE WHEN A.LTYPE NOT IN 'OPB' THEN CASE WHEN A.LTYPE NOT IN 'LRQ' THEN (0-A.OPBAL) ELSE A.OPBAL END ELSE 0 END LT,
 CASE WHEN A.LTYPE IN 'OPB' THEN A.OPBAL ELSE 0 END  LCOUNT,A.PAYCAT
FROM HRLEAVEREGMAST A,HRLEAVECODEMAST B,HREMPLOYMAST C,HREMPLOYDETAILS D
WHERE A.LEAVETYPE=B.LCODE AND C.HREMPLOYMASTID=D.HREMPLOYMASTID AND A.IDCARD=C.HREMPLOYMASTID
AND  A.COMPCODE = :COMPCODE
UNION ALL
SELECT A.LCODE, A.LDESC,D.IDCARD,DD.FNAME,
((12-TO_NUMBER(TO_CHAR(ADD_MONTHS((LAST_DAY(TO_DATE(D.DOJ))+1),-1),'mm')))*B.FRM1)+
CASE WHEN TO_NUMBER(TO_CHAR(D.DOJ,'dd'))<16 THEN B.FRM1 ELSE B.FRM2 END  AVL,0 LT,
((12-TO_NUMBER(TO_CHAR(ADD_MONTHS((LAST_DAY(TO_DATE(D.DOJ))+1),-1),'mm')))*B.FRM1)+
CASE WHEN TO_NUMBER(TO_CHAR(D.DOJ,'dd'))<16 THEN B.FRM1 ELSE B.FRM2 END LCOUNT,C.BANDID PAYCAT FROM HRLEAVEMAST A
JOIN HRLEAVEDEPTDET B ON A.HRLEAVEMASTID = B.HRLEAVEMASTID
JOIN HRBANDMAST C ON C.HRBANDMASTID = A.PAYCAT
JOIN HREMPLOYDETAILS D ON D.IDACTIVE = 'YES' AND D.DOJ BETWEEN A.STDT AND A.ENDT
JOIN HREMPLOYMAST DD ON D.HREMPLOYMASTID = DD.HREMPLOYMASTID  
JOIN HRBANDMAST E ON D.BAND = E.HRBANDMASTID AND E.BANDID = C.BANDID  
JOIN GTDEPTDESGMAST F ON F.GTDEPTDESGMASTID = D.DEPTNAME AND ( F.MNAME = B.DEPT OR 'All' = B.DEPT)
JOIN GTCOMPMAST G ON G.GTCOMPMASTID = F.COMPCODE AND B.COMPCODE1 = G.COMPCODE AND DD.COMPCODE = F.COMPCODE  
WHERE  B.COMPCODE1 = :COMPCODE AND B.FRM1 > 0
)
GROUP BY LCODE,LDESC,IDCARD,FNAME,PAYCAT
ORDER BY TO_NUMBER(IDCARD),LCODE`,{COMPCODE})    
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




export async function getDocId(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    
        try {
            const result=await  prisma_Connector.leaveEntry.findFirst({
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


export async function get_Current_Fin_Year(req, res) {
    const connection = await getConnection(res)
    try {
        const result = await connection.execute(`
   SELECT A.GTFINANCIALYEARID,A.FINYR "label",A.FINYR "value"
FROM GTFINANCIALYEAR A
WHERE (A.CURRENTFINYR='T')
ORDER BY A.FINYR
     `)
        let resp = result.rows.map(po => ({
            finId: po[0], label: po[1], value: po[2]
        }))

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}
export async function add_requestLeave(req,res){
      const  data=req?.body?.data
    
           const connection = await getConnection(res)
           
                try {
                    const result=await  prisma_Connector.leaveEntry.create({data:data}) 
                  var to=data?.toDate?.split("T")[0]
                  var from=data?.fromDate?.split("T")[0]
                  var createOn=formatDateToOracle(result?.createdOn)
                  var Modified=formatDateToOracle(result?.modifiedOn)
        
                    var auvit_data={
            CATNAME:result?.category,
            TLTYPE:data?.tltype,
            FLTYPE:data?.fltype,
            TODATE:to,
            DOCID:data?.docid,
            APPROVALSTATUS:data?.approvalStatus,
            REASON:data?.reason,
            LEAVETYPE:data?.ltype,    
            FROMDATE:from,
            EMPNAME:data?.empname,
            IDCARD:data?.userId,
            COMPCODE:data?.compCode,
            FINYEAR:data?.finyear,
            USERID :data?.userId ,
            MODIFIED_BY:data?.modified_By,
            MODIFIED_ON:Modified,
            CREATED_BY:data?.createdBy,
            CREATED_ON:createOn,
            UNIQUE_ID_FIELD:result?.leaveId,
            IS_CANCELLED:data?.isCancelled,
            HRLEAVEENTRYID:generateNumericId(),

          }
                 
                  
                  
                    if(result?.id){
                        
                const sql =    `
                       INSERT INTO HRLEAVEENTRY (HRLEAVEENTRYID,
  CATNAME,
  TLTYPE,
  FLTYPE,
  TODATE,
  DOCID,
  APPROVALSTATUS,
  REASON,
  LEAVETYPE,
  FROMDATE,
  EMPNAME,
  IDCARD,
  COMPCODE,
  FINYEAR,
  USERID,
  MODIFIED_BY,
  MODIFIED_ON,
  CREATED_BY,
  CREATED_ON,
  UNIQUE_ID_FIELD,
  IS_CANCELLED
) VALUES (
 :HRLEAVEENTRYID
 ,
  :CATNAME,
  :TLTYPE,
  :FLTYPE,
  TO_DATE(:TODATE, 'YYYY-MM-DD HH24:MI:SS'), 
  :DOCID,
  :APPROVALSTATUS,
  :REASON,
  :LEAVETYPE,
  TO_DATE(:FROMDATE,'YYYY-MM-DD HH24:MI:SS'),
  :EMPNAME,
  :IDCARD,
  :COMPCODE,
  :FINYEAR,
  :USERID,
  :MODIFIED_BY,
  TO_DATE(:MODIFIED_ON, 'YYYY-MM-DD HH24:MI:SS'),
  :CREATED_BY,
  TO_DATE(:CREATED_ON, 'YYYY-MM-DD HH24:MI:SS'),
  :UNIQUE_ID_FIELD,
  :IS_CANCELLED
) `     
                 const result_auvit = await connection.execute(sql,auvit_data) 
                 
                  if(result_auvit?.rowsAffected >0){
                     console.log(result?.id);
                     
                    await prisma_Connector?.leaveEntry?.update({where:{docid:result?.docid},data:{create:1}}).then(()=>{
                      return  res.json({status:1,data:{...result,count:result?.id}})
                    }).catch(()=>{
                    return  res.json({status:0,data:{}})
                      })
                        
                    }else{
                   await prisma_Connector?.leaveEntry?.update({where:{id:result?.id}})
                    res.json({status:0,message:"Failed to Request !"})   
                    }
                 //   }else{
                    //    prisma_Connector?.permissionEntry?.delete({where:{userId:result?.userId}}) 
                    //    res.json({status:0,data:{}}) 
                    }   
                   

             } catch (err) {
                   res.json({status:500,error:err})
                   console.log(err);
                   
                 } finally {
                    await connection?.commit()
                    await connection.close()
                }
                
                

}



export async function get__per(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const hod=req.query?.hod
    const id=req.query?.id
  
    console.log(id);
    
        try {
            const result=await  prisma_Connector.leaveEntry.findMany({where:hod ? {compCode:COMPCODE,hod:hod} : {compCode:COMPCODE,userId:id},include:{createdBy_user:{select:{Employee:true,username:true,Idcard:true}},modifiedBy_user:{select:{Employee:true,username:true,Idcard:true}}}});
            res.json({status:1,data:result}) 
        }
        catch (err) {
           console.log(err);
        }
}



export async function get_Lcode(req, res) {
    const connection = await getConnection(res)
    try {
        const result = await connection.execute(`
 select LCODE "label",LCODE "value"  from HRLeaveCodeMast
     `)
        let resp = result.rows.map(po => ({
            label: po[0], value: po[1]
        }))

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function InsertLeave(req, res) {
const feilds=req.query.feilds
const value=req.query.value
    const connection = await getConnection(res)
    try {
        const result = await connection.execute(`
       insert into MOBCOMPMAST(:feilds) values(:value)
     `,{feilds,value})
        return res.json({ statusCode: 0, data: JSON?.stringify(result)})
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}


 export async function requestLeave_Approval(req, res) {
        const  docid=req?.body?.docid
        const  p_app=req?.body?.approval
        const approvedBy=req?.body?.approvedBy
        const rejectBy=req?.body?.rejectBy
        const connection = await getConnection(res)
             try {
                 const result=await  prisma_Connector.leaveEntry.update({where:{docid},data:{approvalStatus:p_app,approvedBy,rejectBy}})
                 if(result?.id){

                    return  res.json({status:1,data:{...result}}) 
        //          const up_result=await  prisma_Connector.permissionDocID.updateMany({data:{count:Number(count)+1}})
        //         if(up_result?.count){

        //   const sql = ` update permission set  APPROVALSTATUS=:approvalStatus,APPROVED_BY=:approvedBy,REJECTED_BY=:rejectBy where DOCID=:docid  `     
        //     const result_auvit = await connection.execute(sql,{approvalStatus:p_app,approvedBy,rejectBy,docid}) 
        //   if(result_auvit?.rowsAffected >0){

        //      await prisma_Connector?.leaveEntry?.update({where:{docid:result?.docid}, data:{update:1}}).then(()=>{
        //         return  res.json({status:1,data:{...result}}) 
               
        //        }).catch(()=>{
        //         return  res.json({status:0,data:{}})
        //        })
              
            // }else{

            //  await  prisma_Connector?.permissionEntry?.delete({where:{docid:docid}})
            
            //     res.json({status:0,message:"Failed to Request !"})   
            // }
                     
              //   }else{
                 //    prisma_Connector?.permissionEntry?.delete({where:{userId:result?.userId}}) 
                 //    res.json({status:0,data:{}}) 
                 }else{
                    return  res.json({status:0,data:{}})
                 }
 
                
                 
                
             }
             catch (err) {
                console.log(err);
                
             }finally{
                connection?.commit()
                connection?.close()
             }
             
         }



