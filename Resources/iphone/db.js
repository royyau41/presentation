var utf8 = require("utf8");

var db = {
    dbVersion: 1,
    database: "",
    blobField: [],
    init: function() {
        this.database = Ti.Database.open("astPresentation");
        this.database.execute("CREATE TABLE IF NOT EXISTS dbVersion( id INTEGER PRIMARY KEY AUTOINCREMENT, ver integer Default 0);");
        var sql = "select count(*) as number from dbVersion";
        var res = db.getObjResultSet(sql);
        var number = res[0]["number"];
        this.database = Ti.Database.open("astPresentation");
        if (0 == number) {
            sql = "insert into dbVersion (ver) values ( " + this.dbVersion + " )";
            this.database.execute(sql);
        } else {
            sql = "select ver from dbVersion";
            res = db.getObjResultSet(sql);
            ver = res[0]["ver"];
            if (ver < this.dbVersion) {
                this.database = Ti.Database.open("astPresentation");
                sql = "update dbVersion set ver=" + this.dbVersion;
                this.database.execute(sql);
                Ti.App.Properties.setInt("propgroup", 0);
                this.deleteData();
            }
        }
        this.database.close();
        this.checkTable();
    },
    updateDatabase: function() {},
    deleteData: function() {
        this.database = Ti.Database.open("astPresentation");
        var t = this;
        var table = [ "propgroup", "property", "propertyFile", "estate", "estatefile", "newdev", "newdevfile", "trans", "doctype", "document" ];
        _.each(table, function(e) {
            t.database.execute("drop table " + e);
        });
        this.checkTable();
    },
    checkTable: function() {
        this.database = Ti.Database.open("astPresentation");
        this.database.execute("CREATE TABLE IF NOT EXISTS propgroup( id INTEGER PRIMARY KEY AUTOINCREMENT, number integer, filename text,  recordtype integer,  images integer, deletedate integer DEFAULT 0, updateinfo text);");
        this.database.execute("CREATE TABLE IF NOT EXISTS property( id INTEGER PRIMARY KEY AUTOINCREMENT, number integer, intno integer,  propertyno integer,  e_title text, c_title text, e_premises text, c_premises text, districtno integer, E_DISTRICT text, C_DISTRICT text, ESTATENO integer, E_ESTATE text, C_ESTATE text, BUILDINGNO integer, E_BUILDING text, C_BUILDING text, STREETNO integer, E_STREET text, C_STREET text, STREETNUMBER text, STAGE text, BLOCK text, FLOOR text, C_FLOOR text, FLAT text, SETHIGHMIDLOW text, HIDEUNIT integer, POSSESSION integer, AVAILABILITY text, ENGLISHAVAIL text, GROSSAREA real, NETAREA real, LETTABLEAREA text, TFA_GROSS real, TFA_NET real, TFA_LETTABLE real, EFFICIENCY real, SITEAREA real, openarea integer, COVEREDAREA integer, PLOTRATIO real, COVERAGE real, LOTINDEXPLAN integer, CROWNLEASE integer, USELANDAREA integer, PRICE real, AVERAGEPRICE real, BOTTOMPRICE real, BOTAVGPRICE real, PRICEMETHOD integer, RENT real, AVERAGERENT real, BOTTOMRENT real, BOTAVGRENT real, AVERAGEPRICE_N real, BOTAVGPRICE_N real, AVERAGERENT_N real, BOTAVGRENT_N real, RENTMETHOD integer, ALLINCLUSIVE integer, RENTFREE integer, RENTFREEDAYS real, RENTFREEMTHS integer, CARPARKS integer, LEGALCOCKLOFT integer, DECORATION text, PROPVIEW integer, RAISEDFLOOR integer, FACINGLIFT integer, E_REMARKS text, c_REMARKS text, THUMBNAILIMAGE integer, updateinfo text, attachment blob, read integer DEFAULT 0, PROPGROUPNO integer );");
        this.database.execute("CREATE TABLE IF NOT EXISTS propertyFile( id INTEGER PRIMARY KEY AUTOINCREMENT, propgroupno integer, propertyno integer,  filename text,  attachment blob,  createby integer );");
        this.database.execute("create table if not exists estate( id INTEGER PRIMARY KEY AUTOINCREMENT, NUMBER integer, ESTATENO integer, ENGLISHNAME text, CHINESENAME text, E_DEVELOPER1 text, C_DEVELOPER1 text, E_DEVELOPER2 text, C_DEVELOPER2 text, COMPYEAR integer, COMPMONTH integer, MANAGEMENTCO text, EFFICIENCY integer,  TOTALUNITS integer, AREAFROM integer, AREATO integer, E_REMARKS text, C_REMARKS text, DELETEDATE integer DEFAULT 0, UPDATEINFO text, ATTACHMENT blob, createby integer);");
        this.database.execute("create table if not exists estatefile( id INTEGER PRIMARY KEY AUTOINCREMENT, ESTATENO integer, ATTACHMENT blob, filename text, deletedata integer DEFAULT 0, createby integer);");
        this.database.execute("CREATE TABLE IF NOT EXISTS newdev( id INTEGER PRIMARY KEY AUTOINCREMENT, number integer, englishname text,  chinesename text,  attachment blob,  deletedate integer DEFAULT 0, updateinfo text);");
        this.database.execute("CREATE TABLE IF NOT EXISTS newdevfile( id INTEGER PRIMARY KEY AUTOINCREMENT, newdevelopmentno integer, filename text,  attachment blob,  deletedate integer DEFAULT 0, createby integer);");
        this.database.execute("CREATE TABLE IF NOT EXISTS trans( id INTEGER PRIMARY KEY AUTOINCREMENT, AVERAGEPRICE integer, BLOCK text,  BUILDINGNO integer,  CONSIDERATION integer,  c_building text,  C_DISTRICT text,  C_ESTATE text,  C_FLOOR text,  C_STREET text,  DISTRICTNO integer,  e_building text,  e_DISTRICT text,  e_ESTATE text,  e_FLOOR text,  e_STREET text,  FLAT text, floor text, GROSSAREA integer,  ESTATENO integer,  INFOSOURCE text, NATURE text, NETAREA integer, NETAVERAGE integer, PROPERTYNO integer,  PROPGROUPNO integer,  PT integer,  stage text, streetno integer,  streetnumber text, transacdate integer,  createby integer);");
        this.database.execute("CREATE TABLE IF NOT EXISTS doctype( id INTEGER PRIMARY KEY AUTOINCREMENT, number integer, chinesename text,  englishname text,  deletedate integer DEFAULT 0, updateinfo text DEFAULT '0');");
        this.database.execute("CREATE TABLE IF NOT EXISTS document( id INTEGER PRIMARY KEY AUTOINCREMENT, attachment blob, c_subject text,  e_subject text,  deletedate integer,  documentdate integer, DOCUMENTDATE_STR text, DOCUMENTTYPE integer, FILENAME text, FILESIZE integer, FILETYPE text, number integer, updateinfo text);");
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
            "object" == typeof obj[k] ? obj[k] = "" : "text" == fieldInfo[k.toLowerCase()] && (obj[k] = utf8.decode(obj[k]));
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
            return isNaN(value) ? 0 : value || 0;

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