const express = require('express');
const router = express.Router();
const { getData } = require('../conttroller/dataController');

router.get('/get-data', getData);

module.exports = router;
