var XMLTools=function(e){"string"==typeof e&&(this.doc=Ti.XML.parseString(e).documentElement),"object"==typeof e&&(this.doc=e.documentElement)};XMLTools.prototype.getDocument=function(){return this.doc};var addToObject=function(e,o,l){if(null==e[o])e[o]=l;else if(e[o]instanceof Array)e[o].push(l);else{var t=e[o],r=[t,l];e[o]=r}return e},traverseTree=function(e){var o=!0,l={};if(e.hasChildNodes()){for(var t=0;t<e.childNodes.length;t++){var r=e.childNodes.item(t);if("#text"!=r.nodeName||""!=r.textContent.replace(/\n/g,"").replace(/ /g,""))if(3===r.nodeType||r.nodeType===r.CDATA_SECTION_NODE){if(1===e.childNodes.length&&!e.hasAttributes())return r.textContent;l.text=r.textContent}else l=addToObject(l,r.tagName,traverseTree(r))}o=!1}if(e.hasAttributes()){for(var a=0;a<e.attributes.length;a++){var s=e.attributes.item(a);l[s.nodeName]=s.nodeValue}o=!1}return l};XMLTools.prototype.toObject=function(){return null==this.doc?null:(this.obj=traverseTree(this.doc),this.obj)},XMLTools.prototype.toJSON=function(){return null==this.doc?null:(null==this.obj&&(this.obj=traverseTree(this.doc)),JSON.stringify(this.obj))},module.exports=XMLTools;