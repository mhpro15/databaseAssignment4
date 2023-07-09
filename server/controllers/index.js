let express = require('express');
let router = express.Router();
let oracledb = require('oracledb');


module.exports.displayHomePage = async (req, res, next) => {
    let connection = await oracledb.getConnection();
    const result = await connection.execute(`SELECT * FROM hr_employees`);
    console.log("Result is:", result.rows[1]);

    await connection.close();   // Always close connections
     res.render('index', { title: 'Home' });
   
}

