function genpropHtml(id) {
    var propDetail = getData.property.getDetailById(id);
    var address = propDetail["c_premises"];
    var detail_item = {
        district: {
            field: "c_district",
            display: "區域"
        },
        narea: {
            field: "netarea",
            display: "實用面積"
        },
        garea: {
            field: "grossarea",
            display: "建築面積"
        },
        price: {
            field: "price",
            fieldType: "number",
            base: 1e6,
            display: "售價"
        },
        rent: {
            field: "rent",
            fieldType: "number",
            display: "租金"
        }
    };
    var detailhtml = "";
    for (var k in detail_item) {
        var value = "number" == detail_item[k].fieldType ? comjs.addCommas(propDetail[detail_item[k].field] * (detail_item[k].base || 1)) || "" : propDetail[detail_item[k].field] || "";
        detailhtml = detailhtml + '<tr valign="top""> <td>' + detail_item[k].display + "</td> <td>:</td> <td>" + value + "</td></tr> ";
    }
    var propHtml = '<div style="width:600px;margin:0 auto;border:1px solid #BFBFBF"> <div class="title" style="height: 36px; line-height: 36px; vertical-align: middle; border: 1px solid #BFBFBF; background: #F1F1F1; margin-bottom: 10px; padding-left: 10px; color: #555; font-size: 14px; ">' + address + '</div> <div class="clear"></div> <div class="content" style="font-size: 14px;"> <table style=" line-height:150%""> <tr valign="top""> ' + detailhtml + "</tr> </table> </div></div>";
    return propHtml;
}

var getData = require("getData");

var comjs = require("common");

var email = {
    sendProperty: function(id) {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "樓盤資料";
        emailDialog.html = true;
        switch (typeof id) {
          case "object":
            message = "";
            _.each(id, function(e) {
                message += genpropHtml(e) + "<br/><br/>";
            });
            emailDialog.messageBody = message;
            break;

          default:
            emailDialog.messageBody = genpropHtml(id);
        }
        emailDialog.open();
    }
};

var htmlHeader = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" >	 <title> </title> </head> <body > ';

var htmlFooter = "</div> </body> </html>";

exports.email = email;