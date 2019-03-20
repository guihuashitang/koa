const Koa = require('koa');
const Router = require('koa-router');
const qs = require('qs');
const assert = require('assert');

const SQL = require('../modules/sql');

const app = new Koa();
const servers = new Router();



servers.get('/api/getProduvtList',async(ctx,next)=>{
  await next();
  let result = {
    success: true,
    status: 1,
    data: null,
  }

  result.data = await SQL.mySql('SELECT * FROM productlist',[])
  console.log(result.data)
  ctx.body = result
})


module.exports = {
  servers
}
