const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/likes');
const JWT = require('../middlewares/authentication');

router.post('/', [JWT.auth], Ctrl.liker);

module.exports = router;
