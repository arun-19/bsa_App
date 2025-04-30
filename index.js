import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import { createRequire } from "module";
const require = createRequire(import.meta.url);


import {
  commonMast,
  poRegister,
  supplier,
  poData,
  misDashboard,
  ordManagement,
  user,
  Leave,
  Permission,
  Notification
} from "./src/routes/index.js"
import { getConnection } from './src/constants/db.connection.js';
import bodyParser from 'body-parser';
import { PrismaClient } from './src/generated/prisma/client.js';
import { Server } from 'socket.io';
import http  from "http"


const app = express()
app.use(express.json())
app.use(bodyParser?.json({limit:'50mb' }))
app.use(bodyParser?.urlencoded({ limit: '50mb', extended: true}))

app.use(cors({ origin: '*' }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = __dirname + '/web-build/';




app.use(express.static(path));



BigInt.prototype['toJSON'] = function () {
  return parseInt(this.toString());
};



app.use('/poRegister', poRegister)

app.use('/commonMast', commonMast)

app.use('/supplier', supplier)

app.use('/poData', poData)

app.use('/misDashboard', misDashboard)

app.use('/ordManagement', ordManagement)

app.post('/leave',Leave)
app.use('/Permission',Permission)

app.use('/Notifi',Notification)


export async function getCommonData(req, res) {
    const Table=req.body?.table
    const where=req.body?.where
    const fields=req.body?.fields
    const map=req?.body?.map

    
   
    const connection = await getConnection(res)
    try {
     
        const sql =
            `select ${fields} from ${Table} WHERE ${where}`
        
        const result = await connection.execute(sql)
        console.log(result);
    
        if(map=="true" || map==true){
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
          return res.json({ statusCode: 0, data: result?.rows })
        }
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

app.post('/getCommon', getCommonData)



app.use('/users', user)
const PORT = 8025;



const server=http.createServer(app)
const io=new Server(server,{cors: {
  origin: '*', 
  methods: ['GET', 'POST'],
}})

io.on('connection', client => {
  client.on("permission_request", (data) => {
    console.log("get_Notifi_permission_id:"+data.compcode+""+data.hod);
    
    client.broadcast.emit("get_Notifi_permission_id:"+data.compcode+""+data.hod, {
      data,
    });
  })
 
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


export const prisma_Connector = new PrismaClient();