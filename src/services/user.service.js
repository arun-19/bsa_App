import bcrypt from "bcrypt"
import { getConnection } from "../constants/db.connection.js";
import OracleDB from "oracledb";
import { prisma_Connector } from "../../index.js";
import { readFile } from 'fs/promises';
import { google } from 'googleapis';
import Random_Otp from "../Utiles/Random_Otp.js";
import { sendMail } from "../Utiles/Mailer.js";


export async function login(req, res) {
    // const connection = await getConnection(res)
    const { username, password } = req.body
    if (!username) return res.json({ statusCode: 1, message: "Username is Required" })
    if (!password) return res.json({ statusCode: 1, message: "Password is Required" });

    const sql =await prisma_Connector.user.findFirst({where:{username:username},include:{Companies:true}})

   
    if (!sql?.username) return res.json({ statusCode: 1, message: "Username Doesn't Exist" })
    let storedPassword = sql?.password

    const isMatched = await bcrypt.compare(password, storedPassword)


    if (!isMatched) return res.json({ statusCode: 1, message: "Password Doesn't Match",Id:sql?.id})
    console.log(isMatched, 'isMatched');
    // let gtCompMastId = result.rows[0][2]
    // let supplyDetails = await connection.execute(`
    // select pcategory 
    // from gtcompprodet 
    // join gtpartycatmast on gtcompprodet.partycat = gtpartycatmast.gtpartycatmastid
    // where gtcompmastid=:gtCompMastId
    // `, { gtCompMastId })
    // supplyDetails = supplyDetails.rows.map(item => item[0])

//     const sql2 = `SELECT A.COMPCODE "label",A.COMPCODE "value" FROM GTCOMPMAST A 
// WHERE A.PTRANSACTION = 'COMPANY' ORDER BY 1`
   

    // const result2 = await connection?.execute(sql2)

   

    // const transformedResult = result2?.rows?.map(row => {
    //     const keyValuePair = {};
    //     // Assuming the first row contains the column names
    //     result2.metaData.forEach((col, index) => {
    //       keyValuePair[col.name] = row[index];
    //     });
    //     return keyValuePair;
    //    });
  

    
    // await connection.close()
    return res.json({ statusCode: 0, message: "Login Successfull" ,data:sql})

}

export async function create(req, res) {
    const connection = await getConnection();
    const { username, password, checkboxes,hod, email, role,Idcard,Compcodes} = req.body;
    console.log(role, 'check');

    const roles = checkboxes || [].map((item) => item.id)
    console.log(roles, 'roles');
    const createdDate = new Date();

    if (!username || !password) {
        return res.json({ statusCode: 1, message: 'Username and Password are Required' });
    }

    try {
         const userNameResult = await prisma_Connector.user.findFirst({where:{username:username}})
         if (userNameResult?.name) {
             await connection.close();
             return res.json({ statusCode: 1, message: 'UserName Already Exsist' });
         }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        var UserCreation=await prisma_Connector.user.create({data:{username:username, password:hashedPassword,email:email,Idcard,hod,Companies:{create:Compcodes}}})
    
    

        // const sql = 'INSERT INTO mobileuser(username, password,email,role) VALUES (:username, :hashedPassword, :email, :role)';

        // await connection.execute(sql, { username, hashedPassword, email, role });

           

        const userRoleSql = 'INSERT INTO mobuserlog(userName, ALLOWEDPAGES, createdDate) VALUES (:username, :ALLOWEDPAGES, :createdDate)';
        for (const role of roles) {
            await connection.execute(userRoleSql, { username, ALLOWEDPAGES: role, createdDate });
            console.log(role, 'role');
        }
        await connection.commit();
        await connection.close();
        return res.json({ statusCode: 0, message: 'User created successfully' ,data:UserCreation});
    } catch (error) {
        console.error(error);
        await connection.close();
        return res.json({ statusCode: 1, message: 'An error occurred while creating the user' });
    }
}



