var express = require('express');
var router = express.Router();
var comments = require('./model/comments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/getComments/:id', function(req, res, next) {
  comments.getComments(req,res);
});

router.post('/postComment', function(req, res, next) {
  comments.postComment(req,res);
});

router.post('/addAndGetViews', function(req, res, next) {
 
  comments.addAndGetViews(req,res);
});
 
module.exports = router;
