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
  res.redirect("http://20.67.43.111:9011/oauth2/authorize?client_id=e3d732ee-4ed7-409d-b472-06fbc328e3c9&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foauth-callback")
});
router.get('/oauth-callback',(req,res,next)=>{
  console.log(req.query.code)
  try {
    axios.post(url,
      qs.stringify({
        client_id: 'e3d732ee-4ed7-409d-b472-06fbc328e3c9',
        client_secret: 'EkYVZAX4dhQVkXxQdgvGicE6KOOkBwTMkXjDSTWK9CE',
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: 'http://localhost:8000/oauth-callback'
      }),
      config).then((result_post)=>{
        console.log('El resultado de Axios es: ',result_post.data.access_tokes)
        axios.get("http://20.67.43.111:9011/api/jwt/refresh",{
          headers: {
            'Authorization': result_post.data.token_type + ' ' +result_post.data.access_token
          }
        }).then((result)=>{
          let token_refresh = result.data.refreshTokens.pop();
          console.log(token_refresh)
          res.render('index',{
            title:'La Vaca Paca',
            access_token:result_post.data.access_token,
            refresh_token: token_refresh.token
        })
        })
      })
    
  } catch (error) {
    console.log(error)
  }
});
router.get('/logout',(req,res,next)=>{
  res.redirect("http://20.67.43.111:9011/oauth2/logout?client_id=e3d732ee-4ed7-409d-b472-06fbc328e3c9")
})
router.get('/sso-login', (req,res,next)=>{
  res.redirect('/')
})
module.exports = router;
