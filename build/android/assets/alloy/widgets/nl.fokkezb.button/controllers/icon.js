function WPATH(e){var t=e.lastIndexOf("/"),i=-1===t?"nl.fokkezb.button/"+e:e.substring(0,t)+"/nl.fokkezb.button/"+e.substring(t+1);return 0!==i.indexOf("/")?"/"+i:i}function __processArg(e,t){var i=null;return e&&(i=e[t]||null,delete e[t]),i}function Controller(){function e(e){var t,i={};e.spacing&&(e.title||e.titleid)&&("right"!==e.iconPosition?i.right=e.spacing:i.left=e.spacing),"undefined"!=typeof e.iconSize&&(n=e.iconSize),"image"===s||e.icon&&-1!==e.icon.indexOf(".")?(n&&(_.isArray(n)?(i.width=n[0],i.height=n[1]):_.isObject(n)?(n.width&&(i.width=n.width),n.height&&(i.height=n.height)):i.width=i.height=n),e.icon&&(d=e.icon,a&&"image"===s?i.image=d:(t=Ti.UI.createImageView(_.extend({width:Ti.UI.SIZE,height:Ti.UI.SIZE,image:d,touchEnabled:!1},i)),i={},a&&o.iconWrap.remove(a),o.iconWrap.add(t),a=t,s="image",l=null))):("font"===s||e.icon&&-1===e.icon.indexOf("."))&&((!l||e.iconFont&&e.iconFont!==c)&&e.iconFont&&(c=e.iconFont),i.font=e.font?_.clone(e.font):o.iconWrap.font||{},n&&(i.font.fontSize=n),i.font.fontFamily=c,_.extend(i,_.pick(e,"color","shadowOffset","shadowColor")),e.icon&&(d=e.icon,i.text=d,a&&"font"===s||(t=Ti.UI.createLabel(_.extend({touchEnabled:!1,textAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM},i)),i={},a&&o.iconWrap.remove(a),o.iconWrap.add(t),a=t,s="font"))),_.isEmpty(i)||a.applyProperties(i)}function t(t,i){return e({icon:t,iconFont:i})}function i(){return{icon:d,iconFont:c}}new(require("alloy/widget"))("nl.fokkezb.button"),this.__widgetId="nl.fokkezb.button",require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="icon",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var o=this,r={};o.__views.iconWrap=Ti.UI.createView({width:Ti.UI.SIZE,height:Ti.UI.SIZE,touchEnabled:!1,id:"iconWrap"}),o.__views.iconWrap&&o.addTopLevelView(o.__views.iconWrap),r.destroy=function(){},_.extend(o,o.__views);var l,a,n,s="font",d="icon-sign-blank",c="FontAwesome";Object.defineProperty(o,"icon",{get:i,set:t}),arguments[0]&&e(arguments[0]),r.applyProperties=e,r.getIcon=i,r.setIcon=t,_.extend(o,r)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;