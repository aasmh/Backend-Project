const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/controller');

//The route is /api/[insert stuff here]

router.post('/select-jobid', (req, res) => ctrl.usergetid(req, res));

router.get('/get/depart', (req , res ) => ctrl.gettable(req, res));

router.get('/get/portcode', (req, res) => ctrl.fetchportcode(req,res));

router.get('/get/countrycode', (req, res) => ctrl.fetchcountrycode(req,res));

router.get('dbstatus', (req, res)=> ctrl.checkdatabase(req,res));
//get depart

//get arrival


module.exports = router;