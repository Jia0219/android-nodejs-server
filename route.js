var util = require('./util/util.js');
var requestHandlers = require("./requestHandlers.js");

function route(pathname,questquery,response, request) {
  util.log('info',"About to route a request for " + pathname);

  var handle = {}
  handle["/"] = requestHandlers.none;

  handle["/other"] = requestHandlers.other;
  handle["/upload"] = requestHandlers.upload;
  handle["/download"] = requestHandlers.download;
  handle["/login"] = requestHandlers.dologin;
  handle["/connect"] = requestHandlers.connect;
  handle["/errhandle"] = requestHandlers.errhandle;
  handle["/getWHSetting"] = requestHandlers.getWHSettingHandle
  handle["/getWHEmptyDate"] = requestHandlers.getWHEmptyDateHandle
  handle["/getCalendar"] = requestHandlers.getCalendarHandle
  handle["/getWHDetailList"] = requestHandlers.getWHDetailListHandle
  handle["/getAccessRecord"] = requestHandlers.getAccessRecordHandle
  handle["/insertAccessRecord"] = requestHandlers.insertAccessRecordHandle
  handle["/getTotalPJTime"] = requestHandlers.getTotalPJTimeHandle
  handle["/getTotalOVTime"] = requestHandlers.getTotalOVTimeHandle
  handle["/getTotalVCTime"] = requestHandlers.getTotalVCTimeHandle
  handle["/getTotalPJTime"] = requestHandlers.getTotalPJTimeHandle
  handle["/getAvailPJ"] = requestHandlers.getAvailPJHandle
  handle["/OVSubmit"] = requestHandlers.SubmitOVInfoHandle
  handle["/VCSubmit"] = requestHandlers.SubmitVCInfoHandle
  handle["/getVCSetting"] = requestHandlers.getVCSettingHandle
  handle["/getLieuVCTime"] = requestHandlers.getLieuVCTimeHandle
  handle["/getPaidVCTime"] = requestHandlers.getPaidVCTimeHandle
  handle["/DeleteOVInfo"] = requestHandlers.DeleteOVInfoHandle
  handle["/DeleteVCInfo"] = requestHandlers.DeleteVCInfoHandle



  //handle["/update"] = requestHandlers.update;
  //handle["/select"] = requestHandlers.select;
  //handle["/asyncselect"] = requestHandlers.asyncselect;

  if (typeof handle[pathname] === 'function') {
    handle[pathname](questquery,response, request,function(err) {
      if (err) {
        throw err;
      }
    }

    );
  } else {

    err = {
      'errno':'404',
    'errmsg': 'Page not found'
    };
    util.log('info',"No request handler found for " + pathname);
    util.jsonadd(questquery,'/errno',util.jsonget(err,'/errno'));
    util.jsonadd(questquery,'/errmsg',util.jsonget(err,'/errmsg'));
    util.jsonadd(questquery,'/module',null);
    requestHandlers.feedback(questquery,response,request);
    util.log('info','end of response');
  }
}

exports.route = route;