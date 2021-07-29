var express = require('express');
var uuid = require ('uuid')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/authenticate',function(req,resp,next){
  resp.json({
    user:{
      username:"mcapdevila@demo123.com",
      email:"fakemail@demoversion.com",
      id:uuid.v4()}
    }).statusCode(200)
})
module.exports = router;
