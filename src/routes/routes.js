const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gets');
const postctrl = require('../controllers/posts');
const log = require('../controllers/log');

//The route is /api/[insert stuff here]
router.post('/select-jobid', (req, res) => ctrl.usergetid(req, res));


router.get('/get/depart', (req , res ) => ctrl.gettable(req, res));

router.get('/get/portcode', (req, res) => ctrl.fetchportcode(req,res));

router.get('/get/countrycode', (req, res) => ctrl.fetchcountrycode(req,res));

router.get('/get/allcountries', (req, res) => ctrl.fetchallcountries(req,res));

router.get('/get/allports', (req, res) => ctrl.fetchallports(req,res));

router.get('/get/agentdata', (req, res) => ctrl.fetchallagents(req,res));

router.get('/get/shipdescdata', (req, res) => ctrl.fetchshipdesc(req,res));

router.get('/get/shiptypesdata', (req, res) => ctrl.fetchshiptypes(req,res));

router.get('/dbstatus', (req, res)=> ctrl.checkdatabase(req,res));


//Posts
router.post('/post/test', (req, res)=> postctrl.addnewagent(req,res));

router.post('/post/statusagents', (req, res)=> postctrl.addnewagent(req,res));












//get depart
// router.get('/get/depart', (req, res)=> ctrl.fetchdepart(req,res));

//get arrival
// router.get('/get/arrival', (req, res)=> ctrl.fetcharrival(req,res));


// LOGIN IN PART

router.get('/login/emp', (req, res) => log.fetchemployee(req,res));





router.post('/login/emp', (req, res) => log.loginEmp(req,res));
router.post('/login/admin', (req, res) => log.loginAdmin(req,res));
router.post('/login/addemp', (req, res) => log.addEmp(req,res));
router.post('/login/addArrival', (req, res) => log.addArrival(req,res));
router.post('/login/addDepart', (req, res) => log.addDepart(req,res));
router.post('/login/register', (req, res) => log.register(req,res));





router.get('/login/fetchemployee', (req, res) => log.fetchemployee(req,res));





module.exports = router;