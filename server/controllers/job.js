
const url = require('url');
let oracledb = require('oracledb');
const querystring = require('querystring');

module.exports.displayJobPage = async (req, res, next) => {
    res.render('job/updateJob', { title: 'Job' });
}

module.exports.getJobById = async (req, res, next) => {
    try {
        const urlObj = url.parse(req.url);
        const queryObj = querystring.parse(urlObj.query);

        const id = queryObj.id.toUpperCase();

        
        let conn = await oracledb.getConnection();
        let result = await conn.execute(`SELECT * FROM HR_JOBS WHERE JOB_ID = '${id}'`);
        await conn.close();   // Always close connections
        if (result.rows.length == 0) {
            res.json({ error: "No record found" });
        }
        else {
            res.json(result.rows);
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports.processCreatePage = async (req, res, next) => {

    const urlObj = url.parse(req.url);
    const queryObj = querystring.parse(urlObj.query);
    const id = queryObj.id.toUpperCase();
    const title = queryObj.title.toUpperCase();
    const minSalary = queryObj.minSalary;
    const maxSalary = queryObj.maxSalary;

    let conn = await oracledb.getConnection();
    try {
        let result = await conn.execute(
            `BEGIN
                new_job(:id, :title, :minSalary);
                COMMIT;
            END;`, {
            id: id,
            title: title,
            minSalary: minSalary
        });
        await conn.close();   // Always close connections
        console.log(result);
        res.json(result);
        
    } catch (error) {
        console.log(error);
        res.json( {error} );
    }
        
   
}

module.exports.processUpdatePage = async (req, res, next) => {

    const urlObj = url.parse(req.url);
    const queryObj = querystring.parse(urlObj.query);
    const id = queryObj.id.toUpperCase();
    const title = queryObj.title.toUpperCase();
    const minSalary = queryObj.minSalary;
    const maxSalary = queryObj.maxSalary;

    let conn = await oracledb.getConnection();
    try {
        let result = await conn.execute(
            `
            UPDATE hr_JOBS SET job_title=:title,min_salary=:minSalary,max_salary=:maxSalary
            WHERE job_id=:id`, {
            id: id,
            title: title,
            minSalary: minSalary,
            maxSalary: maxSalary
        });

        if (result.rowsAffected == 1) {
            console.log("Job updated");
            await conn.execute(`COMMIT`);
        }
        else {
            console.log("Job not updated");
            await conn.execute(`ROLLBACK`);
        }
        await conn.close();   // Always close connections
        console.log(result);
        res.json(result);
        
    } catch (error) {
        console.log(error);
        res.json( {error} );
    }
        
   
}
