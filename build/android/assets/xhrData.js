var XMLTools=require("XMLTools"),utf8=require("utf8"),xhrData={testuse:function(){var e={LOCALJOBNO:"",PROGRAMNO:"",COMPANYCODE:"",VERSIONNO:"",JOBTYPE:201,CUSTOMERNAME:""};this.request({success:function(e){console.log(e)},error:function(e){console.log(e)}},{},e)},xmlFormat:function(e){var t='<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"xmlns:xsd="http://www.w3.org/2001/XMLSchema"xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><data><group>',i=this.objToXml(e),r="</group></data></soap:Body></soap:Envelope>";return t+i+r},request:function(e,t,i,r){Alloy.Globals.Loading.show();var o=t.ip?"http://"+t.ip+"/getinfo":"http://astbsl.com.hk:88/getinfo",a=Titanium.Network.createHTTPClient({timeout:6e4});t=t||{},r=r||0,a.ondatastream=function(e){Alloy.Globals.Loading.value=e.progress},a.open("POST",o),a.onload=function(){var t=this.responseXML;t=new XMLTools(t).toJSON(),t=JSON.parse(t),t=t["soap:Body"].data.group,e.success?e.success(t):Alloy.Globals.Loading.hide()},a.onerror=function(t){Alloy.Globals.LoadingShow("下載失敗，請重新下載"),e.error&&e.error(t)},e.start&&e.start(),a.setRequestHeader("Content-Type","text/xml"),"object"==typeof i&&(i=this.xmlFormat(i)),a.send(i)},objToXml:function(e){var t="";for(var i in e)t+="<"+i+">"+e[i]+"</"+i+">";return t}};exports.xhrData=xhrData;