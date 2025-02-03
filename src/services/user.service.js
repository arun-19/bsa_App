import bcrypt from "bcrypt"
import { getConnection } from "../constants/db.connection.js";



export async function login(req, res) {
    const connection = await getConnection(res)
    const { username, password } = req.body
    if (!username) return res.json({ statusCode: 1, message: "Username is Required" })
    if (!password) return res.json({ statusCode: 1, message: "Password is Required" });
    console.log(username, "username");
    console.log(password);

    const sql = `SELECT * FROM MOBILEUSER where username='${username}'`
    console.log(sql, 'sql');

    const result = await connection.execute(sql)

    if (result.rows.length === 0) return res.json({ statusCode: 1, message: "Username Doesn't Exist" })
    let storedPassword = result.rows[0][1]

    const isMatched = await bcrypt.compare(password, storedPassword)


    if (!isMatched) return res.json({ statusCode: 1, message: "Password Doesn't Match" })
    console.log(isMatched, 'isMatched');
    // let gtCompMastId = result.rows[0][2]
    // let supplyDetails = await connection.execute(`
    // select pcategory 
    // from gtcompprodet 
    // join gtpartycatmast on gtcompprodet.partycat = gtpartycatmast.gtpartycatmastid
    // where gtcompmastid=:gtCompMastId
    // `, { gtCompMastId })
    // supplyDetails = supplyDetails.rows.map(item => item[0])

    await connection.close()
    return res.json({ statusCode: 0, message: "Login Successfull" })

}

export async function create(req, res) {
    const connection = await getConnection();
    const { username, password, checkboxes, email, role } = req.body;
    console.log(role, 'check');

    const roles = checkboxes || [].map((item) => item.id)
    console.log(roles, 'roles');
    const createdDate = new Date();

    if (!username || !password) {
        return res.json({ statusCode: 1, message: 'Username and Password are Required' });
    }

    try {
        const userNameResult = await connection.execute(
            'SELECT COUNT(*) as count FROM mobileuser WHERE username = :username',
            { username }
        );

        if (userNameResult.rows[0][0] > 0) {
            await connection.close();
            return res.json({ statusCode: 1, message: 'UserName Already Exsist' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = 'INSERT INTO mobileuser(username, password,email,role) VALUES (:username, :hashedPassword, :email, :role)';

        await connection.execute(sql, { username, hashedPassword, email, role });
        const userRoleSql = 'INSERT INTO mobuserlog(userName, ALLOWEDPAGES, createdDate) VALUES (:username, :ALLOWEDPAGES, :createdDate)';
        console.log(userRoleSql, 'userRoleSql');
        for (const role of roles) {
            await connection.execute(userRoleSql, { username, ALLOWEDPAGES: role, createdDate });
            console.log(role, 'role');
        }
        await connection.commit();
        await connection.close();
        return res.json({ statusCode: 0, message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        await connection.close();
        return res.json({ statusCode: 1, message: 'An error occurred while creating the user' });
    }
}


export async function get(req, res) {

    const connection = await getConnection(res)
    try {
        const sql = ` select * from mobileuser`
        const result = await connection.execute(sql)
        const resp = result.rows.map(user => ({
            userName: user[0], password: user[1],
            email: user[2], role: user[3]
        }))
        console.log(resp, '102');

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
    console.log(req.body, 'req.body');  // Check the incoming data

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

            console.log(sql, 'sql');

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



export async function remove(req, res) {
    const connection = await getConnection.apply(res);
    try {
    }
    catch (err) {
    }
}











