var args = arguments[0] || {};

var getProp=require('getData').property;
var win=args.win;

var pToD=comjs.PixelsToDPUnits;

$.reTableRow.propgroup=args.propgroupno;
$.reTableRow.record=args.number;
$.reTableRow.propertyid=args.id;

if (args.attachment){
$.rePropTmpl1Image.image=Ti.Utils.base64decode(args.attachment);
}
//init 
$.rePropTmpl1Addr.text = args[ Ti.App.Properties.getString('lang','c')+'_premises'] || '';
$.rePropTmpl1Order.text=args.order;
$.rePropTmpl1BestSale.backgroundImage="/temp/"+Alloy.Globals.langIso+"/hot.png";



if (Ti.App.deployType=='development'||Ti.App.deployType=='test'){
							
							comjs.changeColor($.rePropTmpl1Addr,win);
						//	comjs.changeColor(item,win);
						}



$.reTableRow.addEventListener('click',function(){
	getProp.updateRead(' id='+args.id);
	$.reNewpic.hide();
});



if (args.read==1||args.read=='1'){
	
	$.reNewpic.setVisible(false);
}else {
	$.reNewpic.setVisible(true);
	//$.reNewpic.show();
}

var detail_item=getProp.getFieldList('propSearch' );


var i=0;
//$.rePropTmpl1Image.image='/temp/smallPropImg.jpeg';


		for (var k in detail_item) {
				/*****
				 * Detail Item Layout like:
				 * <View>
				 * 	<Label></Label>
				 * </View>
				 * *****/
				
				if (Alloy.Globals.getfieldTitle(k)){
					var itemView=Ti.UI.createView({
						layout:'horizontal',
						height:Ti.UI.SIZE,
						width:(detail_item[k].width||'35%'),
						top:10,
						left:30
					});
					
					var title=Ti.UI.createLabel({
							text:Alloy.Globals.getfieldTitle(k),
							font:{fontSize:18},
							//top:'10dp',		
							left:0,
							width:Alloy.Globals.getfieldTitle(k,'Width')||'90dp',
							
							color:'#000'
						});
					var item=Ti.UI.createLabel({
						text:comjs.displayValue(detail_item[k],args[detail_item[k].field]),
						//text:(detail_item[k].fieldType=='number')?(comjs.addCommas(args[detail_item[k].field]*(detail_item[k].base||1))||'--'):(args[detail_item[k].field]||'--'),
						font:{fontSize:18,fontWeight:'bold'},		
						left:0,
						//height:'20',
						color:'#151ba5'
					});
					if (Ti.App.deployType=='development'||Ti.App.deployType=='test'){
							
							comjs.changeColor(title,win);
							comjs.changeColor(item,win);
						}
						
					
					itemView.add(title);
					itemView.add(item);
					$.rePropTmpl1SubDetailView.add(itemView);
			}
			i++;
		}
		
		
		
		var dummyView=Ti.UI.createView({
			width:'100%',
			height:40
		});
		$.rePropTmpl1SubDetailView.add(dummyView);
		//var row_height=($.rePropTmpl1MainDetailView.toImage().height>$.rePropImageView.toImage().height)?$.rePropTmpl1MainDetailView.toImage().height:$.rePropImageView.toImage().height;
		//row_height=$.rePropTmpl1SubDetailView.toImage().height;
		//$.rePropTmpl1RowView.height=pToD(row_height);
		//$.rePropTmpl1RowView.height=10;
if (OS_ANDROID){
			//console.log($.rePropTmpl1RowView.toImage().height);
}
if (OS_IOS){
	
	$.reTableRow.height=$.reTableRow.toImage().height+20;
	$.rePropTmpl1RowView.height=$.rePropTmpl1RowView.toImage().height+20;
}