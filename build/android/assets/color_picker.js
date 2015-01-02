function cutHex(e){return"#"==e.charAt(0)?e.substring(1,7):e}function hexToR(e){return parseInt(cutHex(e).substring(0,2),16)}function hexToG(e){return parseInt(cutHex(e).substring(2,4),16)}function hexToB(e){return parseInt(cutHex(e).substring(4,6),16)}function hexToRgb(e){return{r:hexToR(e),g:hexToG(e),b:hexToB(e)}}function hueToRgb(e,t,i){var o;return 0>i?i+=1:i>1&&(i-=1),o=1>6*i?e+(t-e)*i*6:1>2*i?t:2>3*i?e+(t-e)*(2/3-i)*6:e,255*o}function hslToRgb(e,t,i){var o,r,l,a,n,s;return t/=100,i/=100,0==t?a=n=s=255*i:(r=.5>=i?i*(t+1):i+t-i*t,o=2*i-r,l=e/360,a=Math.round(hueToRgb(o,r,l+1/3)),n=Math.round(hueToRgb(o,r,l)),s=Math.round(hueToRgb(o,r,l-1/3))),{r:a,g:n,b:s}}function intToHex(e){return null==e?"00":0==e||isNaN(e)?"00":(e=Math.max(0,e),e=Math.min(e,255),e=Math.round(e),"0123456789ABCDEF".charAt((e-e%16)/16)+"0123456789ABCDEF".charAt(e%16))}function rgbToHex(e){return intToHex(e.r)+intToHex(e.g)+intToHex(e.b)}function rgbToHsl(e,t,i){e/=255,t/=255,i/=255;var o,r,l=Math.max(e,t,i),a=Math.min(e,t,i),n=(l+a)/2;if(l==a)o=r=0;else{var s=l-a;switch(r=n>.5?s/(2-l-a):s/(l+a),l){case e:o=(t-i)/s+(i>t?6:0);break;case t:o=(i-e)/s+2;break;case i:o=(e-t)/s+4}o/=6}return{h:Math.round(360*o),s:Math.round(100*r),l:Math.round(100*n)}}function hsvToRgb(e,t,i){var o,r,l,a,n,s,d,c;if(e=Math.max(0,Math.min(360,e)),t=Math.max(0,Math.min(100,t)),i=Math.max(0,Math.min(100,i)),t/=100,i/=100,0==t)return o=r=l=i,[Math.round(255*o),Math.round(255*r),Math.round(255*l)];switch(e/=60,a=Math.floor(e),n=e-a,s=i*(1-t),d=i*(1-t*n),c=i*(1-t*(1-n)),a){case 0:o=i,r=c,l=s;break;case 1:o=d,r=i,l=s;break;case 2:o=s,r=i,l=c;break;case 3:o=s,r=d,l=i;break;case 4:o=c,r=s,l=i;break;default:o=i,r=s,l=d}return{r:Math.round(255*o),g:Math.round(255*r),b:Math.round(255*l)}}function rgbToHsv(e,t,i){var o,r,l,a,n,s=e/255,d=t/255,c=i/255,_=Math.max(s,d,c),p=_-Math.min(s,d,c),u=function(e){return(_-e)/6/p+.5};return 0==p?a=n=0:(n=p/_,o=u(s),r=u(d),l=u(c),s===_?a=l-r:d===_?a=1/3+o-l:c===_&&(a=2/3+r-o),0>a?a+=1:a>1&&(a-=1)),{h:Math.round(360*a),s:Math.round(100*n),v:Math.round(100*_)}}exports.createColorPicker=function(e){var t,i,o;if(e.hexColor){var r=hexToRgb(e.hexColor),l=rgbToHsl(r.r,r.g,r.b);t=l.h,i=l.s,o=l.l}else t=0,i=100,o=50;var a=Ti.UI.createView({height:e.height||Ti.UI.FILL,width:e.width||Ti.UI.FILL}),n=Titanium.UI.createImageView({image:"/colorPicker/color.png",height:e.height||256,width:e.width||300,top:0,left:0}),s=Ti.UI.createImageView({image:"/colorPicker/circle.gif",width:11,height:11});return n.addEventListener("touchmove",function(e){t=Math.round(e.x/n.width*359),i=Math.round(100-e.y/n.height*100),o=Math.round(e.y/n.height*100),o>100&&(o=100),0>o&&(o=0),0>t?t=0:t>359&&(t=359),0>i?i=0:i>100&&(i=100);var r=hslToRgb(t,i,o),l=rgbToHex(r);rgbToHex(hslToRgb(t,i,50)),a.backgroundColor=l,a.fireEvent("selectedcolor",{color:l});var d=e.x,c=e.y;0>d&&(d=0),d>n.width&&(d=n.width),0>c&&(c=0),c>n.height&&(c=n.height),s.left=d+(n.left-s.width/2),s.top=c+(n.top-s.width/2)}),n.addEventListener("click",function(e){t=Math.round(e.x/n.width*359),i=Math.round(100-e.y/n.height*100),o=Math.round(e.y/n.height*100),o>100&&(o=100),0>o&&(o=0),0>t?t=0:t>359&&(t=359),0>i?i=0:i>100&&(i=100);var r=rgbToHex(hslToRgb(t,i,o));rgbToHex(hslToRgb(t,i,50)),a.backgroundColor=r,a.fireEvent("selectedcolor",{color:r});var l=e.x,d=e.y;0>l&&(l=0),l>n.width&&(l=n.width),0>d&&(d=0),d>n.height&&(d=n.height),s.left=l+(n.left-s.width/2),s.top=d+(n.top-s.width/2)}),a.add(n),a.add(s),a.backgroundColor=rgbToHex(hslToRgb(t,i,o)),0==o||100==o?(s.left=n.width+n.left-s.width/2,s.top=n.height+n.top-s.height/2):(s.left=t*(n.width/360)+(n.left-s.width/2),s.top=i*(n.height/100)+(n.top-s.height/2)-100),a};