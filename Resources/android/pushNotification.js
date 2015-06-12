var Cloud = require("ti.cloud");

var pushNotification = {
    token: Ti.App.Properties.getString("givenName", ""),
    pushUserID: Ti.App.Properties.getString("pushUserID", ""),
    getDeviceToken: function() {
        var CloudPush = require("ti.cloudpush");
        CloudPush.debug = true;
        CloudPush.enabled = true;
        CloudPush.showTrayNotificationsWhenFocused = true;
        CloudPush.retrieveDeviceToken({
            success: f.deviceTokenSuccess,
            error: f.deviceTokenError
        });
        CloudPush.addEventListener("callback", function(evt) {
            alert("Notification received: " + evt.payload);
        });
        CloudPush.addEventListener("trayClickLaunchedApp", function() {
            conosle.log("Tray Click Launched App (app was not running)");
        });
        CloudPush.addEventListener("trayClickFocusedApp", function() {
            console.log("Tray Click Focused App (app was already running)");
        });
    }
};

var f = {
    createUser: function() {
        Cloud.Users.create({
            username: "testandroid",
            password: "test_password",
            password_confirmation: "test_password"
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                alert("Success:\nid: " + user.id + "\nsessionId: " + Cloud.sessionId + "\nfirst name: " + user.first_name + "\nlast name: " + user.last_name);
            } else alert("Error:\n" + JSON.stringify(e));
        });
    },
    loginUser: function() {
        Cloud.Users.login({
            login: "testandroid",
            password: "test_password"
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                alert("Success login:\nid: " + user.id + "\nsessionId: " + Cloud.sessionId + "\nfirst name: " + user.first_name + "\nlast name: " + user.last_name);
                f.subscribeToChannel(user.id);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    },
    subscribeToChannelByUser: function(userid) {
        Cloud.PushNotifications.subscribe({
            user_id: userid,
            channel: "news_alerts",
            device_token: pushNotification.token,
            type: "android"
        }, function(e) {
            e.success || alert("Error 888:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    },
    subscribeToChannel: function() {
        Cloud.PushNotifications.subscribeToken({
            channel: "news_alerts",
            device_token: pushNotification.token,
            type: "android"
        }, function(e) {
            e.success || alert("Error 888:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    },
    deviceTokenSuccess: function(e) {
        Ti.App.Properties.setString("deviceToken", e.deviceToken);
        pushNotification.token = e.deviceToken;
        f.subscribeToChannel();
    },
    deviceTokenError: function(e) {
        console.log("Failed to register for push notifications! " + e.error);
    },
    receivePush: function(e) {
        alert("Received push: " + JSON.stringify(e));
    }
};

exports.pushNotification = pushNotification;