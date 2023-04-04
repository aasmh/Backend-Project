const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gets');
const postctrl = require('../controllers/posts');

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
//get depart

//get arrival



//Posts
router.post('/post/test', (req, res)=> postctrl.addnewagent(req,res));

router.post('/post/statusagents', (req, res)=> postctrl.addnewagent(req,res));


module.exports = router;