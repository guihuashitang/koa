var Router = require('koa-router');
const router = new Router();
var fs = require("fs")

// const render = require('koa-views-render');

var session = require('express-session');
//图片上传
var multiparty = require('multiparty');


var SQL = require('../../modules/sql.js')



////商品
router.get('/',async (ctx,next)=>{
  next();

  let sql = 'SELECT * FROM productlist'

  let list = await SQL.mySql(sql,[])

  ctx.render('admin/product/index',{list})

})


//编辑商品
router.get('/productedit',async(ctx,next)=>{
  await next()

  var id = ctx.query.id;
  console.log(id)
  let sql = 'SELECT * FROM productlist WHERE _id=?'

  let results = await SQL.mySql(sql,[id])
  console.log(results)
  ctx.render('admin/product/productedit',{data: results[0]})
  
})

router.post('/doEdit',async(ctx,next)=>{
  await next()
  console.log('ctx',ctx)
  let mainCtx = ctx
  var form = new multiparty.Form()
  form.uploadDir = 'upload'

  await form.parse(ctx.req,function(err,fields,files){

    console.log(fields) //获取表单数据

    console.log(files) //图片上传成功


    let _id = fields._id[0]
    let title = fields.title[0]
    let price = fields.price[0]
    let fee = fields.fee[0]
    let description = fields.description[0]
    let pic = files.pic[0].path;

    var originalFilename = files.pic[0].originalFilename
    if(originalFilename){
      var sql = 'UPDATE productlist SET title=?,price=?,fee=?,description=?,pic=? WHERE _id=?'
      var data = [ 
        title,
        price,
        fee,
        description,
        pic,
        _id]
    }else{
      fs.unlink(pic,(err)=>{
        if(err){
          throw err;
        }
        console.log('文件:'+pic+'删除成功！');
      })
      var sql = 'UPDATE productlist SET title=?,price=?,fee=?,description=? WHERE _id=?'
      var data = [
        title,
        price,
        fee,
        description,
        _id]
    }

    
    
    SQL.mySql(sql,data).then(res=>{
      // console.log('跳  ')
     

    })
    // SQL._connectDb(sql,data,function(results, fields){
      
    //   ctx.redirect('/product')

    // })



  })
  await mainCtx.redirect('/product')

})



router.get('/productadd',async(ctx,next)=>{
  await next()
  ctx.render('admin/product/productadd')
})

router.post('/doProductAdd',async(ctx,next)=>{
  await next()
  var form = new multiparty.Form()
  form.uploadDir = 'upload'
  
  await form.parse(ctx.req,function(err,fields,files){

    let title = fields.title[0]
    let price = fields.price[0]
    let fee = fields.fee[0]
    let description = fields.description[0]
    let pic = files.pic[0].path

    // console.log(fields) //获取表单数据

    // console.log(files) //图片上传成功

     var maxId = 'select max(_id) from productlist '

     SQL._connectSqlOne(maxId,function(results, fields){


      var nowId = results[0]['max(_id)']*1+1;

      var sql = 'INSERT INTO productlist(title,price,fee,description,pic,_id) VALUES (?,?,?,?,?,?)'
      var data = [title,price,fee,description,pic,nowId]

      SQL.mySql(sql,data)


     })


  })

  await ctx.redirect('/product')
})


 //z增加商品
router.get('/productDel',async(ctx,next)=>{
  await next()
  var sql = 'DELETE FROM productlist WHERE _id=?'
  var id = ctx.query.id;
  await SQL.mySql(sql,[id])
  await ctx.redirect('/product')
  // SQL._connectDb(sql,[id],function(results, fields){
  //   ctx.redirect('/admin/product')
  // })
})








module.exports = router;