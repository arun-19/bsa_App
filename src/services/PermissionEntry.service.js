import { prisma_Connector } from "../../index.js";
import { getConnection } from "../constants/db.connection.js";
import formatDateToOracle from "../Utiles/OracleDateFormat.js";


export async function get__per(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const hod=req.query?.hod
    const id=req.query?.id
  
    console.log(id);
    
        try {
            const result=await  prisma_Connector.permissionEntry.findMany({where:hod ? {compCode:COMPCODE,hod:hod} : {compCode:COMPCODE,userId:id},include:{createdBy_user:{select:{Employee:true,username:true,Idcard:true}},modifiedBy_user:{select:{Employee:true,username:true,Idcard:true}}}});
            res.json({status:1,data:result}) 
        }
        catch (err) {
           console.log(err);
        }
}




export async function get__per_category(req, res) {
  const COMPCODE=String(req?.headers?.compcode).toUpperCase()
      try {
          const result=await  prisma_Connector.permissionMaster.findMany({where: {
            OR: [
              { COMPCODE: "all" },
              { COMPCODE:COMPCODE}
            ]
          }})
          console.log(result);
          
          var filter_data=result?.map((data)=>{return {label:data.name,value:data.id}})
           res.json({status:1,data:filter_data}) 
      }
      catch (err) {
         console.log(err);
      }
}


export async function addPermission_master(req, res) {
  const  data=req?.body?.data
  const COMPCODE=String(req?.headers?.compcode).toUpperCase()
          try {
           const result=await  prisma_Connector.permissionMaster.create({data:{...data,COMPCODE}})  
          // var auvit_data={PERMISSIONID:String(result?.permissionId),THRS:result?.thrs,APPROVALSTATUS:String(result?.approvalStatus),DOCID:String(result?.docid),REASON:result?.reason,TTIME:result?.tTime,FTIME:result?.fTime,COMPCODE:String(result?.compCode),CREATED_BY:String(result?.createdBy),CREATED_ON:formatDateToOracle(result?.createdOn),MODIFIED_BY:result?.createdBy,MODIFIED_ON:formatDateToOracle(result?.modifiedOn),IDCARD:Number(result?.userId),DOCDATE:result?.docDate,IS_CANCELLED:'false'}
           if(result?.id){
            return  res.json({status:1,data:result})  
           }else{
            return  res.json({status:0,data:{}})  
           }
      
          }catch(err){
             console.log(err);
             
       }


      }




export async function get_user_Permission(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const IdCard=req.query?.IdCard
    
        try {
            const result=await  prisma_Connector.permissionEntry.findFirst({where:{userId:IdCard,compCode:COMPCODE}})
            res.json({status:1,data:result}) 
        }
        catch (err) {
           console.log(err);
           
        }
}


export async function getDocId(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    
        try {
            const result=await  prisma_Connector.permissionEntry.findFirst({
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



    export async function requestPermission(req, res) {
       const  data=req?.body?.data

       const connection = await getConnection(res)
       
            try {
                const result=await  prisma_Connector.permissionEntry.create({data:data})  
                var auvit_data={PERMISSIONID:String(result?.permissionId),THRS:result?.thrs,APPROVALSTATUS:String(result?.approvalStatus),DOCID:String(result?.docid),REASON:result?.reason,TTIME:result?.tTime,FTIME:result?.fTime,COMPCODE:String(result?.compCode),CREATED_BY:String(result?.createdBy),CREATED_ON:formatDateToOracle(result?.createdOn),MODIFIED_BY:result?.createdBy,MODIFIED_ON:formatDateToOracle(result?.modifiedOn),IDCARD:Number(result?.userId),DOCDATE:result?.docDate,IS_CANCELLED:'false'}
             
              
                if(result?.id){
            const sql =    `
                   INSERT INTO permission (
  PERMISSIONID, THRS, APPROVALSTATUS, DOCID, REASON,
  TTIME, FTIME, COMPCODE, CREATED_BY, CREATED_ON,
  MODIFIED_BY, MODIFIED_ON, IDCARD,DOCDATE,IS_CANCELLED
)
VALUES (
  :PERMISSIONID, :THRS, :APPROVALSTATUS, :DOCID, :REASON,
  :TTIME,
  :FTIME,
  :COMPCODE, :CREATED_BY,
  TO_DATE(:CREATED_ON, 'YYYY-MM-DD HH24:MI:SS'),
  :MODIFIED_BY,
  TO_DATE(:MODIFIED_ON, 'YYYY-MM-DD HH24:MI:SS'),
  :IDCARD,:DOCDATE,:IS_CANCELLED
)
 `     
             const result_auvit = await connection.execute(sql,auvit_data) 
              if(result_auvit?.rowsAffected >0){

                await prisma_Connector?.permissionEntry?.update({where:{docid:result?.docid},data:{create:1}}).then(()=>{
                  return  res.json({status:1,data:{...result,count:result?.id}})
                }).catch(()=>{
                return  res.json({status:0,data:{}})
                  })
                    
                }else{
               await prisma_Connector?.permissionEntry?.update({where:{id:result?.id}})
                res.json({status:0,message:"Failed to Request !"})   
                }
             //   }else{
                //    prisma_Connector?.permissionEntry?.delete({where:{userId:result?.userId}}) 
                //    res.json({status:0,data:{}}) 
                }   
               
            }
            catch (err) {
               res.json({status:500,error:err})
               console.log(err);
               
             } finally {
                await connection?.commit()
                await connection.close()
            }
            }
            
        


          


        
    export async function requestPermission_Approval(req, res) {
        const  docid=req?.body?.docid
        const  p_app=req?.body?.approval
        const approvedBy=req?.body?.approvedBy
        const rejectBy=req?.body?.rejectBy
        const connection = await getConnection(res)
             try {
                
                 const result=await  prisma_Connector.permissionEntry.update({where:{docid},data:{approvalStatus:p_app,approvedBy,rejectBy}})
              
                 if(result?.id){
                // const up_result=await  prisma_Connector.permissionDocID.updateMany({data:{count:Number(count)+1}})
               //  if(up_result?.count){

             const sql = ` update permission set  APPROVALSTATUS=:approvalStatus,APPROVED_BY=:approvedBy,REJECTED_BY=:rejectBy where DOCID=:docid  `     
            const result_auvit = await connection.execute(sql,{approvalStatus:p_app,approvedBy,rejectBy,docid}) 
          if(result_auvit?.rowsAffected >0){

             await prisma_Connector?.permissionEntry?.update({where:{docid:result?.docid}, data:{update:1}}).then(()=>{
                return  res.json({status:1,data:{...result}}) 
               
               }).catch(()=>{
                return  res.json({status:0,data:{}})
               })
              
            }else{

             await  prisma_Connector?.permissionEntry?.delete({where:{docid:docid}})
            
                res.json({status:0,message:"Failed to Request !"})   
            }
                     
              //   }else{
                 //    prisma_Connector?.permissionEntry?.delete({where:{userId:result?.userId}}) 
                 //    res.json({status:0,data:{}}) 
                 }
 
                
                 
                
             }
             catch (err) {
                console.log(err);
                
             }finally{
                connection?.commit()
                connection?.close()
             }
             
         }




         




