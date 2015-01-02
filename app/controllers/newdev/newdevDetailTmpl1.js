var loginInfo=Ti.App.Properties.getObject('loginInfo',false);
var db=require('db').db;
var viewFile=require('viewFile').viewFile;
var args = arguments[0] || {};


var newdevDetailTmpl1={
	titleView:null,
	detailView:null,
	init:function(){
		
		this.genPropItemView();
		this.setImage();
	}
	,genPropItemView:function(){
		var lang='c';
		var propdetail=database.getPropInfo(args.newdevNo);
		
		
		
		$.newdevDtlAddr.text=propdetail['chinesename'];
		$.newdevDtlAddr.setWidth(pToD($.newdevDtlAddr.toImage().width)+10);
		
		
		var i=0;
		

	}
	,setImage:function(){
		
		var newdevImage =database.getImage(args.newdevNo);
				
		
		
		//$.newdevDtlScrollImgView.setHeight(((Alloy.Globals.DisplayHeight-Alloy.Globals.titleHeight-20)*0.45));
		if (newdevImage){
			
			var imageHeight=((Alloy.Globals.DisplayHeight-Alloy.Globals.titleHeight-20)*0.7);
			//var imageHeight=($.newdevDtlScrollImgView.toImage().height)*0.5;
			
			for (var i=0 ;i<(newdevImage.length);i++){
				var filetype=newdevImage[i]['filename'].split('.');
				filetype=filetype[filetype.length-1];

				
				var smallImageItemView=Ti.UI.createView({
					width:((Alloy.Globals.DisplayHeight-20)*0.58)+'dp',
					height:imageHeight+10,
					left:'20dp',
					top:'8dp',
					left:'10dp'				
				});
				
				var fileName =i+'.pdf';
						var content=viewFile(filetype,newdevImage[i],true,{fileName:fileName});
				smallImageItemView.add(content);
			
				
				$.newdevDtlScrollImgView.add(smallImageItemView);
	
			}

		}
		
		
	}
	
};

var database={
	getPropInfo:function(number){
		var $sql='select * from newdev where number='+number;
		var res=db.getObjResultSet($sql);
		return res[0]||{};

	}
	,getImage:function(number,propgroup){
		var $sql='select attachment,filename from newdevfile where  '+ 
				'newdevelopmentno='+number;
				//' and deletedate =0 ';
		var res=db.getObjResultSet($sql);
		return res||{};
		
		
	}
};
newdevDetailTmpl1.init();
