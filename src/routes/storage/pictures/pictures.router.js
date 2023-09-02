const express = require('express');
const router = express.Router();
const controller = require('./pictures.controller');
const authorization = require('../../../utils/authCheck');


router.get('/', controller.getPicture)


module.exports = router;