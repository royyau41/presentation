(function(root) {
    function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        var value;
        var extra;
        while (length > counter) {
            value = string.charCodeAt(counter++);
            if (value >= 55296 && 56319 >= value && length > counter) {
                extra = string.charCodeAt(counter++);
                if (56320 == (64512 & extra)) output.push(((1023 & value) << 10) + (1023 & extra) + 65536); else {
                    output.push(value);
                    counter--;
                }
            } else output.push(value);
        }
        return output;
    }
    function ucs2encode(array) {
        var length = array.length;
        var index = -1;
        var value;
        var output = "";
        while (length > ++index) {
            value = array[index];
            if (value > 65535) {
                value -= 65536;
                output += stringFromCharCode(55296 | 1023 & value >>> 10);
                value = 56320 | 1023 & value;
            }
            output += stringFromCharCode(value);
        }
        return output;
    }
    function createByte(codePoint, shift) {
        return stringFromCharCode(128 | 63 & codePoint >> shift);
    }
    function encodeCodePoint(codePoint) {
        if (0 == (4294967168 & codePoint)) return stringFromCharCode(codePoint);
        var symbol = "";
        if (0 == (4294965248 & codePoint)) symbol = stringFromCharCode(192 | 31 & codePoint >> 6); else if (0 == (4294901760 & codePoint)) {
            symbol = stringFromCharCode(224 | 15 & codePoint >> 12);
            symbol += createByte(codePoint, 6);
        } else if (0 == (4292870144 & codePoint)) {
            symbol = stringFromCharCode(240 | 7 & codePoint >> 18);
            symbol += createByte(codePoint, 12);
            symbol += createByte(codePoint, 6);
        }
        symbol += stringFromCharCode(128 | 63 & codePoint);
        return symbol;
    }
    function utf8encode(string) {
        var codePoints = ucs2decode(string);
        var length = codePoints.length;
        var index = -1;
        var codePoint;
        var byteString = "";
        while (length > ++index) {
            codePoint = codePoints[index];
            byteString += encodeCodePoint(codePoint);
        }
        return byteString;
    }
    function readContinuationByte() {
        if (byteIndex >= byteCount) throw Error("Invalid byte index");
        var continuationByte = 255 & byteArray[byteIndex];
        byteIndex++;
        if (128 == (192 & continuationByte)) return 63 & continuationByte;
        throw Error("Invalid continuation byte");
    }
    function decodeSymbol() {
        var byte1;
        var byte2;
        var byte3;
        var byte4;
        var codePoint;
        if (byteIndex > byteCount) throw Error("Invalid byte index");
        if (byteIndex == byteCount) return false;
        byte1 = 255 & byteArray[byteIndex];
        byteIndex++;
        if (0 == (128 & byte1)) return byte1;
        if (192 == (224 & byte1)) {
            var byte2 = readContinuationByte();
            codePoint = (31 & byte1) << 6 | byte2;
            if (codePoint >= 128) return codePoint;
            throw Error("Invalid continuation byte");
        }
        if (224 == (240 & byte1)) {
            byte2 = readContinuationByte();
            byte3 = readContinuationByte();
            codePoint = (15 & byte1) << 12 | byte2 << 6 | byte3;
            if (codePoint >= 2048) return codePoint;
            throw Error("Invalid continuation byte");
        }
        if (240 == (248 & byte1)) {
            byte2 = readContinuationByte();
            byte3 = readContinuationByte();
            byte4 = readContinuationByte();
            codePoint = (15 & byte1) << 18 | byte2 << 12 | byte3 << 6 | byte4;
            if (codePoint >= 65536 && 1114111 >= codePoint) return codePoint;
        }
        throw Error("Invalid UTF-8 detected");
    }
    function utf8decode(byteString) {
        byteArray = ucs2decode(byteString);
        byteCount = byteArray.length;
        byteIndex = 0;
        var codePoints = [];
        var tmp;
        while (false !== (tmp = decodeSymbol())) codePoints.push(tmp);
        return ucs2encode(codePoints);
    }
    var freeExports = "object" == typeof exports && exports;
    var freeModule = "object" == typeof module && module && module.exports == freeExports && module;
    var freeGlobal = "object" == typeof global && global;
    (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) && (root = freeGlobal);
    var stringFromCharCode = String.fromCharCode;
    var byteArray;
    var byteCount;
    var byteIndex;
    var utf8 = {
        version: "2.0.0",
        encode: utf8encode,
        decode: utf8decode
    };
    if ("function" == typeof define && "object" == typeof define.amd && define.amd) define(function() {
        return utf8;
    }); else if (freeExports && !freeExports.nodeType) if (freeModule) freeModule.exports = utf8; else {
        var object = {};
        var hasOwnProperty = object.hasOwnProperty;
        for (var key in utf8) hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
    } else root.utf8 = utf8;
})(this);