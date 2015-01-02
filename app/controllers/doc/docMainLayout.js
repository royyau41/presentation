
var getdoc=require('getData').doc;
var email=require('email').email;

var args = arguments[0] || {};
var win=args.win;



var doc={
	propertyList:[],
	init:function(){
		
		var docResult=getdoc.getList();
		
		if (docResult){
			this.showDoc(docResult);
			this.addEvent();
		}
	}
	,showDoc:function(record){
		
		var row=[];
		 for (var i in record){
		 	doc.propertyList.push(record[i].number);
		 	record[i]['win']=win;
		 	var result=Alloy.createController('doc/docTmpl2', record[i]).getView();
		 	$.docMainLayoutView.add(result);
			//row.push(result);
		}
		//$.docTable.setData(row);
		//console.log(row);
	}
	,addEvent:function(){
		
	}
};

doc.init();