export async function get_hod_token(req, res) {

    const hod=req?.query?.hod

    try {
        const result =await prisma_Connector.user.findUnique({where:{Idcard:hod},select:{
            fcm:true
        }})

        return res.json({ statusCode: 0, data:result })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}


export async function get_fcm_token(req, res) {
    const Idcard=req?.query?.Idcard
    try {
        const result =await prisma_Connector.user.findUnique({where:{Idcard},select:{
            fcm:true
        }})

        return res.json({ statusCode: 0, data:result })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

export async function get_refresh_token(req, res) {
try {
    

    const scopes = ['https://www.googleapis.com/auth/firebase.messaging'];
    const key =  JSON.parse(
        await readFile(new URL('./../../Fcm/serves-firebase.json', import.meta.url))
      );
    
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      scopes
    );
    
    const tokens = await jwtClient?.authorize();
    return res?.json({status:0,data:{token: tokens?.access_token}})
 
} catch (error) {
    console.log(error);
    
}
  
}


export async function get(req, res) {

    const connection = await getConnection(res)
    try {
        
        const result =await prisma_Connector.user.findMany({select:{username:true,email:true,Companies:true}})

        const mapdata=result.map((data)=>({
            username:data?.username,gmail:data?.email
        }))

        return res.json({ statusCode: 0, data:mapdata })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}




export async function update_fcm(req, res) {
const compCode=String(req.headers?.compcode).toUpperCase()
const Idcard=req.body?.Idcard
const fcm=req.body?.fcm
    
    try {
       if(Idcard && fcm){
        const result =await prisma_Connector.user.update({where:{Idcard:Idcard},data:{fcm}})
        return res.json({ statusCode: 0, data:result })
       }

       return res.json({ statusCode: 500, data:{},mesage:"Id Not Found" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}



export async function getUserDetails(req, res) {
     const Idcard=req.query.Idcard
     const ismul=req?.query?.ismul
     const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const connection = await getConnection(res)
    try {
        if(ismul){
            const sql =`SELECT D.MNNAME1 DeptName,A.FNAME,A.IDCARDNO EMPID,c.DESIGNATION,E.MOBNO
            FROM HREMPLOYMAST A
             JOIN HREMPLOYDETAILS B ON A.HREMPLOYMASTID=B.HREMPLOYMASTID
            JOIN GTDESIGNATIONMAST C ON C.GTDESIGNATIONMASTID=B.DESIGNATION
            JOIN GTDEPTDESGMAST D ON D.GTDEPTDESGMASTID=B.DEPTNAME
            JOIN GTCOMPMAST CM ON  CM.GTCOMPMASTID=A.COMPCODE 
            left join  HRECONTACTDETAILS E on E.HREMPLOYMASTID=A.HREMPLOYMASTID
            WHERE   A.IDCARDNO IN (${String(Idcard)})  and CM.COMPCODE=:COMPCODE` 
            const result =await connection.execute(sql,{COMPCODE})  

            const transformedResult = result?.rows?.map(row => {
                const keyValuePair = {};
                // Assuming the first row contains the column names
                result.metaData.forEach((col, index) => {
                  keyValuePair[col.name] = row[index];
                });
                return keyValuePair;
               });



               
               return res.json({ statusCode: 0, data: transformedResult })

        }else{
            const sql=`  
SELECT D.MNNAME1 DeptName,A.FNAME,A.IDCARDNO EMPID,c.DESIGNATION,E.MOBNO
FROM HREMPLOYMAST A
 JOIN HREMPLOYDETAILS B ON A.HREMPLOYMASTID=B.HREMPLOYMASTID
JOIN GTDESIGNATIONMAST C ON C.GTDESIGNATIONMASTID=B.DESIGNATION
JOIN GTDEPTDESGMAST D ON D.GTDEPTDESGMASTID=B.DEPTNAME
JOIN GTCOMPMAST CM ON  CM.GTCOMPMASTID=A.COMPCODE 
left join  HRECONTACTDETAILS E on E.HREMPLOYMASTID=A.HREMPLOYMASTID
WHERE A.IDCARDNO=:IDCARDNO and CM.COMPCODE=:COMPCODE
`
            const result =await connection.execute(sql,{COMPCODE,IDCARDNO:Idcard})  
       const resp = result?.rows[0]
        return res.json({ statusCode: 0, data: resp ? {
            Department:resp[0],Name:resp[1],EmpId:resp[2],Designation:resp[3],
            Mobile:resp[4]
          } : {} })

        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getOne(req, res) {

    const connection = await getConnection(res)
    try {
        const sql = `  
  select T.userName, mobuserlog.allowedpages, T.DEFAULTADMIN
from mobileuser T
left join mobuserlog on T.USERNAME = mobuserlog.USERNAME
order by userName`
        const result = await connection.execute(sql)
        const resp = result.rows.map(user => ({
            userName: user[0], allowedpages: user[1],
            defaultAdmin: user[2]
        }))
        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getUserDet(req, res) {
    const connection = await getConnection(res)
    try {
        const sql = `SELECT B.IDCARD||'@'||C.COMPCODE MOBUSER,C.COMPCODE,D.BANDNAME,E.MNNAME1 DEPTNAME,F.DESIGNATION FROM HREMPLOYMAST A
JOIN HREMPLOYDETAILS B ON A.HREMPLOYMASTID=B.HREMPLOYMASTID
JOIN GTCOMPMAST C ON C.GTCOMPMASTID=A.COMPCODE
JOIN HRBANDMAST D ON D.HRBANDMASTID=B.BAND
JOIN GTDEPTDESGMAST E ON E.GTDEPTDESGMASTID=B.DEPTNAME
JOIN GTDESIGNATIONMAST F ON F.GTDESIGNATIONMASTID=B.DESIGNATION
WHERE D.BANDNAME='STAFF' AND B.IDACTIVE='YES'`
        const result = await connection.execute(sql)

        const resp = result.rows.map(user => ({ id: user[0], value: user[0], role: user[4] }))

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getUserImage(req, res) {
    const USERNAME = req.params?.USERNAME;
  
    let connection;
    try {
      // Step 1: Get a connection to the Oracle DB
      connection = await getConnection(res);
  
      
      const sql = `SELECT IMAGE FROM MOBILEUSER WHERE lower(USERNAME) = :USERNAME`;
      const binds = { USERNAME };
  
    
      const result = await connection.execute(sql, binds, { outFormat: OracleDB.OUT_FORMAT_OBJECT });
  
    
      const imageBlob = result?.rows[0]?.IMAGE;
  
      if (!imageBlob) {
     
        return res.status(404).send('Image not found');
      }

      imageBlob?.getData((err, data) => {
        if (err) {
          console.error('Error fetching image data:', err);
          return res.status(500).json({ error: 'Failed to fetch image data' });
        }
  
        res.setHeader('Content-Type', 'image/jpeg'); 
        res.send(data);  
  
      });
  
     
    
      
 
  
  
    } catch (err) {
      console.error('Error fetching image:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

export async function UploadImage(req, res) {
    try {
        
      // Step 1: Extract Base64 string from the request
      const { USERNAME} = req.body;
    
      if (!req.file) {
        return res.status(400).send('No image data provided');
      }
  
  
      
  
      // Step 4: Connect to Oracle and insert the image
        const connection = await getConnection(res)

      const sql = `Update MOBILEUSER set IMAGE=:imageData where USERNAME='${USERNAME}'`;
      const binds = {
        imageData:req?.file?.buffer
      };
  
      const result = await connection.execute(sql, binds, { autoCommit: true });
      
      res.status(200).send({ message: 'Image uploaded successfully!', result });
      
      // Step 5: Close the connection
      await connection.close();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Failed to upload image', error: err.message });
    }

}
  


export async function getDesignation(req, res) {
    const connection = await getConnection(res)
    try {
        const sql = `select distinct(role) from mobuserlog `
        const result = await connection.execute(sql)

        const resp = result.rows.map(user => ({ value: user[0], id: user[0] }))

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getRolesOnPage(req, res) {
    const connection = await getConnection(res)
    try {
        const { selectedRole, userName } = req.query;
        console.log(selectedRole, 'selectedRole');
        let sql = ''
        {
            selectedRole ? sql = `SELECT * FROM mobuserlog where mobuserlog.role ='${selectedRole}'` :
                sql = `SELECT ML.* , MU.userName 
              FROM mobuserlog ML
LEFT JOIN mobileuser MU ON MU.ROLE = ML.ROLE
where  MU.USERNAME  ='${userName}' AND isDefault <> 0`
        }
        console.log(sql, '200');
        const result = await connection.execute(sql)

        const resp = result.rows.map(role => ({
            id: role[0], roleId: role[1], Read: role[2], Update: role[3], Delete: role[4], Create: role[5],
            Admin: role[6], Pages: role[7], username: role[8]

        }))
        console.log(resp, 'resap');

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}
export async function createRoleOnPage(req, res) {
    const connection = await getConnection();
    const { roleName, permissions } = req.body;

    const createdDate = new Date();

    try {
        // Prepare to insert each page's permissions
        const insertPromises = [];

        for (const page in permissions) {
            const pagePermissions = permissions[page];

            // Prepare the SQL values for each permission type
            const read = pagePermissions.Read ? 1 : 0;
            const create = pagePermissions.Create ? 1 : 0;
            const edit = pagePermissions.Update ? 1 : 0;
            const del = pagePermissions.Delete ? 1 : 0;
            const isdefault = pagePermissions.Admin ? 1 : 0;

            // Construct the SQL query for each page's permissions
            const sql = `INSERT INTO mobuserlog ("ROLE", "CREATE", "EDIT", "DELETE", "READ", "PAGE", "ISDEFAULT")
                         VALUES ('${roleName}', ${create}, ${edit}, ${del}, ${read}, '${page}', ${isdefault})`;

            insertPromises.push(connection.execute(sql));
        }

        // Execute all insert statements
        await Promise.all(insertPromises);
        await connection.commit(); // Commit after all queries are executed
        await connection.close(); // Close connection

        return res.json({ statusCode: 0, message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        await connection.close();
        return res.json({ statusCode: 1, message: 'An error occurred while creating the user' });
    }
}


export async function UpdateRoleOnPage(req, res) {
    const connection = await getConnection();
    const { roleName, permissions } = req.body;

    try {
        // Prepare to insert each page's permissions
        const insertPromises = [];

        for (const page in permissions) {
            const pagePermissions = permissions[page];

            // Prepare the SQL values for each permission type
            const read = pagePermissions.Read ? 1 : 0;
            const create = pagePermissions.Create ? 1 : 0;
            const edit = pagePermissions.Update ? 1 : 0;
            const del = pagePermissions.Delete ? 1 : 0;
            const isdefault = pagePermissions.Admin ? 1 : 0;
            // Construct the SQL query for each page's permissions
            const sql = `
            update  MOBUSERLOG set "CREATE"=${create},"EDIT"=${edit},"DELETE"=${del},"READ"=${read},ISDEFAULT=${isdefault} where PAGE='${page}' and ROLE='${roleName}'`; 

            insertPromises.push(connection.execute(sql));
        }

        // Execute all insert statements
        await Promise?.all(insertPromises);
        await connection?.commit(); // Commit after all queries are executed
        await connection?.close(); // Close connection

        return res.json({ statusCode: 0, message: 'User Update successfully' });

    } catch (error) {
        console.error(error);
        await connection.close();
        return res.json({ statusCode: 1, message: 'An error occurred while creating the user' });
    }
}





export async function getCompanyCode(req,res) { 
   
    const connection = await getConnection(res)
      try {
        
        const sql =`SELECT A.COMPCODE "id",A.COMPCODE "value" FROM GTCOMPMAST A 
WHERE A.PTRANSACTION = 'COMPANY' ORDER BY 1`

   
        const result = await connection.execute(sql)
        
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


export async function getEmployeeIds(req,res) { 
   
    const connection = await getConnection(res)
      try {
        
        const sql =`SELECT C.COMPCODE||'('||B.IDCARD ||')'||'('|| D.FNAME ||')' "value",B.IDCARD "id",C.COMPCODE,C.COMPNAME,B.DEPTNAME FROM HREMPLOYMAST A 
JOIN HREMPLOYDETAILS B ON A.HREMPLOYMASTID = B.HREMPLOYMASTID
JOIN GTCOMPMAST C ON C.GTCOMPMASTID = A.COMPCODE
JOIN HREMPLOYMAST D ON D.HREMPLOYMASTID = B.HREMPLOYMASTID
ORDER BY 3,TO_NUMBER(B.IDCARD)`

   
        const result = await connection.execute(sql)
        
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




export async function remove(req, res) {
    const connection = await getConnection.apply(res);
    try {
    }
    catch (err) {
    }
}

export async function send_Otp(req,res){
    var reset=req?.body?.reset
    
        try {
      var data=await prisma_Connector.user?.findFirst({where: reset ? {OR:[{otpemail:req?.body?.username},{username:req?.body?.username}]}:{username:req?.body?.username}})
     
      
       const isMatched = !reset && await bcrypt.compare(req?.body?.password, data?.password)


 
       
      if(isMatched || reset && data?.otpemail){
      var Random_otp_val=Random_Otp()
      console.log(data);
      
      var otp=await sendMail({to:data?.otpemail,otp:Random_otp_val})
     
     
     
      if(otp?.accepted[0]==data?.otpemail){
        await prisma_Connector.user?.update({
          where:{
            username:data?.username
          },data:{
            otp:Random_otp_val
          }
        }).then((data)=>{
          if(data?.otp)
            res.json({status:1})
          else
            res.json({status:0})
        })
      
      }else{
        res.json({status:0})
      }
      }
      else if(!data?.otpemail){
        return res.json({status:0,err:"Email is Not Register!"})
      }else{
        return res.json({status:0,err:"Password is Not Correct!"})
      }
      } catch (error) {
        console.log(error);
        res.json({status:500,err:error})
      }
      
      
      
  
}





export async function verify_Otp_and_change_pass(req,res){
    var otp=req?.body?.otp
    var username=req?.body?.username
    var NewPass=req?.body?.NewPass
    
        try {
          var data=await prisma_Connector.user?.findFirst({where:{otp:otp}})
         if(data?.otp){
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(NewPass, saltRounds); 
            const changePassword=await prisma_Connector?.user?.update({
                where:{username},data:{password:hashedPassword}
            })
            if(changePassword?.password){
                return res?.json({status:1})
            }else{
                return res?.json({status:0})
            }
          }else{

            return res?.json({status:0})
          }
        }catch(err){
            console.log(err);
            

        }
      
      
  
}












