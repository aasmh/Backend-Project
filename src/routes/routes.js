const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gets');
const postctrl = require('../controllers/posts');
const logCtrl = require('../controllers/log');
const deleteCtrl = require('../controllers/delete');
const putctrl = require('../controllers/updates');

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
router.post('/post/newshipdesc', (req, res) => postctrl.addshipdesc(req,res));    //------


//Update 
router.put('/update/updateport', (req, res)=> putctrl.updatePort(req,res));
router.put('/update/updatecountry', (req, res)=> putctrl.updateCountry(req,res));
router.put('/update/updateshiptype', (req, res)=> putctrl.updateShipType(req,res));
router.put('/update/updateop', (req, res)=> putctrl.updateOperation(req,res));
router.put('/update/updatedepart', (req, res)=> putctrl.updateDepart(req,res));
router.put('/update/updatearrival', (req, res)=> putctrl.updateArrival(req,res));


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
router.delete('/delete/deleteport', (req, res)=> deleteCtrl.deletePort(req,res));
router.delete('/delete/deletecountry', (req, res)=> deleteCtrl.deleteCountry(req,res));
router.delete('/delete/deleteshiptype', (req, res)=> deleteCtrl.deleteShipType(req,res));
router.delete('/delete/deleteop', (req, res)=> deleteCtrl.deleteOperation(req,res));
router.delete('/delete/deletedepart', (req, res)=> deleteCtrl.deleteDepart(req,res));
router.delete('/delete/deletearrival', (req, res)=> deleteCtrl.deleteArrival(req,res));  // deleteShipDesc
router.delete('/delete/deleteShipDesc', (req, res)=> deleteCtrl.deleteShipDesc(req,res));









module.exports = router;