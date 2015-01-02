/**
 * @author Roy Yau
 */
exports.mortagageTool=function(obj)
{
	var basicui=new baseUi(true);
	var mor= basicui.getMortagageView();
	
	if (obj.win){
		obj.win.add(mor);
		}
		
		
			
		
		
		
	var morImg=Ti.UI.createImageView({
		width:27,
		height:40,
		backgroundImage:'/temp/calculator1.png'
	});
	morImg.addEventListener('click',function(){
		
				var slideIn = Ti.UI.createAnimation({
					left:10,
					duration:200
				});
				
			if (OS_IOS)
				mor.animate(slideIn);
			else {
				
				for (var i=mor.left;i<=0;i=i+1){
					
			  		mor.left=i;	
			  	}
				
			}
		
	});
	
	return morImg;
};
 
 
