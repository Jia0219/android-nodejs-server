var moment = require('moment');
var config = require('../config/config.js');
var timeout = 200;
var cluster = require('cluster');
var log4js = require('log4js');
var pointer = require('json-pointer'); 

var assert = require('assert');
var crypto = require('crypto');





exports.err = function(errMsg, callback) {
  //模拟一个错误的产生，让async各个函数末尾的callback接收到。
    timeout = timeout || 200;
    setTimeout(function() {
        callback(errMsg);
    }, timeout);
};

exports.log = function(ilevel,msg, obj) {


log4js.configure({
  "appenders": [
      {
          "type": "dateFile",
          "filename": "server.log",
          "pattern": "-from-MM-dd",
          //"maxLogSize": 20480,
          //"backups": 10,
          "category": "console",
          "layout": {
              "type": "messagePassThrough"
            }
      },
/*
    {
      "type": "file",
      "absolute": true,
      "filename": "/ivggs/logs/nodejs/server.log",
      "maxLogSize": 20480,
      "backups": 10,
      "category": "absolute-logger"          
    }
 */   
  ]
});


logger = log4js.getLogger("console");

    //对console.log进行了封装。添加时间的输出和日志级别的判断
    var level = {
        info:'info',  //
        debug:'debug', //
        Err:'error'
    };

    var workerinfo  = 'worker ' + process.pid +'> ';

    var infolevel;
    var tracelever = config.getTraceLevel();

    if(tracelever==''||tracelever==null){   //设置过全局变量则根据全局变量
        infolevel = ilevel;
    }
    if(tracelever=='error'){
        infolevel = ilevel; 
    }

    if(tracelever=='debug'){
        infolevel = 'debug'; 
    }

    if(tracelever=='info' && ilevel=='info'){
        infolevel = 'info';
    }

    if(tracelever=='info' && ilevel=='debug'){
        infolevel = '';
    }

    if(ilevel=='error'){
        infolevel = 'error';
    }


    
    //infolevel = ilevel;
    if(infolevel == level['info']){

            console.log(msg);
            logger.info(msg);
            
    }
    else if(infolevel == level['debug']){
            process.stdout.write(moment().format('YYYY-MM-DD hh:mm:ss.SSS')+'> ');
            process.stdout.write(workerinfo);
	       //process.stdout.write(moment().tz("asia/Shanghai").format('YYYY-MM-DD hh:mm:ss.SSS')+'> ');  //需要timezone包
            console.log(msg);

            logger.debug(workerinfo + msg);

            

    }
    else if(infolevel == level['Err'] ){
          process.stdout.write(moment().format('YYYY-MM-DD hh:mm:ss.SSS')+'> ');
          process.stdout.write(workerinfo);
           //process.stdout.write(moment().tz("asia/Shanghai").format('YYYY-MM-DD hh:mm:ss.SSS')+'> ');  //需要timezone包

            console.log('error! ' + msg);
            logger.error(workerinfo + msg);
            
    } 


};

exports.AESencrypt = function(key, String) {
  ////输入key和需要解密的字符串
    process.stdout.write(moment().format('YYYY-MM-DD hh:mm:ss.SSS')+'> ');
    //process.stdout.write(moment().tz("asia/Shanghai").format('YYYY-MM-DD hh:mm:ss.SSS')+'> ');  //需要timezone包

    if(String!==undefined) {
        var encrypted = AES.encrypt("Message", "Secret Passphrase");

console.log(encrypted.toString());
    } else {
        console.log(msg);
    }
};

exports.AESdecrypt = function(key, String) {
  //输入key和需要解密的字符串
    process.stdout.write(moment().format('YYYY-MM-DD hh:mm:ss.SSS')+'> ');
    //process.stdout.write(moment().tz("asia/Shanghai").format('YYYY-MM-DD hh:mm:ss.SSS')+'> ');  //需要timezone包

    if(obj!==undefined) {
        process.stdout.write(msg);
        console.log(obj);
    } else {
        console.log(msg);
    }
};

exports.wait = function(mils) {
  //刻意等待mils的时间，mils的单位是毫秒。
    var now = new Date;
    while(new Date - now <= mils);
}

exports.fire = function(obj, callback, timeout) {
  //直接将obj的内容返回给
    timeout = timeout || 200;
    setTimeout(
        function() {
        callback(null, obj);
    }
    , timeout);
};

exports.inc = function(n, callback, timeout) {
  //将参数n自增1之后的结果返回给async
    timeout = timeout || 200;
    setTimeout(function() {
        callback(null, n+1);
    }, timeout);
};


exports.jsonget = function(obj, objPointer) {
    return pointer.get(obj, objPointer);
}

exports.jsonset = function(obj, objPointer, value) {
    return pointer.set(obj, objPointer, value);
}

exports.jsonexist = function(obj, objPointer) {
    return pointer.has(obj, objPointer);
}

exports.jsonremove = function(obj, objPointer) {
    return pointer.remove(obj, objPointer);
}


exports.jsonadd = function(obj, objPointer, value) {
        return pointer.set(obj, objPointer, value);
}



exports.encrypt = function(param,callback) {
  var key = new Buffer(param.key);
  var iv = new Buffer(param.iv ? param.iv : 0)
  var plaintext = param.plaintext
  var alg = param.alg
  var autoPad = param.autoPad

  //encrypt
  var cipher = crypto.createCipheriv(alg, key, iv);
  cipher.setAutoPadding(autoPad)  //default true
  var ciph = cipher.update(plaintext, 'utf8', 'hex');
  ciph += cipher.final('hex');
  console.log(alg, ciph)

  callback(ciph);
}


exports.decrypt = function(param,callback) {
  var key = new Buffer(param.key);
  var iv = new Buffer(param.iv ? param.iv : 0)
  var plaintext = param.plaintext
  var alg = param.alg
  var autoPad = param.autoPad

  //decrypt
  var decipher = crypto.createDecipheriv(alg, key, iv);
  cipher.setAutoPadding(autoPad)
  var txt = decipher.update(ciph, 'hex', 'utf8');
  txt += decipher.final('utf8');
  callback(plaintext);
  //assert.equal(txt, plaintext, 'encryption and decryption with key and iv');
}

/*
test_des(
{
  alg: 'des-ecb',
  autoPad: true,
  key: '01234567',
  plaintext: '1234567812345678',
  iv: null
}
)

*/

