var loginInfo=Ti.App.Properties.getObject('loginInfo',false);
var args = arguments[0] || {};
var db=require('db').db;

var neEstate={
	estateList:[],
	init:function(){
		var estRecord=database.getEstate();
		if (estRecord)
			this.showEstate(estRecord);
	}
	,showEstate	: function (record) {
		for (var i in record){
		 	this.estateList.push(record[i]['estateno']);
			var result=Alloy.createController('neEstate/neEstateTmpl1', record[i]).getView();
			result.addEventListener('click',this.showEstateDetail);
			$.nePropMainView.add(result);
		}
	}
	,showEstateDetail:function(e){
		//console.log(e.source.estate);
			var obj={
				estateList:neEstate.estateList,
				record:e.source.estate
				
			};

			var detailWin=Alloy.createController('neEstate/neEstateDetail',obj).getView();
			
			
	}
};

var database ={
	init:function(){
		if(!propgroup)propgroup=this.getLastPropgroup();
		var property=this.getProperty(propgroup);
		if (property)
		reProp.showProp(property);
		//console.log(propgroup);
	}
	,getEstate:function(propgroup){
		var $sql='select p.* from estate as p where deletedate =0 ';
		var res=db.getObjResultSet($sql);
		return res||{};
	}
};
neEstate.init();
