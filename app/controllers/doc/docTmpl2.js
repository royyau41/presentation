var args = arguments[0] || {};

var getdoc=require('getData').doc;
var viewFile=require('viewFile').viewFile;
var win=args.win;
var pToD=comjs.PixelsToDPUnits;


$.docTmpl2Title.text = args.c_subject || '';


var lang='c';
//var detail_item=comjs.getDetailField('propSearch',lang);
var detail_item={};

var i=0;



var  setDocFile=function(){
			
				var filetype=args['filename'].split('.');
				filetype=filetype[filetype.length-1];
				var containView=Ti.UI.createView({
					width:'260dp',
					height:'220dp',
					//left:'20dp',
					
				});
				
				//var fileName =i+'.pdf';
				var itemView=viewFile(filetype,args,true,{fileName:args['filename']});
				containView.add(itemView);
				
				$.docTmpl2Image.add(containView);
			
	};
setDocFile();
var dummyView=Ti.UI.createView({
			width:'100%',
			height:20
		});
		//$.docTmpl1MainDetailView.add(dummyView);
if (OS_ANDROID){
}
if (OS_IOS){
}