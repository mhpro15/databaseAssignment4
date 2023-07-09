let express = require('express');
let router = express.Router();
const http = require('http');
const url = require('url');
let oracledb = require('oracledb');
const MOMENT = require('moment');
const querystring = require('querystring');

module.exports.displayEmployeePage = async (req, res, next) => {
    try {
        let connection = await oracledb.getConnection();
        const employeeList = await connection.execute(`SELECT employee_id,first_name,last_name,email,phone_number,salary FROM hr_employees`);

        await connection.close();   // Always close connections
        res.render('employee/list', { title: 'Hiring Form', employees: employeeList.rows});

    } catch (error) {
        console.log(error);
    }
   
}

module.exports.displayHiringPage = async (req, res, next) => {
    try {
        let connection = await oracledb.getConnection();
        const joblist = await connection.execute(`SELECT job_id,job_title FROM hr_jobs`);
        const employeeList = await connection.execute(`SELECT employee_id,first_name,last_name FROM hr_employees`);
        const departmentList = await connection.execute(`SELECT department_id,department_name FROM hr_departments`);

        await connection.close();   // Always close connections
        res.render('employee/hiringForm', { title: 'Hiring Form' , jobs: joblist.rows , employees: employeeList.rows, departments: departmentList.rows});

    } catch (error) {
        console.log(error);
    }
   }

module.exports.getJobList = async (req, res, next) => {
    try {
         let connection = await oracledb.getConnection();
        const result = await connection.execute(`SELECT job_id,job_title FROM hr_jobs`);

        await connection.close();   // Always close connections
        res.json(result.rows);
    } catch (error) {
        console.log(error);
    }
   
}

module.exports.getEmployeeList = async (req, res, next) => {

    try {
        let connection = await oracledb.getConnection();
        const result = await connection.execute(`SELECT employee_id,first_name,last_name FROM hr_employees`);

        await connection.close();   // Always close connections
        res.json(result.rows);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.getDepartmentList = async (req, res, next) => {
    try {
         let connection = await oracledb.getConnection();
        const result = await connection.execute(`SELECT department_id,department_name FROM hr_departments`);

        await connection.close();   // Always close connections
        res.json(result.rows);
    } catch (error) {
        console.log(error);
    }
   
}

module.exports.processHiringPage = async (req, res, next) => {
    try {
        let datetime = MOMENT().format('YYYY-MM-DD');
        
        console.log(datetime);
        let connection = await oracledb.getConnection();
        await connection.execute(`ALTER SESSION SET NLS_DATE_FORMAT='YYYY-MM-DD'`);
        const result = await connection.execute(`
        INSERT INTO hr_employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,manager_id,department_id)
        VALUES(:employee_id,:first_name,:last_name,:email,:phone_number,:hire_date,:job_id,:salary,:manager_id,:department_id)`, {
            employee_id: 99,
            first_name: req.body.fname,
            last_name: req.body.lname,
            email: req.body.email,
            phone_number: req.body.phone,
            hire_date: datetime,
            job_id: req.body.jobId,
            salary: req.body.salary,
            manager_id: req.body.managerId,
            department_id: req.body.departmentId
        });

        if (result.rowsAffected == 1) {
            console.log("Employee added");
            await connection.execute(`COMMIT`);
        }
        else {
            console.log("Employee not added");
            await connection.execute(`ROLLBACK`);
        }
        console.log(result);
         await connection.close();   // Always close connections
        res.redirect('/employee');
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.processUpdatePage = async (req, res, next) => {
    const urlObj = url.parse(req.url);
    const queryObj = querystring.parse(urlObj.query);

    const id = queryObj.id;
    const email = queryObj.email;
    const phone = queryObj.phone;
    const salary = queryObj.salary;
    
    try {
        
        let connection = await oracledb.getConnection();
        const result = await connection.execute(`
        UPDATE hr_employees SET salary=:salary,phone_number=:phone,email=:email
        WHERE employee_id=:employee_id`, {
            employee_id: Number(id),
            email: email,
            phone: phone,
            salary: Number(salary)
        });
        console.log(result);

        if (result.rowsAffected == 1) {
            console.log("Employee updated");
            await connection.execute(`COMMIT`);
        }
        else {
            console.log("Employee not updated");
            await connection.execute(`ROLLBACK`);
        }

        await connection.close();   // Always close connections
        res.json(result)
    } catch (error) {
        res.send(error.toString())
    }
    
}