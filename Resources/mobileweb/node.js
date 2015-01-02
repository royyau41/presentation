(function() {
    function require(path, parent, orig) {
        var resolved = require.resolve(path);
        if (null == resolved) {
            orig = orig || path, parent = parent || "root";
            var err = Error('Failed to require "' + orig + '" from "' + parent + '"');
            throw err.path = orig, err.parent = parent, err.require = !0, err;
        }
        var module = require.modules[resolved];
        return module.exports || (module.exports = {}, module.client = module.component = !0, 
        module.call(this, module.exports, require.relative(resolved), module)), module.exports;
    }
    var has = Object.prototype.hasOwnProperty;
    require.modules = {}, require.aliases = {}, require.resolve = function(path) {
        "/" === path.charAt(0) && (path = path.slice(1));
        for (var index = path + "/index.js", paths = [ path, path + ".js", path + ".json", path + "/index.js", path + "/index.json" ], i = 0; paths.length > i; i++) {
            var path = paths[i];
            if (has.call(require.modules, path)) return path;
        }
        return has.call(require.aliases, index) ? require.aliases[index] : void 0;
    }, require.normalize = function(curr, path) {
        var segs = [];
        if ("." != path.charAt(0)) return path;
        curr = curr.split("/"), path = path.split("/");
        for (var i = 0; path.length > i; ++i) ".." == path[i] ? curr.pop() : "." != path[i] && "" != path[i] && segs.push(path[i]);
        return curr.concat(segs).join("/");
    }, require.register = function(path, definition) {
        require.modules[path] = definition;
    }, require.alias = function(from, to) {
        if (!has.call(require.modules, from)) throw Error('Failed to alias "' + from + '", it does not exist');
        require.aliases[to] = from;
    }, require.relative = function(parent) {
        function lastIndexOf(arr, obj) {
            for (var i = arr.length; i--; ) if (arr[i] === obj) return i;
            return -1;
        }
        function localRequire(path) {
            var resolved = localRequire.resolve(path);
            return require(resolved, parent, path);
        }
        var p = require.normalize(parent, "..");
        return localRequire.resolve = function(path) {
            var c = path.charAt(0);
            if ("/" == c) return path.slice(1);
            if ("." == c) return require.normalize(p, path);
            var segs = parent.split("/"), i = lastIndexOf(segs, "deps") + 1;
            return i || (i = 0), path = segs.slice(0, i + 1).join("/") + "/deps/" + path;
        }, localRequire.exists = function(path) {
            return has.call(require.modules, localRequire.resolve(path));
        }, localRequire;
    }, require.register("node/index.js", function(exports, require, module) {
        module.exports = {
            assert: require("./lib/assert"),
            buffer: require("./lib/buffer"),
            events: require("./lib/events"),
            net: require("./lib/net"),
            stream: require("./lib/stream"),
            util: require("./lib/util")
        };
    }), require.register("node/lib/net.js", function(exports, require, module) {
        function guid() {
            return Math.floor(1e25 * Math.random() + 1);
        }
        function Server() {
            this._maxConnections = 0, this._connections = 0, EventEmitter.call(this);
        }
        var EventEmitter = require("./events").EventEmitter, Stream = require("./stream"), Buffer = require("./buffer").Buffer, noop = function() {}, net = module.exports = {};
        net.createServer = function() {
            var args = arguments, fn = args[args.length - 1], options = "object" == typeof args[0] ? args[0] : {}, callback = "function" == typeof fn ? fn : noop, server = new net.Server(options);
            return server.on("connection", callback), server;
        }, net.createConnection = function() {
            var args = arguments, fn = args[args.length - 1], options = {}, callback = "function" == typeof fn ? fn : noop;
            if ("object" == typeof args[0]) options.port = args[0].port, options.host = args[0].host || "127.0.0.1"; else if ("number" == typeof args[0]) options.port = args[0], 
            "string" == typeof args[1] && (options.host = args[1]); else if ("string" == typeof args[0]) return;
            var socket = new net.Socket(options);
            return socket.connect(options, callback), socket;
        }, net.connect = net.createConnection, Server.prototype.__proto__ = EventEmitter.prototype, 
        net.Server = Server, net.Server.prototype.listen = function() {
            var self = this, options = {}, args = arguments, fn = args[args.length - 1], callback = "function" == typeof fn ? fn : noop;
            if ("number" != typeof args[0]) throw Error("No port Specified");
            options.port = args[0], options.host = "string" == typeof args[1] ? args[1] : "127.0.0.1", 
            options.backlog = "number" == typeof args[1] ? args[1] : "number" == typeof args[2] ? args[2] : 511, 
            self._socket = new net.Socket(options);
            var _proxy = self._socket._proxy;
            _proxy.host = options.host, _proxy.port = options.port, _proxy.accepted = function(e) {
                self._accept({
                    id: guid(),
                    socket: e.source,
                    _proxy: e.inbound
                });
            }, _proxy.error = function(e) {
                self.emit("error", e), callback();
            }, self.emit("listening"), callback(), _proxy.accept(), _proxy.listen();
        }, net.Server.prototype._accept = function(acceptInfo) {
            var self = this, socket = new net.Socket({
                bind: acceptInfo._proxy
            });
            self.emit("connection", socket);
        }, net.Server.prototype.close = function(fn) {
            var callback = fn || noop;
            callback(), this.emit("close"), this._socket.emit("end"), this._socket.destroy();
        }, net.Server.prototype.address = noop, net.Socket = function(options) {
            var self = this, args = arguments, fn = args[args.length - 1], callback = "function" == typeof fn ? fn : noop;
            return options = options || {}, this._fd = options.fd, this._type = options.type || "tcp", 
            this._type = allowHalfOpen = options.allowHalfOpen || !1, this._socketInfo = 0, 
            this._encoding = null, this._proxy = null, options.bind ? (this._proxy = options.bind, 
            this._read(this._proxy), void 0) : (options && !options.bind && (this._proxy = Ti.Network.Socket.createTCP({}), 
            this._proxy.host = options.host, this._proxy.port = options.port, this._proxy.connected = function() {
                this._read(self._proxy);
            }), callback(), void 0);
        }, net.Socket.prototype.__proto__ = Stream.prototype, net.Socket.prototype.connect = function() {
            var self = this, options = {}, args = arguments, fn = args[args.length - 1], callback = "function" == typeof fn ? fn : noop;
            "object" == typeof args[0] ? (options.port = args[0].port, options.host = args[0].host || "127.0.0.1") : "string" == typeof args[0] || "number" == typeof args[0] && (options.port = args[0], 
            options.host = "127.0.0.1", "string" == typeof args[1] && (options.host = args[1])), 
            self.on("connect", callback), self._proxy.host = options.host, self._proxy.port = options.port, 
            self._proxy.connected = function(e) {
                self.emit("connect", e), Ti.Stream.pump(e.socket, function(e) {
                    var _buffer = Buffer("" + e.buffer);
                    self.emit("data", _buffer), self.ondata && self.ondata(_buffer.parent, _buffer.offset, _buffer.offset + _buffer.length);
                }, 1024, !0);
            }, self._proxy.error = function(e) {
                self.emit("error", Error(e));
            }, self._proxy.connect();
        }, net.Socket.prototype.destroy = function() {
            this._proxy.close(), this.emit("end");
        }, net.Socket.prototype.destroySoon = function() {
            this._proxy.close(), this.emit("end");
        }, net.Socket.prototype.setEncoding = function(encoding) {
            this._encoding = encoding;
        }, net.Socket.prototype.setNoDelay = function(noDelay) {
            noDelay = void 0 === noDelay ? !0 : noDelay;
        }, net.Socket.prototype.setKeepAlive = function(enable, delay) {
            (enable || delay) && (this._keepAliveTimer = setInterval(function() {}, delay));
        }, net.Socket.prototype.write = function(data, encoding, fn) {
            var self = this, callback = fn || noop;
            _buffer = "" + data, this._bufferSize = this._bufferSize + _buffer.length, encoding = encoding || "UTF8", 
            self._resetTimeout();
            var bufferProxy = Ti.createBuffer({
                value: _buffer
            });
            return Ti.Stream.write(self._proxy, bufferProxy, function(e) {
                -1 == e.bytesProcessed && (self.bytesWritten = self.bytesWritten + bufferProxy.length, 
                self._bufferSize = self._bufferSize - _buffer.length, self.emit("drain"), callback());
            }), !0;
        }, net.Socket.prototype._read = function(sock) {
            var self = this;
            Ti.Stream.pump(sock, function(e) {
                if (-1 != e.bytesProcessed) {
                    var _buffer = Buffer("" + e.buffer);
                    self.emit("data", _buffer), self.ondata && self.ondata(_buffer.parent, _buffer.offset, _buffer.offset + _buffer.length);
                }
            }, 1024, !0);
        }, net.Socket.prototype._resetTimeout = function() {
            var self = this;
            self._timeout && clearTimeout(self._timeout), self._timeoutValue && (self._timeout = setTimeout(function() {
                self.emit("timeout");
            }, self._timeoutValue));
        }, net.Socket.prototype.setTimeout = function(timeout) {
            this._timeoutValue = timeout, this._resetTimeout();
        }, net.Socket.prototype.ref = noop, net.Socket.prototype.unref = noop, net.Socket.prototype.pause = noop, 
        net.Socket.prototype.resume = noop, net.Socket.prototype.end = noop, net.Socket.prototype.__defineGetter__("readyState", function() {
            return this._proxy.state;
        }), net.Socket.prototype.__defineGetter__("buferSize", function() {
            return this._bufferSize;
        });
    }), require.register("node/lib/assert.js", function(exports, require, module) {
        function replacer(key, value) {
            return void 0 === value ? "" + value : "number" != typeof value || !isNaN(value) && isFinite(value) ? "function" == typeof value || value instanceof RegExp ? "" + value : value : "" + value;
        }
        function truncate(s, n) {
            return "string" == typeof s ? n > s.length ? s : s.slice(0, n) : s;
        }
        function fail(actual, expected, message, operator, stackStartFunction) {
            throw new assert.AssertionError({
                message: message,
                actual: actual,
                expected: expected,
                operator: operator,
                stackStartFunction: stackStartFunction
            });
        }
        function ok(value, message) {
            value || fail(value, !0, message, "==", assert.ok);
        }
        function _deepEqual(actual, expected) {
            if (actual === expected) return !0;
            if (Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
                if (actual.length != expected.length) return !1;
                for (var i = 0; actual.length > i; i++) if (actual[i] !== expected[i]) return !1;
                return !0;
            }
            return actual instanceof Date && expected instanceof Date ? actual.getTime() === expected.getTime() : actual instanceof RegExp && expected instanceof RegExp ? actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase : "object" != typeof actual && "object" != typeof expected ? actual == expected : objEquiv(actual, expected);
        }
        function isUndefinedOrNull(value) {
            return null === value || void 0 === value;
        }
        function isArguments(object) {
            return "[object Arguments]" == Object.prototype.toString.call(object);
        }
        function objEquiv(a, b) {
            if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return !1;
            if (a.prototype !== b.prototype) return !1;
            if (isArguments(a)) return isArguments(b) ? (a = pSlice.call(a), b = pSlice.call(b), 
            _deepEqual(a, b)) : !1;
            try {
                var key, i, ka = Object.keys(a), kb = Object.keys(b);
            } catch (e) {
                return !1;
            }
            if (ka.length != kb.length) return !1;
            for (ka.sort(), kb.sort(), i = ka.length - 1; i >= 0; i--) if (ka[i] != kb[i]) return !1;
            for (i = ka.length - 1; i >= 0; i--) if (key = ka[i], !_deepEqual(a[key], b[key])) return !1;
            return !0;
        }
        function expectedException(actual, expected) {
            return actual && expected ? "[object RegExp]" == Object.prototype.toString.call(expected) ? expected.test(actual) : actual instanceof expected ? !0 : expected.call({}, actual) === !0 ? !0 : !1 : !1;
        }
        function _throws(shouldThrow, block, expected, message) {
            var actual;
            "string" == typeof expected && (message = expected, expected = null);
            try {
                block();
            } catch (e) {
                actual = e;
            }
            if (message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : "."), 
            shouldThrow && !actual && fail(actual, expected, "Missing expected exception" + message), 
            !shouldThrow && expectedException(actual, expected) && fail(actual, expected, "Got unwanted exception" + message), 
            shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) throw actual;
        }
        var util = require("./util"), Buffer = require("./buffer").Buffer, pSlice = Array.prototype.slice, assert = module.exports = ok;
        assert.AssertionError = function(options) {
            this.name = "AssertionError", this.message = options.message, this.actual = options.actual, 
            this.expected = options.expected, this.operator = options.operator;
            var stackStartFunction = options.stackStartFunction || fail;
            Error.captureStackTrace && Error.captureStackTrace(this, stackStartFunction);
        }, util.inherits(assert.AssertionError, Error), assert.AssertionError.prototype.toString = function() {
            return this.message ? [ this.name + ":", this.message ].join(" ") : [ this.name + ":", truncate(JSON.stringify(this.actual, replacer), 128), this.operator, truncate(JSON.stringify(this.expected, replacer), 128) ].join(" ");
        }, assert.fail = fail, assert.ok = ok, assert.equal = function(actual, expected, message) {
            actual != expected && fail(actual, expected, message, "==", assert.equal);
        }, assert.notEqual = function(actual, expected, message) {
            actual == expected && fail(actual, expected, message, "!=", assert.notEqual);
        }, assert.deepEqual = function(actual, expected, message) {
            _deepEqual(actual, expected) || fail(actual, expected, message, "deepEqual", assert.deepEqual);
        }, assert.notDeepEqual = function(actual, expected, message) {
            _deepEqual(actual, expected) && fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual);
        }, assert.strictEqual = function(actual, expected, message) {
            actual !== expected && fail(actual, expected, message, "===", assert.strictEqual);
        }, assert.notStrictEqual = function(actual, expected, message) {
            actual === expected && fail(actual, expected, message, "!==", assert.notStrictEqual);
        }, assert.throws = function() {
            _throws.apply(this, [ !0 ].concat(pSlice.call(arguments)));
        }, assert.doesNotThrow = function() {
            _throws.apply(this, [ !1 ].concat(pSlice.call(arguments)));
        }, assert.ifError = function(err) {
            if (err) throw err;
        };
    }), require.register("node/lib/buffer.js", function(exports, require) {
        function blitBuffer(src, dst, offset, length) {
            for (var i = 0; length > i && !(i + offset >= dst.length || i >= src.length); ) dst[i + offset] = src[i], 
            i++;
            return i;
        }
        function decodeUtf8Char(str) {
            try {
                return decodeURIComponent(str);
            } catch (err) {
                return String.fromCharCode(65533);
            }
        }
        function coerce(length) {
            return length = ~~Math.ceil(+length), 0 > length ? 0 : length;
        }
        function Buffer(subject, encoding, offset) {
            if (!(this instanceof Buffer)) return new Buffer(subject, encoding, offset);
            var type;
            if ("number" == typeof offset) this.length = coerce(encoding), this.parent = subject, 
            this.offset = offset; else {
                switch (type = typeof subject) {
                  case "number":
                    this.length = coerce(subject);
                    break;

                  case "string":
                    this.length = Buffer.byteLength(subject, encoding);
                    break;

                  case "object":
                    this.length = coerce(subject.length);
                    break;

                  default:
                    throw Error("First argument needs to be a number, array or string.");
                }
                if (this.length > Buffer.poolSize ? (this.parent = new SlowBuffer(this.length), 
                this.offset = 0) : ((!pool || pool.length - pool.used < this.length) && allocPool(), 
                this.parent = pool, this.offset = pool.used, pool.used += this.length), isArrayIsh(subject)) for (var i = 0; this.length > i; i++) this.parent[i + this.offset] = subject[i]; else "string" == type && (this.length = this.write(subject, 0, encoding));
            }
        }
        function isArrayIsh(subject) {
            return Array.isArray(subject) || Buffer.isBuffer(subject) || subject && "object" == typeof subject && "number" == typeof subject.length;
        }
        function allocPool() {
            pool = new SlowBuffer(Buffer.poolSize), pool.used = 0;
        }
        function readUInt16(buffer, offset, isBigEndian, noAssert) {
            var val = 0;
            return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 1, "Trying to read beyond buffer length")), 
            isBigEndian ? (val = buffer.parent[buffer.offset + offset] << 8, val |= buffer.parent[buffer.offset + offset + 1]) : (val = buffer.parent[buffer.offset + offset], 
            val |= buffer.parent[buffer.offset + offset + 1] << 8), val;
        }
        function readUInt32(buffer, offset, isBigEndian, noAssert) {
            var val = 0;
            return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 3, "Trying to read beyond buffer length")), 
            isBigEndian ? (val = buffer.parent[buffer.offset + offset + 1] << 16, val |= buffer.parent[buffer.offset + offset + 2] << 8, 
            val |= buffer.parent[buffer.offset + offset + 3], val += buffer.parent[buffer.offset + offset] << 24 >>> 0) : (val = buffer.parent[buffer.offset + offset + 2] << 16, 
            val |= buffer.parent[buffer.offset + offset + 1] << 8, val |= buffer.parent[buffer.offset + offset], 
            val += buffer.parent[buffer.offset + offset + 3] << 24 >>> 0), val;
        }
        function readInt16(buffer, offset, isBigEndian, noAssert) {
            var neg, val;
            return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 1, "Trying to read beyond buffer length")), 
            val = readUInt16(buffer, offset, isBigEndian, noAssert), neg = 32768 & val, neg ? -1 * (65535 - val + 1) : val;
        }
        function readInt32(buffer, offset, isBigEndian, noAssert) {
            var neg, val;
            return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 3, "Trying to read beyond buffer length")), 
            val = readUInt32(buffer, offset, isBigEndian, noAssert), neg = 2147483648 & val, 
            neg ? -1 * (4294967295 - val + 1) : val;
        }
        function readFloat(buffer, offset, isBigEndian, noAssert) {
            return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(buffer.length > offset + 3, "Trying to read beyond buffer length")), buffer_ieee754.readIEEE754(buffer, offset, isBigEndian, 23, 4);
        }
        function readDouble(buffer, offset, isBigEndian, noAssert) {
            return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(buffer.length > offset + 7, "Trying to read beyond buffer length")), buffer_ieee754.readIEEE754(buffer, offset, isBigEndian, 52, 8);
        }
        function verifuint(value, max) {
            assert.ok("number" == typeof value, "cannot write a non-number as a number"), assert.ok(value >= 0, "specified a negative value for writing an unsigned value"), 
            assert.ok(max >= value, "value is larger than maximum value for type"), assert.ok(Math.floor(value) === value, "value has a fractional component");
        }
        function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
            noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 1, "trying to write beyond buffer length"), 
            verifuint(value, 65535)), isBigEndian ? (buffer.parent[buffer.offset + offset] = (65280 & value) >>> 8, 
            buffer.parent[buffer.offset + offset + 1] = 255 & value) : (buffer.parent[buffer.offset + offset + 1] = (65280 & value) >>> 8, 
            buffer.parent[buffer.offset + offset] = 255 & value);
        }
        function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
            noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 3, "trying to write beyond buffer length"), 
            verifuint(value, 4294967295)), isBigEndian ? (buffer.parent[buffer.offset + offset] = 255 & value >>> 24, 
            buffer.parent[buffer.offset + offset + 1] = 255 & value >>> 16, buffer.parent[buffer.offset + offset + 2] = 255 & value >>> 8, 
            buffer.parent[buffer.offset + offset + 3] = 255 & value) : (buffer.parent[buffer.offset + offset + 3] = 255 & value >>> 24, 
            buffer.parent[buffer.offset + offset + 2] = 255 & value >>> 16, buffer.parent[buffer.offset + offset + 1] = 255 & value >>> 8, 
            buffer.parent[buffer.offset + offset] = 255 & value);
        }
        function verifsint(value, max, min) {
            assert.ok("number" == typeof value, "cannot write a non-number as a number"), assert.ok(max >= value, "value larger than maximum allowed value"), 
            assert.ok(value >= min, "value smaller than minimum allowed value"), assert.ok(Math.floor(value) === value, "value has a fractional component");
        }
        function verifIEEE754(value, max, min) {
            assert.ok("number" == typeof value, "cannot write a non-number as a number"), assert.ok(max >= value, "value larger than maximum allowed value"), 
            assert.ok(value >= min, "value smaller than minimum allowed value");
        }
        function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
            noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 1, "Trying to write beyond buffer length"), 
            verifsint(value, 32767, -32768)), value >= 0 ? writeUInt16(buffer, value, offset, isBigEndian, noAssert) : writeUInt16(buffer, 65535 + value + 1, offset, isBigEndian, noAssert);
        }
        function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
            noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 3, "Trying to write beyond buffer length"), 
            verifsint(value, 2147483647, -2147483648)), value >= 0 ? writeUInt32(buffer, value, offset, isBigEndian, noAssert) : writeUInt32(buffer, 4294967295 + value + 1, offset, isBigEndian, noAssert);
        }
        function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
            noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 3, "Trying to write beyond buffer length"), 
            verifIEEE754(value, 3.4028234663852886e38, -3.4028234663852886e38)), buffer_ieee754.writeIEEE754(buffer, value, offset, isBigEndian, 23, 4);
        }
        function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
            noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
            assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(buffer.length > offset + 7, "Trying to write beyond buffer length"), 
            verifIEEE754(value, 1.7976931348623157e308, -1.7976931348623157e308)), buffer_ieee754.writeIEEE754(buffer, value, offset, isBigEndian, 52, 8);
        }
        function SlowBuffer(size) {
            this.length = size;
        }
        function toHex(n) {
            return 16 > n ? "0" + n.toString(16) : n.toString(16);
        }
        function utf8ToBytes(str) {
            for (var byteArray = [], i = 0; str.length > i; i++) if (127 >= str.charCodeAt(i)) byteArray.push(str.charCodeAt(i)); else for (var h = encodeURIComponent(str.charAt(i)).substr(1).split("%"), j = 0; h.length > j; j++) byteArray.push(parseInt(h[j], 16));
            return byteArray;
        }
        function asciiToBytes(str) {
            for (var byteArray = [], i = 0; str.length > i; i++) byteArray.push(255 & str.charCodeAt(i));
            return byteArray;
        }
        function base64ToBytes(str) {
            return b64.toByteArray(str);
        }
        var assert = require("./assert");
        SlowBuffer.byteLength = function(str, encoding) {
            switch (encoding || "utf8") {
              case "hex":
                return str.length / 2;

              case "utf8":
              case "utf-8":
                return utf8ToBytes(str).length;

              case "ascii":
                return str.length;

              case "base64":
                return base64ToBytes(str).length;

              default:
                throw Error("Unknown encoding");
            }
        }, SlowBuffer.prototype.utf8Write = function(string, offset, length) {
            return SlowBuffer._charsWritten = blitBuffer(utf8ToBytes(string), this, offset, length);
        }, SlowBuffer.prototype.asciiWrite = function(string, offset, length) {
            return SlowBuffer._charsWritten = blitBuffer(asciiToBytes(string), this, offset, length);
        }, SlowBuffer.prototype.base64Write = function(string, offset, length) {
            return SlowBuffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
        }, SlowBuffer.prototype.base64Slice = function() {
            var bytes = Array.prototype.slice.apply(this, arguments);
            return b64.fromByteArray(bytes);
        }, SlowBuffer.prototype.utf8Slice = function() {
            for (var bytes = Array.prototype.slice.apply(this, arguments), res = "", tmp = "", i = 0; bytes.length > i; ) 127 >= bytes[i] ? (res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]), 
            tmp = "") : tmp += "%" + bytes[i].toString(16), i++;
            return res + decodeUtf8Char(tmp);
        }, SlowBuffer.prototype.asciiSlice = function() {
            for (var bytes = Array.prototype.slice.apply(this, arguments), ret = "", i = 0; bytes.length > i; i++) ret += String.fromCharCode(bytes[i]);
            return ret;
        }, SlowBuffer.prototype.inspect = function() {
            for (var out = [], len = this.length, i = 0; len > i; i++) if (out[i] = toHex(this[i]), 
            i == exports.INSPECT_MAX_BYTES) {
                out[i + 1] = "...";
                break;
            }
            return "<SlowBuffer " + out.join(" ") + ">";
        }, SlowBuffer.prototype.hexSlice = function(start, end) {
            var len = this.length;
            (!start || 0 > start) && (start = 0), (!end || 0 > end || end > len) && (end = len);
            for (var out = "", i = start; end > i; i++) out += toHex(this[i]);
            return out;
        }, SlowBuffer.prototype.toString = function(encoding, start, end) {
            if (encoding = ((encoding || "utf8") + "").toLowerCase(), start = +start || 0, void 0 === end && (end = this.length), 
            +end == start) return "";
            switch (encoding) {
              case "hex":
                return this.hexSlice(start, end);

              case "utf8":
              case "utf-8":
                return this.utf8Slice(start, end);

              case "ascii":
                return this.asciiSlice(start, end);

              case "binary":
                return this.binarySlice(start, end);

              case "base64":
                return this.base64Slice(start, end);

              case "ucs2":
              case "ucs-2":
                return this.ucs2Slice(start, end);

              default:
                throw Error("Unknown encoding");
            }
        }, SlowBuffer.prototype.hexWrite = function(string, offset, length) {
            offset = +offset || 0;
            var remaining = this.length - offset;
            length ? (length = +length, length > remaining && (length = remaining)) : length = remaining;
            var strLen = string.length;
            if (strLen % 2) throw Error("Invalid hex string");
            length > strLen / 2 && (length = strLen / 2);
            for (var i = 0; length > i; i++) {
                var byte = parseInt(string.substr(2 * i, 2), 16);
                if (isNaN(byte)) throw Error("Invalid hex string");
                this[offset + i] = byte;
            }
            return SlowBuffer._charsWritten = 2 * i, i;
        }, SlowBuffer.prototype.write = function(string, offset, length, encoding) {
            if (isFinite(offset)) isFinite(length) || (encoding = length, length = void 0); else {
                var swap = encoding;
                encoding = offset, offset = length, length = swap;
            }
            offset = +offset || 0;
            var remaining = this.length - offset;
            switch (length ? (length = +length, length > remaining && (length = remaining)) : length = remaining, 
            encoding = ((encoding || "utf8") + "").toLowerCase()) {
              case "hex":
                return this.hexWrite(string, offset, length);

              case "utf8":
              case "utf-8":
                return this.utf8Write(string, offset, length);

              case "ascii":
                return this.asciiWrite(string, offset, length);

              case "binary":
                return this.binaryWrite(string, offset, length);

              case "base64":
                return this.base64Write(string, offset, length);

              case "ucs2":
              case "ucs-2":
                return this.ucs2Write(string, offset, length);

              default:
                throw Error("Unknown encoding");
            }
        }, SlowBuffer.prototype.slice = function(start, end) {
            if (void 0 === end && (end = this.length), end > this.length) throw Error("oob");
            if (start > end) throw Error("oob");
            return new Buffer(this, end - start, +start);
        }, SlowBuffer.prototype.copy = function(target, targetstart, sourcestart, sourceend) {
            for (var temp = [], i = sourcestart; sourceend > i; i++) assert.ok(void 0 !== this[i], "copying undefined buffer bytes!"), 
            temp.push(this[i]);
            for (var i = targetstart; targetstart + temp.length > i; i++) target[i] = temp[i - targetstart];
        }, exports.SlowBuffer = SlowBuffer, exports.Buffer = Buffer, Buffer.poolSize = 8192;
        var pool;
        Buffer.isBuffer = function(b) {
            return b instanceof Buffer || b instanceof SlowBuffer;
        }, Buffer.concat = function(list, totalLength) {
            if (!Array.isArray(list)) throw Error("Usage: Buffer.concat(list, [totalLength])\n       list should be an Array.");
            if (0 === list.length) return new Buffer(0);
            if (1 === list.length) return list[0];
            if ("number" != typeof totalLength) {
                totalLength = 0;
                for (var i = 0; list.length > i; i++) {
                    var buf = list[i];
                    totalLength += buf.length;
                }
            }
            for (var buffer = new Buffer(totalLength), pos = 0, i = 0; list.length > i; i++) {
                var buf = list[i];
                buf.copy(buffer, pos), pos += buf.length;
            }
            return buffer;
        }, Buffer.prototype.inspect = function() {
            for (var out = [], len = this.length, i = 0; len > i; i++) if (out[i] = toHex(this.parent[i + this.offset]), 
            i == exports.INSPECT_MAX_BYTES) {
                out[i + 1] = "...";
                break;
            }
            return "<Buffer " + out.join(" ") + ">";
        }, Buffer.prototype.get = function(i) {
            if (0 > i || i >= this.length) throw Error("oob");
            return this.parent[this.offset + i];
        }, Buffer.prototype.set = function(i, v) {
            if (0 > i || i >= this.length) throw Error("oob");
            return this.parent[this.offset + i] = v;
        }, Buffer.prototype.write = function(string, offset, length, encoding) {
            if (isFinite(offset)) isFinite(length) || (encoding = length, length = void 0); else {
                var swap = encoding;
                encoding = offset, offset = length, length = swap;
            }
            offset = +offset || 0;
            var remaining = this.length - offset;
            length ? (length = +length, length > remaining && (length = remaining)) : length = remaining, 
            encoding = ((encoding || "utf8") + "").toLowerCase();
            var ret;
            switch (encoding) {
              case "hex":
                ret = this.parent.hexWrite(string, this.offset + offset, length);
                break;

              case "utf8":
              case "utf-8":
                ret = this.parent.utf8Write(string, this.offset + offset, length);
                break;

              case "ascii":
                ret = this.parent.asciiWrite(string, this.offset + offset, length);
                break;

              case "binary":
                ret = this.parent.binaryWrite(string, this.offset + offset, length);
                break;

              case "base64":
                ret = this.parent.base64Write(string, this.offset + offset, length);
                break;

              case "ucs2":
              case "ucs-2":
                ret = this.parent.ucs2Write(string, this.offset + offset, length);
                break;

              default:
                throw Error("Unknown encoding");
            }
            return Buffer._charsWritten = SlowBuffer._charsWritten, ret;
        }, Buffer.prototype.toString = function(encoding, start, end) {
            switch (encoding = ((encoding || "utf8") + "").toLowerCase(), void 0 === start || 0 > start ? start = 0 : start > this.length && (start = this.length), 
            void 0 === end || end > this.length ? end = this.length : 0 > end && (end = 0), 
            start += this.offset, end += this.offset, encoding) {
              case "hex":
                return this.parent.hexSlice(start, end);

              case "utf8":
              case "utf-8":
                return this.parent.utf8Slice(start, end);

              case "ascii":
                return this.parent.asciiSlice(start, end);

              case "binary":
                return this.parent.binarySlice(start, end);

              case "base64":
                return this.parent.base64Slice(start, end);

              case "ucs2":
              case "ucs-2":
                console.log(this.parent.ucs2Slice);
                console.log(this.parent.base64Slice);
                return this.parent.ucs2Slice(start, end);

              default:
                throw Error("Unknown encoding");
            }
        }, Buffer.byteLength = SlowBuffer.byteLength, Buffer.prototype.fill = function(value, start, end) {
            if (value || (value = 0), start || (start = 0), end || (end = this.length), "string" == typeof value && (value = value.charCodeAt(0)), 
            "number" != typeof value || isNaN(value)) throw Error("value is not a number");
            if (start > end) throw Error("end < start");
            if (end === start) return 0;
            if (0 == this.length) return 0;
            if (0 > start || start >= this.length) throw Error("start out of bounds");
            if (0 > end || end > this.length) throw Error("end out of bounds");
            return this.parent.fill(value, start + this.offset, end + this.offset);
        }, Buffer.prototype.copy = function(target, target_start, start, end) {
            var source = this;
            if (start || (start = 0), end || (end = this.length), target_start || (target_start = 0), 
            start > end) throw Error("sourceEnd < sourceStart");
            if (end === start) return 0;
            if (0 == target.length || 0 == source.length) return 0;
            if (0 > target_start || target_start >= target.length) throw Error("targetStart out of bounds");
            if (0 > start || start >= source.length) throw Error("sourceStart out of bounds");
            if (0 > end || end > source.length) throw Error("sourceEnd out of bounds");
            return end > this.length && (end = this.length), end - start > target.length - target_start && (end = target.length - target_start + start), 
            this.parent.copy(target.parent, target_start + target.offset, start + this.offset, end + this.offset);
        }, Buffer.prototype.slice = function(start, end) {
            if (void 0 === end && (end = this.length), end > this.length) throw Error("oob");
            if (start > end) throw Error("oob");
            return new Buffer(this.parent, end - start, +start + this.offset);
        }, Buffer.prototype.utf8Slice = function(start, end) {
            return this.toString("utf8", start, end);
        }, Buffer.prototype.ucs2Slice = function() {
            console.log("asdasdasdasdafaewf");
            return "";
        }, Buffer.prototype.binarySlice = function(start, end) {
            return this.toString("binary", start, end);
        }, Buffer.prototype.asciiSlice = function(start, end) {
            return this.toString("ascii", start, end);
        }, Buffer.prototype.utf8Write = function(string, offset) {
            return this.write(string, offset, "utf8");
        }, Buffer.prototype.binaryWrite = function(string, offset) {
            return this.write(string, offset, "binary");
        }, Buffer.prototype.asciiWrite = function(string, offset) {
            return this.write(string, offset, "ascii");
        }, Buffer.prototype.readUInt8 = function(offset, noAssert) {
            var buffer = this;
            return noAssert || (assert.ok(void 0 !== offset && null !== offset, "missing offset"), 
            assert.ok(buffer.length > offset, "Trying to read beyond buffer length")), buffer.parent[buffer.offset + offset];
        }, Buffer.prototype.readUInt16LE = function(offset, noAssert) {
            return readUInt16(this, offset, !1, noAssert);
        }, Buffer.prototype.readUInt16BE = function(offset, noAssert) {
            return readUInt16(this, offset, !0, noAssert);
        }, Buffer.prototype.readUInt32LE = function(offset, noAssert) {
            return readUInt32(this, offset, !1, noAssert);
        }, Buffer.prototype.readUInt32BE = function(offset, noAssert) {
            return readUInt32(this, offset, !0, noAssert);
        }, Buffer.prototype.readInt8 = function(offset, noAssert) {
            var neg, buffer = this;
            return noAssert || (assert.ok(void 0 !== offset && null !== offset, "missing offset"), 
            assert.ok(buffer.length > offset, "Trying to read beyond buffer length")), neg = 128 & buffer.parent[buffer.offset + offset], 
            neg ? -1 * (255 - buffer.parent[buffer.offset + offset] + 1) : buffer.parent[buffer.offset + offset];
        }, Buffer.prototype.readInt16LE = function(offset, noAssert) {
            return readInt16(this, offset, !1, noAssert);
        }, Buffer.prototype.readInt16BE = function(offset, noAssert) {
            return readInt16(this, offset, !0, noAssert);
        }, Buffer.prototype.readInt32LE = function(offset, noAssert) {
            return readInt32(this, offset, !1, noAssert);
        }, Buffer.prototype.readInt32BE = function(offset, noAssert) {
            return readInt32(this, offset, !0, noAssert);
        }, Buffer.prototype.readFloatLE = function(offset, noAssert) {
            return readFloat(this, offset, !1, noAssert);
        }, Buffer.prototype.readFloatBE = function(offset, noAssert) {
            return readFloat(this, offset, !0, noAssert);
        }, Buffer.prototype.readDoubleLE = function(offset, noAssert) {
            return readDouble(this, offset, !1, noAssert);
        }, Buffer.prototype.readDoubleBE = function(offset, noAssert) {
            return readDouble(this, offset, !0, noAssert);
        }, Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
            var buffer = this;
            noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok(void 0 !== offset && null !== offset, "missing offset"), 
            assert.ok(buffer.length > offset, "trying to write beyond buffer length"), verifuint(value, 255)), 
            buffer.parent[buffer.offset + offset] = value;
        }, Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
            writeUInt16(this, value, offset, !1, noAssert);
        }, Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
            writeUInt16(this, value, offset, !0, noAssert);
        }, Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
            writeUInt32(this, value, offset, !1, noAssert);
        }, Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
            writeUInt32(this, value, offset, !0, noAssert);
        }, Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
            var buffer = this;
            noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok(void 0 !== offset && null !== offset, "missing offset"), 
            assert.ok(buffer.length > offset, "Trying to write beyond buffer length"), verifsint(value, 127, -128)), 
            value >= 0 ? buffer.writeUInt8(value, offset, noAssert) : buffer.writeUInt8(255 + value + 1, offset, noAssert);
        }, Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
            writeInt16(this, value, offset, !1, noAssert);
        }, Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
            writeInt16(this, value, offset, !0, noAssert);
        }, Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
            writeInt32(this, value, offset, !1, noAssert);
        }, Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
            writeInt32(this, value, offset, !0, noAssert);
        }, Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
            writeFloat(this, value, offset, !1, noAssert);
        }, Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
            writeFloat(this, value, offset, !0, noAssert);
        }, Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
            writeDouble(this, value, offset, !1, noAssert);
        }, Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
            writeDouble(this, value, offset, !0, noAssert);
        }, SlowBuffer.prototype.readUInt8 = Buffer.prototype.readUInt8, SlowBuffer.prototype.readUInt16LE = Buffer.prototype.readUInt16LE, 
        SlowBuffer.prototype.readUInt16BE = Buffer.prototype.readUInt16BE, SlowBuffer.prototype.readUInt32LE = Buffer.prototype.readUInt32LE, 
        SlowBuffer.prototype.readUInt32BE = Buffer.prototype.readUInt32BE, SlowBuffer.prototype.readInt8 = Buffer.prototype.readInt8, 
        SlowBuffer.prototype.readInt16LE = Buffer.prototype.readInt16LE, SlowBuffer.prototype.readInt16BE = Buffer.prototype.readInt16BE, 
        SlowBuffer.prototype.readInt32LE = Buffer.prototype.readInt32LE, SlowBuffer.prototype.readInt32BE = Buffer.prototype.readInt32BE, 
        SlowBuffer.prototype.readFloatLE = Buffer.prototype.readFloatLE, SlowBuffer.prototype.readFloatBE = Buffer.prototype.readFloatBE, 
        SlowBuffer.prototype.readDoubleLE = Buffer.prototype.readDoubleLE, SlowBuffer.prototype.readDoubleBE = Buffer.prototype.readDoubleBE, 
        SlowBuffer.prototype.writeUInt8 = Buffer.prototype.writeUInt8, SlowBuffer.prototype.writeUInt16LE = Buffer.prototype.writeUInt16LE, 
        SlowBuffer.prototype.writeUInt16BE = Buffer.prototype.writeUInt16BE, SlowBuffer.prototype.writeUInt32LE = Buffer.prototype.writeUInt32LE, 
        SlowBuffer.prototype.writeUInt32BE = Buffer.prototype.writeUInt32BE, SlowBuffer.prototype.writeInt8 = Buffer.prototype.writeInt8, 
        SlowBuffer.prototype.writeInt16LE = Buffer.prototype.writeInt16LE, SlowBuffer.prototype.writeInt16BE = Buffer.prototype.writeInt16BE, 
        SlowBuffer.prototype.writeInt32LE = Buffer.prototype.writeInt32LE, SlowBuffer.prototype.writeInt32BE = Buffer.prototype.writeInt32BE, 
        SlowBuffer.prototype.writeFloatLE = Buffer.prototype.writeFloatLE, SlowBuffer.prototype.writeFloatBE = Buffer.prototype.writeFloatBE, 
        SlowBuffer.prototype.writeDoubleLE = Buffer.prototype.writeDoubleLE, SlowBuffer.prototype.writeDoubleBE = Buffer.prototype.writeDoubleBE;
        var buffer_ieee745 = {};
        buffer_ieee745.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
            var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isBE ? 0 : nBytes - 1, d = isBE ? 1 : -1, s = buffer[offset + i];
            for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = 256 * e + buffer[offset + i], 
            i += d, nBits -= 8) ;
            for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = 256 * m + buffer[offset + i], 
            i += d, nBits -= 8) ;
            if (0 === e) e = 1 - eBias; else {
                if (e === eMax) return m ? 0/0 : 1 / 0 * (s ? -1 : 1);
                m += Math.pow(2, mLen), e -= eBias;
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        }, buffer_ieee745.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
            var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isBE ? nBytes - 1 : 0, d = isBE ? -1 : 1, s = 0 > value || 0 === value && 0 > 1 / value ? 1 : 0;
            for (value = Math.abs(value), isNaN(value) || 1 / 0 === value ? (m = isNaN(value) ? 1 : 0, 
            e = eMax) : (e = Math.floor(Math.log(value) / Math.LN2), 1 > value * (c = Math.pow(2, -e)) && (e--, 
            c *= 2), value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias), value * c >= 2 && (e++, 
            c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e + eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), 
            e += eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = 255 & m, 
            i += d, m /= 256, mLen -= 8) ;
            for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = 255 & e, i += d, 
            e /= 256, eLen -= 8) ;
            buffer[offset + i - d] |= 128 * s;
        };
        var b64 = {};
        b64.lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", 
        b64.toByteArray = function(b64) {
            var i, j, l, tmp, placeHolders, arr;
            if (b64.length % 4 > 0) throw "Invalid string. Length must be a multiple of 4";
            for (placeHolders = b64.indexOf("="), placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0, 
            arr = [], l = placeHolders > 0 ? b64.length - 4 : b64.length, i = 0, j = 0; l > i; i += 4, 
            j += 3) tmp = b64.lookup.indexOf(b64[i]) << 18 | b64.lookup.indexOf(b64[i + 1]) << 12 | b64.lookup.indexOf(b64[i + 2]) << 6 | b64.lookup.indexOf(b64[i + 3]), 
            arr.push((16711680 & tmp) >> 16), arr.push((65280 & tmp) >> 8), arr.push(255 & tmp);
            return 2 === placeHolders ? (tmp = b64.lookup.indexOf(b64[i]) << 2 | b64.lookup.indexOf(b64[i + 1]) >> 4, 
            arr.push(255 & tmp)) : 1 === placeHolders && (tmp = b64.lookup.indexOf(b64[i]) << 10 | b64.lookup.indexOf(b64[i + 1]) << 4 | b64.lookup.indexOf(b64[i + 2]) >> 2, 
            arr.push(255 & tmp >> 8), arr.push(255 & tmp)), arr;
        }, b64.fromByteArray = function(uint8) {
            function tripletToBase64(num) {
                return lookup[63 & num >> 18] + lookup[63 & num >> 12] + lookup[63 & num >> 6] + lookup[63 & num];
            }
            var i, temp, length, extraBytes = uint8.length % 3, output = "";
            for (i = 0, length = uint8.length - extraBytes; length > i; i += 3) temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2], 
            output += tripletToBase64(temp);
            switch (extraBytes) {
              case 1:
                temp = uint8[uint8.length - 1], output += b64.lookup[temp >> 2], output += b64.lookup[63 & temp << 4], 
                output += "==";
                break;

              case 2:
                temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1], output += b64.lookup[temp >> 10], 
                output += b64.lookup[63 & temp >> 4], output += b64.lookup[63 & temp << 2], output += "=";
            }
            return output;
        }, exports.INSPECT_MAX_BYTES = 50;
    }), require.register("node/lib/events.js", function(exports) {
        function EventEmitter(obj) {
            return obj ? mixin(obj) : void 0;
        }
        function mixin(obj) {
            for (var key in EventEmitter.prototype) obj[key] = EventEmitter.prototype[key];
            return obj;
        }
        exports.EventEmitter = EventEmitter, EventEmitter.prototype.on = function(event, fn) {
            return this._callbacks = this._callbacks || {}, (this._callbacks[event] = this._callbacks[event] || []).push(fn), 
            this;
        }, EventEmitter.prototype.once = function(event, fn) {
            function on() {
                self.off(event, on), fn.apply(this, arguments);
            }
            var self = this;
            return this._callbacks = this._callbacks || {}, fn._off = on, this.on(event, on), 
            this;
        }, EventEmitter.prototype.off = EventEmitter.prototype.removeListener = EventEmitter.prototype.removeAllListeners = function(event, fn) {
            this._callbacks = this._callbacks || {};
            var callbacks = this._callbacks[event];
            if (!callbacks) return this;
            if (1 == arguments.length) return delete this._callbacks[event], this;
            var i = callbacks.indexOf(fn._off || fn);
            return ~i && callbacks.splice(i, 1), this;
        }, EventEmitter.prototype.emit = function(event) {
            this._callbacks = this._callbacks || {};
            var args = [].slice.call(arguments, 1), callbacks = this._callbacks[event];
            if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; len > i; ++i) callbacks[i].apply(this, args);
            }
            return this;
        }, EventEmitter.prototype.listeners = function(event) {
            return this._callbacks = this._callbacks || {}, this._callbacks[event] || [];
        }, EventEmitter.prototype.hasListeners = function(event) {
            return !!this.listeners(event).length;
        };
    }), require.register("node/lib/stream.js", function(exports, require, module) {
        function Stream() {
            EE.call(this);
        }
        module.exports = Stream;
        var EE = require("./events").EventEmitter, util = require("./util");
        util.inherits(Stream, EE), Stream.Readable = require("./_stream_readable"), Stream.Writable = require("./_stream_writable"), 
        Stream.Duplex = require("./_stream_duplex"), Stream.Transform = require("./_stream_transform"), 
        Stream.PassThrough = require("./_stream_passthrough"), Stream.Stream = Stream, Stream.prototype.pipe = function(dest, options) {
            function ondata(chunk) {
                dest.writable && !1 === dest.write(chunk) && source.pause && source.pause();
            }
            function ondrain() {
                source.readable && source.resume && source.resume();
            }
            function onend() {
                didOnEnd || (didOnEnd = !0, dest.end());
            }
            function onclose() {
                didOnEnd || (didOnEnd = !0, "function" == typeof dest.destroy && dest.destroy());
            }
            function onerror(er) {
                if (cleanup(), 0 === EE.listenerCount(this, "error")) throw er;
            }
            function cleanup() {
                source.removeListener("data", ondata), dest.removeListener("drain", ondrain), source.removeListener("end", onend), 
                source.removeListener("close", onclose), source.removeListener("error", onerror), 
                dest.removeListener("error", onerror), source.removeListener("end", cleanup), source.removeListener("close", cleanup), 
                dest.removeListener("close", cleanup);
            }
            var source = this;
            source.on("data", ondata), dest.on("drain", ondrain), dest._isStdio || options && options.end === !1 || (source.on("end", onend), 
            source.on("close", onclose));
            var didOnEnd = !1;
            return source.on("error", onerror), dest.on("error", onerror), source.on("end", cleanup), 
            source.on("close", cleanup), dest.on("close", cleanup), dest.emit("pipe", source), 
            dest;
        };
    }), require.register("node/lib/string_decoder.js", function(exports, require) {
        function assertEncoding(encoding) {
            if (encoding && !Buffer.isEncoding(encoding)) throw Error("Unknown encoding: " + encoding);
        }
        function passThroughWrite(buffer) {
            return buffer.toString(this.encoding);
        }
        function utf16DetectIncompleteChar(buffer) {
            var incomplete = this.charReceived = buffer.length % 2;
            return this.charLength = incomplete ? 2 : 0, incomplete;
        }
        function base64DetectIncompleteChar(buffer) {
            var incomplete = this.charReceived = buffer.length % 3;
            return this.charLength = incomplete ? 3 : 0, incomplete;
        }
        var Buffer = require("./buffer").Buffer, StringDecoder = exports.StringDecoder = function(encoding) {
            switch (this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, ""), 
            assertEncoding(encoding), this.encoding) {
              case "utf8":
                this.surrogateSize = 3;
                break;

              case "ucs2":
              case "utf16le":
                this.surrogateSize = 2, this.detectIncompleteChar = utf16DetectIncompleteChar;
                break;

              case "base64":
                this.surrogateSize = 3, this.detectIncompleteChar = base64DetectIncompleteChar;
                break;

              default:
                return this.write = passThroughWrite, void 0;
            }
            this.charBuffer = new Buffer(6), this.charReceived = 0, this.charLength = 0;
        };
        StringDecoder.prototype.write = function(buffer) {
            for (var charStr = "", offset = 0; this.charLength; ) {
                var i = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
                if (buffer.copy(this.charBuffer, this.charReceived, offset, i), this.charReceived += i - offset, 
                offset = i, this.charReceived < this.charLength) return "";
                charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
                var charCode = charStr.charCodeAt(charStr.length - 1);
                if (!(charCode >= 55296 && 56319 >= charCode)) {
                    if (this.charReceived = this.charLength = 0, i == buffer.length) return charStr;
                    buffer = buffer.slice(i, buffer.length);
                    break;
                }
                this.charLength += this.surrogateSize, charStr = "";
            }
            var lenIncomplete = this.detectIncompleteChar(buffer), end = buffer.length;
            this.charLength && (buffer.copy(this.charBuffer, 0, buffer.length - lenIncomplete, end), 
            this.charReceived = lenIncomplete, end -= lenIncomplete), charStr += buffer.toString(this.encoding, 0, end);
            var end = charStr.length - 1, charCode = charStr.charCodeAt(end);
            if (charCode >= 55296 && 56319 >= charCode) {
                var size = this.surrogateSize;
                return this.charLength += size, this.charReceived += size, this.charBuffer.copy(this.charBuffer, size, 0, size), 
                this.charBuffer.write(charStr.charAt(charStr.length - 1), this.encoding), charStr.substring(0, end);
            }
            return charStr;
        }, StringDecoder.prototype.detectIncompleteChar = function(buffer) {
            for (var i = buffer.length >= 3 ? 3 : buffer.length; i > 0; i--) {
                var c = buffer[buffer.length - i];
                if (1 == i && 6 == c >> 5) {
                    this.charLength = 2;
                    break;
                }
                if (2 >= i && 14 == c >> 4) {
                    this.charLength = 3;
                    break;
                }
                if (3 >= i && 30 == c >> 3) {
                    this.charLength = 4;
                    break;
                }
            }
            return i;
        }, StringDecoder.prototype.end = function(buffer) {
            var res = "";
            if (buffer && buffer.length && (res = this.write(buffer)), this.charReceived) {
                var cr = this.charReceived, buf = this.charBuffer, enc = this.encoding;
                res += buf.slice(0, cr).toString(enc);
            }
            return res;
        };
    }), require.register("node/lib/util.js", function(exports, require) {
        function inspect(obj, opts) {
            var ctx = {
                seen: [],
                stylize: stylizeNoColor
            };
            return arguments.length >= 3 && (ctx.depth = arguments[2]), arguments.length >= 4 && (ctx.colors = arguments[3]), 
            "boolean" == typeof opts ? ctx.showHidden = opts : opts && exports._extend(ctx, opts), 
            void 0 === ctx.showHidden && (ctx.showHidden = !1), void 0 === ctx.depth && (ctx.depth = 2), 
            void 0 === ctx.colors && (ctx.colors = !1), void 0 === ctx.customInspect && (ctx.customInspect = !0), 
            ctx.colors && (ctx.stylize = stylizeWithColor), formatValue(ctx, obj, ctx.depth);
        }
        function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];
            return style ? "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m" : str;
        }
        function stylizeNoColor(str) {
            return str;
        }
        function arrayToHash(array) {
            var hash = {};
            return array.forEach(function(val) {
                hash[val] = !0;
            }), hash;
        }
        function formatValue(ctx, value, recurseTimes) {
            if (ctx.customInspect && value && "function" == typeof value.inspect && value.inspect !== exports.inspect && (!value.constructor || value.constructor.prototype !== value)) return value.inspect(recurseTimes) + "";
            var primitive = formatPrimitive(ctx, value);
            if (primitive) return primitive;
            var keys = Object.keys(value), visibleKeys = arrayToHash(keys);
            if (ctx.showHidden && (keys = Object.getOwnPropertyNames(value)), 0 === keys.length) {
                if ("function" == typeof value) {
                    var name = value.name ? ": " + value.name : "";
                    return ctx.stylize("[Function" + name + "]", "special");
                }
                if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), "date");
                if (isError(value)) return formatError(value);
            }
            var base = "", array = !1, braces = [ "{", "}" ];
            if (isArray(value) && (array = !0, braces = [ "[", "]" ]), "function" == typeof value) {
                var n = value.name ? ": " + value.name : "";
                base = " [Function" + n + "]";
            }
            if (isRegExp(value) && (base = " " + RegExp.prototype.toString.call(value)), isDate(value) && (base = " " + Date.prototype.toUTCString.call(value)), 
            isError(value) && (base = " " + formatError(value)), 0 === keys.length && (!array || 0 == value.length)) return braces[0] + base + braces[1];
            if (0 > recurseTimes) return isRegExp(value) ? ctx.stylize(RegExp.prototype.toString.call(value), "regexp") : ctx.stylize("[Object]", "special");
            ctx.seen.push(value);
            var output;
            return output = array ? formatArray(ctx, value, recurseTimes, visibleKeys, keys) : keys.map(function(key) {
                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            }), ctx.seen.pop(), reduceToSingleString(output, base, braces);
        }
        function formatPrimitive(ctx, value) {
            switch (typeof value) {
              case "undefined":
                return ctx.stylize("undefined", "undefined");

              case "string":
                var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                return ctx.stylize(simple, "string");

              case "number":
                return ctx.stylize("" + value, "number");

              case "boolean":
                return ctx.stylize("" + value, "boolean");
            }
            return null === value ? ctx.stylize("null", "null") : void 0;
        }
        function formatError(value) {
            return "[" + Error.prototype.toString.call(value) + "]";
        }
        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            for (var output = [], i = 0, l = value.length; l > i; ++i) hasOwnProperty(value, i + "") ? output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, i + "", !0)) : output.push("");
            return keys.forEach(function(key) {
                key.match(/^\d+$/) || output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, !0));
            }), output;
        }
        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
            var name, str, desc;
            if (desc = Object.getOwnPropertyDescriptor(value, key) || {
                value: value[key]
            }, desc.get ? str = desc.set ? ctx.stylize("[Getter/Setter]", "special") : ctx.stylize("[Getter]", "special") : desc.set && (str = ctx.stylize("[Setter]", "special")), 
            hasOwnProperty(visibleKeys, key) || (name = "[" + key + "]"), str || (0 > ctx.seen.indexOf(desc.value) ? (str = null === recurseTimes ? formatValue(ctx, desc.value, null) : formatValue(ctx, desc.value, recurseTimes - 1), 
            str.indexOf("\n") > -1 && (str = array ? str.split("\n").map(function(line) {
                return "  " + line;
            }).join("\n").substr(2) : "\n" + str.split("\n").map(function(line) {
                return "   " + line;
            }).join("\n"))) : str = ctx.stylize("[Circular]", "special")), void 0 === name) {
                if (array && key.match(/^\d+$/)) return str;
                name = JSON.stringify("" + key), name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (name = name.substr(1, name.length - 2), 
                name = ctx.stylize(name, "name")) : (name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), 
                name = ctx.stylize(name, "string"));
            }
            return name + ": " + str;
        }
        function reduceToSingleString(output, base, braces) {
            var numLinesEst = 0, length = output.reduce(function(prev, cur) {
                return numLinesEst++, cur.indexOf("\n") >= 0 && numLinesEst++, prev + cur.length + 1;
            }, 0);
            return length > 60 ? braces[0] + ("" === base ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1] : braces[0] + base + " " + output.join(", ") + " " + braces[1];
        }
        function isArray(ar) {
            return Array.isArray(ar) || "object" == typeof ar && "[object Array]" === objectToString(ar);
        }
        function isRegExp(re) {
            return "object" == typeof re && "[object RegExp]" === objectToString(re);
        }
        function isDate(d) {
            return "object" == typeof d && "[object Date]" === objectToString(d);
        }
        function isError(e) {
            return "object" == typeof e && "[object Error]" === objectToString(e);
        }
        function objectToString(o) {
            return Object.prototype.toString.call(o);
        }
        function pad(n) {
            return 10 > n ? "0" + n.toString(10) : n.toString(10);
        }
        function timestamp() {
            var d = new Date(), time = [ pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds()) ].join(":");
            return [ d.getDate(), months[d.getMonth()], time ].join(" ");
        }
        function pump(readStream, writeStream, callback) {
            function call(a, b, c) {
                callback && !callbackCalled && (callback(a, b, c), callbackCalled = !0);
            }
            var callbackCalled = !1;
            readStream.addListener("data", function(chunk) {
                writeStream.write(chunk) === !1 && readStream.pause();
            }), writeStream.addListener("drain", function() {
                readStream.resume();
            }), readStream.addListener("end", function() {
                writeStream.end();
            }), readStream.addListener("close", function() {
                call();
            }), readStream.addListener("error", function(err) {
                writeStream.end(), call(err);
            }), writeStream.addListener("error", function(err) {
                readStream.destroy(), call(err);
            });
        }
        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }
        var process = {
            noDeprecation: !1,
            traceDeprecation: !1,
            stdout: console.log,
            stderr: console.error
        };
        console.trace = console.debug;
        var formatRegExp = /%[sdj%]/g;
        exports.format = function(f) {
            if ("string" != typeof f) {
                for (var objects = [], i = 0; arguments.length > i; i++) objects.push(inspect(arguments[i]));
                return objects.join(" ");
            }
            for (var i = 1, args = arguments, len = args.length, str = (f + "").replace(formatRegExp, function(x) {
                if ("%%" === x) return "%";
                if (i >= len) return x;
                switch (x) {
                  case "%s":
                    return args[i++] + "";

                  case "%d":
                    return Number(args[i++]);

                  case "%j":
                    return JSON.stringify(args[i++]);

                  default:
                    return x;
                }
            }), x = args[i]; len > i; x = args[++i]) str += null === x || "object" != typeof x ? " " + x : " " + inspect(x);
            return str;
        }, exports.deprecate = function(fn, msg) {
            function deprecated() {
                return warned || (process.traceDeprecation ? console.trace(msg) : console.error(msg), 
                warned = !0), fn.apply(this, arguments);
            }
            if (process.noDeprecation === !0) return fn;
            var warned = !1;
            return deprecated;
        }, exports.print = function() {
            for (var i = 0, len = arguments.length; len > i; ++i) process.stdout.write(arguments[i] + "");
        }, exports.puts = function() {
            for (var i = 0, len = arguments.length; len > i; ++i) process.stdout.write(arguments[i] + "\n");
        }, exports.debug = function(x) {
            process.stderr.write("DEBUG: " + x + "\n");
        };
        var error = exports.error = function() {
            for (var i = 0, len = arguments.length; len > i; ++i) process.stderr.write(arguments[i] + "\n");
        };
        exports.inspect = inspect, inspect.colors = {
            bold: [ 1, 22 ],
            italic: [ 3, 23 ],
            underline: [ 4, 24 ],
            inverse: [ 7, 27 ],
            white: [ 37, 39 ],
            grey: [ 90, 39 ],
            black: [ 30, 39 ],
            blue: [ 34, 39 ],
            cyan: [ 36, 39 ],
            green: [ 32, 39 ],
            magenta: [ 35, 39 ],
            red: [ 31, 39 ],
            yellow: [ 33, 39 ]
        }, inspect.styles = {
            special: "cyan",
            number: "yellow",
            "boolean": "yellow",
            undefined: "grey",
            "null": "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
        }, exports.isArray = isArray, exports.isRegExp = isRegExp, exports.isDate = isDate, 
        exports.isError = isError, exports.p = exports.deprecate(function() {
            for (var i = 0, len = arguments.length; len > i; ++i) error(exports.inspect(arguments[i]));
        }, "util.p: Use console.error() instead.");
        var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        exports.log = function(msg) {
            exports.puts(timestamp() + " - " + ("" + msg));
        }, exports.exec = exports.deprecate(function() {
            return require("child_process").exec.apply(this, arguments);
        }, "util.exec is now called `child_process.exec`."), exports.pump = exports.deprecate(pump, "util.pump() is deprecated. Use readableStream.pipe() instead."), 
        exports.inherits = function(ctor, superCtor) {
            ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
        }, exports._extend = function(origin, add) {
            if (!add || "object" != typeof add) return origin;
            for (var keys = Object.keys(add), i = keys.length; i--; ) origin[keys[i]] = add[keys[i]];
            return origin;
        };
    }), require.register("node/lib/_stream_duplex.js", function(exports, require, module) {
        function Duplex(options) {
            return this instanceof Duplex ? (Readable.call(this, options), Writable.call(this, options), 
            options && options.readable === !1 && (this.readable = !1), options && options.writable === !1 && (this.writable = !1), 
            this.allowHalfOpen = !0, options && options.allowHalfOpen === !1 && (this.allowHalfOpen = !1), 
            this.once("end", onend), void 0) : new Duplex(options);
        }
        function onend() {
            this.allowHalfOpen || this._writableState.ended || process.nextTick(this.end.bind(this));
        }
        module.exports = Duplex;
        var util = require("./util"), Readable = require("./_stream_readable"), Writable = require("./_stream_writable");
        util.inherits(Duplex, Readable), Object.keys(Writable.prototype).forEach(function(method) {
            Duplex.prototype[method] || (Duplex.prototype[method] = Writable.prototype[method]);
        });
    }), require.register("node/lib/_stream_passthrough.js", function(exports, require, module) {
        function PassThrough(options) {
            return this instanceof PassThrough ? (Transform.call(this, options), void 0) : new PassThrough(options);
        }
        module.exports = PassThrough;
        var Transform = require("./_stream_transform"), util = require("./util");
        util.inherits(PassThrough, Transform), PassThrough.prototype._transform = function(chunk, encoding, cb) {
            cb(null, chunk);
        };
    }), require.register("node/lib/_stream_readable.js", function(exports, require, module) {
        function ReadableState(options) {
            options = options || {}, this.bufferSize = options.bufferSize || 16384;
            var hwm = options.highWaterMark;
            this.highWaterMark = hwm || 0 === hwm ? hwm : 16384, this.bufferSize = ~~this.bufferSize, 
            this.highWaterMark = ~~this.highWaterMark, this.buffer = [], this.length = 0, this.pipes = null, 
            this.pipesCount = 0, this.flowing = !1, this.ended = !1, this.endEmitted = !1, this.reading = !1, 
            this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.objectMode = !!options.objectMode, 
            this.ranOut = !1, this.awaitDrain = 0, this.pipeChunkSize = null, this.decoder = null, 
            options.encoding && (StringDecoder || (StringDecoder = require("./string_decoder").StringDecoder), 
            this.decoder = new StringDecoder(options.encoding));
        }
        function Readable(options) {
            return this instanceof Readable ? (this._readableState = new ReadableState(options, this), 
            this.readable = !0, Stream.call(this), void 0) : new Readable(options);
        }
        function readableAddChunk(stream, state, chunk, addToFront) {
            state.reading = !1;
            var er = chunkInvalid(state, chunk);
            return er ? stream.emit("error", er) : null === chunk || void 0 === chunk ? onEofChunk(stream, state) : (state.objectMode || chunk && chunk.length > 0) && (state.decoder && (chunk = state.decoder.write(chunk)), 
            state.length += state.objectMode ? 1 : chunk.length, addToFront ? state.buffer.unshift(chunk) : state.buffer.push(chunk), 
            state.needReadable && emitReadable(stream), maybeReadMore(stream, state)), needMoreData(state);
        }
        function needMoreData(state) {
            return !state.ended && (state.needReadable || state.length < state.highWaterMark || 0 === state.length);
        }
        function howMuchToRead(n, state) {
            return 0 === state.length && state.ended ? 0 : state.objectMode ? 0 === n ? 0 : 1 : isNaN(n) || null === n ? state.flowing && state.buffer.length ? state.buffer[0].length : state.length : 0 >= n ? 0 : n > state.length ? state.ended ? state.length : (state.needReadable = !0, 
            0) : n;
        }
        function chunkInvalid(state, chunk) {
            var er = null;
            return Buffer.isBuffer(chunk) || "string" == typeof chunk || null === chunk || void 0 === chunk || state.objectMode || er || (er = new TypeError("Invalid non-string/buffer chunk")), 
            er;
        }
        function onEofChunk(stream, state) {
            if (state.ended = !0, state.decoder) {
                var chunk = state.decoder.end();
                chunk && chunk.length && (state.buffer.push(chunk), state.length += state.objectMode ? 1 : chunk.length);
            }
            state.length > 0 ? emitReadable(stream) : endReadable(stream);
        }
        function emitReadable(stream) {
            var state = stream._readableState;
            state.needReadable = !1, state.emittedReadable || (state.emittedReadable = !0, state.sync ? process.nextTick(function() {
                emitReadable_(stream);
            }) : emitReadable_(stream));
        }
        function emitReadable_(stream) {
            stream._readableState, stream.emit("readable");
        }
        function maybeReadMore(stream, state) {
            state.sync ? process.nextTick(function() {
                maybeReadMore_(stream, state);
            }) : maybeReadMore_(stream, state);
        }
        function maybeReadMore_(stream, state) {
            !state.reading && !state.ended && state.length < state.highWaterMark && stream.read(0);
        }
        function pipeOnDrain(src) {
            return function() {
                var state = src._readableState;
                state.awaitDrain--, 0 === state.awaitDrain && flow(src);
            };
        }
        function flow(src) {
            function write(dest) {
                var written = dest.write(chunk);
                !1 === written && state.awaitDrain++;
            }
            var chunk, state = src._readableState;
            for (state.awaitDrain = 0; state.pipesCount && null !== (chunk = src.read(state.pipeChunkSize)); ) if (1 === state.pipesCount ? write(state.pipes, 0, null) : state.pipes.forEach(write), 
            src.emit("data", chunk), state.awaitDrain > 0) return;
            return 0 === state.pipesCount ? (state.flowing = !1, EE.listenerCount(src, "data") > 0 && emitDataEvents(src), 
            void 0) : (state.ranOut = !0, void 0);
        }
        function pipeOnReadable() {
            this._readableState.ranOut && (this._readableState.ranOut = !1, flow(this));
        }
        function emitDataEvents(stream, startPaused) {
            var state = stream._readableState;
            if (state.flowing) throw Error("Cannot switch to old mode now.");
            var paused = startPaused || !1, readable = !1;
            stream.readable = !0, stream.pipe = Stream.prototype.pipe, stream.on = stream.addListener = Stream.prototype.on, 
            stream.on("readable", function() {
                readable = !0;
                for (var c; !paused && null !== (c = stream.read()); ) stream.emit("data", c);
                null === c && (readable = !1, stream._readableState.needReadable = !0);
            }), stream.pause = function() {
                paused = !0, this.emit("pause");
            }, stream.resume = function() {
                paused = !1, readable ? process.nextTick(function() {
                    stream.emit("readable");
                }) : this.read(0), this.emit("resume");
            }, stream.emit("readable");
        }
        function fromList(n, state) {
            var ret, list = state.buffer, length = state.length, stringMode = !!state.decoder, objectMode = !!state.objectMode;
            if (0 === list.length) return null;
            if (0 === length) ret = null; else if (objectMode) ret = list.shift(); else if (!n || n >= length) ret = stringMode ? list.join("") : Buffer.concat(list, length), 
            list.length = 0; else if (list[0].length > n) {
                var buf = list[0];
                ret = buf.slice(0, n), list[0] = buf.slice(n);
            } else if (n === list[0].length) ret = list.shift(); else {
                ret = stringMode ? "" : new Buffer(n);
                for (var c = 0, i = 0, l = list.length; l > i && n > c; i++) {
                    var buf = list[0], cpy = Math.min(n - c, buf.length);
                    stringMode ? ret += buf.slice(0, cpy) : buf.copy(ret, c, 0, cpy), buf.length > cpy ? list[0] = buf.slice(cpy) : list.shift(), 
                    c += cpy;
                }
            }
            return ret;
        }
        function endReadable(stream) {
            var state = stream._readableState;
            if (state.length > 0) throw Error("endReadable called on non-empty stream");
            state.endEmitted || (state.ended = !0, state.endEmitted = !0, process.nextTick(function() {
                stream.readable = !1, stream.emit("end");
            }));
        }
        module.exports = Readable, Readable.ReadableState = ReadableState;
        var StringDecoder, EE = require("./events").EventEmitter, Stream = require("./stream"), util = require("./util");
        util.inherits(Readable, Stream), Readable.prototype.push = function(chunk) {
            var state = this._readableState;
            return readableAddChunk(this, state, chunk, !1);
        }, Readable.prototype.unshift = function(chunk) {
            var state = this._readableState;
            return readableAddChunk(this, state, chunk, !0);
        }, Readable.prototype.setEncoding = function(enc) {
            StringDecoder || (StringDecoder = require("./string_decoder").StringDecoder), this._readableState.decoder = new StringDecoder(enc);
        }, Readable.prototype.read = function(n) {
            var state = this._readableState, nOrig = n;
            if (("number" != typeof n || n > 0) && (state.emittedReadable = !1), 0 === n && state.needReadable && state.length >= state.highWaterMark) return emitReadable(this), 
            null;
            if (n = howMuchToRead(n, state), 0 === n && state.ended) return 0 === state.length && endReadable(this), 
            null;
            var doRead = state.needReadable;
            state.length - n <= state.highWaterMark && (doRead = !0), (state.ended || state.reading) && (doRead = !1), 
            doRead && (state.reading = !0, state.sync = !0, 0 === state.length && (state.needReadable = !0), 
            this._read(state.bufferSize), state.sync = !1), doRead && !state.reading && (n = howMuchToRead(nOrig, state));
            var ret;
            return ret = n > 0 ? fromList(n, state) : null, null === ret && (state.needReadable = !0, 
            n = 0), state.length -= n, 0 !== state.length || state.ended || (state.needReadable = !0), 
            state.ended && !state.endEmitted && 0 === state.length && endReadable(this), ret;
        }, Readable.prototype._read = function() {
            this.emit("error", Error("not implemented"));
        }, Readable.prototype.pipe = function(dest, pipeOpts) {
            function onunpipe(readable) {
                readable === src && cleanup();
            }
            function onend() {
                dest.end();
            }
            function cleanup() {
                dest.removeListener("close", onclose), dest.removeListener("finish", onfinish), 
                dest.removeListener("drain", ondrain), dest.removeListener("error", onerror), dest.removeListener("unpipe", onunpipe), 
                src.removeListener("end", onend), src.removeListener("end", cleanup), (!dest._writableState || dest._writableState.needDrain) && ondrain();
            }
            function onerror(er) {
                unpipe(), 0 === EE.listenerCount(dest, "error") && dest.emit("error", er);
            }
            function onclose() {
                dest.removeListener("finish", onfinish), unpipe();
            }
            function onfinish() {
                dest.removeListener("close", onclose), unpipe();
            }
            function unpipe() {
                src.unpipe(dest);
            }
            var src = this, state = this._readableState;
            switch (state.pipesCount) {
              case 0:
                state.pipes = dest;
                break;

              case 1:
                state.pipes = [ state.pipes, dest ];
                break;

              default:
                state.pipes.push(dest);
            }
            state.pipesCount += 1, pipeOpts && pipeOpts.end === !1 || dest === process.stdout || dest === process.stderr ? src.once("end", cleanup) : src.once("end", onend), 
            dest.on("unpipe", onunpipe), pipeOpts && pipeOpts.chunkSize && (state.pipeChunkSize = pipeOpts.chunkSize);
            var ondrain = pipeOnDrain(src);
            return dest.on("drain", ondrain), dest.once("error", onerror), dest.once("close", onclose), 
            dest.once("finish", onfinish), dest.emit("pipe", src), state.flowing || (this.on("readable", pipeOnReadable), 
            state.flowing = !0, process.nextTick(function() {
                flow(src);
            })), dest;
        }, Readable.prototype.unpipe = function(dest) {
            var state = this._readableState;
            if (0 === state.pipesCount) return this;
            if (1 === state.pipesCount) return dest && dest !== state.pipes ? this : (dest || (dest = state.pipes), 
            state.pipes = null, state.pipesCount = 0, this.removeListener("readable", pipeOnReadable), 
            state.flowing = !1, dest && dest.emit("unpipe", this), this);
            if (!dest) {
                var dests = state.pipes, len = state.pipesCount;
                state.pipes = null, state.pipesCount = 0, this.removeListener("readable", pipeOnReadable), 
                state.flowing = !1;
                for (var i = 0; len > i; i++) dests[i].emit("unpipe", this);
                return this;
            }
            var i = state.pipes.indexOf(dest);
            return -1 === i ? this : (state.pipes.splice(i, 1), state.pipesCount -= 1, 1 === state.pipesCount && (state.pipes = state.pipes[0]), 
            dest.emit("unpipe", this), this);
        }, Readable.prototype.on = function(ev, fn) {
            var res = Stream.prototype.on.call(this, ev, fn);
            return "data" !== ev || this._readableState.flowing || emitDataEvents(this), "readable" === ev && this.read(0), 
            res;
        }, Readable.prototype.addListener = Readable.prototype.on, Readable.prototype.resume = function() {
            emitDataEvents(this), this.read(0), this.emit("resume");
        }, Readable.prototype.pause = function() {
            emitDataEvents(this, !0), this.emit("pause");
        }, Readable.prototype.wrap = function(stream) {
            var state = this._readableState, paused = !1, self = this;
            stream.on("end", function() {
                if (state.ended = !0, state.decoder) {
                    var chunk = state.decoder.end();
                    chunk && chunk.length && self.push(chunk);
                }
                self.push(null);
            }), stream.on("data", function(chunk) {
                if (state.decoder && (chunk = state.decoder.write(chunk)), chunk && chunk.length) {
                    var ret = self.push(chunk);
                    ret || (paused = !0, stream.pause());
                }
            });
            for (var i in stream) "function" == typeof stream[i] && void 0 === this[i] && (this[i] = function(method) {
                return function() {
                    return stream[method].apply(stream, arguments);
                };
            }(i));
            var events = [ "error", "close", "destroy", "pause", "resume" ];
            events.forEach(function(ev) {
                stream.on(ev, self.emit.bind(self, ev));
            }), self._read = function() {
                paused && (stream.resume(), paused = !1);
            };
        }, Readable._fromList = fromList;
    }), require.register("node/lib/_stream_transform.js", function(exports, require, module) {
        function TransformState(options, stream) {
            this.afterTransform = function(er, data) {
                return afterTransform(stream, er, data);
            }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null;
        }
        function afterTransform(stream, er, data) {
            var ts = stream._transformState;
            ts.transforming = !1;
            var cb = ts.writecb;
            if (!cb) return this.emit("error", Error("no writecb in Transform class"));
            ts.writechunk = null, ts.writecb = null, null !== data && void 0 !== data && stream.push(data), 
            cb && cb(er);
            var rs = stream._readableState;
            (rs.needReadable || rs.length < rs.highWaterMark) && stream._read(rs.bufferSize);
        }
        function Transform(options) {
            if (!(this instanceof Transform)) return new Transform(options);
            Duplex.call(this, options), this._transformState = new TransformState(options, this);
            var stream = this;
            this._readableState.needReadable = !0, this._readableState.sync = !1, this.once("finish", function() {
                "function" == typeof this._flush ? this._flush(function(er) {
                    done(stream, er);
                }) : done(stream);
            });
        }
        function done(stream, er) {
            if (er) return stream.emit("error", er);
            var ws = stream._writableState;
            stream._readableState;
            var ts = stream._transformState;
            if (ws.length) throw Error("calling transform done when ws.length != 0");
            if (ts.transforming) throw Error("calling transform done when still transforming");
            return stream.push(null);
        }
        module.exports = Transform;
        var Duplex = require("./_stream_duplex"), util = require("./util");
        util.inherits(Transform, Duplex), Transform.prototype.push = function(chunk) {
            return this._transformState.needTransform = !1, Duplex.prototype.push.call(this, chunk);
        }, Transform.prototype._transform = function() {
            throw Error("not implemented");
        }, Transform.prototype._write = function(chunk, encoding, cb) {
            var ts = this._transformState;
            if (ts.writecb = cb, ts.writechunk = chunk, ts.writeencoding = encoding, !ts.transforming) {
                var rs = this._readableState;
                (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) && this._read(rs.bufferSize);
            }
        }, Transform.prototype._read = function() {
            var ts = this._transformState;
            ts.writechunk && ts.writecb && !ts.transforming ? (ts.transforming = !0, this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform)) : ts.needTransform = !0;
        };
    }), require.register("node/lib/_stream_writable.js", function(exports, require, module) {
        function WriteReq(chunk, encoding, cb) {
            this.chunk = chunk, this.encoding = encoding, this.callback = cb;
        }
        function WritableState(options, stream) {
            options = options || {};
            var hwm = options.highWaterMark;
            this.highWaterMark = hwm || 0 === hwm ? hwm : 16384, this.objectMode = !!options.objectMode, 
            this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, 
            this.ended = !1, this.finished = !1;
            var noDecode = options.decodeStrings === !1;
            this.decodeStrings = !noDecode, this.length = 0, this.writing = !1, this.sync = !0, 
            this.bufferProcessing = !1, this.onwrite = function(er) {
                onwrite(stream, er);
            }, this.writecb = null, this.writelen = 0, this.buffer = [];
        }
        function Writable(options) {
            return this instanceof Writable || this instanceof Stream.Duplex ? (this._writableState = new WritableState(options, this), 
            this.writable = !0, Stream.call(this), void 0) : new Writable(options);
        }
        function writeAfterEnd(stream, state, cb) {
            var er = Error("write after end");
            stream.emit("error", er), process.nextTick(function() {
                cb(er);
            });
        }
        function validChunk(stream, state, chunk, cb) {
            var valid = !0;
            if (!Buffer.isBuffer(chunk) && "string" != typeof chunk && null !== chunk && void 0 !== chunk && !state.objectMode) {
                var er = new TypeError("Invalid non-string/buffer chunk");
                stream.emit("error", er), process.nextTick(function() {
                    cb(er);
                }), valid = !1;
            }
            return valid;
        }
        function decodeChunk(state, chunk, encoding) {
            return state.objectMode || state.decodeStrings === !1 || "string" != typeof chunk || (chunk = new Buffer(chunk, encoding)), 
            chunk;
        }
        function writeOrBuffer(stream, state, chunk, encoding, cb) {
            chunk = decodeChunk(state, chunk, encoding);
            var len = state.objectMode ? 1 : chunk.length;
            state.length += len;
            var ret = state.length < state.highWaterMark;
            return state.needDrain = !ret, state.writing ? state.buffer.push(new WriteReq(chunk, encoding, cb)) : doWrite(stream, state, len, chunk, encoding, cb), 
            ret;
        }
        function doWrite(stream, state, len, chunk, encoding, cb) {
            state.writelen = len, state.writecb = cb, state.writing = !0, state.sync = !0, stream._write(chunk, encoding, state.onwrite), 
            state.sync = !1;
        }
        function onwriteError(stream, state, sync, er, cb) {
            sync ? process.nextTick(function() {
                cb(er);
            }) : cb(er), stream.emit("error", er);
        }
        function onwriteStateUpdate(state) {
            state.writing = !1, state.writecb = null, state.length -= state.writelen, state.writelen = 0;
        }
        function onwrite(stream, er) {
            var state = stream._writableState, sync = state.sync, cb = state.writecb;
            onwriteStateUpdate(state), er ? onwriteError(stream, state, sync, er, cb) : (finishMaybe(stream, state) || (0 === state.length && state.needDrain && onwriteDrain(stream, state), 
            !state.bufferProcessing && state.buffer.length && clearBuffer(stream, state)), sync ? process.nextTick(cb) : cb());
        }
        function onwriteDrain(stream, state) {
            process.nextTick(function() {
                state.needDrain && (state.needDrain = !1, stream.emit("drain"));
            });
        }
        function clearBuffer(stream, state) {
            state.bufferProcessing = !0;
            for (var c = 0; state.buffer.length > c; c++) {
                var entry = state.buffer[c], chunk = entry.chunk, encoding = entry.encoding, cb = entry.callback, len = state.objectMode ? 1 : chunk.length;
                if (doWrite(stream, state, len, chunk, encoding, cb), state.writing) {
                    c++;
                    break;
                }
            }
            state.bufferProcessing = !1, state.buffer.length > c ? state.buffer = state.buffer.slice(c) : state.buffer.length = 0;
        }
        function finishMaybe(stream, state) {
            return state.ending && 0 === state.length && !state.finished && (state.finished = !0, 
            stream.emit("finish")), state.finished;
        }
        function endWritable(stream, state, cb) {
            state.ending = !0, finishMaybe(stream, state), cb && (state.finished ? process.nextTick(cb) : stream.once("finish", cb)), 
            state.ended = !0;
        }
        module.exports = Writable, Writable.WritableState = WritableState;
        var util = require("./util"), Stream = require("./stream");
        util.inherits(Writable, Stream), Writable.prototype.pipe = function() {
            this.emit("error", Error("Cannot pipe. Not readable."));
        }, Writable.prototype.write = function(chunk, encoding, cb) {
            var state = this._writableState, ret = !1;
            return "function" == typeof encoding && (cb = encoding, encoding = null), encoding || (encoding = "utf8"), 
            "function" != typeof cb && (cb = function() {}), state.ended ? writeAfterEnd(this, state, cb) : validChunk(this, state, chunk, cb) && (ret = writeOrBuffer(this, state, chunk, encoding, cb)), 
            ret;
        }, Writable.prototype._write = function(chunk, encoding, cb) {
            cb(Error("not implemented"));
        }, Writable.prototype.end = function(chunk, encoding, cb) {
            var state = this._writableState;
            "function" == typeof chunk ? (cb = chunk, chunk = null, encoding = null) : "function" == typeof encoding && (cb = encoding, 
            encoding = null), void 0 !== chunk && null !== chunk && this.write(chunk, encoding), 
            state.ending || state.finished || endWritable(this, state, cb);
        };
    }), require.alias("node/index.js", "node/index.js"), "object" == typeof exports ? module.exports = require("node") : "function" == typeof define && define.amd ? define(function() {
        return require("node");
    }) : window.node = require("node");
})();