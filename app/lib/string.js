/**
 * @author Roy Yau
 */
var string =function(type){
	type=type.toLowerCase();
	
	
	var forprice={'zh':'出售','en':'For Sell'};
	var forrent={'zh':'出租','en':'For Rent'};
	var others={'zh':'其他資料','en':'Others'};
	var remarks={'zh':'備註','en':'Remarks'};
	
	var orderdesc={'zh':'遞減','en':'Desc'};
	var orderasc={'zh':'遞增','en':'Asc'};
	
	var rent ={'zh':'租金','en':'Rent'};
	var price ={'zh':'售價','en':'Price'};
	var addr={'zh':'地址','en':'Address'};
	var narea={'zh':'實用面積','en':'Net Area'};
	var area={'zh':'面積','en':'Area'};
	var netunit={'zh':'實用','en':'Net'};
	var grossunit={'zh':'建築','en':'Gross'};
	
	return eval(type+'[Ti.App.Properties.getString(\'langIso\',\'zh\')]'); 
};



exports.reStr=string;