var args = arguments[0] || {};
var duration=(OS_IOS)?500:200;


var touchLeftStarted = false;
var buttonPressed = false;
var hasSlided = false;
var direction = "reset";



var title={
	init:function(){
		this.setEvent();
		this.setMenu();
		if (args.newWin){
				$.returnButton.visible=true;	
				$.returnButton.addEventListener('click',function(){
					args.currentWin.close();
				});
			}
	}
	,setMenu:function(){
		this.setClickMenu();
		
	}
	,setEvent:function(){
		
		Ti.App.addEventListener("showPage", function(evtData) {
			evtData.loadViewargs.win=args.currentWin;
		 	evtData.loadViewargs.mainView=$.mainContentView;
        	changeMainContent(evtData.e,evtData.loadViewargs);
    	});
		$.rightButton.addEventListener('click',function(e){
			$.leftButton.fireEvent('click');
		});
		$.leftButton.addEventListener('click',function(e){	
			$.menuList.setHeight(pToD(Ti.Platform.displayCaps.platformHeight-$.navview.toImage().height));
			$.menu.table.setHeight(pToD(Ti.Platform.displayCaps.platformHeight-$.navview.toImage().height));
			
			Alloy.Globals.titleHeight=$.navview.size.height;
		var animateDown = Ti.UI.createAnimation({
			top :$.navview.size.height,
			duration : duration
		});
		
		var animateReset=Ti.UI.createAnimation({
			top : (OS_IOS)?'-'+Ti.Platform.displayCaps.platformHeight:'-'+pToD(Ti.Platform.displayCaps.platformHeight),
			duration : 150
		});
			
			//if (args.newWin||args.closeWin){
				//args.currentWin.close();
			//}else{
			if (!hasSlided) {
				direction = "down";
				$.menuList.animate(animateDown);
				hasSlided = true;
			} else {
				direction = "reset";
				 $.menuList.animate(animateReset);
				hasSlided = false;
			}
			//};		
		});
		
	}
	,setClickMenu:function(){
		$.menu.table.addEventListener('click',function(e){
			$.leftButton.fireEvent('click');
			var loadViewargs={
				mainView:$.mainContentView,
				win:args.currentWin
			};
			changeMainContent(e.row,loadViewargs);
		});
	}
	
};

var changeMainContent=function(e,loadViewargs){
	
			if (e.showView){
					if($.mainContentView.children.length){
						$.mainContentView.remove($.mainContentView.children[0]);
					}
				var newView=comjs.getLoadingView(e.showView,loadViewargs);
				//Alloy.createController.getView();
				if (newView !=title.currentView){
					$.returnButton.visible=false;
					title.currentView=newView;
					//console.log(index.currentView);
					
					$.mainContentView.add(title.currentView);
				}
			}
			if (e.rightButton){
				$.rightButton.setBackgroundImage(e.rightButton);
				Alloy.Globals.rightButton=e.rightButton;
			}
};

title.init();
