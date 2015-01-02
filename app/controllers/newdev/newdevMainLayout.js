
var args = arguments[0] || {};
var win=args.win;

var db=require('db').db;


var newdev={
	newdevList:[],
	init:function(){
		var newRecord=database.getNewDev();
		if (newRecord)
			this.showNewDev(newRecord);
	}
	,showNewDev	: function (record) {
		for (var i in record){
		 	this.newdevList.push(record[i]['number']);
		 	record[i]['win']=win;
			var result=Alloy.createController('newdev/newdevTmpl1', record[i]).getView();
			result.addEventListener('click',this.showNewDevDetail);
			$.newdevMainView.add(result);
		}
	}
	,showNewDevDetail:function(e){
		//console.log(e.source.estate);
			var obj={
				newdevList:newdev.newdevList,
				record:e.source.number
				
			};

			var detailWin=comjs.getLoadingView('newdev/newdevDetail',obj);
			//var detailWin=Alloy.createController('newdev/newdevDetail',obj).getView();
			
			//detailWin.open({animated : true});
	}
};

var database ={
	getNewDev:function(propgroup){
		var $sql='select p.* from newdev as p where deletedate =0 '; 
		//where deletedate =0 ';
		var res=db.getObjResultSet($sql);
		return res||{};
	}
};
newdev.init();
