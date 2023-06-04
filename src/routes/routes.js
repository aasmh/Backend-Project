const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gets');
const postctrl = require('../controllers/posts');
const logCtrl = require('../controllers/log');
const deleteCtrl = require('../controllers/delete');

//The route is /api/[insert stuff here]
router.post('/select-jobid', (req, res) => ctrl.usergetid(req, res));


// router.get('/get/depart', (req , res ) => ctrl.gettable(req, res));

router.get('/get/portcode', (req, res) => ctrl.fetchportcode(req,res));

router.get('/get/countrycode', (req, res) => ctrl.fetchcountrycode(req,res));

router.get('/get/allcountries', (req, res) => ctrl.fetchallcountries(req,res));

router.get('/get/allports', (req, res) => ctrl.fetchallports(req,res));

router.get('/get/agentdata', (req, res) => ctrl.fetchallagents(req,res));

router.get('/get/shipdescdata', (req, res) => ctrl.fetchshipdesc(req,res));

router.get('/get/shiptypesdata', (req, res) => ctrl.fetchshiptypes(req,res));

router.get('/dbstatus', (req, res)=> ctrl.checkdatabase(req,res));

router.get('/get/operation', (req, res)=> ctrl.getOperation(req,res));

//get depart
router.get('/get/depart', (req, res)=> ctrl.fetchDepart(req,res));
//get arrival
router.get('/get/arrival', (req, res)=> ctrl.fetchArrival(req,res));


//Posts
router.post('/post/test', (req, res)=> postctrl.addnewagent(req,res));
router.post('/post/statusagents', (req, res)=> postctrl.addnewagent(req,res));

router.post('/post/newoperation', (req, res)=> postctrl.addnewoperation(req,res));

router.post('/post/newshiptype', (req, res)=> postctrl.addnewshiptype(req,res));

router.post('/post/newcountry', (req, res)=> postctrl.addnewcountry(req,res));

router.post('/post/newport', (req, res)=> postctrl.addnewport(req,res));

//Update 
router.put

// LOGIN IN PART

router.get('/login/emp', (req, res) => logCtrl.fetchemployee(req,res));




router.get('/login/fetchemployee', (req, res) => logCtrl.fetchemployee(req,res));

router.post('/login/emp', (req, res) => logCtrl.loginEmp(req,res));
router.post('/login/admin', (req, res) => logCtrl.loginAdmin(req,res));
router.post('/login/addEmp', (req, res) => logCtrl.addEmp(req,res));
router.post('/login/addArrival', (req, res) => logCtrl.addArrival(req,res));
router.post('/login/addDepart', (req, res) => logCtrl.addDepart(req,res));
router.post('/login/register', (req, res) => logCtrl.register(req,res));



//delete  APIs


router.delete('/delete/deleteEmp/:id', (req, res) => deleteCtrl.deleteEmployee(req,res));







module.exports = router;