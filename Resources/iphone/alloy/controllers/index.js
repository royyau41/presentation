function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function DBDump(dbName) {
        var self = this;
        this.db = dbName;
        this.conn = null;
        this.getMaster = function() {
            var results = [];
            var resultSet = self.conn.execute("SELECT * FROM sqlite_master WHERE type = 'table';");
            while (resultSet.isValidRow()) {
                results.push({
                    name: resultSet.fieldByName("name"),
                    tbl_name: resultSet.fieldByName("tbl_name"),
                    sql: resultSet.fieldByName("sql")
                });
                resultSet.next();
            }
            resultSet.close();
            return results;
        };
        this.getFieldArray = function(sql, tableName) {
            var regs = [ /CREATE TABLE /, / INTEGER PRIMARY KEY/, /VARCHAR/g, /INTEGER/g, /TEXT/g, /\([0-9]+\)/g, /\(/g, /\)/g ];
            for (var i = 0; i < regs.length; i++) sql = sql.replace(regs[i], "");
            sql = sql.replace(tableName + " ", "");
            sql = sql.replace(/ ,/g, ",");
            sql = sql.replace(/ /g, "");
            var fieldArray = sql.split(",");
            return fieldArray;
        };
        this.getInsertSQL = function(tableName, allFields) {
            var insertArray = [];
            var resultSet = self.conn.execute("SELECT * FROM " + tableName + ";");
            while (resultSet.isValidRow()) {
                var valuesArray = [];
                var fieldsArray = [];
                for (var i = 0; i < allFields.length; i++) {
                    var value = resultSet.fieldByName(allFields[i]);
                    if (null != value) {
                        value = "'" + self.requote(value) + "'";
                        valuesArray.push(value);
                        fieldsArray.push(allFields[i]);
                    }
                }
                var insert = "INSERT INTO " + tableName + " (" + fieldsArray.join(",") + ") VALUES(" + valuesArray.join(",") + ");\n";
                insertArray.push(insert);
                resultSet.next();
            }
            resultSet.close();
            return insertArray;
        };
        this.requote = function(value) {
            return "string" == typeof value ? value.replace(/\'/g, "''") : value;
        };
        __constructor = function() {
            null != self.db ? self.conn = Titanium.Database.open(self.db) : alert("Database not defined");
            var sqlFile = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, self.db + ".sql");
            var tableArray = self.getMaster();
            for (var i = 0; i < tableArray.length; i++) {
                var tableName = tableArray[i].tbl_name;
                var createSQL = tableArray[i].sql;
                var fieldArray = self.getFieldArray(createSQL, tableName);
                var insertArray = self.getInsertSQL(tableName, fieldArray);
                sqlFile.write(createSQL + "\n", true);
                for (var q = 0; q < insertArray.length; q++) sqlFile.write(insertArray[q], true);
            }
        }();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ],
        backgroundColor: "#E6E6E6",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var db = require("db").db;
    require("ti.map");
    var basicui = new baseUi(false);
    var win = basicui.getBasic_win();
    basicui.getMainView();
    var pushNo = require("pushNotification").pushNotification;
    var index = {
        init: function() {
            var myDatabase = "astPresentation";
            new DBDump(myDatabase);
            var emailDialog = Titanium.UI.createEmailDialog();
            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "my_database.sql");
            emailDialog.subject = "Here's your DB dump";
            emailDialog.addAttachment(f);
            emailDialog.open();
            var chkbit = 0;
            win.addEventListener("postlayout", function() {
                0 == chkbit && (chkbit = 1);
            });
            win.exitOnClose = true;
            win.open();
            db.init();
            pushNo.getDeviceToken();
            this.checkinglogin();
        },
        checkinglogin: function() {
            var e = {
                showView: "login/login",
                rightButton: "/title/loginRt.png",
                win: win
            };
            var loadViewargs = {
                win: win
            };
            var evtData = {
                e: e,
                loadViewargs: loadViewargs
            };
            if (Ti.App.Properties.getObject("loginInfo", false)) if (0 == Ti.App.Properties.getInt("propgroup", 0)) {
                var dialog = Ti.UI.createAlertDialog({
                    buttonNames: [ "確定" ],
                    message: "請選擇顯示樓盤"
                });
                dialog.addEventListener("click", function() {
                    Ti.App.fireEvent("showPage", evtData);
                });
                dialog.show();
            } else {
                langIso = Ti.App.Properties.getString("langIso", "zh");
                e = {
                    showView: "reProp/rePropMainLayout",
                    rightButton: "/title/" + langIso + "/recRt.png",
                    win: win
                };
                evtData.e = e;
                Ti.App.fireEvent("showPage", evtData);
            } else {
                var dialog = Ti.UI.createAlertDialog({
                    buttonNames: [ "確定" ],
                    message: "請先登入及選擇顯示樓盤"
                });
                dialog.addEventListener("click", function() {
                    Ti.App.fireEvent("showPage", evtData);
                });
                dialog.show();
            }
        }
    };
    index.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;