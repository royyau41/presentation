function __processArg(e,t){var i=null;return e&&(i=e[t]||null,delete e[t]),i}function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="login/login",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var e=this,t={};e.__views.logMainView=Ti.UI.createScrollView({borderColor:Alloy.Globals.showdowColor,borderRadius:8,height:Ti.UI.SIZE,layout:"vertical",top:"30",backgroundGradient:Alloy.Globals.basicBackgroundColor,width:"70%",left:"15%",right:"15%",id:"logMainView"}),e.__views.logMainView&&e.addTopLevelView(e.__views.logMainView),e.__views.__alloyId0=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId0"}),e.__views.logMainView.add(e.__views.__alloyId0),e.__views.__alloyId1=Ti.UI.createLabel({color:"black",textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,top:"3dp",left:0,width:"30%",text:"語言：",id:"__alloyId1"}),e.__views.__alloyId0.add(e.__views.__alloyId1),e.__views.switchLang=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.SIZE,top:10,left:5,layout:"horizontal",id:"switchLang"}),e.__views.__alloyId0.add(e.__views.switchLang),e.__views.__alloyId2=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId2"}),e.__views.logMainView.add(e.__views.__alloyId2),e.__views.__alloyId3=Ti.UI.createLabel({color:"black",textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,top:"3dp",left:0,width:"30%",text:"Host IP：",id:"__alloyId3"}),e.__views.__alloyId2.add(e.__views.__alloyId3),e.__views.IP=Ti.UI.createTextField({borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,font:{fontSize:12},color:"black",top:"0dp",width:"30%",zIndex:10,id:"IP",value:"192.168.0.40:88",enabled:"true"}),e.__views.__alloyId2.add(e.__views.IP),e.__views.__alloyId4=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId4"}),e.__views.logMainView.add(e.__views.__alloyId4),e.__views.__alloyId5=Ti.UI.createLabel({color:"black",textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,top:"3dp",left:0,width:"30%",text:"Login：",id:"__alloyId5"}),e.__views.__alloyId4.add(e.__views.__alloyId5),e.__views.USERCODE=Ti.UI.createTextField({borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,font:{fontSize:12},color:"black",top:"0dp",width:"30%",zIndex:10,id:"USERCODE"}),e.__views.__alloyId4.add(e.__views.USERCODE),e.__views.__alloyId6=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId6"}),e.__views.logMainView.add(e.__views.__alloyId6),e.__views.__alloyId7=Ti.UI.createLabel({color:"black",textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,top:"3dp",left:0,width:"30%",text:"Password：",id:"__alloyId7"}),e.__views.__alloyId6.add(e.__views.__alloyId7),e.__views.USERPASSWORD=Ti.UI.createTextField({borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,font:{fontSize:12},color:"black",top:"0dp",width:"30%",zIndex:10,id:"USERPASSWORD",passwordMask:"true"}),e.__views.__alloyId6.add(e.__views.USERPASSWORD),e.__views.__alloyId8=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId8"}),e.__views.logMainView.add(e.__views.__alloyId8),e.__views.__alloyId9=Ti.UI.createLabel({color:"black",textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,top:"3dp",left:0,width:"30%",text:"System Number：",id:"__alloyId9"}),e.__views.__alloyId8.add(e.__views.__alloyId9),e.__views.sn=Ti.UI.createTextField({borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,font:{fontSize:12},color:"black",top:"0dp",width:"30%",zIndex:10,id:"sn",enabled:"false"}),e.__views.__alloyId8.add(e.__views.sn),e.__views.dlData=Alloy.createWidget("nl.fokkezb.button","widget",{left:5,title:"下載資料",style:"bs-success",id:"dlData",__parentSymbol:e.__views.__alloyId8}),e.__views.dlData.setParent(e.__views.__alloyId8),e.__views.dlEstate=Alloy.createWidget("nl.fokkezb.button","widget",{title:" 測試用 ",style:"bs-success",id:"dlEstate",__parentSymbol:e.__views.__alloyId8}),e.__views.dlEstate.setParent(e.__views.__alloyId8),e.__views.__alloyId10=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId10"}),e.__views.logMainView.add(e.__views.__alloyId10),e.__views.__alloyId11=Ti.UI.createLabel({color:"black",textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,top:"3dp",left:0,width:"30%",text:"CurrentProperty Group：",id:"__alloyId11"}),e.__views.__alloyId10.add(e.__views.__alloyId11),e.__views.propGroupBtnView=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.SIZE,top:10,left:5,layout:"horizontal",id:"propGroupBtnView"}),e.__views.__alloyId10.add(e.__views.propGroupBtnView),e.__views.__alloyId12=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId12"}),e.__views.logMainView.add(e.__views.__alloyId12),e.__views.__alloyId13=Ti.UI.createLabel({color:"black",textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,top:"3dp",left:0,width:"30%",text:"樓盤詳細頁面：",id:"__alloyId13"}),e.__views.__alloyId12.add(e.__views.__alloyId13),e.__views.switchPage=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.SIZE,top:10,left:5,layout:"horizontal",id:"switchPage"}),e.__views.__alloyId12.add(e.__views.switchPage),e.__views.__alloyId14=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId14"}),e.__views.logMainView.add(e.__views.__alloyId14),e.__views.__alloyId15=Ti.UI.createLabel({color:"black",textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,top:"3dp",left:0,width:"30%",text:"目錄樣式：",id:"__alloyId15"}),e.__views.__alloyId14.add(e.__views.__alloyId15),e.__views.switchMenu=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.SIZE,top:10,left:5,layout:"horizontal",id:"switchMenu"}),e.__views.__alloyId14.add(e.__views.switchMenu),e.__views.__alloyId16=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId16"}),e.__views.logMainView.add(e.__views.__alloyId16),e.__views.__alloyId17=Ti.UI.createLabel({color:"black",textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,top:"3dp",left:0,width:"30%",text:"Sql：",id:"__alloyId17"}),e.__views.__alloyId16.add(e.__views.__alloyId17),e.__views.sqlArea=Ti.UI.createTextArea({color:"black",borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,font:{fontSize:12},top:"0dp",width:"30%",zIndex:10,id:"sqlArea",height:"70",editable:"true"}),e.__views.__alloyId16.add(e.__views.sqlArea),e.__views.sqlBtn=Alloy.createWidget("nl.fokkezb.button","widget",{title:"Sql",style:"bs-success",id:"sqlBtn",__parentSymbol:e.__views.__alloyId16}),e.__views.sqlBtn.setParent(e.__views.__alloyId16),e.__views.__alloyId18=Ti.UI.createView({width:Ti.UI.FILL,layout:"horizontal",top:10,height:Ti.UI.SIZE,id:"__alloyId18"}),e.__views.logMainView.add(e.__views.__alloyId18),e.__views.loginBtn=Alloy.createWidget("nl.fokkezb.button","widget",{left:"30%",title:"Login",style:"bs-success",id:"loginBtn",__parentSymbol:e.__views.__alloyId18}),e.__views.loginBtn.setParent(e.__views.__alloyId18),t.destroy=function(){},_.extend(e,e.__views);var i=arguments[0]||{},o=require("xhrData").xhrData,r=require("db").db,a=Ti.App.Properties.getObject("loginInfo",!1),l={},s=1,n=i.win,d=new baseUi(!0,!1),c=d.getProgressBar();n.add(c),c.hide(),Alloy.Globals.Loading=c;var p={init:function(){a&&(e.USERCODE.value=a.USERCODE,e.USERPASSWORD.value=a.USERPASSWORD,e.sn.value=a.sn,e.IP.value=a.ip,l={ip:a.ip},this.setPropGroupBtn()),this.setPropPage(),this.setMenuStyle(),this.setLang(),this.setEventListener()},setPropGroupBtn:function(){var t="select filename,number from propgroup where deletedate =0 order by updateinfo ",i=r.getObjResultSet(t);for(var o in e.propGroupBtnView.children)e.propGroupBtnView.children.hasOwnProperty(0)&&e.propGroupBtnView.remove(e.propGroupBtnView.children[0]);for(var a=[],l=0;l<i.length;l++)a[l]=Ti.UI.createButton({title:i[l].filename,propgroup:i[l].number,width:Ti.UI.SIZE,left:"10dp",height:Ti.UI.SIZE,font:{fontSize:"15dp"},color:"#FFFFFF",borderRadius:4,backgroundGradient:Alloy.Globals.btnInitColor}),a[l].width=pToD(a[l].toImage().width)+10,e.propGroupBtnView.add(a[l]),a[l].addEventListener("touchstart",function(e){for(var t=0;t<a.length;t++)a[t].setBackgroundGradient(Alloy.Globals.btnInitColor);e.source.setBackgroundGradient(Alloy.Globals.btnSelectedColor),Ti.App.Properties.setInt("propgroup",e.source.propgroup)});if(Ti.App.Properties.getInt("propgroup",0))for(var l=0;l<a.length;l++)a[l].propgroup==Ti.App.Properties.getInt("propgroup",0)&&a[l].setBackgroundGradient(Alloy.Globals.btnSelectedColor)},setPropPage:function(){for(var t=[],i=0;2>i;i++)t[i]=Ti.UI.createButton({title:i+1,pageStyle:i+1,width:Ti.UI.SIZE,left:"10dp",height:Ti.UI.SIZE,font:{fontSize:"15dp"},color:"#FFFFFF",borderRadius:4,backgroundGradient:Alloy.Globals.btnInitColor}),t[i].width=pToD(t[i].toImage().width)+10,e.switchPage.add(t[i]),t[i].addEventListener("click",function(e){for(var i=0;i<t.length;i++)t[i].setBackgroundGradient(Alloy.Globals.btnInitColor);e.source.setBackgroundGradient(Alloy.Globals.btnSelectedColor),Ti.App.Properties.setInt("propPage",e.source.pageStyle)});if(Ti.App.Properties.getInt("propPage",1))for(var i=0;i<t.length;i++)console.log(t[i].pageStyle+"    "+Ti.App.Properties.getInt("propPage",1)),t[i].pageStyle==Ti.App.Properties.getInt("propPage",1)&&t[i].setBackgroundGradient(Alloy.Globals.btnSelectedColor)},setLang:function(){for(var t=["c","e"],i=["中文","Eng"],o=[],r=0;2>r;r++)o[r]=Ti.UI.createButton({title:i[r],lang:t[r],width:Ti.UI.SIZE,top:0,left:"10dp",height:Ti.UI.SIZE,font:{fontSize:"15dp"},color:"#FFFFFF",borderRadius:4,backgroundGradient:Alloy.Globals.btnInitColor}),o[r].width=pToD(o[r].toImage().width)+10,e.switchLang.add(o[r]),o[r].addEventListener("click",function(e){for(var t=0;t<o.length;t++)o[t].setBackgroundGradient(Alloy.Globals.btnInitColor);e.source.setBackgroundGradient(Alloy.Globals.btnSelectedColor),Ti.App.Properties.setString("lang",e.source.lang),console.log(e.source.lang)});if(Ti.App.Properties.getString("lang","c"))for(var r=0;r<o.length;r++)o[r].lang==Ti.App.Properties.getString("lang","c")&&o[r].setBackgroundGradient(Alloy.Globals.btnSelectedColor)},setMenuStyle:function(){for(var t=[],i=0;2>i;i++)t[i]=Ti.UI.createButton({title:i+1,menuStyle:i,width:Ti.UI.SIZE,left:"10dp",height:Ti.UI.SIZE,font:{fontSize:"15dp"},color:"#FFFFFF",borderRadius:4,backgroundGradient:Alloy.Globals.btnInitColor}),t[i].width=pToD(t[i].toImage().width)+10,e.switchMenu.add(t[i]),t[i].addEventListener("click",function(e){for(var i=0;i<t.length;i++)t[i].setBackgroundGradient(Alloy.Globals.btnInitColor);e.source.setBackgroundGradient(Alloy.Globals.btnSelectedColor),Ti.App.Properties.setInt("menuStyle",e.source.menuStyle);var o={menu:e.source.menuStyle};Ti.App.fireEvent("MenuStyle",o)});if(Ti.App.Properties.getInt("menuStyle",0))for(var i=0;i<t.length;i++)t[i].menuStyle==Ti.App.Properties.getInt("menuStyle",0)&&t[i].setBackgroundGradient(Alloy.Globals.btnSelectedColor)},setEventListener:function(){e.loginBtn.addEventListener("click",function(){Alloy.Globals.Loading.setMessage(""),p.checkValidation()?p.checkLogin():alert("Error")}),e.dlData.addEventListener("click",function(){a=Ti.App.Properties.getObject("loginInfo",!1),a&&(s=1,u.dlProcess())}),e.dlEstate.addEventListener("click",function(){o.testuse()}),e.sqlBtn.addEventListener("click",function(){console.log(r.getObjResultSet(e.sqlArea.value))})},checkLogin:function(){Ti.App.Properties.removeProperty("loginInfo"),e.sn.value="",l={ip:e.IP.value};var t=this.getLogininfo();o.request({success:function(e){switch(e.NUMBER){case"-1":alert("invalid user"),c.hide();break;case"-2":alert("incorrect password!"),c.hide();break;default:p.successLogin(e.NUMBER,t)}},error:function(){}},l,t)},successLogin:function(t,i){r.deleteData(),this.setPropGroupBtn(),Ti.App.Properties.setInt("propgroup",0),i.sn=t,i.ip=e.IP.value,e.sn.value=t,Ti.App.Properties.setObject("loginInfo",i),Alloy.Globals.LoadingShow("Login Success!")},checkValidation:function(){return e.USERCODE.value&&e.USERPASSWORD.value?!0:!1},getLogininfo:function(){var t={FUNCTIONNAME:"Register",USERCODE:e.USERCODE.value.toUpperCase(),USERPASSWORD:e.USERPASSWORD.value,Device_ID:Ti.Platform.id};return t}},u={propgroup:[],property:[],estate:[],newdev:[],doc:[],dlProcess:function(e){if(""==e||null==e?(e=s,s++):(s=e,s++),a=Ti.App.Properties.getObject("loginInfo",!1),l={ip:a.ip},a)switch(e){case 1:Alloy.Globals.Loading.setMessage("下載樓盤組合中"),this.getDataRequest(0,"PROPGROUP","propgroup",!0,"NUMBER");break;case 2:p.setPropGroupBtn();var t="select number as propgroup from propgroup as p where not exists(select id from property as f where f.propgroupno=p.number) and deletedate=0 ";this.propgroup=r.getObjResultSet(t),Alloy.Globals.Loading.setMessage("下載樓盤中"),this.getDataRequest(0,"PROPERTIES","property",!1,"RECORDGROUP");break;case 3:var t="select propertyno,propgroupno as propgroup from property as p where not exists(select id from propertyfile as f where f.propertyno=p.propertyno and f.propgroupno=p.propgroupno) ";this.property=r.getObjResultSet(t),Alloy.Globals.Loading.setMessage("下載樓盤圖片中"),this.getDataRequest(0,"PROPERTIESFILES","propertyfile",!1,"PROPGROUPNO");break;case 4:Alloy.Globals.Loading.setMessage("下載屋苑資料中"),this.getDataRequest(0,"ESTATES","estate",!0,"DELETEDATE");break;case 5:var t="select ESTATENO from estate as e where not exists(select id from estatefile as f where f.estateno=e.estateno ) and deletedate =0 ";this.estate=r.getObjResultSet(t),Alloy.Globals.Loading.setMessage("下載屋苑圖片中"),this.getDataRequest(0,"ESTATESFILES","estatefile",!1,"ESTATENO");break;case 6:Alloy.Globals.Loading.setMessage("下載一手樓盤資料中"),this.getDataRequest(0,"NEWDEV","newdev",!0,"NUMBER");break;case 7:var t="select number from newdev as e where not exists(select id from newdevfile as f where f.newdevelopmentno=e.number )";this.newdev=r.getObjResultSet(t),Alloy.Globals.Loading.setMessage("下載一手樓盤檔案中"),this.getDataRequest(0,"NEWDEVFILES","newdevfile",!1,"NEWDEVELOPMENTNO");break;case 8:Alloy.Globals.Loading.setMessage("下載成交資料中"),this.getDataRequest(0,"TRANSACTIONS","trans",!0,"TRANSACDATE");break;case 9:Alloy.Globals.Loading.setMessage("下載文件中"),this.getDataRequest(0,"DOCTYPE","doctype",!0,"NUMEBR");break;case 10:Alloy.Globals.Loading.setMessage("下載文件項目中");var t="select number from doctype as p where not exists(select id from document as f where f.DOCUMENTTYPE=p.number) and (deletedate=0) group by number";this.doc=r.getObjResultSet(t),console.log(this.doc),this.getDataRequest(0,"DOCUMENTS","document",!1,"NUMBER");break;case 99:s=0,Alloy.Globals.LoadingShow("下載失敗");break;default:s=0,Alloy.Globals.LoadingShow("下載完成")}},modifyData:function(e,t){switch(e){case"PROPERTIES":t.RECORDGROUP.PROPGROUPNO=t.PROPGROUPNO,t.RECORDGROUP.ATTACHMENT=t.ATTACHMENT||"",t=t.RECORDGROUP;break;case"PROPERTIESFILES":}return t},getDataRequest:function(e,t,i,a,s,n){(""==e||null==e)&&(e=0);var d=this.getPassData(t,e);d?o.request({success:function(o){if(n)console.log(o);else{if(o)if(o[s])r.insertData(i,u.modifyData(t,o));else for(var l in o)r.insertData(i,u.modifyData(t,o[l]));e++,a?u.dlProcess():u.getDataRequest(e,t,i,a,s)}},error:function(e){u.dlProcess(99,e)}},l,d):u.dlProcess()},getPassData:function(e,t){var i={FUNCTIONNAME:e,USERCODE:a.USERCODE,USERNO:a.sn,Device_ID:Ti.Platform.id},o={};switch(e){case"PROPGROUP":var l=r.getObjResultSet("Select max(updateinfo) as updateinfo  from propgroup ");o={UPDATEINFO:l[0].updateinfo||0};break;case"PROPERTIES":if(!this.propgroup[t])return!1;console.log("test:"+this.propgroup[t].propgroup),o={USERNO:this.propgroup[t].propgroup};break;case"PROPERTIESFILES":if(!u.property[t])return!1;var o={RECORDNO:u.property[t].propertyno,GROUPNO:u.property[t].propgroup};break;case"ESTATES":console.log("test");var l=r.getObjResultSet("Select max(updateinfo) as updateinfo  from estate "),o={UPDATEINFO:l[0].updateinfo||0};break;case"ESTATESFILES":if(!this.estate[t])return!1;var o={RECORDNO:this.estate[t].estateno};break;case"NEWDEV":var l=r.getObjResultSet("Select max(updateinfo) as updateinfo  from newdev "),o={UPDATEINFO:l[0].updateinfo||0};break;case"NEWDEVFILES":if(!this.newdev[t])return!1;var o={RECORDNO:this.newdev[t].number};break;case"TRANSACTIONS":var l=r.getObjResultSet("Select max(transacdate) as updateinfo  from trans "),o={UPDATEINFO:l[0].updateinfo||0};break;case"doctype":var l=r.getObjResultSet("Select max(transacdate) as updateinfo  from trans "),o={UPDATEINFO:l[0].updateinfo||0};break;case"DOCUMENTS":if(!this.doc[t])return!1;var o={RECORDNO:this.doc[t].number}}var s={};for(var n in i)s[n]=i[n];for(var n in o)s[n]=o[n];return s}};p.init(),_.extend(e,t)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;