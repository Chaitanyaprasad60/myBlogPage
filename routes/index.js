var express = require('express');
var router = express.Router();
var comments = require('./model/comments');
var blog = require('./model/blog');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/getComments/', function(req, res, next) {
  comments.getComments(req,res);
});

router.post('/postComment', function(req, res, next) {
  comments.postComment(req,res);
});

router.post('/addAndGetViews', function(req, res, next) { 
  comments.addAndGetViews(req,res);
});

router.post('/createBlog',function(req,res){
   blog.createBlog(req,res);
})

router.post('/getBlog',function(req,res){
  blog.getBlog(req,res);
})

module.exports = router;
