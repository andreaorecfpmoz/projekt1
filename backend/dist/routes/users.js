"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');
var config = require('../config'); // Pretpostavljamo da je config u istom direktoriju
var bcrypt = require('bcrypt');
var saltRounds = 10;
var pool = mysql.createPool(config.db);
router.post('/register', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var _req$body, imePrezime, imePrezimePartnera, email, lozinka, grad, uloga, aktivan, hashedPassword, query, _yield$pool$execute, _yield$pool$execute2, result, newUserQuery, _yield$pool$execute3, _yield$pool$execute4, newUserResult, newUser;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, imePrezime = _req$body.imePrezime, imePrezimePartnera = _req$body.imePrezimePartnera, email = _req$body.email, lozinka = _req$body.lozinka, grad = _req$body.grad, uloga = _req$body.uloga; // Ovdje biste dodali validaciju podataka
          aktivan = 1; // Ako želite da novi korisnici budu automatski aktivni
          _context.next = 5;
          return bcrypt.hash(lozinka, saltRounds);
        case 5:
          hashedPassword = _context.sent;
          query = "\n      INSERT INTO Korisnici (ImePrezime, ImePrezimePartnera, Email, Lozinka, Uloga, Grad, Aktivan)\n      VALUES (?, ?, ?, ?, ?, ?, ?)\n    ";
          _context.next = 9;
          return pool.execute(query, [imePrezime, imePrezimePartnera, email, hashedPassword, uloga, grad, aktivan]);
        case 9:
          _yield$pool$execute = _context.sent;
          _yield$pool$execute2 = _slicedToArray(_yield$pool$execute, 1);
          result = _yield$pool$execute2[0];
          newUserQuery = 'SELECT * FROM Korisnici WHERE IDKorisnika = ?';
          _context.next = 15;
          return pool.execute(newUserQuery, [result.insertId]);
        case 15:
          _yield$pool$execute3 = _context.sent;
          _yield$pool$execute4 = _slicedToArray(_yield$pool$execute3, 1);
          newUserResult = _yield$pool$execute4[0];
          if (!(newUserResult.length === 0)) {
            _context.next = 20;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Greška pri registraciji korisnika.'
          }));
        case 20:
          newUser = newUserResult[0];
          res.status(201).json({
            user: {
              id: newUser.IDKorisnika,
              imePrezime: newUser.ImePrezime,
              email: newUser.Email,
              uloga: newUser.Uloga
            }
          });
          _context.next = 27;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 24]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/login', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var _req$body2, email, lozinka, query, _yield$pool$execute5, _yield$pool$execute6, users, user, match;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, lozinka = _req$body2.lozinka;
          query = 'SELECT * FROM Korisnici WHERE Email = ?';
          _context2.next = 5;
          return pool.execute(query, [email]);
        case 5:
          _yield$pool$execute5 = _context2.sent;
          _yield$pool$execute6 = _slicedToArray(_yield$pool$execute5, 1);
          users = _yield$pool$execute6[0];
          if (!(users.length === 0)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: 'Korisnik nije pronađen.'
          }));
        case 10:
          user = users[0];
          _context2.next = 13;
          return bcrypt.compare(lozinka, user.Lozinka);
        case 13:
          match = _context2.sent;
          if (match) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: 'Neispravna lozinka.'
          }));
        case 16:
          res.json({
            user: {
              id: user.IDKorisnika,
              imePrezime: user.ImePrezime,
              email: user.Email,
              uloga: user.Uloga
            }
          });
          _context2.next = 22;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 19]]);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/loginGost', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var _req$body3, imePrezime, email, brojPozivnice, uloga, queryParams, query, _yield$pool$execute7, _yield$pool$execute8, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body3 = req.body, imePrezime = _req$body3.imePrezime, email = _req$body3.email, brojPozivnice = _req$body3.brojPozivnice;
          uloga = 'Gost';
          queryParams = [imePrezime, email, uloga, brojPozivnice];
          query = "\n      INSERT INTO Korisnici (ImePrezime, Email, Uloga, BrojPozivnice)\n      VALUES (?, ?, ?, ?)\n    ";
          _context3.next = 7;
          return pool.execute(query, queryParams);
        case 7:
          _yield$pool$execute7 = _context3.sent;
          _yield$pool$execute8 = _slicedToArray(_yield$pool$execute7, 1);
          result = _yield$pool$execute8[0];
          res.json({
            user: {
              id: result.insertId,
              imePrezime: imePrezime,
              email: email,
              uloga: uloga,
              brojPozivnice: brojPozivnice || null
            }
          });
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.error('Error during guest login:', _context3.t0);
          res.status(500).json({
            message: 'Došlo je do greške pri prijavi gosta.'
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/get/:id', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var id, query, _yield$pool$execute9, _yield$pool$execute10, users, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          query = 'SELECT * FROM Korisnici WHERE IDKorisnika = ?';
          _context4.next = 5;
          return pool.execute(query, [id]);
        case 5:
          _yield$pool$execute9 = _context4.sent;
          _yield$pool$execute10 = _slicedToArray(_yield$pool$execute9, 1);
          users = _yield$pool$execute10[0];
          if (!(users.length === 0)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Korisnik nije pronađen.'
          }));
        case 10:
          user = users[0];
          res.json({
            id: user.IDKorisnika,
            imePrezime: user.ImePrezime,
            imePrezimePartnera: user.ImePrezimePartnera,
            email: user.Email,
            uloga: user.Uloga
          });
          _context4.next = 18;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          console.error('Error fetching user by ID:', _context4.t0);
          res.status(500).json({
            message: 'Došlo je do greške pri dohvatu korisnika.'
          });
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
module.exports = router;