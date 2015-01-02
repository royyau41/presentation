var toolBar = function(type) {
    this.direction = "bottom";
    this.email = "";
    this.type = type;
    this.createView();
    this.setEmail();
    this.setCancel();
    this.setForm();
    this.cencelEvent = false;
};

toolBar.prototype.getBtmView = function() {
    return this.view;
};

toolBar.prototype.show = function() {
    this.view.bottom = 0;
};

toolBar.prototype.setProperty = function(arr) {
    this.property = arr;
};

toolBar.prototype.setCencelEvent = function(func) {
    this.cencelEvent = func;
};

toolBar.prototype.setCancel = function() {
    var bottomView = this.view;
    var t = this;
    var cancel = Ti.UI.createButton({
        backgroundImage: "/funcIcon/cancel.png",
        width: 50,
        height: 50,
        style: "none",
        left: 10
    });
    cancel.addEventListener("click", function() {
        bottomView.bottom = -50;
        t.cencelEvent && t.cencelEvent();
    });
    this.view.add(cancel);
};

toolBar.prototype.setEmail = function() {
    var t = this;
    var email = Ti.UI.createImageView({
        image: "/funcIcon/email.png",
        width: 50,
        height: 50,
        right: 40
    });
    email.addEventListener("click", function() {
        var email = require("email").email;
        switch (t.type) {
          case "property":
            email.sendProperty(t.property);
            break;

          default:
            email.sendProperty(t.property);
        }
    });
    this.view.add(email);
};

toolBar.prototype.setForm = function() {
    var form = Ti.UI.createImageView({
        image: "/funcIcon/sign-up.png",
        width: 50,
        height: 50,
        right: 120
    });
    this.view.add(form);
};

toolBar.prototype.createView = function() {
    var view = Ti.UI.createView({
        bottom: -50,
        height: 50,
        width: "100%",
        backgroundColor: "#424242"
    });
    this.view = view;
};

module.exports = toolBar;