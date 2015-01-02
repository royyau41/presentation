var args = arguments[0] || {};

var getdoc=require('getData').doc;
var viewFile=require('viewFile').viewFile;
var win=args.win;
var pToD=comjs.PixelsToDPUnits;


$.docTmpl1Title.text = args.chinesename || '';
if (Ti.App.deployType=='development'||Ti.App.deployType=='test'){	
							comjs.changeColor($.docTmpl1Title,win);
						}

var lang='c';
//var detail_item=comjs.getDetailField('propSearch',lang);
var detail_item={};

var i=0;
setDocFile();
$.docTmpl1MainDetailView.addEventListener('click',function(e){
	var slide = Ti.UI.createAnimation({
		    height: 250,
		    duration : 150
		   });

	if ($.docListDocument.height==0){
		setDocFile();
		
		$.docListDocument.height=300;
	}
	else{ 
		$.docListDocument.height=0;
	}
		  
	
});


function setDocFile(){
		if ($.docListDocument.children.length==0){
			
			var itemResult=getdoc.getDocument(args.number);
			
			if (itemResult){
				for (var i=0 ;i<(itemResult.length);i++){

				var filetype=itemResult[i]['filename'].split('.');
				filetype=filetype[filetype.length-1];
				var containView=Ti.UI.createView({
					width:'270',
					height:'260',
					left:'20dp',
					top:'8dp',
					layout:'vertical'
				});
				
				var filenameLabel=Ti.UI.createLabel({
					text:itemResult[i].c_subject
				});
				containView.add(filenameLabel);
				var smallItemView=Ti.UI.createView({
						width:'240',
						height:'240',
						//layout:'vertical'
					});
				containView.add(smallItemView);
				
				var fileName =i+'.pdf';
				var itemView=viewFile(filetype,itemResult[i],true,{fileName:fileName});
				smallItemView.add(itemView);
				
				$.docListDocument.add(containView);
			}
		}
		
	}
}
var dummyView=Ti.UI.createView({
			width:'100%',
			height:20
		});
		$.docTmpl1MainDetailView.add(dummyView);
if (OS_ANDROID){
		
	//$.rePropTmpl1RowView.height=(pToD($.rePropTmpl1RowView.toImage().height));
}
if (OS_IOS){
	
	//$.docTableRow.height=$.docTableRow.toImage().height+20;
	//$.docTmpl1RowView.height=$.docTmpl1RowView.toImage().height+20;
}