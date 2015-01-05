var string = function(type) {
    var addr = {
        zh: "地址",
        en: "Address"
    };
    return eval(type + "[Ti.App.Properties.getString('langIso','zh')]");
};

exports.reStr = string;