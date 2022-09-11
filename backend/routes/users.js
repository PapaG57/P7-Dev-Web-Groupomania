
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/users');
const JWT = require('../middlewares/authentication');
const upload = require('../middlewares/multer');

router.get('/:id', [JWT.auth], Ctrl.getUser);

router.put('/update/:id', upload.single('image'), [JWT.auth], Ctrl.modifyUser);

router.delete('/delete/:id', [JWT.auth], Ctrl.deleteUser);

module.exports = router;
