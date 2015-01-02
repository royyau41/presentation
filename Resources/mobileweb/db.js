var utf8 = require("utf8");

var db = {
    database: "",
    blobField: [],
    init: function() {
        this.checkTable();
    },
    checkTable: function() {
        this.database = Ti.Database.open("astPresentation");
        this.database.execute("CREATE TABLE IF NOT EXISTS propgroup( id INTEGER PRIMARY KEY AUTOINCREMENT, number integer, filename text,  recordtype integer,  images integer, deletedate integer, updateinfo text);");
        this.database.execute("CREATE TABLE IF NOT EXISTS property( id INTEGER PRIMARY KEY AUTOINCREMENT, number integer, intno integer,  propertyno integer,  e_title text, c_title text, e_premises text, c_premises text, districtno integer, E_DISTRICT text, C_DISTRICT text, ESTATENO integer, E_ESTATE text, C_ESTATE text, BUILDINGNO integer, E_BUILDING text, C_BUILDING text, STREETNO integer, E_STREET text, C_STREET text, STREETNUMBER text, STAGE text, BLOCK text, FLOOR text, C_FLOOR text, FLAT text, SETHIGHMIDLOW text, HIDEUNIT integer, POSSESSION integer, AVAILABILITY text, ENGLISHAVAIL text, GROSSAREA real, NETAREA real, LETTABLEAREA text, TFA_GROSS real, TFA_NET real, TFA_LETTABLE real, EFFICIENCY real, SITEAREA real, openarea integer, COVEREDAREA integer, PLOTRATIO real, COVERAGE real, LOTINDEXPLAN integer, CROWNLEASE integer, USELANDAREA integer, PRICE real, AVERAGEPRICE real, BOTTOMPRICE real, BOTAVGPRICE real, PRICEMETHOD integer, RENT real, AVERAGERENT real, BOTTOMRENT real, BOTAVGRENT real, AVERAGEPRICE_N real, BOTAVGPRICE_N real, AVERAGERENT_N real, BOTAVGRENT_N real, RENTMETHOD integer, ALLINCLUSIVE integer, RENTFREE integer, RENTFREEDAYS real, RENTFREEMTHS integer, CARPARKS integer, LEGALCOCKLOFT integer, DECORATION text, PROPVIEW integer, RAISEDFLOOR integer, FACINGLIFT integer, E_REMARKS text, c_REMARKS text, THUMBNAILIMAGE integer, updateinfo text, attachment blob, PROPGROUPNO integer );");
        this.database.execute("CREATE TABLE IF NOT EXISTS propertyFile( id INTEGER PRIMARY KEY AUTOINCREMENT, propgroupno integer, propertyno integer,  filename text,  attachment blob,  createby integer );");
        this.database.execute("create table if not exists estate( id INTEGER PRIMARY KEY AUTOINCREMENT, NUMBER integer, ESTATENO integer, ENGLISHNAME text, CHINESENAME text, E_DEVELOPER1 text, C_DEVELOPER1 text, E_DEVELOPER2 text, C_DEVELOPER2 text, COMPYEAR integer, COMPMONTH integer, MANAGEMENTCO text, EFFICIENCY integer,  TOTALUNITS integer, AREAFROM integer, AREATO integer, E_REMARKS text, C_REMARKS text, DELETEDATE integer, UPDATEINFO text, ATTACHMENT blob, createby integer);");
        this.database.execute("create table if not exists estatefile( id INTEGER PRIMARY KEY AUTOINCREMENT, ESTATENO integer, ATTACHMENT blob, filename text, createby integer);");
        this.database.close();
    },
    directSql: function(sql) {
        this.database = Ti.Database.open("astPresentation");
        this.database.execute(sql);
        this.database.close();
    },
    getObjResultSet: function(sql) {
        this.database = Ti.Database.open("astPresentation");
        var rows = this.database.execute(sql);
        var resultObj = [];
        if (rows) {
            while (rows.isValidRow()) {
                var rowObj = {};
                fieldCount = false || Ti.version >= "3.3.0" ? rows.fieldCount : rows.fieldCount();
                for (var i = 0; fieldCount > i; i++) rowObj[rows.fieldName(i).toLowerCase()] = rows.field(i);
                resultObj.push(rowObj);
                rows.next();
            }
            this.database.close();
            return resultObj;
        }
        return {};
    },
    insertData: function(table, obj) {
        var fieldInfo = this.gettableField(table);
        var Sql = "insert into " + table + " (";
        var field = [];
        var value = [];
        var value_end = "";
        var blobField = [];
        for (var k in obj) if (fieldInfo[k.toLowerCase()]) {
            field.push(k);
            value.push("?");
            value_end += ",obj['" + k + "']";
            "object" == typeof obj[k] && (obj[k] = "");
        }
        Sql = Sql + field.join() + ") values (" + value.join() + ")";
        this.database = Ti.Database.open("astPresentation");
        eval("this.database.execute('" + Sql + "'" + value_end + ");");
        this.database.close();
    },
    returnInsertFormat: function(field, value) {
        switch (field.toLowerCase()) {
          case "integer":
          case "real":
            if (isNaN(value)) {
                console.log(field + ":" + value);
                return 0;
            }
            return value || 0;

          case "text":
            if ("object" == typeof value) return "''";
            return "'" + value + "'";

          case "blob":
            this.blobField[this.blobField.length] = value;
            return "?";

          default:
            return "'" + value + "'";
        }
    },
    gettableField: function(table) {
        var sql = "PRAGMA table_info(" + table + ");";
        var tableInfo = this.getObjResultSet(sql);
        var fieldInfo = {};
        for (var k in tableInfo) {
            var field = tableInfo[k].name.toLowerCase();
            var type = tableInfo[k].type.toLowerCase();
            eval("fieldInfo." + field + "='" + type + "'");
        }
        return fieldInfo;
    },
    deleteRecord: function(table, specified) {
        var sql = "delete from " + table + " ";
        switch (typeof specified) {
          case "object":
            sql = sql + "where " + specified.join(" and ");
            break;

          case "string":
            sql = sql + "where " + specified;
        }
        this.directSql(sql);
    }
};

exports.db = db;