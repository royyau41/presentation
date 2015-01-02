

var menu={
	
	init:function(){
		base=getMenu(Ti.App.Properties.getInt('menuStyle',0)),
		this.setMenu(base);
	}
	,setMenu:function(base){
		

		var data=[];
		//var data = [ {title: 'Apples'}, {title: 'Bananas'}, {title: 'Carrots'}, {title: 'Potatoes'} ];
		for (var k in base){
			if (base[k].view){
			var row=Ti.UI.createTableViewRow({
				className:'forumEvent',
				width:Ti.UI.SIZE,
				height:Ti.UI.SIZE,
				showView:base[k]['view'],
				rightButton:base[k]['rightButton'],
			});
			
			var image=Ti.UI.createImageView({
				width:'114',
				height:'95',
				//left:'10dp',
				top:'0',
				image:base[k]['image']
			});
			/*
			var image=Ti.UI.createLabel({
				left:'10dp',
				top:'10dp',
				color:'blue',
				text:this.base[k]['text']
			});*/
			row.add(image);
			
			data.push(row);
			}
		}
		//console.log(data);
		$.table.setData(data);
	}
};


var getMenu=function(type){
	var base=[];
	switch (type){
		case 0:
		
		base=[
	     {image:'/menu/menu10.png',view:'reProp/rePropMainLayout',rightButton:'/title/recRt.png'}
	    ,{image:'/menu/menu9.png',view:'newdev/newdevMainLayout',rightButton:'/title/newRt.png'}
		//,{image:'/menu/menu7.png',view:'',text:'a23e'}
		//,{image:'/menu/menu22.png',view:'neEstate/neEstateMainLayout',rightButton:'/title/nearRt.png'}
		,{image:'/menu/menu5.png',view:'trans/transMainLayout',rightButton:'/title/transRt.png'}
		,{image:'/menu/menu3.png',view:'mortgage/mortgageMain',rightButton:'/title/calcuRt.png'}
		,{image:'/menu/menu6.png',view:'doc/docMainLayout',rightButton:'/title/salesRt.png'}
		,{image:'/menu/menu4.png',view:'profile/profile',rightButton:'/title/profileRt.png'}
		,{image:'/menu/login2.png',view:'login/login',rightButton:'/title/loginRt.png'}
	];
		break;
		case 1:
		base=[
	     {image:'/menu/colorMenu/menu10.png',view:'reProp/rePropMainLayout',rightButton:'/title/recRt.png'}
	    ,{image:'/menu/colorMenu/menu9.png',view:'newdev/newdevMainLayout',rightButton:'/title/newRt.png'}
		//,{image:'/menu/colorMenu/menu7.png',view:'',text:'a23e'}
		//,{image:'/menu/colorMenu/menu22.png',view:'neEstate/neEstateMainLayout',rightButton:'/title/nearRt.png'}
		,{image:'/menu/colorMenu/menu5.png',view:'trans/transMainLayout',rightButton:'/title/transRt.png'}
		,{image:'/menu/colorMenu/menu3.png',view:'mortgage/mortgageMain',rightButton:'/title/calcuRt.png'}
		,{image:'/menu/colorMenu/menu6.png',view:'doc/docMainLayout',rightButton:'/title/salesRt.png'}
		,{image:'/menu/colorMenu/menu4.png',view:'profile/profile',rightButton:'/title/profileRt.png'}
		,{image:'/menu/colorMenu/login2.png',view:'login/login',rightButton:'/title/loginRt.png'}
	];
		break;
	};
	return base;
};

Ti.App.addEventListener('MenuStyle',function(e){
	var base=[];
	base =getMenu(e.menu);
	menu.setMenu(base);
});
menu.init();
