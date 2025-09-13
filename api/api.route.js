var express = require('express');
var router = express.Router();

// var jsonController = require('./json.controller');
var userController = require('./user.controller');
var blogController = require('./blog.controller');
var commentController = require('./comment.controller');


// router.get('/json', jsonController.getAll);
// router.get('/json/:id', jsonController.getById);

router.post('/users', userController.create);
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.put('/users/:id', userController.update);
router.patch('/users/:id', userController.patch);
router.delete('/users/:id', userController.deleteUser);

router.post('/blogs', blogController.create);
router.get('/blogs', blogController.getAll);
router.get('/blogs/:id', blogController.getById);
router.put('/blogs/:id', blogController.update);
router.patch('/blogs/:id', blogController.patch);
router.delete('/blogs/:id', blogController.delete);

router.post('/comments', commentController.create);
router.get('/comments', commentController.getAll);
router.get('/comments/:id', commentController.getById);
router.put('/comments/:id', commentController.update);
router.patch('/comments/:id', commentController.patch);
router.delete('/comments/:id', commentController.delete);

module.exports = router;