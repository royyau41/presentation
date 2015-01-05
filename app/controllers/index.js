
var db=require('db').db;
var Map = require('ti.map');
var basicui=new baseUi(false);
var win=basicui.getBasic_win();
var mainView=basicui.getMainView();
var deviceToken = null;
var pushNo=require('pushNotification').pushNotification;

var index={
	init:function(){   
		console.log(s('addr'));
		var chkbit=0;
		win.addEventListener('postlayout',function(e){
			if (chkbit==0){
			//Alloy.Globals.Loading.hide();
			chkbit=1;
			}
		});
		win.exitOnClose=true;
		win.open();
		db.init();
		pushNo.getDeviceToken();
		//asdasdas
		
		if (OS_ANDROID){
			win.addEventListener('android:back', function(e) {
			     var dialog = Ti.UI.createAlertDialog({
				    cancel: 0,
				    buttonNames: ['取消', '確定'],
				    message: '離開APPS？',
				    title: '離開'
				  });
				  dialog.addEventListener('click', function(e){
				    if (e.index === 1){
				     	win.close();
				    }
				  });
				  dialog.show();
			 });
		}
		
	
	
		this.checkinglogin();
		//mainView.add(this.currentView);
	}
	,checkinglogin :function(){
		
		var e={
			showView:'login/login',
			rightButton:'/title/loginRt.png',
			win:win
		};
		var loadViewargs={
			win:win
		};
		var evtData={
			e:e,
			loadViewargs:loadViewargs
		};
		
		if (!(Ti.App.Properties.getObject('loginInfo',false))){
			   var dialog = Ti.UI.createAlertDialog({
				  //  cancel: 0,
				    buttonNames: [ '確定'],
				    message: '請先登入及選擇顯示樓盤',
				  //  title: '離開'
				  });
				  dialog.addEventListener('click', function(e){

				     	Ti.App.fireEvent('showPage',evtData);
				    
				  });
				  dialog.show();
			
			
		}else 
		if (Ti.App.Properties.getInt('propgroup',0)==0){
			var dialog = Ti.UI.createAlertDialog({
				    buttonNames: ['確定'],
				    message: '請選擇顯示樓盤'
				  });
				  dialog.addEventListener('click', function(e){
				     	Ti.App.fireEvent('showPage',evtData);
				  });
				  dialog.show();
			
		}
		else {
			langIso=Ti.App.Properties.getString('langIso','zh');
			 e={
				showView:'reProp/rePropMainLayout',
				rightButton:'/title/'+langIso+'/recRt.png',
				win:win
			};
			
			 evtData.e=e;


			 	Ti.App.fireEvent('showPage',evtData);
		}
		
	}
};

function createNotification(){
		var notification = Titanium.Android.createNotification({
    contentTitle: 'Notification 2',
    contentText : 'Just another notification',
 // Blank intent that will remove the notification when the user taps it
 // Do not override the default value of the 'flags' property
    contentIntent: Ti.Android.createPendingIntent({intent: Ti.Android.createIntent({})}),
 // Image file located at /platform/android/res/drawable/warn.png
    //icon: Ti.App.Android.R.drawable.warn,
    number: 5,
    when: new Date()
});
	Titanium.Android.NotificationManager.notify(1, notification);
	
}


index.init();

