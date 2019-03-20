
var Router = require('koa-router');
const router = new Router();

var md5 = require("md5-node")
var session = require('koa-session');


var SQL = require('../../modules/sql.js')

//登录
router.get('/',async(ctx,next)=>{

  await next()
  await ctx.render('admin/login')

})




// //登录
router.post('/dologin',async(ctx,next)=>{
  await next()
  console.log('dologin',ctx.request.body)

  let sql = 'SELECT * FROM users WHERE username=? AND password=?'

  let results = await SQL.mySql(sql,[ctx.request.body.username,ctx.request.body.password])
  console.log(results)
  session.userinfo = results[0]


  ctx.redirect('/product'); 

})



module.exports = router;