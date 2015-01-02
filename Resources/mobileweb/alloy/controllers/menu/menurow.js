function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu/menurow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.table && $.addTopLevelView($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var menu = {
        base: [ {
            image: "/menu/recommendProp.png",
            view: "reProp/rePropMainLayout",
            text: "ae"
        }, {
            image: "/menu/firstHand.png",
            view: "",
            text: "a23e"
        }, {
            image: "/menu/nearEstate.png",
            view: "neEstate/neEstateMainLayout",
            text: "12312ae"
        }, {
            image: "/menu/daybook.png",
            view: "",
            text: "asgagsde"
        }, {
            image: "/menu/mortagage.png",
            view: "mortagage/mortagageMain",
            text: "1235wfsae"
        }, {
            image: "/menu/tools.png",
            view: "",
            text: "a12qsdae"
        }, {
            image: "/menu/aboutus.png",
            view: "",
            text: "a12ewqdase"
        }, {
            image: "/menu/login.png",
            view: "login/login",
            text: "sdfsbdae"
        } ],
        init: function() {
            this.setMenu();
        },
        setMenu: function() {
            var data = [];
            for (var k in this.base) if (this.base[k].view) {
                var row = Ti.UI.createTableViewRow({
                    className: "forumEvent",
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    showView: this.base[k]["view"]
                });
                var image = Ti.UI.createImageView({
                    width: "114dp",
                    height: "95dp",
                    left: "10dp",
                    top: "10dp",
                    image: this.base[k]["image"]
                });
                row.add(image);
                data.push(row);
            }
            $.table.setData(data);
        }
    };
    menu.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;