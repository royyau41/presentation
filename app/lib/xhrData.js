var XMLTools = require("XMLTools");
var utf8 = require('utf8');

var xhrData = {
	testuse:function(){
		var od={
			LOCALJOBNO:'',
			PROGRAMNO:'',
			COMPANYCODE:'',
			VERSIONNO:'',
			JOBTYPE:201,
			CUSTOMERNAME:''
			
		};
		this.request(
			{
				success:function(e){
					console.log(e);
					
						
				}
				,error:function(e){
					console.log(e);
				} 
			
		},{},od);
	},
	xmlFormat:function(data){
		var header='<?xml version="1.0" encoding="utf-8"?>'+
			'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"xmlns:xsd="http://www.w3.org/2001/XMLSchema"xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
			'<soap:Body>'+
			'<data>'+
			'<group>';
			
		var elmXml=this.objToXml(data);
		var  footer='</group>'+
					'</data>'+
					'</soap:Body>'+
					'</soap:Envelope>';
		return header+elmXml+footer;

	}
	,request:function(o, data,xml,tries,testUse) {
		
		var url=(data.ip)?'http://'+data.ip+'/getinfo':'http://astbsl.com.hk:88/getinfo';

		var xhr = Titanium.Network.createHTTPClient({
			timeout:60000
		});
		
		data=data||{};
		tries = tries || 0;
		xhr.ondatastream = function(e)
			{
				Alloy.Globals.Loading.value=e.progress;	
				//var kb = Math.round(e.progress * c.getResponseHeader('Content-Length')/1024);
				
			};
		
		xhr.open('POST', url);
		xhr.onload = function(e) {
			
			
			 Ti.API.info( this.getResponseHeader('Content-Length') );
			var i=0;
			var xmldata=this.responseXML;
			
		
			
			xmldata = new XMLTools(xmldata).toJSON();
			
			//xmldata=utf8.decode(xmldata);
			
			xmldata=JSON.parse(xmldata);
			
			xmldata=xmldata['soap:Body'].data.group;
			
			if (o.success) { o.success(xmldata); }
			else {
				Alloy.Globals.Loading.hide();
			}
			
			
		};
		xhr.onerror = function(e) {
			Alloy.Globals.LoadingShow('下載失敗，請重新下載');
			if (o.error) { o.error(e); }
		};
	
		if (o.start) { o.start(); }
		xhr.setRequestHeader('Content-Type', 'text/xml');
		
		if (typeof xml=='object'){
			
			xml=this.xmlFormat(xml);
		}
		xhr.send(xml);
		
	}
	,objToXml:function(obj){
		var str='';
		for (var k in obj){
			str+='<'+k+'>'+obj[k]+'</'+k+'>';
		}
		return str;
	}
};




exports.xhrData=xhrData;