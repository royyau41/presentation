function __processArg(e,t){var i=null;return e&&(i=e[t]||null,delete e[t]),i}function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="profile/profile",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var e=this,t={};e.__views.profile=Ti.UI.createView({id:"profile"}),e.__views.profile&&e.addTopLevelView(e.__views.profile),e.__views.profileView=Ti.UI.createView({borderColor:Alloy.Globals.showdowColor,borderRadius:5,height:500,layout:"vertical",top:"50",backgroundGradient:Alloy.Globals.basicBackgroundColor,width:"70%",left:"15%",right:"15%",id:"profileView"}),e.__views.profile.add(e.__views.profileView),e.__views.companyNameLabel=Ti.UI.createLabel({color:"#006865",font:{fontSize:24,fontWeight:"bold"},left:270,top:20,text:"創思商業有限公司",id:"companyNameLabel"}),e.__views.profileView.add(e.__views.companyNameLabel),e.__views.profileContent=Ti.UI.createLabel({color:"black",left:20,top:20,text:"創立於1986年，香港四大地產代理之一。\n我們以「給您最好的選擇」的理念，\n為每一位尊貴客戶提供最全面、最專的服務，\n創立20多年來，屢獲業界殊榮，地位備受肯定。",id:"profileContent"}),e.__views.profileView.add(e.__views.profileContent),t.destroy=function(){},_.extend(e,e.__views),_.extend(e,t)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;