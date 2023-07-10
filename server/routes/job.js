let express = require('express');
let router = express.Router();

let jobController = require('../controllers/job');

/* GET home page. */
router.get('/', jobController.displayJobPage);

router.get('/search', jobController.getJobById)

router.post('/create', jobController.processCreatePage);

router.post('/update', jobController.processUpdatePage);


module.exports = router;