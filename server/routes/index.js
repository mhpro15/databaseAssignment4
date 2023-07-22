let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

let employeeController = require('../controllers/employee');

/* GET home page. */
router.get('/', employeeController.displayEmployeePage);

/* GET home page. */
router.get('/home', employeeController.displayEmployeePage);

module.exports = router;