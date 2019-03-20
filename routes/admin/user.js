var express = require('express')
var router = express.Router();
var app = new express(); /** 实例化*/
var DB = require('../../modules/sql.js')
var session = require('express-session');



router.get('/',(req,res)=>{
  res.send('users')
})






module.exports = router;