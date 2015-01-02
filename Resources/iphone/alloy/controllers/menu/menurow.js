function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu/menurow";
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
    $.__views.table = Ti.UI.createTableView({
        width: 116,
        height: Ti.Platform.displayCaps.platformHeight,
        borderWidth: 1,
        borderColor: "brown",
        backgroundColor: "black",
        selectBackgroundColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "table"
    });
    $.__views.table && $.addTopLevelView($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var menu = {
        init: function() {
            base = getMenu(Ti.App.Properties.getInt("menuStyle", 0)), this.setMenu(base);
        },
        setMenu: function(base) {
            var data = [];
            for (var k in base) if (base[k].view) {
                var row = Ti.UI.createTableViewRow({
                    className: "forumEvent",
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    showView: base[k]["view"],
                    rightButton: base[k]["rightButton"]
                });
                var image = Ti.UI.createImageView({
                    width: "114",
                    height: "95",
                    top: "0",
                    image: base[k]["image"]
                });
                row.add(image);
                data.push(row);
            }
            $.table.setData(data);
        }
    };
    var getMenu = function(type) {
        var base = [];
        switch (type) {
          case 0:
            base = [ {
                image: "/menu/menu10.png",
                view: "reProp/rePropMainLayout",
                rightButton: "/title/recRt.png"
            }, {
                image: "/menu/menu9.png",
                view: "newdev/newdevMainLayout",
                rightButton: "/title/newRt.png"
            }, {
                image: "/menu/menu5.png",
                view: "trans/transMainLayout",
                rightButton: "/title/transRt.png"
            }, {
                image: "/menu/menu3.png",
                view: "mortgage/mortgageMain",
                rightButton: "/title/calcuRt.png"
            }, {
                image: "/menu/menu6.png",
                view: "doc/docMainLayout",
                rightButton: "/title/salesRt.png"
            }, {
                image: "/menu/menu4.png",
                view: "profile/profile",
                rightButton: "/title/profileRt.png"
            }, {
                image: "/menu/login2.png",
                view: "login/login",
                rightButton: "/title/loginRt.png"
            } ];
            break;

          case 1:
            base = [ {
                image: "/menu/colorMenu/menu10.png",
                view: "reProp/rePropMainLayout",
                rightButton: "/title/recRt.png"
            }, {
                image: "/menu/colorMenu/menu9.png",
                view: "newdev/newdevMainLayout",
                rightButton: "/title/newRt.png"
            }, {
                image: "/menu/colorMenu/menu5.png",
                view: "trans/transMainLayout",
                rightButton: "/title/transRt.png"
            }, {
                image: "/menu/colorMenu/menu3.png",
                view: "mortgage/mortgageMain",
                rightButton: "/title/calcuRt.png"
            }, {
                image: "/menu/colorMenu/menu6.png",
                view: "doc/docMainLayout",
                rightButton: "/title/salesRt.png"
            }, {
                image: "/menu/colorMenu/menu4.png",
                view: "profile/profile",
                rightButton: "/title/profileRt.png"
            }, {
                image: "/menu/colorMenu/login2.png",
                view: "login/login",
                rightButton: "/title/loginRt.png"
            } ];
        }
        return base;
    };
    Ti.App.addEventListener("MenuStyle", function(e) {
        var base = [];
        base = getMenu(e.menu);
        menu.setMenu(base);
    });
    menu.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;