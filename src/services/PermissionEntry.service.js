import { prisma_Connector } from "../../index.js";
import { getConnection } from "../constants/db.connection.js";


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
            
            
            res.json({status:1,data:{count:result.id}}) 
        }
        catch (err) {
           console.log(err);
           
        }
        
    }



    export async function requestPermission(req, res) {
       const  data=req?.body?.data
            try {
                const result=await  prisma_Connector.permissionEntry.create({data:data})
               if(result?.id){
               // const up_result=await  prisma_Connector.permissionDocID.updateMany({data:{count:Number(count)+1}})
              //  if(up_result?.count){
                    res.json({status:1,data:{...result,count:result?.id}}) 
             //   }else{
                //    prisma_Connector?.permissionEntry?.delete({where:{userId:result?.userId}}) 
                //    res.json({status:0,data:{}}) 
                }

               
                
               
            }
            catch (err) {
               console.log(err);
               
            }
            
        }



        
    export async function requestPermission_Approval(req, res) {
        const  docid=req?.body?.docid
        const  p_app=req?.body?.approval
             try {
                 const result=await  prisma_Connector.permissionEntry.update({where:{docid},data:{approvalStatus:p_app}})
                if(result?.id){
                // const up_result=await  prisma_Connector.permissionDocID.updateMany({data:{count:Number(count)+1}})
               //  if(up_result?.count){
                     res.json({status:1,data:{...result}}) 
              //   }else{
                 //    prisma_Connector?.permissionEntry?.delete({where:{userId:result?.userId}}) 
                 //    res.json({status:0,data:{}}) 
                 }
 
                
                 
                
             }
             catch (err) {
                console.log(err);
                
             }
             
         }




