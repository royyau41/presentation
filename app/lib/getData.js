var db=require('db').db;

exports.propGroup={
	
	getLastPropgroupNo:function(){
			var $sql='select max(number) number  from propgroup where deletedate =0 ';
			var res=runSql($sql);
		return res[0].number||0;

	}
};
exports.property={
	getList:function(propgroup,specClause,orderBy){
		if (typeof orderBy=='object'){}
		if (!orderBy)orderBy='';
		var $sql='select p.* from property as p  where PROPGROUPNO='+propgroup+ ' '+orderBy;
		
		return runSql($sql);
	},
	getFieldList:function(type,lang){
		var field={};
		var lang= Ti.App.Properties.getString('lang','c');
		switch(type.toLowerCase()){
			case 'propdetail':
			case 'propertydetail':
			var field={
				'narea'		:{field:'netarea'},
				'garea'		:{field:'grossarea'},
				'price'		:{field:'price',fieldType:'number',base:1000000,tool:'mortagageTool'},
				'rent'		:{field:'rent',fieldType:'number'},
				
				'possession':{field:lang+'_possession'},
				'availability':{field:lang+'_availability'},
				'floor'		:{field:'c_floor'},
				'decoration':{field:'decoration'},
				'carpark'	:{field:'carparks', returnType:'boolean'},
				'remarks'	:{field:lang+'_remarks',width:'100%'}
			};	
			break;		
			case 'propsearch':
			case 'propertysearch':
			var field={
				//'district'	:{field:lang+'_district'},
				'narea'		:{field:'netarea',fieldType:'number'},
				'price'		:{field:'price',fieldType:'number',base:1000000},
				'garea'		:{field:'grossarea',fieldType:'number'},
				'rent'		:{field:'rent',fieldType:'number'},
				'remarks'	:{field:lang+'_remarks',width:'100%'}
			};
			break;
		};
		return field;	
	},
	
	getDetail:function(number,propgroup){
		var $sql="select *,"+
				"availability as c_availability,"+
				"englishavail as e_availability,"+
				"(case possession when 1 then '交吉' when 2 then '連約' else '其他' end) as c_possession, "+
				"(case possession when 1 then 'Vacant' when 2 then 'TA' else 'Others' end) as e_possession "+
				"from property "+
				"where number="+number+" and propgroupno="+propgroup;
		var res=runSql($sql);
		 return res[0];
	}
	,getDetailById:function(id){
		var $sql="select *,"+
				"availability as c_availability,"+
				"englishavail as e_availability,"+
				"(case possession when 1 then '交吉' when 2 then '連約' else '其他' end) as c_possession, "+
				"(case possession when 1 then 'Vacant' when 2 then 'TA' else 'Others' end) as e_possession "+
				"from property "+
				"where id="+id+"";
		var res=runSql($sql);
		 return res[0];
	}
	,getImage:function(numberXML,propgroup){
		var $sql='select attachment as image from propertyfile where '+ 
		'propertyno=(select propertyno from property where number = '+numberXML+' and propgroupno='+propgroup+')'+
		'and attachment is not null '+
		'and propgroupno = '+propgroup;
		return runSql($sql);
	}
	,updateRead:function(clause){
		if (clause){
			var $sql='update property set  read=1 where '+clause;
			console.log($sql);
			return runSql($sql); 
		}
		else return false;
		

	}
};

exports.trans={
	getList:function(obj){
		$where='';
		for (var k in obj){
			
			if (obj[k]!=''){
				if ($where !=''){
					$where =$where +' and ';
				}
				
				$where = $where + k +' not in ('+obj[k]+') ';
			}
			
		}
		if ($where !=''){
					$where =' where ' + $where ;
		}
		var $sql='select * from trans'+$where;
		 return runSql($sql);
	}
	,getDistEst:function(){
		var $sql='select c_district,c_estate,e_district,e_estate from trans group by c_district,c_estate,e_district,e_estate order by c_district';
		 return runSql($sql);
	}
	
};

exports.doc={
	getList:function(){
		var $sql='select * from document where deletedate =0 ';
		 return runSql($sql);
	}
	,getDocument:function(number){
			var $sql='select * from document where '+ 
		' DOCUMENTTYPE = '+number +' '+
		' and deletedate=0';
		return runSql($sql);
	}
	
	
};




function runSql(sql){
	var res=db.getObjResultSet(sql);
		return res||{};
}
