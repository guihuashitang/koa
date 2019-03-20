//mysql数据库
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'product'
});

function _connectDb(sql,data,callback) {
  
	connection = mysql.createConnection(connection.config);

  connection.connect();
  connection.query(sql,data,function(error, results, fields){
    if(error){
      console.log('sql失败',error);
      return;
    }
    
    callback(results, fields)
   
  })
  connection.end()

}
  
function _connectSqlOne(sql,callback) {
  connection = mysql.createConnection(connection.config);
  connection.connect();
  connection.query(sql,function(error, results, fields){
    if(error){
      console.log('sqlOne失败',error);
      return;
    }
    if(callback){
      callback(results, fields)
    }

   

  })
  connection.end()

}


var mySql = ( sql , params )=>{
  return new Promise(function(resolve,reject){

    connection = mysql.createConnection(connection.config);
    connection.connect();
    connection.query(sql,params,function(error, results){
      if(error){
        reject(error);

        return;
      }
      resolve(results);
  
    })
    connection.end()
  })
}

module.exports = {
  mySql,
  _connectDb,
  _connectSqlOne
}

