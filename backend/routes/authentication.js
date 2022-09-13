// routes pour l'authentification //

const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/authentication');
const JWT = require('../middlewares/authentication');

router.post('/signup', Ctrl.signup);
router.post('/signin', Ctrl.signin);
router.get('/auth', [JWT.auth], Ctrl.auth);

module.exports = router;
