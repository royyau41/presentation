function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login/login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.logMainView = Ti.UI.createView({
        borderColor: Alloy.Globals.showdowColor,
        borderRadius: 8,
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: "30",
        backgroundGradient: Alloy.Globals.basicBackgroundColor,
        width: "70%",
        left: "15%",
        right: "15%",
        id: "logMainView"
    });
    $.__views.logMainView && $.addTopLevelView($.__views.logMainView);
    $.__views.__alloyId2 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId2"
    });
    $.__views.logMainView.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "Host IP：",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.IP = Ti.UI.createTextField({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 0,
        width: "30%",
        id: "IP",
        value: "192.168.0.40",
        enabled: "true"
    });
    $.__views.__alloyId2.add($.__views.IP);
    $.__views.__alloyId4 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId4"
    });
    $.__views.logMainView.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "Login：",
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.USERCODE = Ti.UI.createTextField({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 0,
        width: "30%",
        id: "USERCODE"
    });
    $.__views.__alloyId4.add($.__views.USERCODE);
    $.__views.__alloyId6 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId6"
    });
    $.__views.logMainView.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "Password：",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.USERPASSWORD = Ti.UI.createTextField({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 0,
        width: "30%",
        id: "USERPASSWORD",
        passwordMask: "true"
    });
    $.__views.__alloyId6.add($.__views.USERPASSWORD);
    $.__views.__alloyId8 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId8"
    });
    $.__views.logMainView.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "System Number：",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.sn = Ti.UI.createTextField({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 0,
        width: "30%",
        id: "sn",
        enabled: "false"
    });
    $.__views.__alloyId8.add($.__views.sn);
    $.__views.dlData = Alloy.createWidget("nl.fokkezb.button", "widget", {
        left: 5,
        title: "下載資料",
        style: "bs-success",
        id: "dlData",
        __parentSymbol: $.__views.__alloyId8
    });
    $.__views.dlData.setParent($.__views.__alloyId8);
    $.__views.dlEstate = Alloy.createWidget("nl.fokkezb.button", "widget", {
        title: "下載屋苑",
        style: "bs-success",
        id: "dlEstate",
        __parentSymbol: $.__views.__alloyId8
    });
    $.__views.dlEstate.setParent($.__views.__alloyId8);
    $.__views.__alloyId10 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId10"
    });
    $.__views.logMainView.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "CurrentProperty Group：",
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    $.__views.propGroupBtnView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        left: 5,
        layout: "horizontal",
        id: "propGroupBtnView"
    });
    $.__views.__alloyId10.add($.__views.propGroupBtnView);
    $.__views.__alloyId12 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId12"
    });
    $.__views.logMainView.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "Sql：",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.sqlArea = Ti.UI.createTextArea({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 0,
        width: "30%",
        id: "sqlArea",
        height: "70",
        editable: "true"
    });
    $.__views.__alloyId12.add($.__views.sqlArea);
    $.__views.sqlBtn = Alloy.createWidget("nl.fokkezb.button", "widget", {
        title: "Sql",
        style: "bs-success",
        id: "sqlBtn",
        __parentSymbol: $.__views.__alloyId12
    });
    $.__views.sqlBtn.setParent($.__views.__alloyId12);
    $.__views.__alloyId14 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId14"
    });
    $.__views.logMainView.add($.__views.__alloyId14);
    $.__views.loginBtn = Alloy.createWidget("nl.fokkezb.button", "widget", {
        left: "30%",
        title: "Login",
        style: "bs-success",
        id: "loginBtn",
        __parentSymbol: $.__views.__alloyId14
    });
    $.__views.loginBtn.setParent($.__views.__alloyId14);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var xhrData = require("xhrData").xhrData;
    var db = require("db").db;
    var loginInfo = Ti.App.Properties.getObject("loginInfo", false);
    var login = {
        init: function() {
            if (loginInfo) {
                $.USERCODE.value = loginInfo.USERCODE;
                $.USERPASSWORD.value = loginInfo.USERPASSWORD;
                $.sn.value = loginInfo.sn;
                this.setPropGroupBtn();
            }
            this.setEventListener();
        },
        setPropGroupBtn: function() {
            var sql = "select filename,number from propgroup order by updateinfo ";
            var filename = db.getObjResultSet(sql);
            for (var k in $.propGroupBtnView.children) $.propGroupBtnView.children.hasOwnProperty(0) && $.propGroupBtnView.remove($.propGroupBtnView.children[0]);
            var switchAry = [];
            for (var i = 0; filename.length > i; i++) {
                switchAry[i] = Ti.UI.createButton({
                    title: filename[i].filename,
                    propgroup: filename[i].number,
                    width: Ti.UI.Size,
                    left: "10",
                    height: "38dp",
                    color: "#FFFFFF",
                    borderRadius: 4,
                    backgroundGradient: Alloy.Globals.btnInitColor
                });
                switchAry[i].width = switchAry[i].toImage().width + 20 + "dp";
                $.propGroupBtnView.add(switchAry[i]);
                switchAry[i].addEventListener("touchstart", function(e) {
                    for (var k = 0; switchAry.length > k; k++) switchAry[k].setBackgroundGradient(Alloy.Globals.btnInitColor);
                    e.source.setBackgroundGradient(Alloy.Globals.btnSelectedColor);
                    Ti.App.Properties.setInt("propgroup", e.source.propgroup);
                });
            }
            if (Ti.App.Properties.getInt("propgroup", 0)) for (var i = 0; switchAry.length > i; i++) switchAry[i].propgroup == Ti.App.Properties.getInt("propgroup", 0) && switchAry[i].setBackgroundGradient(Alloy.Globals.btnSelectedColor);
        },
        setEventListener: function() {
            $.loginBtn.addEventListener("click", function() {
                login.checkValidation() ? login.checkLogin() : alert("Error");
            });
            $.dlData.addEventListener("click", function() {
                loginInfo = Ti.App.Properties.getObject("loginInfo", false);
                loginInfo && dldata.getPropGroup();
            });
            $.dlEstate.addEventListener("click", function() {
                loginInfo = Ti.App.Properties.getObject("loginInfo", false);
                loginInfo && dldata.getEstateFile();
            });
            $.sqlBtn.addEventListener("click", function() {
                console.log(db.getObjResultSet($.sqlArea.value));
            });
        },
        checkLogin: function() {
            Ti.App.Properties.removeProperty("loginInfo");
            $.sn.value = "";
            var serverInfo = {
                ip: $.IP.value
            };
            var passToServer = this.getLogininfo();
            xhrData.request({
                success: function(e) {
                    switch (e.NUMBER) {
                      case "-1":
                        alert("invalid user");
                        break;

                      case "-2":
                        alert("incorrect password!");
                        break;

                      default:
                        login.successLogin(e.NUMBER, passToServer);
                    }
                },
                error: function() {}
            }, serverInfo, passToServer);
        },
        successLogin: function(sn, storeObj) {
            storeObj.sn = sn;
            $.sn.value = sn;
            Ti.App.Properties.setObject("loginInfo", storeObj);
            Alloy.Globals.LoadingShow("Login Success!");
        },
        checkValidation: function() {
            return $.USERCODE.value ? $.USERPASSWORD.value ? true : false : false;
        },
        getLogininfo: function() {
            var passToServer = {
                FUNCTIONNAME: "Register",
                USERCODE: $.USERCODE.value.toUpperCase(),
                USERPASSWORD: $.USERPASSWORD.value,
                Device_ID: Ti.Platform.id
            };
            return passToServer;
        }
    };
    var dldata = {
        propgroup: [],
        property: [],
        estate: [],
        dlProcess: function(index, info) {
            loginInfo = Ti.App.Properties.getObject("loginInfo", false);
            if (loginInfo) switch (index) {
              case 1:
                Alloy.Globals.Loading.setMessage("下載樓盤組合中");
                this.getPropGroup();
                break;

              case 2:
                Alloy.Globals.Loading.setMessage("下載樓盤中");
                this.getProperty();
                break;

              case 3:
                Alloy.Globals.Loading.setMessage("下載樓盤圖片中");
                this.getPropImage();
                break;

              case 4:
                Alloy.Globals.Loading.setMessage("下載屋苑資料中");
                this.getEstate();
                break;

              case 5:
                Alloy.Globals.Loading.setMessage("下載屋苑圖片中");
                this.getEstateFile();
                break;

              case 99:
                Alloy.Globals.LoadingShow("下載失敗");
                console.log(info);
                break;

              default:
                Alloy.Globals.LoadingShow("下載完成");
            }
        },
        getPropGroup: function() {
            var passToServer = this.getPassData("PROPGROUP");
            xhrData.request({
                success: function(e) {
                    if (e) {
                        for (var i in e) {
                            db.insertData("propgroup", e[i]);
                            dldata.propgroup.push(e[i].NUMBER);
                        }
                        login.setPropGroupBtn();
                    }
                    dldata.dlProcess(2);
                },
                error: function(e) {
                    dldata.dlProcess(99, e);
                }
            }, {}, passToServer);
        },
        getProperty: function(index) {
            ("" == index || null == index) && (index = 0);
            if (this.propgroup.length > index) {
                var passToServer = this.getPassData("PROPERTIES", index);
                xhrData.request({
                    success: function(e) {
                        if (e) if (e["RECORDGROUP"]) {
                            e["RECORDGROUP"].PROPGROUPNO = e["PROPGROUPNO"];
                            e["RECORDGROUP"].ATTACHMENT = e["ATTACHMENT"] || "";
                            db.insertData("property", e["RECORDGROUP"]);
                            var propObj = {
                                propgroup: e["RECORDGROUP"]["PROPGROUPNO"],
                                propertyno: e["RECORDGROUP"]["PROPERTYNO"]
                            };
                            dldata.property.push(propObj);
                        } else for (var i in e) {
                            e[i]["RECORDGROUP"].PROPGROUPNO = e[i]["PROPGROUPNO"];
                            e[i]["RECORDGROUP"].ATTACHMENT = e[i]["ATTACHMENT"] || "";
                            db.insertData("property", e[i]["RECORDGROUP"]);
                            var propObj = {
                                propgroup: e[i]["RECORDGROUP"]["PROPGROUPNO"],
                                propertyno: e[i]["RECORDGROUP"]["PROPERTYNO"]
                            };
                            dldata.property.push(propObj);
                        }
                        index++;
                        dldata.propgroup.length == index ? dldata.dlProcess(3) : dldata.propgroup.length > index ? dldata.getProperty(index) : dldata.dlProcess();
                    },
                    error: function(e) {
                        dldata.dlProcess(99, e);
                    }
                }, {}, passToServer);
            } else dldata.dlProcess(3);
        },
        getPropImage: function(index) {
            ("" == index || null == index) && (index = 0);
            if (this.property.length > index) {
                var passToServer = this.getPassData("PROPERTIESFILES", index);
                xhrData.request({
                    success: function(e) {
                        if (e) if (e["PROPGROUPNO"]) {
                            e["createby"] = loginInfo.sn;
                            db.insertData("propertyfile", e);
                        } else for (var i in e) db.insertData("propertyfile", e[i]);
                        index++;
                        console.log(dldata.property.length + " " + index);
                        dldata.property.length == index ? dldata.dlProcess(4) : dldata.property.length > index ? dldata.getPropImage(index) : dldata.dlProcess();
                    },
                    error: function(e) {
                        dldata.dlProcess(99, e);
                    }
                }, {}, passToServer);
            } else dldata.dlProcess(4);
        },
        getEstate: function() {
            var passToServer = this.getPassData("ESTATES");
            xhrData.request({
                success: function(e) {
                    if (e) for (var i in e) if (0 == e[i]["DELETEDATE"]) {
                        db.insertData("estate", e[i]);
                        dldata.estate.push(e[i].ESTATENO);
                    } else db.deleteRecord("estate", "number=" + e[i]["NUMBER"]);
                    dldata.dlProcess(5);
                },
                error: function(e) {
                    dldata.dlProcess(99, e);
                }
            }, {}, passToServer);
        },
        getEstateFile: function(index) {
            ("" == index || null == index) && (index = 0);
            if (this.estate.length > index) {
                var passToServer = this.getPassData("ESTATESFILES", index);
                xhrData.request({
                    success: function(e) {
                        if (e) if (e["ESTATENO"]) {
                            e["createby"] = loginInfo.sn;
                            db.insertData("estatefile", e);
                        } else for (var i in e) {
                            e[i]["createby"] = loginInfo.sn;
                            db.insertData("estatefile", e[i]);
                        }
                        index++;
                        console.log(dldata.estate.length + " " + index);
                        dldata.estate.length == index ? dldata.dlProcess() : dldata.estate.length > index ? dldata.getEstateFile(index) : dldata.dlProcess();
                    },
                    error: function(e) {
                        dldata.dlProcess(99, e);
                    }
                }, {}, passToServer);
            } else dldata.dlProcess();
        },
        getPassData: function(functioname, index) {
            var basePassData = {
                FUNCTIONNAME: functioname,
                USERCODE: loginInfo.USERCODE,
                USERNO: loginInfo.sn,
                Device_ID: Ti.Platform.id
            };
            var mergeObj = {};
            switch (functioname) {
              case "PROPGROUP":
                var updateinfo = db.getObjResultSet("Select max(updateinfo) as updateinfo  from propgroup ");
                mergeObj = {
                    UPDATEINFO: updateinfo[0].updateinfo || 0
                };
                break;

              case "PROPERTIES":
                mergeObj = {
                    USERNO: this.propgroup[index]
                };
                break;

              case "PROPERTIESFILES":
                var mergeObj = {
                    RECORDNO: dldata.property[index].propertyno,
                    GROUPNO: dldata.property[index].propgroup
                };
                break;

              case "ESTATES":
                var updateinfo = db.getObjResultSet("Select max(updateinfo) as updateinfo  from estate ");
                var mergeObj = {
                    UPDATEINFO: updateinfo[0].updateinfo || 0
                };
                break;

              case "ESTATESFILES":
                var mergeObj = {
                    RECORDNO: this.estate[index]
                };
            }
            var returnObj = {};
            for (var attrname in basePassData) returnObj[attrname] = basePassData[attrname];
            for (var attrname in mergeObj) returnObj[attrname] = mergeObj[attrname];
            return returnObj;
        }
    };
    login.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;