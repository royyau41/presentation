function __processArg(t,e){var r=null;return t&&(r=t[e]||null,delete t[e]),r}function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="doc/docDetailTmpl1",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var t=this,e={};e.destroy=function(){},_.extend(t,t.__views),Ti.App.Properties.getObject("loginInfo",!1);var r=require("viewFile").viewFile,i=require("getData").property,o=arguments[0]||{},s=o.win,n={titleView:null,detailView:null,init:function(){this.genPropItemView(),this.setImage()},genPropItemView:function(){var e="c",r=comjs.getDetailField("propDetail",e),n=i.getDetail(o.propertyno);t.rePropDtlAddr.text=n[e+"_premises"],t.rePropDtlAddr.setWidth(pToD(t.rePropDtlAddr.toImage().width)+10),t.rePropDtlAddr.setHeight(pToD(t.rePropDtlAddr.toImage().height));for(var a=0,l=0;1>l;l++)for(var c in r){if(-1==c.indexOf("empty")){var h=Ti.UI.createView({layout:"horizontal",width:r[c].width||"40%",height:Ti.UI.SIZE,bubbleParent:!1,left:"10dp"}),u=Ti.UI.createLabel({text:Alloy.Globals.getfieldTitle(c,e),font:{fontSize:16},top:"10dp",left:0,width:"80dp",color:"#176f5e"}),d=Ti.UI.createLabel({text:comjs.displayValue(r[c],n[r[c].field],c),font:{fontSize:16},top:"10dp",left:0,color:"#999"});if(("development"==Ti.App.deployType||"test"==Ti.App.deployType)&&(comjs.changeColor(u,s),comjs.changeColor(d,s)),h.add(u),h.add(d),r[c].tool)switch(r[c].tool){case"mortagageTool":var p={win:s,price:n[r[c].field]*(r[c].base||1)},_=tools.mortagageTool(p);h.add(_)}t.rePropDtlInfoView.add(h)}else{var h=Ti.UI.createView({layout:"horizontal",width:"40%",height:Ti.UI.SIZE,left:"10dp"}),d=Ti.UI.createLabel({text:"",font:{fontSize:16},top:"10dp",left:0,color:"#999"});h.add(d),t.rePropDtlInfoView.add(h)}a++}console.log(pToD(t.rePropDtlInfoView.toImage().width));var f=Ti.UI.createView({width:"100%",height:"20",left:"10dp"});t.rePropDtlInfoView.add(f)},setImage:function(){var e=i.getImage(o.propertyno,o.propgroup);if(t.rePropDtlScrollImgView.setHeight(.45*(Alloy.Globals.DisplayHeight-Alloy.Globals.titleHeight-20)),e)for(var s=.4*(Alloy.Globals.DisplayHeight-Alloy.Globals.titleHeight-20),n=0;n<e.length;n++){var a=Ti.UI.createView({width:.38*(Alloy.Globals.DisplayHeight-20)+"dp",height:s+10+"dp",left:"20dp",top:"8dp",left:"10dp"});if(e[n]){var l=Ti.UI.createImageView({image:Ti.Utils.base64decode(e[n].image),focusable:!0});l.addEventListener("click",function(t){r("img",t.source.image)}),a.add(l)}t.rePropDtlScrollImgView.add(a)}}};n.init(),_.extend(t,e)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;