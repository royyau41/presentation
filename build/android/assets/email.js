function genpropHtml(e){var t=getData.property.getDetailById(e),i=t.c_premises,o={district:{field:"c_district",display:"區域"},narea:{field:"netarea",display:"實用面積"},garea:{field:"grossarea",display:"建築面積"},price:{field:"price",fieldType:"number",base:1e6,display:"售價"},rent:{field:"rent",fieldType:"number",display:"租金"}},r="";for(var l in o){var a="number"==o[l].fieldType?comjs.addCommas(t[o[l].field]*(o[l].base||1))||"":t[o[l].field]||"";r=r+o[l].display+":"+a+" <br/> "}var n='<div style="width:600px;margin:0 auto;border:1px solid #BFBFBF"> <div class="title" style="height: 36px; line-height: 36px; vertical-align: middle; border: 1px solid #BFBFBF; background: #F1F1F1; margin-bottom: 10px; padding-left: 10px; color: #555; font-size: 14px; ">'+i+'</div> <div class="clear"></div> <div class="content" style="font-size: 14px;"> <table style=" line-height:150%""> <tr valign="top""> '+r+"</tr> </table> </div></div>";return n}var getData=require("getData"),comjs=require("common"),email={sendProperty:function(e){var t=Ti.UI.createEmailDialog();switch(t.subject="樓盤資料",t.html=!0,typeof e){case"object":message="",_.each(e,function(e){message+=genpropHtml(e)+"<br/><br/>"}),t.messageBody=message;break;default:t.messageBody=genpropHtml(e)}t.open()}},htmlHeader='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" >	 <title> </title> </head> <body > ',htmlFooter="</div> </body> </html>";exports.email=email;