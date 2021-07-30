var express = require('express');
var axios =require ('axios');
var qs = require("query-string");
var router = express.Router();
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
const url = 'http://20.67.43.111:9011/oauth2/token'

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.redirect("http://20.67.43.111:9011/oauth2/authorize?client_id=e3d732ee-4ed7-409d-b472-06fbc328e3c9&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Foauth-callback")
  res
});
router.get('/oauth-callback',(req,res,next)=>{
  console.log(req.query.code)
  axios.post(url,
    qs.stringify({
      client_id: 'e3d732ee-4ed7-409d-b472-06fbc328e3c9',
      client_secret: 'EkYVZAX4dhQVkXxQdgvGicE6KOOkBwTMkXjDSTWK9CE',
      code: req.query.code,
      grant_type: "authorization_code",
      redirect_uri: 'http://localhost:9000/oauth-callback'
    }),
    config).then((result)=>{
      console.log(result)
    })
  res.render('index')
});
module.exports = router;
