let express = require('express');
let router = express.Router();

let employeeController = require('../controllers/employee');

/* GET home page. */
router.get('/', employeeController.displayEmployeePage);

router.get('/getjoblist', employeeController.getJobList);

router.get('/getemployeelist', employeeController.getEmployeeList);

router.get('/getdepartmentlist', employeeController.getDepartmentList);

router.get('/hiring', employeeController.displayHiringPage);

router.post('/hiring', employeeController.processHiringPage);

router.post('/update', employeeController.processUpdatePage);

module.exports = router;