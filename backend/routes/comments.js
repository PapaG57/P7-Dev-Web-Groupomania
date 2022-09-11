
const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/comments');
const JWT = require('../middlewares/authentication');

router.post('/', [JWT.auth], Ctrl.createComment);

router.get('/:postId', [JWT.auth], Ctrl.getComment);

router.put('/update/:commentId', [JWT.auth], Ctrl.modifyComment);

router.delete('/delete/:commentId', [JWT.auth], Ctrl.deleteComment);

module.exports = router;
