const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/posts');
const JWT = require('../middlewares/authentication');
const upload = require('../middlewares/multer');

router.post('/', [JWT.auth], upload.single('image'), Ctrl.createPost);
router.get('/', [JWT.auth], Ctrl.getAllPosts);
router.get('/:id', [JWT.auth], Ctrl.getPost);
router.put('/update/:id', [JWT.auth], upload.single('image'), Ctrl.modifyPost);
router.delete('/delete/:id', [JWT.auth], Ctrl.deletePost);

module.exports = router;
