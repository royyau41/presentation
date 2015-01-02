var Cloud = require("ti.cloud");

var pushNotification={
	token:Ti.App.Properties.getString('givenName',''),
	pushUserID:Ti.App.Properties.getString('pushUserID',''),
	getDeviceToken:function(){	
		switch(Ti.Platform.osname){
			case 'ipad':
			case 'iphone':
			
				// Check if the device is running iOS 8 or later
				if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
 
					 // Wait for user settings to be registered before registering for push notifications
					    Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
					 
					 // Remove event listener once registered for push notifications
					        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
					 
					        Ti.Network.registerForPushNotifications({
					            success: f.deviceTokenSuccess,
					            error: f.deviceTokenError,
					            //callback: f.receivePush
					            callback: function(e){
					            	alert(e);
					            }
					        });
					    });
					 
					 // Register notification types to use
					    Ti.App.iOS.registerUserNotificationSettings({
						    types: [
					            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
					            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
					            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
					        ]
					    });
					}
											 
						// For iOS 7 and earlier
						else {
						    Ti.Network.registerForPushNotifications({
						 // Specifies which notifications to receive
						        types: [
						            Ti.Network.NOTIFICATION_TYPE_BADGE,
						            Ti.Network.NOTIFICATION_TYPE_ALERT,
						            Ti.Network.NOTIFICATION_TYPE_SOUND
						        ],
						        success: f.deviceTokenSuccess,
						        error: f.deviceTokenError,
						        callback: f.receivePush
						    });
						}
			break;
			case 'android':
				var CloudPush = require('ti.cloudpush');

						CloudPush.debug = true;
						CloudPush.enabled = true;
						CloudPush.showTrayNotificationsWhenFocused = true;
						CloudPush.retrieveDeviceToken({
							    success: f.deviceTokenSuccess,
							    error: f.deviceTokenError
							});
				 CloudPush.addEventListener('callback', function (evt) {
			            	
			            	//createNotification();
						    alert("Notification received: " + evt.payload);
						});
				CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
						    conosle.log('Tray Click Launched App (app was not running)');
						});
						// Triggered when the push notifications is in the tray when the app is running
				CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
						    console.log('Tray Click Focused App (app was already running)');
						}); 
			break;
		}
		
	
			
	}
	
};

var f={
	createUser:function(){
		Cloud.Users.create({
				    username:'testandroid',
				    password: 'test_password',
				    password_confirmation: 'test_password'
				}, function (e) {
				    if (e.success) {
				        var user = e.users[0];
				        alert('Success:\n' +
				            'id: ' + user.id + '\n' +
				            'sessionId: ' + Cloud.sessionId + '\n' +
				            'first name: ' + user.first_name + '\n' +
				            'last name: ' + user.last_name);
				    } else {
				        alert('Error:\n' +
				            (JSON.stringify(e)));
				    }
				});
	}
	,loginUser:function(){
		Cloud.Users.login({
			    login: 'testandroid',
			    password: 'test_password'
			}, function (e) {
			    if (e.success) {
			        var user = e.users[0];
			        alert('Success login:\n' +
			            'id: ' + user.id + '\n' +
			            'sessionId: ' + Cloud.sessionId + '\n' +
			            'first name: ' + user.first_name + '\n' +
			            'last name: ' + user.last_name);
			          f.subscribeToChannel(user.id);
			    } else {
			        alert('Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			});
	}
	,subscribeToChannelByUser:function (userid,channel,token) {
		
			 // Subscribes the device to the 'news_alerts' channel
			 // Specify the push type as either 'android' for Android or 'ios' for iOS
			 
			    Cloud.PushNotifications.subscribe({
			    			user_id:userid,
					        channel: 'news_alerts',
					        device_token: pushNotification.token,
					        type: Ti.Platform.name == 'android' ? 'android' : 'ios'
					    }, function (e) {
					 if (e.success) {
					            alert('Subscribed');
					        } else {
					            alert('Error 888:\n' +
					                ((e.error && e.message) || JSON.stringify(e)));
					        }
					    });
					}
	,subscribeToChannel:function (userid,channel,token) {
		
			 // Subscribes the device to the 'news_alerts' channel
			 // Specify the push type as either 'android' for Android or 'ios' for iOS
			 
			    Cloud.PushNotifications.subscribeToken({
			    			//user_id:userid,
					        channel: 'news_alerts',
					        device_token: pushNotification.token,
					        type: Ti.Platform.name == 'android' ? 'android' : 'ios'
					    }, function (e) {
					 if (e.success) {
					            alert('Subscribed');
					        } else {
					            alert('Error 888:\n' +
					                ((e.error && e.message) || JSON.stringify(e)));
					        }
					    });
					}
	,deviceTokenSuccess:function(e) {
		Ti.App.Properties.setString('deviceToken',  e.deviceToken);
	    pushNotification.token= e.deviceToken;
	    f.subscribeToChannel();
	    
	}
	,deviceTokenError:function(e) {
	    console.log('Failed to register for push notifications! ' + e.error);
	}
	,receivePush:function(e) {
		    alert('Received push: ' + JSON.stringify(e));
	}
};

exports.pushNotification=pushNotification;