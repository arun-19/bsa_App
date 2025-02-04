import { getConnection } from "../constants/db.connection.js";
import { IN_HAND } from "../constants/dbConstants.js";
import { currentDate } from "../Helpers/helper.js";
import { getTopCustomers, getProfit, getEmployees, getNewCustomers, getLoss }
    from "../queries/misDashboard.js";


export async function get(req, res) {
    const connection = await getConnection(res)
    try {
        const { type, filterYear, filterBuyer, filterMonth } = req.query

        console.log(filterBuyer, filterMonth, 'total');
        const totalTurnOver = await getEmployees(connection, type, filterYear, filterBuyer, filterMonth);
        const profit = await getProfit(connection, type, filterYear, filterBuyer, filterMonth);
        console.log(profit, 'totla');
        const newCustomers = await getNewCustomers(connection, type, filterYear, filterBuyer, filterMonth);
        const topCustomers = await getTopCustomers(connection, type, filterYear, filterBuyer, filterMonth);
        const loss = await getLoss(connection, type, filterYear, filterMonth);
        return res.json({
            statusCode: 0, data: {
                totalTurnOver,
                profit,
                newCustomers,
                topCustomers,
                loss
            }
        })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getInsuranceData(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        console.log("hit42");

        const sql = ` 
SELECT ROWNUM SNO,AA.*
FROM(SELECT A.DOCID,A.DOCDATE,C.INSURANCEDESC DESCOFINSASSET,B.OWNERSHIPP,D.VEHICLENO,D.VEHICLENAME,E.INSCOMPNAME INSUREDBY,
B.INSREFNO POLICYNO,B.VALIDFROM,B.VALIDTO,B.VALIDTO-TO_DATE(SYSDATE) DUEDAYS,
B.INSPREMIUMVALUE,B.TOTALPREMIUM,B.PAYMENTDETAILS,B.PAYMENTMODE
FROM GTINSURANCE A
JOIN GTINSURANCEDET B ON A.GTINSURANCEID=B.GTINSURANCEID
JOIN GTINSDESCMAST C ON B.DESCOFINSASSET=C.GTINSDESCMASTID
LEFT JOIN HRVEHMAST D ON B.VEHICLENO=D.HRVEHMASTID
JOIN GTINSCOMPMAST E ON B.INSUREDBY=E.GTINSCOMPMASTID
JOIN GTCOMPMAST F ON A.COMPCODE=F.GTCOMPMASTID
WHERE F.COMPCODE='BPP'  AND B.VALIDTO-TO_DATE(SYSDATE) >= 0
ORDER BY DUEDAYS)AA
`
        console.log(sql, 'sql60');
        let result = await connection.execute(sql);
        result = result.rows.map(row => ({
            sno: row[0], docId: row[1], docDate: row[2], discoFinAsset: row[3], ownership: row[4], vehNo: row[5], vehName: row[6],
            insuredby: row[7], policyNo: row[8], validFrom: row[9],
            validTo: row[10], dueDays: row[11], insPremiumValue: row[12],
            totalPremium: row[13], paymentDetails: row[14], paymentMode: row[
                15]

        }))
        return res.json({
            statusCode: 0, data: result
        })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getTotalStrength(req, res) {
    const connection = await getConnection(res)
    console.log(currentDate, 'data');

    try {
        const sql =
            `
    SELECT A.*,DENSE_RANK() OVER(ORDER BY A.BANDID,A.DEPTNAME) SNO FROM 
(SELECT A.*,DECODE(A.TOTALMALE,0,0,ROUND((A.ABSMALE/A.TOTALMALE) *100,2)) APMALE,
DECODE(A.TOTALFEMALE,0,0,ROUND((A.ABSFEMALE/A.TOTALFEMALE) *100,2)) APFEMALE,
DECODE(A.TOTALFEMALE + A.TOTALMALE ,0,0,ROUND(((A.ABSFEMALE+A.ABSMALE)/(A.TOTALFEMALE + TOTALMALE )) *100,2)) TOTABPER
FROM (
SELECT AA.BANDID,AA.DEPTNAME,SUM(AA.TOTALMALE) TOTALMALE,SUM(TOTALFEMALE) TOTALFEMALE,SUM(PREMALE) PREMALE,SUM(PREFEMALE) PREFEMALE ,
SUM(AA.TOTALMALE)-SUM(PREMALE) ABSMALE,SUM(TOTALFEMALE)-SUM(PREFEMALE) ABSFEMALE,
SUM(TOTALFEMALE +TOTALMALE) GENDERTOT,(SUM(TOTALFEMALE)-SUM(PREFEMALE))+(SUM(AA.TOTALMALE)-SUM(PREMALE)) ABTOT,SUM(PREMALE+PREFEMALE) PRETOT
FROM 
(
SELECT CASE WHEN :TYPENAME = 'Desig Wise' THEN AA.DEPT ELSE AA.BANDID END BANDID,AA.DEPTNAME,SUM(AA.TOTALMALE) TOTALMALE,SUM(TOTALFEMALE) TOTALFEMALE,SUM(PREMALE) PREMALE,SUM(PREFEMALE) PREFEMALE ,
SUM(AA.TOTALMALE)-SUM(PREMALE) ABSMALE,SUM(TOTALFEMALE)-SUM(PREFEMALE) ABSFEMALE,
SUM(TOTALFEMALE +TOTALMALE) GENDERTOT,(SUM(TOTALFEMALE)-SUM(PREFEMALE))+(SUM(AA.TOTALMALE)-SUM(PREMALE)) ABTOT,SUM(PREMALE+PREFEMALE) PRETOT
FROM 
(
SELECT E.DESIGNATION DEPT,C.BANDID,F.MNNAME1 DEPTNAME,CASE WHEN A.GENDER = 'MALE' THEN COUNT(B.IDCARD) ELSE 0 END TOTALMALE
,CASE WHEN A.GENDER = 'FEMALE' THEN COUNT(B.IDCARD) ELSE 0 END TOTALFEMALE,0 PREMALE,0 PREFEMALE
FROM HREMPLOYMAST A,HREMPLOYDETAILS B,HRBANDMAST C,GTCOMPMAST D,GTDESIGNATIONMAST E,GTDEPTDESGMAST F 
WHERE A.HREMPLOYMASTID = B.HREMPLOYMASTID AND B.BAND = C.HRBANDMASTID 
AND B.DESIGNATION = E.GTDESIGNATIONMASTID AND F.GTDEPTDESGMASTID = B.DEPTNAME
AND D.GTCOMPMASTID = A.COMPCODE AND B.IDACTIVE = 'YES' AND B.DOJ <= TO_DATE('${currentDate}', 'DD/MM/YYYY')  AND LOWER(:ROL) = 'group role' and a.EMPTYPE = 'Permanent'
AND ( D.COMPCODE = :COMPCODE OR 'ALL' = :COMPCODE ) AND ( F.MNNAME1 = :DEPT OR 'ALL' = :DEPT ) AND ( C.BANDID = :PAYCAT OR :PAYCAT = 'ALL')
GROUP BY A.GENDER,C.BANDID,E.DESIGNATION,F.MNNAME1
UNION ALL
SELECT E.DESIGNATION DEPT,C.BANDID,F.MNNAME1 DEPTNAME,CASE WHEN A.GENDER = 'MALE' THEN COUNT(B.IDCARD) ELSE 0 END TOTALMALE
,CASE WHEN A.GENDER = 'FEMALE' THEN COUNT(B.IDCARD) ELSE 0 END TOTALFEMALE,0 PREMALE,0 PREFEMALE
FROM HREMPLOYMAST A,HREMPLOYDETAILS B,HRBANDMAST C,GTCOMPMAST D,GTDESIGNATIONMAST E,GTDEPTDESGMAST F 
WHERE A.HREMPLOYMASTID = B.HREMPLOYMASTID AND B.BAND = C.HRBANDMASTID 
AND B.DESIGNATION = E.GTDESIGNATIONMASTID AND F.GTDEPTDESGMASTID = B.DEPTNAME
AND D.GTCOMPMASTID = A.COMPCODE AND B.IDACTIVE = 'YES' AND B.DOJ <= TO_DATE(TO_DATE('${currentDate}', 'DD/MM/YYYY'), 'DD/MM/YYYY')  AND LOWER(:ROL) <> 'group role' 
AND ( D.COMPCODE = :COMPCODE OR 'ALL' = :COMPCODE ) AND ( F.MNNAME1 = :DEPT OR 'ALL' = :DEPT )  AND ( C.BANDID = :PAYCAT OR :PAYCAT = 'ALL')
GROUP BY A.GENDER,C.BANDID,E.DESIGNATION,F.MNNAME1
UNION ALL
SELECT AA.DEPT,AA.BANDID,AA.DEPTNAME,0 TOTALMALE,0 TOTALFEMALE,CASE WHEN AA.GENDER = 'MALE' THEN COUNT(AA.IDCARD) ELSE 0 END PREMALE,
CASE WHEN AA.GENDER = 'FEMALE' THEN COUNT(AA.IDCARD) ELSE 0 END PREFEMALE FROM
(
SELECT H.BANDID,D.GENDER,C.IDCARD,F.DESIGNATION DEPT,I.MNNAME1 DEPTNAME 
FROM HRONDUTY A,HRONDUTYDET B,HREMPLOYDETAILS C,HREMPLOYMAST D,GTDESIGNATIONMAST F,GTCOMPMAST G,HRBANDMAST H,GTDEPTDESGMAST I
WHERE A.HRONDUTYID = B.HRONDUTYID AND B.IDCARD = C.HREMPLOYDETAILSID AND D.HREMPLOYMASTID = C.HREMPLOYMASTID
AND C.DESIGNATION = F.GTDESIGNATIONMASTID AND G.GTCOMPMASTID = D.COMPCODE AND C.BAND = H.HRBANDMASTID AND I.GTDEPTDESGMASTID = C.DEPTNAME
AND C.DOJ <= TO_DATE(TO_DATE('${currentDate}', 'DD/MM/YYYY'), 'DD/MM/YYYY') AND ( G.COMPCODE = :COMPCODE OR 'ALL' = :COMPCODE ) AND ( I.MNNAME1 = :DEPT OR 'ALL' = :DEPT ) 
AND LOWER(:ROL) = 'group role' and D.EMPTYPE = 'Permanent' AND ( H.BANDID = :PAYCAT OR :PAYCAT = 'ALL')
AND B.ODATE = TO_DATE(TO_DATE('${currentDate}', 'DD/MM/YYYY'), 'DD/MM/YYYY') 
UNION 
SELECT H.BANDID,D.GENDER,C.IDCARD,F.DESIGNATION DEPT,I.MNNAME1 DEPTNAME 
FROM HRONDUTY A,HRONDUTYDET B,HREMPLOYDETAILS C,HREMPLOYMAST D,GTDESIGNATIONMAST F,GTCOMPMAST G,HRBANDMAST H,GTDEPTDESGMAST I
WHERE A.HRONDUTYID = B.HRONDUTYID AND B.IDCARD = C.HREMPLOYDETAILSID AND D.HREMPLOYMASTID = C.HREMPLOYMASTID
AND C.DESIGNATION = F.GTDESIGNATIONMASTID AND G.GTCOMPMASTID = D.COMPCODE AND C.BAND = H.HRBANDMASTID AND I.GTDEPTDESGMASTID = C.DEPTNAME
AND C.DOJ <= TO_DATE(TO_DATE('${currentDate}', 'DD/MM/YYYY'), 'DD/MM/YYYY') AND ( G.COMPCODE = :COMPCODE OR 'ALL' = :COMPCODE ) AND ( I.MNNAME1 = :DEPT OR 'ALL' = :DEPT ) AND LOWER(:ROL) <> 'group role' 
AND B.ODATE = TO_DATE(TO_DATE('${currentDate}', 'DD/MM/YYYY'), 'DD/MM/YYYY')  AND ( H.BANDID = :PAYCAT OR :PAYCAT = 'ALL')
UNION
SELECT  BANDID,GENDER,IDCARD,DESIGNATION DEPT,DEPTNAME FROM (
SELECT A.IDCARD,B.FNAME,MIN(TO_TIMESTAMP(A.ATTDATE||' '||A.ATTTIME,'DD/MM/YY HH24:MI:SS')) INDT ,D.BANDID ,B.GENDER,F.DESIGNATION,I.MNNAME1 DEPTNAME
FROM SELHOATT A,HREMPLOYMAST B,HREMPLOYDETAILS C,HRBANDMAST D,GTDESIGNATIONMAST  F,GTDEPTDESGMAST I
WHERE A.HREMPLOYMASTID = B.HREMPLOYMASTID AND C.HREMPLOYMASTID = B.HREMPLOYMASTID AND C.PAYCAT = D.HRBANDMASTID AND I.GTDEPTDESGMASTID = C.DEPTNAME
AND C.DESIGNATION=F.GTDESIGNATIONMASTID AND A.COMPCODE = 'BVK' AND ( :COMPCODE = 'BVK' OR 'ALL' = :COMPCODE ) AND ( I.MNNAME1 = :DEPT OR 'ALL' = :DEPT ) 
AND A.PMNO IN ( SELECT B.MACNO FROM HRMACIPENTRY A JOIN HRMACIPENTRYDET B ON A.HRMACIPENTRYID = B.HRMACIPENTRYID
JOIN GTCOMPMAST C ON C.GTCOMPMASTID = A.COMPCODE AND C.COMPCODE = 'BVK' AND B.MTYPE IN ('IN','IN/OUT'))
AND TO_TIMESTAMP(A.ATTDATE||' '||A.ATTTIME,'DD/MM/YY HH24:MI:SS') BETWEEN
(
SELECT TO_TIMESTAMP( TO_DATE(TO_DATE('${currentDate}', 'DD/MM/YYYY'), 'DD/MM/YYYY') ||' '||MIN(A.STST),'DD/MM/YY HH24:MI:SS') - NUMTODSINTERVAL( :ADNLT ,'HOUR')  STST 
FROM HRSHIFTTEMPDETAIL A,HRSHIFTTEMP B,GTCOMPMAST C WHERE A.HRSHIFTTEMPID = B.HRSHIFTTEMPID  AND B.COMPCODE = C.GTCOMPMASTID
AND C.COMPCODE = 'BVK'  AND A.NDAY = 'NO' 
)
AND 
(
SELECT TO_TIMESTAMP( TO_DATE( '05/02/2025', 'DD/MM/YYYY') ||' '||MIN(A.STST),'DD/MM/YY HH24:MI:SS') - NUMTODSINTERVAL( :ADNLT ,'HOUR')  STST 
FROM HRSHIFTTEMPDETAIL A,HRSHIFTTEMP B,GTCOMPMAST C WHERE A.HRSHIFTTEMPID = B.HRSHIFTTEMPID  AND B.COMPCODE = C.GTCOMPMASTID
AND C.COMPCODE = 'BVK'  AND A.NDAY = 'NO'
)
GROUP BY A.IDCARD,B.FNAME,D.BANDID ,B.GENDER,F.DESIGNATION,I.MNNAME1
UNION ALL
SELECT A.IDCARD,B.FNAME,MIN(TO_TIMESTAMP(A.ATTDATE||' '||A.ATTTIME,'DD/MM/YY HH24:MI:SS')) INDT ,D.BANDID ,B.GENDER,F.DESIGNATION,I.MNNAME1 DEPTNAME
FROM BPPATT A,HREMPLOYMAST B,HREMPLOYDETAILS C,HRBANDMAST D,GTDESIGNATIONMAST  F,GTDEPTDESGMAST I
WHERE A.HREMPLOYMASTID = B.HREMPLOYMASTID AND C.HREMPLOYMASTID = B.HREMPLOYMASTID AND C.PAYCAT = D.HRBANDMASTID AND I.GTDEPTDESGMASTID = C.DEPTNAME
AND C.DESIGNATION=F.GTDESIGNATIONMASTID AND A.COMPCODE = :COMPCODE AND ( :COMPCODE = :COMPCODE OR 'ALL' = :COMPCODE ) 
AND ( I.MNNAME1 = :DEPT OR 'ALL' = :DEPT ) AND LOWER(:ROL) = 'group role' and B.EMPTYPE = 'Permanent'  AND ( D.BANDID = :PAYCAT OR :PAYCAT = 'ALL')
AND A.PMNO IN ( SELECT B.MACNO FROM HRMACIPENTRY A JOIN HRMACIPENTRYDET B ON A.HRMACIPENTRYID = B.HRMACIPENTRYID
JOIN GTCOMPMAST C ON C.GTCOMPMASTID = A.COMPCODE AND C.COMPCODE = :COMPCODE AND B.MTYPE IN ('IN','IN/OUT'))
AND TO_TIMESTAMP(A.ATTDATE||' '||A.ATTTIME,'DD/MM/YY HH24:MI:SS') BETWEEN
(
SELECT TO_TIMESTAMP( TO_DATE(TO_DATE('${currentDate}', 'DD/MM/YYYY'), 'DD/MM/YYYY') ||' '||MIN(A.STST),'DD/MM/YY HH24:MI:SS') - NUMTODSINTERVAL( :ADNLT ,'HOUR')  STST 
FROM HRSHIFTTEMPDETAIL A,HRSHIFTTEMP B,GTCOMPMAST C WHERE A.HRSHIFTTEMPID = B.HRSHIFTTEMPID  AND B.COMPCODE = C.GTCOMPMASTID
AND C.COMPCODE = :COMPCODE  AND A.NDAY = 'NO' 
)
AND 
(
SELECT TO_TIMESTAMP( TO_DATE( '05/02/2025', 'DD/MM/YYYY') ||' '||MIN(A.STST),'DD/MM/YY HH24:MI:SS') - NUMTODSINTERVAL( :ADNLT ,'HOUR')  STST 
FROM HRSHIFTTEMPDETAIL A,HRSHIFTTEMP B,GTCOMPMAST C WHERE A.HRSHIFTTEMPID = B.HRSHIFTTEMPID  AND B.COMPCODE = C.GTCOMPMASTID
AND C.COMPCODE = :COMPCODE  AND A.NDAY = 'NO'
)
GROUP BY A.IDCARD,B.FNAME,D.BANDID ,B.GENDER,F.DESIGNATION,I.MNNAME1
UNION
SELECT A.IDCARD,B.FNAME,MIN(TO_TIMESTAMP(A.ATTDATE||' '||A.ATTTIME,'DD/MM/YY HH24:MI:SS')) INDT ,D.BANDID ,B.GENDER,F.DESIGNATION,I.MNNAME1 DEPTNAME
FROM BPPATT A,HREMPLOYMAST B,HREMPLOYDETAILS C,HRBANDMAST D,GTDESIGNATIONMAST  F,GTDEPTDESGMAST I
WHERE A.HREMPLOYMASTID = B.HREMPLOYMASTID AND C.HREMPLOYMASTID = B.HREMPLOYMASTID AND C.PAYCAT = D.HRBANDMASTID AND I.GTDEPTDESGMASTID = C.DEPTNAME
AND C.DESIGNATION=F.GTDESIGNATIONMASTID AND A.COMPCODE = :COMPCODE AND ( :COMPCODE = :COMPCODE OR 'ALL' = :COMPCODE ) 
AND ( I.MNNAME1 = :DEPT OR 'ALL' = :DEPT ) AND ( D.BANDID = :PAYCAT OR :PAYCAT = 'ALL') 
AND A.PMNO IN ( SELECT B.MACNO FROM HRMACIPENTRY A JOIN HRMACIPENTRYDET B ON A.HRMACIPENTRYID = B.HRMACIPENTRYID
JOIN GTCOMPMAST C ON C.GTCOMPMASTID = A.COMPCODE AND C.COMPCODE = :COMPCODE AND B.MTYPE IN ('IN','IN/OUT'))
AND TO_TIMESTAMP(A.ATTDATE||' '||A.ATTTIME,'DD/MM/YY HH24:MI:SS') BETWEEN
(
SELECT TO_TIMESTAMP( TO_DATE(TO_DATE('${currentDate}', 'DD/MM/YYYY'), 'DD/MM/YYYY') ||' '||MIN(A.STST),'DD/MM/YY HH24:MI:SS') - NUMTODSINTERVAL( :ADNLT ,'HOUR')  STST 
FROM HRSHIFTTEMPDETAIL A,HRSHIFTTEMP B,GTCOMPMAST C WHERE A.HRSHIFTTEMPID = B.HRSHIFTTEMPID  AND B.COMPCODE = C.GTCOMPMASTID
AND C.COMPCODE = :COMPCODE  AND A.NDAY = 'NO' 
)
AND 
(
SELECT TO_TIMESTAMP( TO_DATE( '05/02/2025', 'DD/MM/YYYY') ||' '||MIN(A.STST),'DD/MM/YY HH24:MI:SS') - NUMTODSINTERVAL( :ADNLT ,'HOUR')  STST 
FROM HRSHIFTTEMPDETAIL A,HRSHIFTTEMP B,GTCOMPMAST C WHERE A.HRSHIFTTEMPID = B.HRSHIFTTEMPID  AND B.COMPCODE = C.GTCOMPMASTID
AND C.COMPCODE = :COMPCODE  AND A.NDAY = 'NO'
)
AND LOWER(:ROL) <> 'group role' 
GROUP BY A.IDCARD,B.FNAME,D.BANDID ,B.GENDER,F.DESIGNATION,I.MNNAME1
) XX
) AA
GROUP BY AA.GENDER,AA.BANDID,AA.DEPT,AA.DEPTNAME
) AA
GROUP BY AA.DEPT,AA.BANDID,AA.DEPTNAME
) AA
GROUP BY AA.BANDID,AA.DEPTNAME
)A) A
ORDER BY A.BANDID,A.DEPTNAME
        `
        console.log(sql, 'sql');
        const params = {
            TYPENAME: { val: 'ALL' },
            COMPCODE: { val: 'BPP' },
            DEPT: { val: 'ALL' },
            PAYCAT: { val: 'ALL' },
            ROL: { val: 'Admin Role' },
            ADNLT: { val: '0.5' },
            DDDATE: { val: '05/02/2025' },

        };
        console.log(params, 'params');
        let result = await connection.execute(sql,
            params
        );
        console.log(result, 'result');
        result = result.rows.map(row => ({
            BANDID: row[0],
            DEPTNAME: row[1],
            TOTALMALE: row[2],
            TOTALFEMALE: row[3],
            PREMALE: row[4],
            PREFEMALE: row[5],
            ABSMALE: row[6],
            ABSFEMALE: row[7],
            GENDERTOT: row[8],
            ABTOT: row[9],
            PRETOT: row[10],
            APMALE: row[11],
            APFEMALE: row[12],
            TOTABPER: row[13]

        }))
        console.log(result, 'res');

        return res.json({
            statusCode: 0, data: result
        })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}


export async function getActualVsBudgetValueMonthWise(req, res) {
    const connection = await getConnection(res)
    try {
        const sql = `
           SELECT A.ORD,A.IDCARD,A.FNAME,A.DEPTNAME,A.DESIGNATION,A.MOBNO,
CASE WHEN  A.STATUS IS NULL THEN CASE WHEN A.LEAVE IS NULL THEN UPPER('ABSENT') ELSE UPPER(A.LEAVE) END ELSE STATUS END STATUS,A.IDACTIVE,
(
SELECT MAX(ZA.ATTDATE) FROM "$ATT" ZA WHERE ZA.IDCARD = A.IDCARD AND ZA.ATTDATE <= ${currentDate}
) LASTPUNCHDT  
FROM (
SELECT DENSE_RANK() OVER (ORDER  BY F.DISPNAME,C.IDCARD) ORD,C.MIDCARD IDCARD,B.FNAME,F.DISPNAME DEPTNAME,E.DESIGNATION,
UPPER((
SELECT 'GONE TO NATIVE' FROM HOSGTNENTRY A,HOSGTNENTRYDET B 
WHERE A.HOSGTNENTRYID=B.HOSGTNENTRYID AND ${currentDate} BETWEEN B.GNDATE AND B.RETDATE AND B.IDCARDNO=C.IDCARD
))  STATUS,
(SELECT 'LEAVE' TYPE FROM HRLEAVEREGMAST A,HREMPLOYDETAILS B,HRBANDMAST C 
WHERE A.IDCARD = B.HREMPLOYMASTID AND C.HRBANDMASTID = B.PAYCAT AND A.LRDATE = ${currentDate} AND B.IDCARD=C.IDCARD  
GROUP BY B.HREMPLOYMASTID,C.BANDID HAVING (0-SUM(A.STKOPBAL)) > 0 ) LEAVE,
C.IDACTIVE,H.MOBNO
FROM HREMPLOYMAST B,HREMPLOYDETAILS C,GTCOMPMAST D,GTDESIGNATIONMAST E,HRECONTACTDETAILS H,GTDEPTDESGMAST F,HRBANDMAST G
WHERE B.HREMPLOYMASTID=C.HREMPLOYMASTID AND C.DESIGNATION=E.GTDESIGNATIONMASTID
AND B.COMPCODE=D.GTCOMPMASTID AND C.DEPTNAME=F.GTDEPTDESGMASTID AND C.BAND=G.HRBANDMASTID AND B.HREMPLOYMASTID=H.HREMPLOYMASTID
AND D.COMPCODE=:COMPCODE
AND (LOWER(C.IDACTIVE)='yes' )
AND (LOWER(G.CAT)=LOWER(:TYPE) OR 'all'=LOWER(:TYPE)) 
AND (LOWER(C.MONTHLY)=LOWER(:MONTHLY) OR 'all'=LOWER(:MONTHLY)) 
AND B.HREMPLOYMASTID NOT IN (SELECT EMPMAID FROM( 
SELECT  EMPMAID FROM ( 
SELECT A.HREMPLOYMASTID EMPMAID,DENSE_RANK() OVER (PARTITION BY IDCARDNO ORDER  BY ATTTIME) ORD  
FROM BPPATT A,HREMPLOYMAST B,HREMPLOYDETAILS C,GTCOMPMAST D
WHERE  A.HREMPLOYMASTID=B.HREMPLOYMASTID AND  B.HREMPLOYMASTID=C.HREMPLOYMASTID AND A.ATTDATE=${currentDate}
AND (LOWER(C.IDACTIVE)='yes' OR LOWER(C.CONTRACTOR)='yes')  AND B.COMPCODE=D.GTCOMPMASTID
AND D.COMPCODE=:COMPCODE
UNION
SELECT C.HREMPLOYMASTID EMPMAID,0 ORD  FROM HRONDUTY A,HRONDUTYDET B,HREMPLOYDETAILS C,GTCOMPMAST D
WHERE A.HRONDUTYID=B.HRONDUTYID AND B.IDCARD=C.IDCARD AND A.COMPCODE=D.GTCOMPMASTID 
AND A.DOCDATE=${currentDate} AND D.COMPCODE=:COMPCODE
AND B.OHDAY='I & II' 
) WHERE ORD=1))) A
ORDER BY TO_NUMBER(A.IDCARD)
        `
        const params = {
            TYPE: { val: 'ALL' },
            COMPCODE: { val: 'BPP' },
            MOTHLY: { val: '0.5' },
            DOCDATE: { val: '02/01/2025' }
        };
        let result = await connection.execute(sql, params);
        result = result.rows.map(row => ({
            date: row[0], planned: row[3], actual: row[4]
        }))
        return res.json({
            statusCode: 0, data: result, sql
        })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}
export async function getYearlyComp(req, res) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    const monthName = month[d.getMonth()];
    const yearName = d.getFullYear();
    const lastmonth = month[d.getMonth() - 1]
    const currentDt = [monthName, yearName].join(' ')
    const lstMnth = [lastmonth, yearName].join(' ')
    const connection = await getConnection(res)
    try {
        const { } = req.query;

        const sql =
            `
           SELECT A.COMPCODE,SUM(MALE) MALE,SUM(FEMALE) FEMALE,SUM(MALE)+SUM(FEMALE) TOTAL FROM (
SELECT A.COMPCODE,CASE WHEN A.GENDER = 'MALE' THEN 1 ELSE 0 END MALE,
CASE WHEN A.GENDER = 'FEMALE' THEN 1 ELSE 0 END FEMALE FROM MISTABLE A WHERE  A.DOJ <= (
SELECT MIN(AA.STDT) STDT FROM MONTHLYPAYFRQ AA WHERE AA.PAYPERIOD = '${currentDt}' 
) AND (A.DOL IS NULL OR A.DOL <= (
SELECT MIN(AA.ENDT) STDT FROM MONTHLYPAYFRQ AA WHERE AA.PAYPERIOD = '${currentDt}'
) )
) A
GROUP BY A.COMPCODE
     `

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({

            customer: po[0],
            male: po[1],
            female: po[2],

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
export async function getBuyerWiseRevenue(req, res) {
    const connection = await getConnection(res)
    try {
        const { filterYear, filterSupplier } = req.query;
        const supplierArray = filterSupplier.split(',');
        const sepComName = supplierArray.join('');
        const supplierList = supplierArray.map(supplier => `'${supplier}'`).join(',');
        const sql =
            `
         SELECT A.PAYPERIOD,A.STDT,ROUND(A.CLOSING/A.OPENING*100,2) RETENTIONPER FROM (
SELECT A.PAYPERIOD,A.STDT,SUM(A.OPENING) OPENING,SUM(A.ATTRITION) ATTRITION,SUM(A.OPENING) - SUM(A.ATTRITION) + SUM(A.JOINERS) CLOSING FROM (
SELECT B.PAYPERIOD,B.STDT,0 OPENING,COUNT(*) ATTRITION,0 JOINERS FROM MISTABLE A
JOIN MONTHLYPAYFRQ B ON A.COMPCODE = B.COMPCODE 
AND B.FINYR = '${filterYear}' AND A.COMPCODE IN (${supplierList})
AND A.DOL BETWEEN B.STDT AND B.ENDT
GROUP BY B.PAYPERIOD,B.STDT,A.COMPCODE
UNION ALL
SELECT B.PAYPERIOD,B.STDT,0 OPENING,0 ATTRITION,COUNT(*) JOINERS FROM MISTABLE A
JOIN MONTHLYPAYFRQ B ON A.COMPCODE = B.COMPCODE 
AND B.FINYR = '${filterYear}' AND A.COMPCODE  IN (${supplierList})
AND A.DOJ BETWEEN B.STDT AND B.ENDT
GROUP BY B.PAYPERIOD,B.STDT,A.COMPCODE
UNION ALL
SELECT B.PAYPERIOD,B.STDT,COUNT(*) OPENING,0 ATTRITION,0 JOINERS FROM MISTABLE A
JOIN MONTHLYPAYFRQ B ON A.COMPCODE = B.COMPCODE 
AND B.FINYR = '${filterYear}' AND A.COMPCODE  IN (${supplierList})
AND A.DOJ < B.STDT
GROUP BY B.PAYPERIOD,B.STDT
) A
GROUP BY A.PAYPERIOD,A.STDT
) A
ORDER BY 2
     `
        console.log(sql, '215');

        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({

            payPeriod: po[0],
            stdt: po[1],
            retention: po[2],

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


export async function getActualVsBudget(req, res) {
    const connection = await getConnection(res);
    try {
        const { filterMonth, filterSupplier, filterYear, filterAll = 'Detailed' } = req.query;

        let sql = '';

        if (filterAll === 'Detailed') {
            sql = `
              SELECT A.COMPCODE,SUM(MALE) MALE,SUM(FEMALE) FEMALE,SUM(MALE)+SUM(FEMALE) TOTAL FROM (
SELECT A.COMPCODE,CASE WHEN A.GENDER = 'MALE' THEN 1 ELSE 0 END MALE,
CASE WHEN A.GENDER = 'FEMALE' THEN 1 ELSE 0 END FEMALE FROM MISTABLE A WHERE A.COMPCODE = 'AGF'
AND A.DOJ <= (
SELECT MIN(AA.STDT) STDT FROM MONTHLYPAYFRQ AA WHERE AA.PAYPERIOD = 'July 2024' 
) AND (A.DOL IS NULL OR A.DOL <= (
SELECT MIN(AA.ENDT) STDT FROM MONTHLYPAYFRQ AA WHERE AA.PAYPERIOD = 'July 2024'
) )
) A
GROUP BY A.COMPCODE`;
            console.log(sql, 'dqw');

        } else {
            sql = `
                SELECT A.FINYR,ORDERNO,A.BUYERCODE,A.TYPENAME,A.YARNCOST,A.FABRICCOST,A.ACCCOST,A.CMTCOST,
                A.OTHERCOST,A.SALECOST,A.ACTPROFIT,A.ACTPROFITPER,A.ORD,A.MON,A.FINYR||A.MON GRP 
                FROM MISORDBUDACTCDETAILS A 
                WHERE A.TYPENAME <> 'Detailed1' AND A.BUYERCODE = :filterSupplier  
                AND A.Mon = :filterMonth AND A.finYr = :filterYear 
                ORDER BY BUYERCODE,ORDERNO,ORD`;
        }


        const result = await connection.execute(sql);
        let resp = result.rows.map(po => ({
            finYr: po[0],
            orderNo: po[1],
            buyerCode: po[2],
            typeName: po[3],
            yarnCost: po[4],
            fabricCost: po[5],
            accCost: po[6],
            cmtCost: po[7],
            otherCost: po[8],
            saleCost: po[9],
            actProfit: po[10],
            actProfitPer: po[11],
            ord: po[12],
            mon: po[13],
        }));

        return res.json({ statusCode: 0, data: resp });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection.close();
    }
}

export async function getShortShipmentRatio(req, res) {
    const connection = await getConnection(res)
    try {
        const { filterCat } = req.query;
        let sql

        if (filterCat === 'Birthday') {
            sql =
                `
     SELECT A.COMPCODE,A.IDCARD,A.FNAME,A.GENDER,A.DOB,TRUNC(MONTHS_BETWEEN(TRUNC(SYSDATE),A.DOB)/12) AGE,TRUNC(MONTHS_BETWEEN(TRUNC(SYSDATE),A.DOJ)/12) EXP ,A.DOJ FROM MISTABLE A 
WHERE TO_CHAR(SYSDATE, 'WW') = TO_CHAR(A.DOB, 'WW') AND A.PAYCAT = 'STAFF'
AND A.DOJ <= (
SELECT MIN(AA.STDT) STDT FROM MONTHLYPAYFRQ AA WHERE TO_DATE(SYSDATE) BETWEEN AA.STDT AND AA.ENDT 
) AND (A.DOL IS NULL OR A.DOL <= (
SELECT MIN(AA.ENDT) STDT FROM MONTHLYPAYFRQ AA WHERE TO_DATE(SYSDATE) BETWEEN AA.STDT AND AA.ENDT 
) )
ORDER BY A.DOB desc
 `
        } else {
            sql = `SELECT A.COMPCODE,A.IDCARD,A.FNAME,A.GENDER,A.DOB,TRUNC(MONTHS_BETWEEN(TRUNC(SYSDATE),A.DOB)/12) AGE,TRUNC(MONTHS_BETWEEN(TRUNC(SYSDATE),A.DOJ)/12) EXP ,A.DOJ FROM MISTABLE A 
WHERE TO_CHAR(SYSDATE, 'WW') = TO_CHAR(A.DOJ, 'WW') AND A.PAYCAT = 'STAFF'
AND A.DOJ <= (
SELECT MIN(AA.STDT) STDT FROM MONTHLYPAYFRQ AA WHERE TO_DATE(SYSDATE) BETWEEN AA.STDT AND AA.ENDT 
) AND (A.DOL IS NULL OR A.DOL <= (
SELECT MIN(AA.ENDT) STDT FROM MONTHLYPAYFRQ AA WHERE TO_DATE(SYSDATE) BETWEEN AA.STDT AND AA.ENDT 
) )
ORDER BY A.DOJ desc
`
        }


        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            customer: po[0],
            idCard: po[1],
            name: po[2],
            gender: po[3],
            dob: po[4],
            age: po[5],
            exp: po[6],
            doj: po[7]

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

