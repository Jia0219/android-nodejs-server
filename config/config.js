

var request = "";  //业务数据 json对象
var tracelever ="debug"; //全局的日志级别
var db_config = {
  host: '192.168.20.83',
  user: 'root',
  password: 'root',
  database: 'jira'
};

var ASECrypt = {
	SecretPassphrase:'password',
	Salt:'salt',
	iv:'vector'
}

function getTraceLevel(){
	return tracelever;
}

function getDBConfig(){
	return db_config;
}
function getASECrypt(){
	return ASECrypt;
}


exports.getTraceLevel = getTraceLevel;
exports.getDBConfig = getDBConfig;
exports.getASECrypt = getASECrypt;