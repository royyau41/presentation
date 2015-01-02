var db=require('db').db;

var  test={
	init:function(){
		var pdf=database.getNewDev();
		pdf=pdf[0];
		
		var file=Ti.Utils.base64decode(pdf.attachment);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'test.pdf');
		f.write(file); // write to the file
		//var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'test.pdf');
		//$.webview.setData(Ti.Utils.base64decode(pdf.attachment));
		//$.webview.setData(f.read());
		$.webview.setUrl('https://docs.google.com/viewer?url='+Ti.Filesystem.tempDirectory+'/test.pdf');
		setTimeout(function(){
    		$.win.close();
	}, 15000);

	}
	
};

var database ={
	getNewDev:function(propgroup){
		var $sql="select attachment from newdevfile  where filename like '%.pdf'"; 
		//where deletedate =0 ';
		var res=db.getObjResultSet($sql);
		return res||{};
	}
};
test.init();
