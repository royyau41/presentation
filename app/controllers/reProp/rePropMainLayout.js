loginInfo=Ti.App.Properties.getObject('loginInfo',false);
var db=require('db').db;
var getPropGroup=require('getData').propGroup;
var getProp=require('getData').property;
var email=require('email').email;
var propgroup=Ti.App.Properties.getInt('propgroup',0);
var propPage=Ti.App.Properties.getInt('propPage',1);
var args = arguments[0] || {};
var win=args.win;
var bottomBar=new funcBar('property');

var selectedColor='blue';

var botBar=false;

var reProp={
	emailProp:[],
	propertyList:[],
	init:function(){
		bottomBar.setCencelEvent(cancelSet);
		this.setLangTitle();
		this.addEvent();

		if(!propgroup)propgroup=getPropGroup.getLastPropgroupNo();
			var property=getProp.getList(propgroup);
		if (property){
			this.showProp(property);
		}
			
			
		var btmView=bottomBar.getBtmView();
		$.rePropMainLayoutView.add(btmView);
		this.setSortSearchOption();

	}
	,setLangTitle:function(){
		$.rePropSearchAddr.text=s('addr');
		$.rePropSearchPrice.text=s('price');
		$.rePropSearchRent.text=s('rent');
		$.rePropSearchNarea.text=s('narea');
		$.addrValue.test=s('orderasc');
		$.priceValue.test=s('orderasc');
		$.rentValue.test=s('orderasc');
		$.nareaValue.test=s('orderasc');
	}
	,showProp:function(record){
		
		var row=[];
		var index=0;
		 for (var i in record){
		 	index++;
		 	var length=record.length;
		 	
		 	reProp.propertyList.push(record[i].number);
		 	record[i]['order']=(index)+'/'+length;
		 	record[i]['win']=win;
		 	var result=Alloy.createController('reProp/rePropTmpl1', record[i]).getView();
			row.push(result);
		}
		$.rePropTmpl1Table.setData(row);
		//console.log('test213');
	}
	,setSortSearchOption:function(){
		
		var t=this;
		$.priceSelImg.addEventListener('click',orderDialog);
		$.nareaSelImg.addEventListener('click',orderDialog);
		$.rentSelImg.addEventListener('click',orderDialog);
		$.addrSelImg.addEventListener('click',orderDialog);
		
		$.priceValue.addEventListener('click',orderDialog);
		$.nareaValue.addEventListener('click',orderDialog);
		$.rentValue.addEventListener('click',orderDialog);
		$.addrValue.addEventListener('click',orderDialog);
		
		
		$.submitBtn.addEventListener('click',function(e){
			var orderClause=[];
			if ($.priceValue.value){
				orderClause.push('price '+$.priceValue.value);
			}
			if ($.rentValue.value){
				orderClause.push('rent '+$.priceValue.value);
			}
			if ($.priceValue.value){
				orderClause.push('c_premises '+$.priceValue.value);
			}
			if ($.nareaValue.value){
				orderClause.push('NETAREA '+$.nareaValue.value);
			}
			
			
			if (orderClause.length){
				orderClause=orderClause.join();
				orderClause='order by '+orderClause;
			}
			/*var orderClause='order by price '+$.priceValue.value+', '+
							' rent '+$.rentValue.value+', '+
							' c_ '+$.addrValue.value+', '+
							'NETAREA '+$.nareaValue.value;*/
			var property=getProp.getList(propgroup,{},orderClause);
			if (property)
				t.showProp(property);
		});
		
		var sortShow=1;
		var animateShow=Ti.UI.createAnimation({
			right :0,
			duration : 150
		});
		
		$.rePropImgParaView.addEventListener('postlayout',function(){
			$.rePropImgHold.height=$.rePropImgParaView.size.height;
		});
		$.rePropImgParaView.addEventListener('swipe',function(e){
			if (e.direction=='left')
					sortShow=0;
				else 
					sortShow=1;
			$.rePropImgHold.fireEvent('click');

		});

		$.rePropImgHold.addEventListener('click',function(e){
			if (sortShow){
				var animateHide=Ti.UI.createAnimation({
						right :'-'+pToD($.rePropSearchView.toImage().width),
						duration : 150
					});
				var right=pToD($.rePropSearchView.toImage().width);
				if (OS_IOS)
				$.rePropImgParaView.animate(animateHide);
				else 
				$.rePropImgParaView.right='-'+right;
				
				sortShow=0;
			}else {
				sortShow=1;
				if (OS_IOS)
				$.rePropImgParaView.animate(animateShow);
				else 
				$.rePropImgParaView.right=0;
			}
			
		});
	}
	,addEvent:function(){
		$.rePropTmpl1Table.addEventListener('click',function(e){
			if (botBar){
				selectRow(e);
			}
			else{
				var obj={
						propertyList:reProp.propertyList,
						propgroup:e.row.propgroup,
						record:e.row.record,
						index:e.index,
						layout:propPage
					};
		
					var detailWin=Alloy.createController('reProp/rePropDetail',obj);
			 }
			//detailWin.open({animated : true});
			
		});
		
		$.rePropTmpl1Table.addEventListener('longpress',function(e){
			bottomBar.show();
			botBar=true;
			selectRow(e);
			//$.rePropTmpl1Table.data[0].rows[1].backgroundColor='blue';
			
			//email.sendProperty(e.row.record);
		});
	}
};


var orderDialog=function(e){
	var opts = {
			  cancel: 2,
			  options: [s('orderAsc'), s('orderDesc'), '取消'],
			  selectedIndex: 2,
			};
	var text='';
	var value='';
	var dialog = Ti.UI.createOptionDialog(opts);
	dialog.show();
	dialog.addEventListener('click', function(e1){
		switch(e1.index){
			case 0:
				text=s('orderAsc');
				value='asc';
			break;
			case 1:
				text=s('orderDesc');
				value='desc';
			break;
			default:
				text=' ';
			break;
			
		}
		if (text){
			
			if (e.source.chSource!=null){
				eval('$.'+e.source.chSource+'.text=text');
				eval('$.'+e.source.chSource+'.value=value');
			}else {
				eval('$.'+e.source.id+'.text=text');
				eval('$.'+e.source.id+'.value=value');
			}
		}
	});
	
};


var selectRow =function(e){
	if (e.row.backgroundColor==selectedColor){
		
				reProp.emailProp=_.filter(reProp.emailProp,function(num){
					return  (num!=e.row.propertyid);
					});
				
					e.row.backgroundColor='#E6E6E6';
	}
	else{
		
		if (reProp.emailProp.indexOf(e.row.propertyid)==-1)
		{reProp.emailProp.push(e.row.propertyid);}
		e.row.backgroundColor=selectedColor;
	}
	//console.log(reProp.emailProp);
	bottomBar.setProperty(reProp.emailProp);
};


var cancelSet=function(){
	reProp.emailProp=[];
	
	_.each($.rePropTmpl1Table.data[0].rows,function(e){
		e.backgroundColor='#E6E6E6';
	});
	botBar=false;
};

reProp.init();
