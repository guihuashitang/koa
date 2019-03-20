const Koa = require('koa');
const app = new Koa();
// var render = require('koa-views-render')
const Router = require('koa-router');
const router = new Router()

// const render = require('koa-art-template');
// render(app, {
//   root: path.join(__dirname, 'view'),
//   extname: '.html',
//   debug: process.env.NODE_ENV !== 'production'
// });
 

// var session = require('koa-session');

var login = require('./admin/login.js');
var product = require('./admin/product.js');
var user = require('./admin/user.js');


router.use('/login',login.routes(),login.allowedMethods())
router.use('/product',product.routes(),product.allowedMethods())
// router.use('/user',user.routes(),user.allowedMethods())



module.exports = router




//登录
// router.get('/',async(ctx,next)=>{

//   await ctx.render('admin/login');
//   await next();
// })



// // //登录
// router.post('/dologin',async(ctx)=>{
//   console.log('dologin',ctx.body)

//   // let sql = 'SELECT * FROM users WHERE username= ? AND password= ?'

//   // SQL._connectDb(sql,[req.body.username,req.body.password],function(results, fields){
//   //   console.log(results[0])
//   //   session.userinfo = results[0]

//   //   res.redirect('/admin/product'); 
//   // })

// })
