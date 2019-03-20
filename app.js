const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const static = require('koa-static');
const path = require('path')

const bodyparser = require('koa-bodyparser');
app.use(bodyparser());
var api = require('./server/server.js');

const template = require('koa-art-template');
var router = require('./routes/index')

template(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
 

app.use(static('upload'))
app.use(static('public'))


app.use(static(
  path.join(__dirname,'public/upload')
))

 
 


// router.use(router.routes(),router.allowedMethods())
app.use(router.routes(),router.allowedMethods())
app.use(api.servers.routes(),api.servers.allowedMethods())


app.use(views(__dirname + '/views', {
  extension: 'html'
}))



app.listen(8003,function(){
 
})




