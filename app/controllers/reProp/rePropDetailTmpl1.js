var loginInfo=Ti.App.Properties.getObject('loginInfo',false);

var viewFile=require('viewFile').viewFile;
var getProp=require('getData').property;
var args = arguments[0] || {};
var win=args.win;

var rePropDetailTmpl1={
	titleView:null,
	detailView:null,
	init:function(){
		
		this.genPropItemView();
		this.setImage();
	}
	,genPropItemView:function(){
		var lang='c';
		
		var detail_item=getProp.getFieldList('propDetail',lang);
		var propdetail=getProp.getDetail(args.propertyno,args.propgroup);
		
		
		
		$.rePropDtlAddr.text=propdetail[lang+'_premises'];
		$.rePropDtlAddr.setWidth(pToD($.rePropDtlAddr.toImage().width)+10);
		$.rePropDtlAddr.setHeight(pToD($.rePropDtlAddr.toImage().height));
		
		var i=0;
		for (var loopItem =0 ; loopItem<1 ;loopItem++)
			for (var k in detail_item) {
					if (k.indexOf('empty') == -1){
						var itemView=Ti.UI.createView({
							layout:'horizontal',
							width:(detail_item[k]['width']||'40%'),
							height:Ti.UI.SIZE,
							bubbleParent:false,
							//widht:'100%',
							left:'10dp'
						});
	
						var item=Ti.UI.createLabel({
							text:Alloy.Globals.getfieldTitle(k),
							font:{fontSize:16},
							top:'10dp',		
							left:0,
							width:'80dp',
							color:'#176f5e'
						});
						var value=Ti.UI.createLabel({
							text:comjs.displayValue(detail_item[k],propdetail[detail_item[k].field],k),
							font:{fontSize:16},
							top:'10dp',			
							left:0,
							color:'#000'
						});
						
						if (Ti.App.deployType=='development'||Ti.App.deployType=='test'){
							
							comjs.changeColor(item,win);
							comjs.changeColor(value,win);
						}
						itemView.add(item);
						itemView.add(value);
						
						if (detail_item[k].tool){
							switch(detail_item[k].tool){
								case 'mortagageTool':
									var obj={
										win:win,
										price:propdetail[detail_item[k].field]*(detail_item[k].base||1)
									};
									var img=tools.mortagageTool(obj);
									itemView.add(img);
								break;
							}
						}
						
						$.rePropDtlInfoView.add(itemView);
				}else{
					var itemView=Ti.UI.createView({
							layout:'horizontal',
							width:'40%',
							height:Ti.UI.SIZE,
							//widht:'100%',
							left:'10dp'
						});
					var value=Ti.UI.createLabel({
							text:'',
							font:{fontSize:16},
							top:'10dp',			
							left:0,
							color:'#999'
						});
						itemView.add(value);
					$.rePropDtlInfoView.add(itemView);
				}
				i++;
			}
		//resize use
		//-----------------------add dummy View---------------------------//
		
		var dummyView=Ti.UI.createView({
							//layout:'horizontal',
							width:'100%',
							height:'20',
							//widht:'100%',
							left:'10dp'
						});
		$.rePropDtlInfoView.add(dummyView);
		//-----------------------add dummy View---------------------------//
		//$.rePropDtlInfoView.setHeight($.rePropDtlInfoView.toImage().height+20+'dp');	
	}
	,setImage:function(){
		
		var propImage =getProp.getImage(args.propertyno,args.propgroup);
		$.rePropDtlScrollImgView.setHeight(((Alloy.Globals.DisplayHeight-Alloy.Globals.titleHeight-20)*0.45));
		if (propImage){
			
			var imageHeight=((Alloy.Globals.DisplayHeight-Alloy.Globals.titleHeight-20)*0.4);
			for (var i=0 ;i<(propImage.length);i++){
				
				var smallImageItemView=Ti.UI.createView({
					width:((Alloy.Globals.DisplayHeight-20)*0.38)+'dp',
					height:imageHeight+10+'dp',
					left:'20dp',
					top:'8dp',
					left:'10dp',
				
				});
				if (propImage[i]){
					var image=Ti.UI.createImageView({
							image:Ti.Utils.base64decode(propImage[i].image),
							//width:((Alloy.Globals.DisplayHeight-20)*0.37)+'dp',
							//height:imageHeight+'dp',
							focusable:true
						});
					image.addEventListener('click',function(e){
						viewFile('img',e.source.image);
					});
					smallImageItemView.add(image);
					
					
				}
				$.rePropDtlScrollImgView.add(smallImageItemView);
	
			}
		}
		
	}	
};

rePropDetailTmpl1.init();
