var XMLTools = require("XMLTools");

var utf8 = require("utf8");

var xhrData = {
    xmlFormat: function(data) {
        var header = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"xmlns:xsd="http://www.w3.org/2001/XMLSchema"xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><data><group>';
        var elmXml = this.objToXml(data);
        var footer = "</group></data></soap:Body></soap:Envelope>";
        return header + elmXml + footer;
    },
    request: function(o, data, xml, tries, testUse) {
        Alloy.Globals.Loading.show();
        var url = data.ip ? "http://" + data.ip + ":88/getinfo" : "http://192.168.0.40:88/getinfo";
        var xhr = Titanium.Network.createHTTPClient();
        data = data || {};
        tries = tries || 0;
        xhr.open("POST", url);
        xhr.onload = function() {
            var xmldata = this.responseXML;
            testUse && console.log(this.responseText);
            if (null === xmldata) {
                if (5 > tries) {
                    tries++;
                    exports.xhrData.request(o, data, xml, tries);
                    return;
                }
                lalert("Error reading. Make sure you have a network connection and try refreshing.");
                o.error && o.error();
                return;
            }
            var xml2json = new XMLTools(xmldata).toJSON();
            xml2json = utf8.decode(xml2json);
            xml2json = JSON.parse(xml2json);
            xml2json = xml2json["soap:Body"].data.group;
            o.success ? o.success(xml2json) : Alloy.Globals.Loading.hide();
        };
        xhr.onerror = function(e) {
            o.error && o.error(e);
        };
        o.start && o.start();
        xhr.setRequestHeader("Content-Type", "text/xml");
        "object" == typeof xml && (xml = this.xmlFormat(xml));
        xhr.send(xml);
    },
    objToXml: function(obj) {
        var str = "";
        for (var k in obj) str += "<" + k + ">" + obj[k] + "</" + k + ">";
        return str;
    }
};

exports.xhrData = xhrData;