var loginInfo=Ti.App.Properties.getObject('loginInfo',false);
var db=require('db').db;
var args = arguments[0] || {};
var viewFile=require('viewFile').viewFile;

var neEstateDetailTmpl1={
	titleView:null,
	detailView:null,
	init:function(){
		
		this.genEstateItemView();
		this.setImage();
	}
	,genEstateItemView:function(){
		var lang='c';
		var detail_item={
			'developer':lang+'_developer1',
			'remarks':lang+'_remarks'
			
		};
		var estatedetail=database.getEstateInfo(args.estateno);
		//var propdetail=this.setTmplData();
		$.neEstateDtlAddr.text=estatedetail.chinesename;
		var i=0;
		for (var loopItem =0 ; loopItem<1 ;loopItem++)
			for (var k in detail_item) {
					if (eval('Alloy.Globals.'+k+'[lang]')){
						var itemView=Ti.UI.createView({
							layout:'horizontal',
							height:Ti.UI.SIZE,
							//widht:'100%',
							//left:10
						});
	
						var item=Ti.UI.createLabel({
							text:eval('Alloy.Globals.'+k+'[lang]')+(estatedetail[detail_item[k]]||''),
							font:{fontSize:14},		
							left:0,
							height:20,
							color:'#000'
						});
						
						itemView.add(item);
						$.neEstateDtlItem.add(itemView);
				}
				i++;
			}
		//resize use
		$.neEstateDtlInfoView.setHeight($.neEstateDtlInfoView.toImage().height+10);
	}
	,setImage:function(){
		
		var estateImage =database.getImage(args.estateno);
		if (estateImage.length){
			$.neEstateDtlBigImg.image=Ti.Utils.base64decode(estateImage[0]['image']);
			$.neEstateDtlBigImg.addEventListener('click',function(e){
						viewFile('img',e.source.image);
					});
			
			var viewWidth=(Alloy.Globals.DisplayWidth*0.28)/2+'dp';
			//console.log(viewWidth);
		for (var i=0 ;i<(estateImage.length);i++){
			var smallImageItemView=Ti.UI.createView({
				width:viewWidth,
				height:Ti.UI.SIZE,
				top:8
			});
			if (estateImage[i]){
				var image_left=Ti.UI.createImageView({
						left:10,
						image:Ti.Utils.base64decode(estateImage[i].image),
						widht:'100dp',
						height:'100dp'
					});
				smallImageItemView.add(image_left);
				image_left.addEventListener('click',function(e){
					$.neEstateDtlBigImg.image =e.source.image;
				});
			}
			$.neEstateDtlScrSmlImg.add(smallImageItemView);

		}
		//reset neEstateDtlImage Height
		$.neEstateDtlImage.setHeight('440dp');
		}
		
	}
	,setTmplData:function(){
		var data={
			rent:123123,
			price:12123123,
			c_premises:'testest',
			RECDATE:'1230/9',
			PROP_DEVELOPER:'集團'
			
		};
		return data;
	}
};

var database={
	getEstateInfo:function(estateno){
		var $sql='select * from estate where estateno='+estateno +' and deletedate=0';
		var res=db.getObjResultSet($sql);
		return res[0]||{};

	}
	,getImage:function(estateno){
		var $sql='select attachment as image from estatefile where '+ 
		'estateno='+estateno+' '+
		'and attachment is not null ';
		
		var res=db.getObjResultSet($sql);
		return res||{};
		
		
	}
};
neEstateDetailTmpl1.init();
