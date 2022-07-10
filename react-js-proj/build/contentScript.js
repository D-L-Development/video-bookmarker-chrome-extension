/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/contentScripts/Session.js":
/*!***************************************!*\
  !*** ./src/contentScripts/Session.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Session": () => (/* binding */ Session)
/* harmony export */ });
/* harmony import */ var _Video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Video */ "./src/contentScripts/Video.js");
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Storage */ "./src/contentScripts/Storage.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility */ "./src/contentScripts/utility.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }





var _resetVideo = /*#__PURE__*/new WeakSet();

var _getVideoElement = /*#__PURE__*/new WeakSet();

var _createSideMenu = /*#__PURE__*/new WeakSet();

var Session = /*#__PURE__*/function () {
  /**
   * @param {String} sessionName - takes the session name and initializes the class member
   */
  function Session(sessionName) {
    var _this = this;

    _classCallCheck(this, Session);

    _classPrivateMethodInitSpec(this, _createSideMenu);

    _classPrivateMethodInitSpec(this, _getVideoElement);

    _classPrivateMethodInitSpec(this, _resetVideo);

    this.video = null;
    this.sidebarIframe = null;
    this.sessionName = sessionName;
    console.log("Session()", Session.SIDEBAR_PAGE_URL); // create the side menu for found video

    _classPrivateMethodGet(this, _createSideMenu, _createSideMenu2).call(this, Session.SIDEBAR_PAGE_URL); // ? TODO: there's probably a better way to do this below


    setTimeout(function () {
      _this.toggleSidemenuVisiblity(true);
    }, 200);
  }
  /**
   * creates a new session with an HTML video if it doesn't already exist
   *
   * @param {Object} sessionInfo - the current session name and date
   * @returns {Promise} - resolved or rejected with a msg depending on the status
   */


  _createClass(Session, [{
    key: "createNewSession",
    value: function createNewSession(sessionInfo) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var sessionName = sessionInfo.sessionName,
            date = sessionInfo.date;
        _Storage__WEBPACK_IMPORTED_MODULE_1__.Storage.sessionExists(sessionName).then(function () {
          reject("Session name already exists! Remove that session, or choose a different name!");
        })["catch"](function () {
          _classPrivateMethodGet(_this2, _getVideoElement, _getVideoElement2).call(_this2).then(function (res) {
            _Storage__WEBPACK_IMPORTED_MODULE_1__.Storage.addSessionNameToStorage(sessionName, date);
            _this2.video = new _Video__WEBPACK_IMPORTED_MODULE_0__.Video(res.video, sessionName, date);
            resolve();
          })["catch"](function (error) {
            reject("There is not a video in the document");
            console.log(error);
          });
        });
      });
    }
    /**
     * gets called by the content script when a msg fromm the uiManger is recieved.
     * it makes sure the video session exists, and creates a new video for it
     *
     * @param {String} selectedSession - string value of the selected session
     */

  }, {
    key: "selectSession",
    value: function () {
      var _selectSession = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(selectedSession) {
        var _yield$Storage$sessio, sessionName, date, result;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Storage__WEBPACK_IMPORTED_MODULE_1__.Storage.sessionExists(selectedSession);

              case 3:
                _yield$Storage$sessio = _context.sent;
                sessionName = _yield$Storage$sessio.sessionName;
                date = _yield$Storage$sessio.date;
                _context.next = 8;
                return _classPrivateMethodGet(this, _getVideoElement, _getVideoElement2).call(this);

              case 8:
                result = _context.sent;
                this.video = new _Video__WEBPACK_IMPORTED_MODULE_0__.Video(result.video, sessionName, date);
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 12]]);
      }));

      function selectSession(_x) {
        return _selectSession.apply(this, arguments);
      }

      return selectSession;
    }()
    /**
     * Removes the session from chrome.storage
     *
     * @param {String} sessionName - session name to be deleted
     */

  }, {
    key: "removeSession",
    value: function () {
      var _removeSession = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sessionName) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Storage__WEBPACK_IMPORTED_MODULE_1__.Storage.removeSessionFromStorage(sessionName);

              case 3:
                _context2.next = 8;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 5]]);
      }));

      function removeSession(_x2) {
        return _removeSession.apply(this, arguments);
      }

      return removeSession;
    }()
    /**
     * Removes the current session and adds a new one with the provided details
     *
     * @param {String} oldValue - session name to be edited
     * @param {String} newValue - new session name to be set for session
     */

  }, {
    key: "updateSessionName",
    value: function () {
      var _updateSessionName = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(oldValue, newValue) {
        var currentSessionName, newNameVal, newDateVal, foundSession, sessionNameChanged;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                currentSessionName = oldValue.currentSessionName;
                newNameVal = newValue.newNameVal, newDateVal = newValue.newDateVal;
                _context3.next = 5;
                return _Storage__WEBPACK_IMPORTED_MODULE_1__.Storage.getSessionFromStorage(currentSessionName);

              case 5:
                foundSession = _context3.sent;
                sessionNameChanged = newNameVal !== currentSessionName; // update session name if it has changed

                if (sessionNameChanged) {
                  // update the storage key
                  foundSession[newNameVal] = foundSession[currentSessionName]; // remove the old key

                  delete foundSession[currentSessionName]; // update the inner session name

                  foundSession[newNameVal].sessionName = newNameVal;
                } // only remove the session under its own key when the session name has changed


                _context3.next = 10;
                return _Storage__WEBPACK_IMPORTED_MODULE_1__.Storage.removeSessionFromStorage(currentSessionName, sessionNameChanged);

              case 10:
                if (!sessionNameChanged) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 13;
                return _Storage__WEBPACK_IMPORTED_MODULE_1__.Storage.writeObjToStorage(foundSession);

              case 13:
                _context3.next = 15;
                return _Storage__WEBPACK_IMPORTED_MODULE_1__.Storage.addSessionNameToStorage(newNameVal, newDateVal);

              case 15:
                _context3.next = 21;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                throw _context3.t0;

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 17]]);
      }));

      function updateSessionName(_x3, _x4) {
        return _updateSessionName.apply(this, arguments);
      }

      return updateSessionName;
    }()
    /**
     * resets the video and current page URL
     */

  }, {
    key: "removeSidemenu",
    value:
    /**
     * removes the sidebar element from the DOM
     */
    function removeSidemenu() {
      this.sidebarIframe.remove();
      this.sidebarIframe = null;
    }
  }, {
    key: "copyBookmarksAsTable",
    value: function () {
      var _copyBookmarksAsTable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(sessionName) {
        var response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if (!this.video) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 4;
                return _Storage__WEBPACK_IMPORTED_MODULE_1__.Storage.getSessionBookmarks(sessionName);

              case 4:
                response = _context4.sent;
                (0,_utility__WEBPACK_IMPORTED_MODULE_2__.copyTableToClipboard)(response.bookmarks);
                _context4.next = 9;
                break;

              case 8:
                throw "No video in the document";

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 11]]);
      }));

      function copyBookmarksAsTable(_x5) {
        return _copyBookmarksAsTable.apply(this, arguments);
      }

      return copyBookmarksAsTable;
    }()
    /**
     * toggels the visiblity of the sidemeny iframe
     */

  }, {
    key: "toggleSidemenuVisiblity",
    value: function toggleSidemenuVisiblity() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      switch (value) {
        case null:
          this.sidebarIframe.classList.toggle("on");
          break;

        case true:
          this.sidebarIframe.classList.add("on");
          break;

        case false:
          this.sidebarIframe.classList.remove("on");
          break;
      }
    }
    /**
     * returns the timestamp of the current video time and the current bookmark if there is one
     *
     * @returns {Object} - with properties timestamp and bookmark
     */

  }, {
    key: "getCurrentTimestamp",
    value: function getCurrentTimestamp() {
      if (this.video) {
        var timestamp = this.video.getCurrentTimestamp();
        var bookmark = this.video.storage.getBookmarkAtTimestamp(timestamp);
        return {
          timestamp: timestamp,
          bookmark: bookmark
        };
      } else {
        return null;
      }
    }
  }, {
    key: "addBookmark",
    value: function () {
      var _addBookmark = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(bookmark) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.video) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return this.video.addBookmark(bookmark);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addBookmark(_x6) {
        return _addBookmark.apply(this, arguments);
      }

      return addBookmark;
    }()
    /**
     * takes a timestamp and skips in the video until that timestamp
     *
     * @param {String} timestamp - the desired HH:MM:SS timestamp in which the video should jump to
     */

  }, {
    key: "jumpToTimestamp",
    value: function jumpToTimestamp(timestamp) {
      if (this.video) {
        this.video.jumpToTimestamp((0,_utility__WEBPACK_IMPORTED_MODULE_2__.timestampToSeconds)(timestamp));
      }
    }
    /**
     * deletes the desired bookmark from chrome.storage based on the timestamp
     *
     * @param {String} timestamp - the desired HH:MM:SS timestamp to be deleted
     */

  }, {
    key: "deleteBookmark",
    value: function () {
      var _deleteBookmark = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(timestamp) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;

                if (!this.video) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 4;
                return this.video.removeBookmark(timestamp);

              case 4:
                _context6.next = 7;
                break;

              case 6:
                throw "No video is found";

              case 7:
                _context6.next = 12;
                break;

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 9]]);
      }));

      function deleteBookmark(_x7) {
        return _deleteBookmark.apply(this, arguments);
      }

      return deleteBookmark;
    }()
    /**
     * toggles the nesting of the desired bookmark from chrome.storage based on the timestamp
     *
     * @param {String} timestamp - the desired HH:MM:SS timestamp in which the nesting for should be toggled
     */

  }, {
    key: "toggleBookmarkNesting",
    value: function () {
      var _toggleBookmarkNesting = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(timestamp) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;

                if (!this.video) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 4;
                return this.video.toggleBookmarkNesting(timestamp);

              case 4:
                _context7.next = 7;
                break;

              case 6:
                throw "No video is found";

              case 7:
                _context7.next = 12;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7["catch"](0);
                throw _context7.t0;

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 9]]);
      }));

      function toggleBookmarkNesting(_x8) {
        return _toggleBookmarkNesting.apply(this, arguments);
      }

      return toggleBookmarkNesting;
    }()
    /**
     * Gets the bookmark object from the storage class for the current session
     *
     * @param {String} timestamp - formatted hh:mm:ss timestamp to be retrieved from the storage class
     * @returns {Object} - bookmark object asscosiated with the timestamp, or undefined
     */

  }, {
    key: "getBookmarkAtTimestamp",
    value: function getBookmarkAtTimestamp(timestamp) {
      return this.video.storage.getBookmarkAtTimestamp(timestamp);
    }
  }]);

  return Session;
}();

function _resetVideo2() {
  this.video = null;
  this.sessionName = null;
}

function _getVideoElement2() {
  var repeatCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
  // return a promise
  return new Promise(function (resolve, reject) {
    // declare time interval
    var intervalId = setInterval(function () {
      // if repeated (repeatCount) times, then reject
      if (--repeatCount <= 0) {
        clearInterval(intervalId);
        reject("Failed to find video!");
      } // try to get video again


      var video = document.querySelector("video");

      if (video) {
        clearInterval(intervalId);
        resolve({
          video: video
        });
      }
    }, 1000);
  });
}

function _createSideMenu2(URL) {
  // create the side menu
  this.sidebarIframe = document.createElement("iframe");
  this.sidebarIframe.classList.add("web-sidebar");
  this.sidebarIframe.src = URL;
  document.body.appendChild(this.sidebarIframe);
}

_defineProperty(Session, "SIDEBAR_PAGE_URL", chrome.runtime.getURL("./popup.html"));

/***/ }),

/***/ "./src/contentScripts/Storage.js":
/*!***************************************!*\
  !*** ./src/contentScripts/Storage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Storage": () => (/* binding */ Storage)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _setVideoSessionFromLocalStorage = /*#__PURE__*/new WeakSet();

var Storage = /*#__PURE__*/function () {
  function Storage(sessionName) {
    _classCallCheck(this, Storage);

    _classPrivateMethodInitSpec(this, _setVideoSessionFromLocalStorage);

    this.videoSession = {};
    this.STORAGE_KEY = sessionName;

    _classPrivateMethodGet(this, _setVideoSessionFromLocalStorage, _setVideoSessionFromLocalStorage2).call(this);
  }
  /**
   * adds the passed in session name under the - ALL SESSIONS - key in storage which is an array
   *
   * @param {String} sessionName - session name for current video session
   * @param {String} date - the date of the session
   */


  _createClass(Storage, [{
    key: "syncToLocalStorage",
    value: function () {
      var _syncToLocalStorage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return chrome.storage.sync.set(this.videoSession);

              case 3:
                _context.next = 8;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function syncToLocalStorage() {
        return _syncToLocalStorage.apply(this, arguments);
      }

      return syncToLocalStorage;
    }()
    /**
     * Sets an object in chrome.storage
     *
     * @param {Object} object
     */

  }, {
    key: "addBookmark",
    value: function () {
      var _addBookmark = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(bookmark) {
        var bookmarks;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                bookmarks = this.videoSession[this.STORAGE_KEY].bookmarks;
                bookmarks[bookmark.timestamp] = bookmark;
                _context2.next = 4;
                return this.syncToLocalStorage();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addBookmark(_x) {
        return _addBookmark.apply(this, arguments);
      }

      return addBookmark;
    }()
  }, {
    key: "removeBookmark",
    value: function () {
      var _removeBookmark = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(timestamp) {
        var bookmarks;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                bookmarks = this.videoSession[this.STORAGE_KEY].bookmarks;

                if (!bookmarks[timestamp]) {
                  _context3.next = 8;
                  break;
                }

                delete bookmarks[timestamp];
                _context3.next = 6;
                return this.syncToLocalStorage();

              case 6:
                _context3.next = 9;
                break;

              case 8:
                throw "Can't remove bookmark at ".concat(timestamp, " because it doesn't exist");

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 11]]);
      }));

      function removeBookmark(_x2) {
        return _removeBookmark.apply(this, arguments);
      }

      return removeBookmark;
    }()
  }, {
    key: "toggleBookmarkNesting",
    value: function () {
      var _toggleBookmarkNesting = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(timestamp) {
        var bookmarks, targetBookmark;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                bookmarks = this.videoSession[this.STORAGE_KEY].bookmarks;
                targetBookmark = bookmarks[timestamp];

                if (!targetBookmark) {
                  _context4.next = 9;
                  break;
                }

                targetBookmark.isNested = !targetBookmark.isNested;
                _context4.next = 7;
                return this.syncToLocalStorage();

              case 7:
                _context4.next = 10;
                break;

              case 9:
                throw "Can't toggle bookmark nesting at ".concat(timestamp, " because it doesn't exist");

              case 10:
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 12]]);
      }));

      function toggleBookmarkNesting(_x3) {
        return _toggleBookmarkNesting.apply(this, arguments);
      }

      return toggleBookmarkNesting;
    }()
    /**
     * Returns the associated bookmark with the timestamp, or undefined
     *
     * @param {String} currentTimestamp - format hh:mm:ss timestamp
     * @returns {Object} - the bookmakr object from the current session
     */

  }, {
    key: "getBookmarkAtTimestamp",
    value: function getBookmarkAtTimestamp(currentTimestamp) {
      return this.videoSession[this.STORAGE_KEY].bookmarks[currentTimestamp];
    }
  }, {
    key: "reset",
    value: function reset() {
      chrome.storage.sync.remove(this.STORAGE_KEY, function () {});
    }
  }, {
    key: "printBookmarksPretty",
    value: function printBookmarksPretty() {
      console.clear();
      console.log("%cSession Name: %c".concat(this.videoSession[this.STORAGE_KEY].sessionName), "color: yellow", "color: #DEB887");
      var bookmarkFromLocalStorage = this.videoSession[this.STORAGE_KEY].bookmarks;
      console.log("%cCurrent Bookmarks: ", "color: red");
      console.table(bookmarkFromLocalStorage);
    }
  }], [{
    key: "addSessionNameToStorage",
    value: function () {
      var _addSessionNameToStorage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(sessionName, date) {
        var ALL_SESSIONS, currentSessions;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                ALL_SESSIONS = Storage.ALL_SESSIONS;
                currentSessions = []; // get all the session URL's from storage

                _context5.prev = 2;
                _context5.next = 5;
                return Storage.getAllSessionNamesFromStorage();

              case 5:
                currentSessions = _context5.sent;
                // add the new session name to array
                currentSessions.push({
                  sessionName: sessionName,
                  date: date
                }); // save all sessions to chrome.storage

                _context5.next = 9;
                return chrome.storage.sync.set(_defineProperty({}, ALL_SESSIONS, currentSessions));

              case 9:
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](2);
                console.log("Error saving all sessions!", _context5.t0);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 11]]);
      }));

      function addSessionNameToStorage(_x4, _x5) {
        return _addSessionNameToStorage.apply(this, arguments);
      }

      return addSessionNameToStorage;
    }()
    /**
     * gets all session names from chrome.storage
     *
     * @returns {Array} - resolved with an array of all session names, or an empty one
     */

  }, {
    key: "getAllSessionNamesFromStorage",
    value: function () {
      var _getAllSessionNamesFromStorage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var ALL_SESSIONS, sessions, response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                ALL_SESSIONS = Storage.ALL_SESSIONS;
                sessions = [];
                _context6.prev = 2;
                _context6.next = 5;
                return chrome.storage.sync.get(ALL_SESSIONS);

              case 5:
                response = _context6.sent;

                if (Object.keys(response).length > 0) {
                  sessions = response[ALL_SESSIONS];
                }

                return _context6.abrupt("return", sessions);

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](2);
                throw _context6.t0;

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 10]]);
      }));

      function getAllSessionNamesFromStorage() {
        return _getAllSessionNamesFromStorage.apply(this, arguments);
      }

      return getAllSessionNamesFromStorage;
    }()
    /**
     * Deletes a session from chrome.storage under the provided session name
     * and remove the session from all session names array
     *
     * @param {String} sessionName - session to be deleted
     * @param {Boolean} shouldRemoveSession - decides if the session should be removed from under its own key
     */

  }, {
    key: "removeSessionFromStorage",
    value: function () {
      var _removeSessionFromStorage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(sessionName) {
        var shouldRemoveSession,
            sessions,
            found,
            i,
            _args7 = arguments;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                shouldRemoveSession = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : true;
                _context7.prev = 1;
                _context7.next = 4;
                return Storage.getAllSessionNamesFromStorage();

              case 4:
                sessions = _context7.sent;
                found = false;
                i = 0;

              case 7:
                if (!(i < sessions.length)) {
                  _context7.next = 15;
                  break;
                }

                if (!(sessions[i].sessionName === sessionName)) {
                  _context7.next = 12;
                  break;
                }

                sessions.splice(i, 1);
                found = true;
                return _context7.abrupt("break", 15);

              case 12:
                i++;
                _context7.next = 7;
                break;

              case 15:
                if (found) {
                  _context7.next = 17;
                  break;
                }

                throw "Couldn't find session name under all sessions";

              case 17:
                _context7.next = 19;
                return chrome.storage.sync.set(_defineProperty({}, Storage.ALL_SESSIONS, sessions));

              case 19:
                if (!shouldRemoveSession) {
                  _context7.next = 22;
                  break;
                }

                _context7.next = 22;
                return chrome.storage.sync.remove(sessionName);

              case 22:
                _context7.next = 27;
                break;

              case 24:
                _context7.prev = 24;
                _context7.t0 = _context7["catch"](1);
                throw _context7.t0;

              case 27:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[1, 24]]);
      }));

      function removeSessionFromStorage(_x6) {
        return _removeSessionFromStorage.apply(this, arguments);
      }

      return removeSessionFromStorage;
    }()
    /**
     * Returns the desired bookmarks object for a particular session name
     *
     * @param {String} sessionName - the desired session name for the bookmarks needed from chrome.storage
     * @returns {Object} - a map with each timestamp associated with a bookmark object
     */

  }, {
    key: "getSessionBookmarks",
    value: function () {
      var _getSessionBookmarks = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(sessionName) {
        var response, bookmarks;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return chrome.storage.sync.get(sessionName);

              case 3:
                response = _context8.sent;

                if (!(Object.keys(response).length > 0)) {
                  _context8.next = 13;
                  break;
                }

                bookmarks = response[sessionName].bookmarks;

                if (!(Object.keys(bookmarks).length > 0)) {
                  _context8.next = 10;
                  break;
                }

                return _context8.abrupt("return", {
                  bookmarks: bookmarks
                });

              case 10:
                throw "There are no bookmarks to copy";

              case 11:
                _context8.next = 14;
                break;

              case 13:
                throw "Failed to get bookmarks for ".concat(sessionName);

              case 14:
                _context8.next = 19;
                break;

              case 16:
                _context8.prev = 16;
                _context8.t0 = _context8["catch"](0);
                throw _context8.t0;

              case 19:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 16]]);
      }));

      function getSessionBookmarks(_x7) {
        return _getSessionBookmarks.apply(this, arguments);
      }

      return getSessionBookmarks;
    }()
    /**
     * Searches chrome.storage for session by sessionName as the key
     *
     * @param {String} sessionName - session name to be searched for in chrome.storage
     * @returns {Object} - session object found in storage
     */

  }, {
    key: "getSessionFromStorage",
    value: function () {
      var _getSessionFromStorage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(sessionName) {
        var response;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return chrome.storage.sync.get(sessionName);

              case 3:
                response = _context9.sent;

                if (!(Object.keys(response).length > 0)) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return", response);

              case 8:
                throw "Session not found in storage!";

              case 9:
                _context9.next = 14;
                break;

              case 11:
                _context9.prev = 11;
                _context9.t0 = _context9["catch"](0);
                throw _context9.t0;

              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 11]]);
      }));

      function getSessionFromStorage(_x8) {
        return _getSessionFromStorage.apply(this, arguments);
      }

      return getSessionFromStorage;
    }()
    /**
     * searched chrome.storgage under the ALL SESSIONS key in the sessions array for the passed in session name
     *
     * @param {String} sessionName - represents the session name that is being searched in chrome.storage
     * @returns {Promise} - resolved or rejected depending on if the session name for the session is already in storage
     */

  }, {
    key: "sessionExists",
    value: function () {
      var _sessionExists = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(sessionName) {
        var allSessions, i;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return Storage.getAllSessionNamesFromStorage();

              case 2:
                allSessions = _context10.sent;
                i = 0;

              case 4:
                if (!(i < allSessions.length)) {
                  _context10.next = 10;
                  break;
                }

                if (!(allSessions[i].sessionName === sessionName)) {
                  _context10.next = 7;
                  break;
                }

                return _context10.abrupt("return", allSessions[i]);

              case 7:
                i++;
                _context10.next = 4;
                break;

              case 10:
                throw new Error("Selected session is not found!");

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function sessionExists(_x9) {
        return _sessionExists.apply(this, arguments);
      }

      return sessionExists;
    }()
  }, {
    key: "writeObjToStorage",
    value: function () {
      var _writeObjToStorage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(object) {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return chrome.storage.sync.set(object);

              case 3:
                _context11.next = 8;
                break;

              case 5:
                _context11.prev = 5;
                _context11.t0 = _context11["catch"](0);
                throw _context11.t0;

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 5]]);
      }));

      function writeObjToStorage(_x10) {
        return _writeObjToStorage.apply(this, arguments);
      }

      return writeObjToStorage;
    }()
  }]);

  return Storage;
}();

function _setVideoSessionFromLocalStorage2() {
  var _this = this;

  chrome.storage.sync.get(this.STORAGE_KEY, function (response) {
    // if there is a session in storage, then return it
    if (Object.keys(response).length > 0) {
      _this.videoSession = response;
    } else {
      _this.videoSession = _defineProperty({}, _this.STORAGE_KEY, {
        sessionName: _this.STORAGE_KEY,
        bookmarks: {}
      });

      _this.syncToLocalStorage();
    }
  });
}

_defineProperty(Storage, "ALL_SESSIONS", "All Sessions");

/***/ }),

/***/ "./src/contentScripts/Video.js":
/*!*************************************!*\
  !*** ./src/contentScripts/Video.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Video": () => (/* binding */ Video)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/contentScripts/Storage.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


/**
 * Video class manages the HTML video found in the DOM. It instantiates
 * a Storage class instance which holds the bookmarks relating to the
 * currently loaded video based on the provided session name
 */
// TODO: passing the date to this constructor might not be necessary

var Video = /*#__PURE__*/function () {
  function Video(videoElement, sessionName, date) {
    _classCallCheck(this, Video);

    this.video = videoElement;
    this.sessionName = sessionName;
    this.storage = new _Storage__WEBPACK_IMPORTED_MODULE_0__.Storage(sessionName, date);
  }

  _createClass(Video, [{
    key: "play",
    value: function play() {
      this.video.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.video.pause();
    }
  }, {
    key: "jumpToTimestamp",
    value: function jumpToTimestamp(seconds) {
      this.video.currentTime = seconds;
    }
  }, {
    key: "getCurrentTimestamp",
    value: function getCurrentTimestamp() {
      // get the current video time in seconds
      var currentVideoTime = Math.floor(this.video.currentTime); // return the converted seconds into a string timestamp

      return new Date(currentVideoTime * 1000).toISOString().substr(11, 8);
    }
  }, {
    key: "addBookmark",
    value: function () {
      var _addBookmark = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(bookmark) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.pause();
                _context.next = 3;
                return this.storage.addBookmark(bookmark);

              case 3:
                this.play();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addBookmark(_x) {
        return _addBookmark.apply(this, arguments);
      }

      return addBookmark;
    }()
  }, {
    key: "removeBookmark",
    value: function () {
      var _removeBookmark = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(timestamp) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.storage.removeBookmark(timestamp);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function removeBookmark(_x2) {
        return _removeBookmark.apply(this, arguments);
      }

      return removeBookmark;
    }()
  }, {
    key: "toggleBookmarkNesting",
    value: function toggleBookmarkNesting(timestamp) {
      this.storage.toggleBookmarkNesting(timestamp);
    }
  }]);

  return Video;
}();

/***/ }),

/***/ "./src/contentScripts/utility.js":
/*!***************************************!*\
  !*** ./src/contentScripts/utility.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bookmark": () => (/* binding */ Bookmark),
/* harmony export */   "MSG": () => (/* binding */ MSG),
/* harmony export */   "copyStringToClipboard": () => (/* binding */ copyStringToClipboard),
/* harmony export */   "copyTableToClipboard": () => (/* binding */ copyTableToClipboard),
/* harmony export */   "formatDatePickerStamp": () => (/* binding */ formatDatePickerStamp),
/* harmony export */   "formatMapToTableString": () => (/* binding */ formatMapToTableString),
/* harmony export */   "getCurrentDate": () => (/* binding */ getCurrentDate),
/* harmony export */   "getErrorMsg": () => (/* binding */ getErrorMsg),
/* harmony export */   "guid": () => (/* binding */ guid),
/* harmony export */   "removeFormatDatePicker": () => (/* binding */ removeFormatDatePicker),
/* harmony export */   "sendMessageToActiveTab": () => (/* binding */ sendMessageToActiveTab),
/* harmony export */   "timestampToSeconds": () => (/* binding */ timestampToSeconds)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MSG = {
  SUCCESS: "success",
  FAILURE: "failure",
  TOGGLE: "toggle",
  CREATE_NEW_SESSION: "createNewSession",
  SELECT_SESSION: "selectSession",
  DELETE_SESSION: "deleteSession",
  EDIT_SESSION: "editSession",
  JUMP_TO_TIMESTAMP: "jumpToTimestamp",
  DELETE_BOOKMARK: "deleteBookmark",
  TOGGLE_BOOKMARK_NESTING: "toggleBookmarkNesting",
  ADD_BOOKMARK: "addBookmark",
  COPY_TABLE: "copyTable",
  GET_BOOKMARK_AT_TIMESTAMP: "getBookmarkAtTimestamp"
};
var Bookmark = /*#__PURE__*/_createClass(function Bookmark(title, text) {
  var timestamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  _classCallCheck(this, Bookmark);

  this.title = title;
  this.text = text;
  this.timestamp = timestamp;
  this.isNested = false;
});
function copyStringToClipboard(str) {
  // Create new element
  var el = document.createElement("textarea"); // Set value (string to be copied)

  el.value = str; // Set non-editable to avoid focus and move outside of view

  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el); // Select text inside element

  el.select(); // Copy text to clipboard

  document.execCommand("copy"); // Remove temporary element

  document.body.removeChild(el);
}
function formatMapToTableString(bookmarks) {
  var TAB_CHAR = String.fromCharCode(9);
  var NEWLINE_CHAR = String.fromCharCode(10);
  var formatedString = "";

  for (var key in bookmarks) {
    // timestamp + TAB + bookmark + NEWLINE
    formatedString += key + TAB_CHAR + bookmarks[key].text + NEWLINE_CHAR;
  }

  return formatedString;
}
function copyTableToClipboard(bookmarks) {
  copyStringToClipboard(formatMapToTableString(bookmarks));
}
function guid() {
  var s4 = function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }; //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'


  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}
function timestampToSeconds(timestamp) {
  var array = timestamp.split(":"); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.

  return +array[0] * 60 * 60 + +array[1] * 60 + +array[2];
} // sends a message to the active tab's content script

var sendMessageToActiveTab = function sendMessageToActiveTab(payload, callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, payload, callback);
  });
};
/**
 * Converts a date from the format yyyy-mm-dd to mm/dd/yyyy
 *
 * @param {String} date - date in the format yyyy-mm-dd
 * @returns
 */

function formatDatePickerStamp(date) {
  var _date$split = date.split("-"),
      _date$split2 = _slicedToArray(_date$split, 3),
      year = _date$split2[0],
      month = _date$split2[1],
      day = _date$split2[2];

  return [month, day, year].join("/");
}
/**
 * Converts a date from the format mm/dd/yyyy to yyyy-mm-dd
 *
 * @param {String} date - date in the format mm/dd/yyyy
 * @returns
 */

function removeFormatDatePicker(date) {
  var _date$split3 = date.split("/"),
      _date$split4 = _slicedToArray(_date$split3, 3),
      month = _date$split4[0],
      day = _date$split4[1],
      year = _date$split4[2];

  return [year, month, day].join("-");
}
/**
 * Returns the error message from an error object, or the string msg itself
 *
 * @param {Object | String} error - the error that contains the msg, or is the msg
 * @returns
 */

function getErrorMsg(error) {
  return _typeof(error) === "object" ? error.message : error;
}
/**
 * Returns the current date
 *
 * @returns {String} - the current date formatted as "yyyy-mm-dd"
 */

function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************************!*\
  !*** ./src/contentScripts/content-script.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Session */ "./src/contentScripts/Session.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility */ "./src/contentScripts/utility.js");
console.log("Content Script Ran!");

 // TODO: replace all strings with constants

var initialPageLoad = true;
var session = null;
/**
 * handles the messages sent from other scripts
 * this manages the nessecary events for the content script and servers
 * as a middle man for how all the resource scripts communicate with
 * the content script
 */

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // MSG is an object from the utility.js file that replaces all strings
  switch (msg.action) {
    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.TOGGLE:
      // TODO: figure out how to run code when the content script is initially loaded
      if (initialPageLoad) {
        initialPageLoad = false;
        session = new _Session__WEBPACK_IMPORTED_MODULE_0__.Session();
      } else {
        session.toggleSidemenuVisiblity();
      }

      sendResponse({
        status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
      });
      break;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.CREATE_NEW_SESSION:
      var _msg$payload = msg.payload,
          sessionName = _msg$payload.sessionName,
          date = _msg$payload.date;
      session.createNewSession({
        sessionName: sessionName,
        date: date
      }).then(function () {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
        });
      })["catch"](function (error) {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE,
          payload: error
        });
      }); // indicate that the response is asynchrounus

      return true;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.COPY_TABLE:
      session.copyBookmarksAsTable(msg.payload.sessionName).then(function () {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
        });
      })["catch"](function (error) {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE,
          payload: error
        });
      });
      return true;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SELECT_SESSION:
      session.selectSession(msg.payload).then(function () {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
        });
      })["catch"](function (error) {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE,
          payload: error
        });
      }); // indicate that the response is asynchrounus

      return true;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.DELETE_SESSION:
      session.removeSession(msg.payload).then(function () {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
        });
      })["catch"](function (error) {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE,
          payload: error
        });
      }); // indicate that the response is asynchrounus

      return true;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.EDIT_SESSION:
      var _msg$payload2 = msg.payload,
          oldValue = _msg$payload2.oldValue,
          newValue = _msg$payload2.newValue;
      session.updateSessionName(oldValue, newValue).then(function () {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
        });
      })["catch"](function (error) {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE,
          payload: error
        });
      }); // indicate that the response is asynchrounus

      return true;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.GET_CURRENT_TIMESTAMP:
      // pause the video if asked for
      if (msg !== null && msg !== void 0 && msg.payload.pauseVideo && session.video) {
        session.video.pause();
      } // send the current timestamp, or failure


      var data = session.getCurrentTimestamp();

      if (data) {
        var timestamp = data.timestamp,
            _bookmark = data.bookmark;
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS,
          payload: {
            timestamp: timestamp,
            bookmark: _bookmark
          }
        });
      } else {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE,
          payload: "Failed to get current bookmark"
        });
      }

      break;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.ADD_BOOKMARK:
      session.addBookmark(msg.payload.bookmark).then(function () {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
        });
      })["catch"](function (e) {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE
        });
        console.log(e);
        alert("Failed in content script");
      });
      return true;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.JUMP_TO_TIMESTAMP:
      session.jumpToTimestamp(msg.payload);
      sendResponse({
        status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
      });
      break;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.DELETE_BOOKMARK:
      session.deleteBookmark(msg.payload).then(function () {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
        });
      })["catch"](function (error) {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE,
          payload: error
        });
      });
      return true;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.TOGGLE_BOOKMARK_NESTING:
      session.toggleBookmarkNesting(msg.payload).then(function () {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS
        });
      })["catch"](function (error) {
        sendResponse({
          status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE,
          payload: error
        });
      });
      return true;

    case _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.GET_BOOKMARK_AT_TIMESTAMP:
      var bookmark = session.getBookmarkAtTimestamp(msg.payload);
      bookmark ? sendResponse({
        status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.SUCCESS,
        payload: bookmark
      }) : sendResponse({
        status: _utility__WEBPACK_IMPORTED_MODULE_1__.MSG.FAILURE,
        payload: "No bookmark at ".concat(msg.payload)
      });
      break;
  }
}); // TODO: wire the event listeners (maybe)

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key == "b") {
    session.video.addBookmark();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key == ";") {
    // print bookmarks pretty
    session.video.storage.printBookmarksPretty();
    session.video.copyStringToClipboard(video.formatMapToTableString());
  }
});
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key == ".") {
    // ask user for timestamp
    var userTimeStamp = prompt("Enter the timestamp HH:MM:SS");

    if (userTimeStamp) {
      var timeStamp = userTimeStamp.split(":"); // split it at the colons
      // minutes are worth 60 seconds. Hours are worth 60 minutes.

      var seconds = +timeStamp[0] * 60 * 60 + +timeStamp[1] * 60 + +timeStamp[2]; // jump to that timestamp

      session.video.jumpToTimestamp(seconds);
    }
  }
}); // TODO: remove this. It's for testing

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key == "`") {
    chrome.storage.sync.get(null, function (response) {
      console.log(response);
    });
  }
}); // TODO: remove this. It's for testing

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key == "*") {
    chrome.storage.sync.clear(function () {
      console.log("STORAGE CLEARED!");
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FRQTs7QUFDQW1CLFFBQVEsQ0FBQytILGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLFVBQUNILENBQUQsRUFBTztFQUMxQyxJQUFJQSxDQUFDLENBQUNJLE9BQUYsSUFBYUosQ0FBQyxDQUFDM0MsR0FBRixJQUFTLEdBQTFCLEVBQStCO0lBQzdCMUUsTUFBTSxDQUFDakIsT0FBUCxDQUFlc0IsSUFBZixDQUFvQk0sS0FBcEIsQ0FBMEIsWUFBTTtNQUM5QmxFLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0lBQ0QsQ0FGRDtFQUdEO0FBQ0YsQ0FORCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtanMtcHJvai8uL3NyYy9jb250ZW50U2NyaXB0cy9TZXNzaW9uLmpzIiwid2VicGFjazovL3JlYWN0LWpzLXByb2ovLi9zcmMvY29udGVudFNjcmlwdHMvU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9yZWFjdC1qcy1wcm9qLy4vc3JjL2NvbnRlbnRTY3JpcHRzL1ZpZGVvLmpzIiwid2VicGFjazovL3JlYWN0LWpzLXByb2ovLi9zcmMvY29udGVudFNjcmlwdHMvdXRpbGl0eS5qcyIsIndlYnBhY2s6Ly9yZWFjdC1qcy1wcm9qL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JlYWN0LWpzLXByb2ovd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3JlYWN0LWpzLXByb2ovd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZWFjdC1qcy1wcm9qL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVhY3QtanMtcHJvai8uL3NyYy9jb250ZW50U2NyaXB0cy9jb250ZW50LXNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWRlbyB9IGZyb20gXCIuL1ZpZGVvXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiLi9TdG9yYWdlXCI7XHJcbmltcG9ydCB7IGNvcHlUYWJsZVRvQ2xpcGJvYXJkLCB0aW1lc3RhbXBUb1NlY29uZHMgfSBmcm9tIFwiLi91dGlsaXR5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2Vzc2lvbiB7XHJcbiAgc3RhdGljIFNJREVCQVJfUEFHRV9VUkwgPSBjaHJvbWUucnVudGltZS5nZXRVUkwoXCIuL3BvcHVwLmh0bWxcIik7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZXNzaW9uTmFtZSAtIHRha2VzIHRoZSBzZXNzaW9uIG5hbWUgYW5kIGluaXRpYWxpemVzIHRoZSBjbGFzcyBtZW1iZXJcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzZXNzaW9uTmFtZSkge1xyXG4gICAgdGhpcy52aWRlbyA9IG51bGw7XHJcbiAgICB0aGlzLnNpZGViYXJJZnJhbWUgPSBudWxsO1xyXG4gICAgdGhpcy5zZXNzaW9uTmFtZSA9IHNlc3Npb25OYW1lO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiU2Vzc2lvbigpXCIsIFNlc3Npb24uU0lERUJBUl9QQUdFX1VSTCk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBzaWRlIG1lbnUgZm9yIGZvdW5kIHZpZGVvXHJcbiAgICB0aGlzLiNjcmVhdGVTaWRlTWVudShTZXNzaW9uLlNJREVCQVJfUEFHRV9VUkwpO1xyXG4gICAgLy8gPyBUT0RPOiB0aGVyZSdzIHByb2JhYmx5IGEgYmV0dGVyIHdheSB0byBkbyB0aGlzIGJlbG93XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy50b2dnbGVTaWRlbWVudVZpc2libGl0eSh0cnVlKTtcclxuICAgIH0sIDIwMCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGVzIGEgbmV3IHNlc3Npb24gd2l0aCBhbiBIVE1MIHZpZGVvIGlmIGl0IGRvZXNuJ3QgYWxyZWFkeSBleGlzdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlc3Npb25JbmZvIC0gdGhlIGN1cnJlbnQgc2Vzc2lvbiBuYW1lIGFuZCBkYXRlXHJcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gcmVzb2x2ZWQgb3IgcmVqZWN0ZWQgd2l0aCBhIG1zZyBkZXBlbmRpbmcgb24gdGhlIHN0YXR1c1xyXG4gICAqL1xyXG4gIGNyZWF0ZU5ld1Nlc3Npb24oc2Vzc2lvbkluZm8pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgc2Vzc2lvbk5hbWUsIGRhdGUgfSA9IHNlc3Npb25JbmZvO1xyXG4gICAgICBTdG9yYWdlLnNlc3Npb25FeGlzdHMoc2Vzc2lvbk5hbWUpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgICBcIlNlc3Npb24gbmFtZSBhbHJlYWR5IGV4aXN0cyEgUmVtb3ZlIHRoYXQgc2Vzc2lvbiwgb3IgY2hvb3NlIGEgZGlmZmVyZW50IG5hbWUhXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4jZ2V0VmlkZW9FbGVtZW50KClcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIFN0b3JhZ2UuYWRkU2Vzc2lvbk5hbWVUb1N0b3JhZ2Uoc2Vzc2lvbk5hbWUsIGRhdGUpO1xyXG4gICAgICAgICAgICAgIHRoaXMudmlkZW8gPSBuZXcgVmlkZW8ocmVzLnZpZGVvLCBzZXNzaW9uTmFtZSwgZGF0ZSk7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KFwiVGhlcmUgaXMgbm90IGEgdmlkZW8gaW4gdGhlIGRvY3VtZW50XCIpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldHMgY2FsbGVkIGJ5IHRoZSBjb250ZW50IHNjcmlwdCB3aGVuIGEgbXNnIGZyb21tIHRoZSB1aU1hbmdlciBpcyByZWNpZXZlZC5cclxuICAgKiBpdCBtYWtlcyBzdXJlIHRoZSB2aWRlbyBzZXNzaW9uIGV4aXN0cywgYW5kIGNyZWF0ZXMgYSBuZXcgdmlkZW8gZm9yIGl0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0ZWRTZXNzaW9uIC0gc3RyaW5nIHZhbHVlIG9mIHRoZSBzZWxlY3RlZCBzZXNzaW9uXHJcbiAgICovXHJcbiAgYXN5bmMgc2VsZWN0U2Vzc2lvbihzZWxlY3RlZFNlc3Npb24pIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIFRPRE86IGFuIGFzc3VtcHRpb24gaXMgbWFkZSBoZXJlIHRoYXQgdGhlIHNlc3Npb24gaXMgdW5kZXIgXCJBTExfU0VTU0lPTlNcIiBrZXksIGFuZCBpcyBmb3VuZCB1bmRlciBpdHMgbmFtZSBrZXlcclxuICAgICAgY29uc3QgeyBzZXNzaW9uTmFtZSwgZGF0ZSB9ID0gYXdhaXQgU3RvcmFnZS5zZXNzaW9uRXhpc3RzKFxyXG4gICAgICAgIHNlbGVjdGVkU2Vzc2lvblxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLiNnZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgICAgdGhpcy52aWRlbyA9IG5ldyBWaWRlbyhyZXN1bHQudmlkZW8sIHNlc3Npb25OYW1lLCBkYXRlKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgc2Vzc2lvbiBmcm9tIGNocm9tZS5zdG9yYWdlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2Vzc2lvbk5hbWUgLSBzZXNzaW9uIG5hbWUgdG8gYmUgZGVsZXRlZFxyXG4gICAqL1xyXG4gIGFzeW5jIHJlbW92ZVNlc3Npb24oc2Vzc2lvbk5hbWUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IFN0b3JhZ2UucmVtb3ZlU2Vzc2lvbkZyb21TdG9yYWdlKHNlc3Npb25OYW1lKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgY3VycmVudCBzZXNzaW9uIGFuZCBhZGRzIGEgbmV3IG9uZSB3aXRoIHRoZSBwcm92aWRlZCBkZXRhaWxzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWUgLSBzZXNzaW9uIG5hbWUgdG8gYmUgZWRpdGVkXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5ld1ZhbHVlIC0gbmV3IHNlc3Npb24gbmFtZSB0byBiZSBzZXQgZm9yIHNlc3Npb25cclxuICAgKi9cclxuICBhc3luYyB1cGRhdGVTZXNzaW9uTmFtZShvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgY3VycmVudFNlc3Npb25OYW1lIH0gPSBvbGRWYWx1ZTtcclxuICAgICAgY29uc3QgeyBuZXdOYW1lVmFsLCBuZXdEYXRlVmFsIH0gPSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgIGNvbnN0IGZvdW5kU2Vzc2lvbiA9IGF3YWl0IFN0b3JhZ2UuZ2V0U2Vzc2lvbkZyb21TdG9yYWdlKFxyXG4gICAgICAgIGN1cnJlbnRTZXNzaW9uTmFtZVxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29uc3Qgc2Vzc2lvbk5hbWVDaGFuZ2VkID0gbmV3TmFtZVZhbCAhPT0gY3VycmVudFNlc3Npb25OYW1lO1xyXG4gICAgICAvLyB1cGRhdGUgc2Vzc2lvbiBuYW1lIGlmIGl0IGhhcyBjaGFuZ2VkXHJcbiAgICAgIGlmIChzZXNzaW9uTmFtZUNoYW5nZWQpIHtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHN0b3JhZ2Uga2V5XHJcbiAgICAgICAgZm91bmRTZXNzaW9uW25ld05hbWVWYWxdID0gZm91bmRTZXNzaW9uW2N1cnJlbnRTZXNzaW9uTmFtZV07XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBvbGQga2V5XHJcbiAgICAgICAgZGVsZXRlIGZvdW5kU2Vzc2lvbltjdXJyZW50U2Vzc2lvbk5hbWVdO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgaW5uZXIgc2Vzc2lvbiBuYW1lXHJcbiAgICAgICAgZm91bmRTZXNzaW9uW25ld05hbWVWYWxdLnNlc3Npb25OYW1lID0gbmV3TmFtZVZhbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gb25seSByZW1vdmUgdGhlIHNlc3Npb24gdW5kZXIgaXRzIG93biBrZXkgd2hlbiB0aGUgc2Vzc2lvbiBuYW1lIGhhcyBjaGFuZ2VkXHJcbiAgICAgIGF3YWl0IFN0b3JhZ2UucmVtb3ZlU2Vzc2lvbkZyb21TdG9yYWdlKFxyXG4gICAgICAgIGN1cnJlbnRTZXNzaW9uTmFtZSxcclxuICAgICAgICBzZXNzaW9uTmFtZUNoYW5nZWRcclxuICAgICAgKTtcclxuICAgICAgaWYgKHNlc3Npb25OYW1lQ2hhbmdlZCkge1xyXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgcHJldmlvdXMgb2JqZWN0XHJcbiAgICAgICAgYXdhaXQgU3RvcmFnZS53cml0ZU9ialRvU3RvcmFnZShmb3VuZFNlc3Npb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzYXZlIHRoZSBuZXcgb2JqZWN0IHRvIHN0b3JhZ2VcclxuICAgICAgYXdhaXQgU3RvcmFnZS5hZGRTZXNzaW9uTmFtZVRvU3RvcmFnZShuZXdOYW1lVmFsLCBuZXdEYXRlVmFsKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXNldHMgdGhlIHZpZGVvIGFuZCBjdXJyZW50IHBhZ2UgVVJMXHJcbiAgICovXHJcbiAgI3Jlc2V0VmlkZW8oKSB7XHJcbiAgICB0aGlzLnZpZGVvID0gbnVsbDtcclxuICAgIHRoaXMuc2Vzc2lvbk5hbWUgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2VhcmNoZXMgdGhlIERPTSBmb3IgYSB2aWRlbyBlbGVtZW50LiBSZXR1cm5zIHRoZSBmaXJzdCBmb3VuZCB2aWRlb1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJlcGVhdENvdW50IC0gdGhlIGFtb3VudCBvZiB0aW1lcyB0aGUgaW50ZXJ2YWwgc2hvdWxkIHJlcGVhdGVkbHkgc2VhcmNoIGZvciB0aGUgdmlkZW9cclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSByZXNvbHZlZCB3aXRoIGFuIEhUTUwgdmlkZW8gZWxlbWVudCwgb3IgcmVqZWN0ZWQgd2l0aCBhbiBlcnJvclxyXG4gICAqL1xyXG4gICNnZXRWaWRlb0VsZW1lbnQocmVwZWF0Q291bnQgPSAzKSB7XHJcbiAgICAvLyByZXR1cm4gYSBwcm9taXNlXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBkZWNsYXJlIHRpbWUgaW50ZXJ2YWxcclxuICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAvLyBpZiByZXBlYXRlZCAocmVwZWF0Q291bnQpIHRpbWVzLCB0aGVuIHJlamVjdFxyXG4gICAgICAgIGlmICgtLXJlcGVhdENvdW50IDw9IDApIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgICByZWplY3QoXCJGYWlsZWQgdG8gZmluZCB2aWRlbyFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0cnkgdG8gZ2V0IHZpZGVvIGFnYWluXHJcbiAgICAgICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIik7XHJcbiAgICAgICAgaWYgKHZpZGVvKSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgICAgICAgcmVzb2x2ZSh7IHZpZGVvIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZXMgdGhlIHNpZG1lbnUgaWZyYW1lIGFuZCBzZXRzIGl0cyBzb3VyY2UgdG8gVVJMIHBhcmFtXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gVVJMIC0gcGFzc2VkIGluIFVSTCBmb3IgZGVzaXJlZCByZXNvdXJjZSBIVE1MIHBhZ2UgdG8gYmUgcmVuZGVyZWQgd2l0aGluIHRoZSBjcmVhdGVkIGZyYW1lXHJcbiAgICovXHJcbiAgI2NyZWF0ZVNpZGVNZW51KFVSTCkge1xyXG4gICAgLy8gY3JlYXRlIHRoZSBzaWRlIG1lbnVcclxuICAgIHRoaXMuc2lkZWJhcklmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XHJcbiAgICB0aGlzLnNpZGViYXJJZnJhbWUuY2xhc3NMaXN0LmFkZChcIndlYi1zaWRlYmFyXCIpO1xyXG4gICAgdGhpcy5zaWRlYmFySWZyYW1lLnNyYyA9IFVSTDtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zaWRlYmFySWZyYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlbW92ZXMgdGhlIHNpZGViYXIgZWxlbWVudCBmcm9tIHRoZSBET01cclxuICAgKi9cclxuICByZW1vdmVTaWRlbWVudSgpIHtcclxuICAgIHRoaXMuc2lkZWJhcklmcmFtZS5yZW1vdmUoKTtcclxuICAgIHRoaXMuc2lkZWJhcklmcmFtZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb3B5Qm9va21hcmtzQXNUYWJsZShzZXNzaW9uTmFtZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHRoaXMudmlkZW8pIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IFN0b3JhZ2UuZ2V0U2Vzc2lvbkJvb2ttYXJrcyhzZXNzaW9uTmFtZSk7XHJcbiAgICAgICAgY29weVRhYmxlVG9DbGlwYm9hcmQocmVzcG9uc2UuYm9va21hcmtzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBcIk5vIHZpZGVvIGluIHRoZSBkb2N1bWVudFwiO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRvZ2dlbHMgdGhlIHZpc2libGl0eSBvZiB0aGUgc2lkZW1lbnkgaWZyYW1lXHJcbiAgICovXHJcbiAgdG9nZ2xlU2lkZW1lbnVWaXNpYmxpdHkodmFsdWUgPSBudWxsKSB7XHJcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgIGNhc2UgbnVsbDpcclxuICAgICAgICB0aGlzLnNpZGViYXJJZnJhbWUuY2xhc3NMaXN0LnRvZ2dsZShcIm9uXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIHRydWU6XHJcbiAgICAgICAgdGhpcy5zaWRlYmFySWZyYW1lLmNsYXNzTGlzdC5hZGQoXCJvblwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBmYWxzZTpcclxuICAgICAgICB0aGlzLnNpZGViYXJJZnJhbWUuY2xhc3NMaXN0LnJlbW92ZShcIm9uXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyB0aGUgdGltZXN0YW1wIG9mIHRoZSBjdXJyZW50IHZpZGVvIHRpbWUgYW5kIHRoZSBjdXJyZW50IGJvb2ttYXJrIGlmIHRoZXJlIGlzIG9uZVxyXG4gICAqXHJcbiAgICogQHJldHVybnMge09iamVjdH0gLSB3aXRoIHByb3BlcnRpZXMgdGltZXN0YW1wIGFuZCBib29rbWFya1xyXG4gICAqL1xyXG4gIGdldEN1cnJlbnRUaW1lc3RhbXAoKSB7XHJcbiAgICBpZiAodGhpcy52aWRlbykge1xyXG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLnZpZGVvLmdldEN1cnJlbnRUaW1lc3RhbXAoKTtcclxuICAgICAgY29uc3QgYm9va21hcmsgPSB0aGlzLnZpZGVvLnN0b3JhZ2UuZ2V0Qm9va21hcmtBdFRpbWVzdGFtcCh0aW1lc3RhbXApO1xyXG4gICAgICByZXR1cm4geyB0aW1lc3RhbXAsIGJvb2ttYXJrIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZEJvb2ttYXJrKGJvb2ttYXJrKSB7XHJcbiAgICBpZiAodGhpcy52aWRlbykge1xyXG4gICAgICBhd2FpdCB0aGlzLnZpZGVvLmFkZEJvb2ttYXJrKGJvb2ttYXJrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRha2VzIGEgdGltZXN0YW1wIGFuZCBza2lwcyBpbiB0aGUgdmlkZW8gdW50aWwgdGhhdCB0aW1lc3RhbXBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aW1lc3RhbXAgLSB0aGUgZGVzaXJlZCBISDpNTTpTUyB0aW1lc3RhbXAgaW4gd2hpY2ggdGhlIHZpZGVvIHNob3VsZCBqdW1wIHRvXHJcbiAgICovXHJcbiAganVtcFRvVGltZXN0YW1wKHRpbWVzdGFtcCkge1xyXG4gICAgaWYgKHRoaXMudmlkZW8pIHtcclxuICAgICAgdGhpcy52aWRlby5qdW1wVG9UaW1lc3RhbXAodGltZXN0YW1wVG9TZWNvbmRzKHRpbWVzdGFtcCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVsZXRlcyB0aGUgZGVzaXJlZCBib29rbWFyayBmcm9tIGNocm9tZS5zdG9yYWdlIGJhc2VkIG9uIHRoZSB0aW1lc3RhbXBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aW1lc3RhbXAgLSB0aGUgZGVzaXJlZCBISDpNTTpTUyB0aW1lc3RhbXAgdG8gYmUgZGVsZXRlZFxyXG4gICAqL1xyXG4gIGFzeW5jIGRlbGV0ZUJvb2ttYXJrKHRpbWVzdGFtcCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHRoaXMudmlkZW8pIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnZpZGVvLnJlbW92ZUJvb2ttYXJrKHRpbWVzdGFtcCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgXCJObyB2aWRlbyBpcyBmb3VuZFwiO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRvZ2dsZXMgdGhlIG5lc3Rpbmcgb2YgdGhlIGRlc2lyZWQgYm9va21hcmsgZnJvbSBjaHJvbWUuc3RvcmFnZSBiYXNlZCBvbiB0aGUgdGltZXN0YW1wXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGltZXN0YW1wIC0gdGhlIGRlc2lyZWQgSEg6TU06U1MgdGltZXN0YW1wIGluIHdoaWNoIHRoZSBuZXN0aW5nIGZvciBzaG91bGQgYmUgdG9nZ2xlZFxyXG4gICAqL1xyXG4gIGFzeW5jIHRvZ2dsZUJvb2ttYXJrTmVzdGluZyh0aW1lc3RhbXApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICh0aGlzLnZpZGVvKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy52aWRlby50b2dnbGVCb29rbWFya05lc3RpbmcodGltZXN0YW1wKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBcIk5vIHZpZGVvIGlzIGZvdW5kXCI7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgYm9va21hcmsgb2JqZWN0IGZyb20gdGhlIHN0b3JhZ2UgY2xhc3MgZm9yIHRoZSBjdXJyZW50IHNlc3Npb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aW1lc3RhbXAgLSBmb3JtYXR0ZWQgaGg6bW06c3MgdGltZXN0YW1wIHRvIGJlIHJldHJpZXZlZCBmcm9tIHRoZSBzdG9yYWdlIGNsYXNzXHJcbiAgICogQHJldHVybnMge09iamVjdH0gLSBib29rbWFyayBvYmplY3QgYXNzY29zaWF0ZWQgd2l0aCB0aGUgdGltZXN0YW1wLCBvciB1bmRlZmluZWRcclxuICAgKi9cclxuICBnZXRCb29rbWFya0F0VGltZXN0YW1wKHRpbWVzdGFtcCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlkZW8uc3RvcmFnZS5nZXRCb29rbWFya0F0VGltZXN0YW1wKHRpbWVzdGFtcCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBTdG9yYWdlIHtcclxuICBzdGF0aWMgQUxMX1NFU1NJT05TID0gXCJBbGwgU2Vzc2lvbnNcIjtcclxuXHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbk5hbWUpIHtcclxuICAgIHRoaXMudmlkZW9TZXNzaW9uID0ge307XHJcbiAgICB0aGlzLlNUT1JBR0VfS0VZID0gc2Vzc2lvbk5hbWU7XHJcbiAgICB0aGlzLiNzZXRWaWRlb1Nlc3Npb25Gcm9tTG9jYWxTdG9yYWdlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBhZGRzIHRoZSBwYXNzZWQgaW4gc2Vzc2lvbiBuYW1lIHVuZGVyIHRoZSAtIEFMTCBTRVNTSU9OUyAtIGtleSBpbiBzdG9yYWdlIHdoaWNoIGlzIGFuIGFycmF5XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2Vzc2lvbk5hbWUgLSBzZXNzaW9uIG5hbWUgZm9yIGN1cnJlbnQgdmlkZW8gc2Vzc2lvblxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRlIC0gdGhlIGRhdGUgb2YgdGhlIHNlc3Npb25cclxuICAgKi9cclxuICBzdGF0aWMgYXN5bmMgYWRkU2Vzc2lvbk5hbWVUb1N0b3JhZ2Uoc2Vzc2lvbk5hbWUsIGRhdGUpIHtcclxuICAgIGNvbnN0IHsgQUxMX1NFU1NJT05TIH0gPSBTdG9yYWdlO1xyXG4gICAgbGV0IGN1cnJlbnRTZXNzaW9ucyA9IFtdO1xyXG4gICAgLy8gZ2V0IGFsbCB0aGUgc2Vzc2lvbiBVUkwncyBmcm9tIHN0b3JhZ2VcclxuICAgIHRyeSB7XHJcbiAgICAgIGN1cnJlbnRTZXNzaW9ucyA9IGF3YWl0IFN0b3JhZ2UuZ2V0QWxsU2Vzc2lvbk5hbWVzRnJvbVN0b3JhZ2UoKTtcclxuICAgICAgLy8gYWRkIHRoZSBuZXcgc2Vzc2lvbiBuYW1lIHRvIGFycmF5XHJcbiAgICAgIGN1cnJlbnRTZXNzaW9ucy5wdXNoKHsgc2Vzc2lvbk5hbWUsIGRhdGUgfSk7XHJcbiAgICAgIC8vIHNhdmUgYWxsIHNlc3Npb25zIHRvIGNocm9tZS5zdG9yYWdlXHJcbiAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgW0FMTF9TRVNTSU9OU106IGN1cnJlbnRTZXNzaW9ucyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBFcnJvciBzYXZpbmcgYWxsIHNlc3Npb25zIWAsIGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldHMgYWxsIHNlc3Npb24gbmFtZXMgZnJvbSBjaHJvbWUuc3RvcmFnZVxyXG4gICAqXHJcbiAgICogQHJldHVybnMge0FycmF5fSAtIHJlc29sdmVkIHdpdGggYW4gYXJyYXkgb2YgYWxsIHNlc3Npb24gbmFtZXMsIG9yIGFuIGVtcHR5IG9uZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBhc3luYyBnZXRBbGxTZXNzaW9uTmFtZXNGcm9tU3RvcmFnZSgpIHtcclxuICAgIGNvbnN0IHsgQUxMX1NFU1NJT05TIH0gPSBTdG9yYWdlO1xyXG4gICAgbGV0IHNlc3Npb25zID0gW107XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KEFMTF9TRVNTSU9OUyk7XHJcbiAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNwb25zZSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHNlc3Npb25zID0gcmVzcG9uc2VbQUxMX1NFU1NJT05TXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbnM7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGV0ZXMgYSBzZXNzaW9uIGZyb20gY2hyb21lLnN0b3JhZ2UgdW5kZXIgdGhlIHByb3ZpZGVkIHNlc3Npb24gbmFtZVxyXG4gICAqIGFuZCByZW1vdmUgdGhlIHNlc3Npb24gZnJvbSBhbGwgc2Vzc2lvbiBuYW1lcyBhcnJheVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlc3Npb25OYW1lIC0gc2Vzc2lvbiB0byBiZSBkZWxldGVkXHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBzaG91bGRSZW1vdmVTZXNzaW9uIC0gZGVjaWRlcyBpZiB0aGUgc2Vzc2lvbiBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHVuZGVyIGl0cyBvd24ga2V5XHJcbiAgICovXHJcbiAgc3RhdGljIGFzeW5jIHJlbW92ZVNlc3Npb25Gcm9tU3RvcmFnZShcclxuICAgIHNlc3Npb25OYW1lLFxyXG4gICAgc2hvdWxkUmVtb3ZlU2Vzc2lvbiA9IHRydWVcclxuICApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNlc3Npb25zID0gYXdhaXQgU3RvcmFnZS5nZXRBbGxTZXNzaW9uTmFtZXNGcm9tU3RvcmFnZSgpO1xyXG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXNzaW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzZXNzaW9uc1tpXS5zZXNzaW9uTmFtZSA9PT0gc2Vzc2lvbk5hbWUpIHtcclxuICAgICAgICAgIHNlc3Npb25zLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICAgIHRocm93IFwiQ291bGRuJ3QgZmluZCBzZXNzaW9uIG5hbWUgdW5kZXIgYWxsIHNlc3Npb25zXCI7XHJcbiAgICAgIH1cclxuICAgICAgYXdhaXQgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBbU3RvcmFnZS5BTExfU0VTU0lPTlNdOiBzZXNzaW9ucyB9KTtcclxuICAgICAgaWYgKHNob3VsZFJlbW92ZVNlc3Npb24pIHtcclxuICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLnJlbW92ZShzZXNzaW9uTmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZGVzaXJlZCBib29rbWFya3Mgb2JqZWN0IGZvciBhIHBhcnRpY3VsYXIgc2Vzc2lvbiBuYW1lXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2Vzc2lvbk5hbWUgLSB0aGUgZGVzaXJlZCBzZXNzaW9uIG5hbWUgZm9yIHRoZSBib29rbWFya3MgbmVlZGVkIGZyb20gY2hyb21lLnN0b3JhZ2VcclxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIGEgbWFwIHdpdGggZWFjaCB0aW1lc3RhbXAgYXNzb2NpYXRlZCB3aXRoIGEgYm9va21hcmsgb2JqZWN0XHJcbiAgICovXHJcbiAgc3RhdGljIGFzeW5jIGdldFNlc3Npb25Cb29rbWFya3Moc2Vzc2lvbk5hbWUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoc2Vzc2lvbk5hbWUpO1xyXG4gICAgICBpZiAoT2JqZWN0LmtleXMocmVzcG9uc2UpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCB7IGJvb2ttYXJrcyB9ID0gcmVzcG9uc2Vbc2Vzc2lvbk5hbWVdO1xyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhib29rbWFya3MpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJldHVybiB7IGJvb2ttYXJrcyB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBcIlRoZXJlIGFyZSBubyBib29rbWFya3MgdG8gY29weVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBgRmFpbGVkIHRvIGdldCBib29rbWFya3MgZm9yICR7c2Vzc2lvbk5hbWV9YDtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2hlcyBjaHJvbWUuc3RvcmFnZSBmb3Igc2Vzc2lvbiBieSBzZXNzaW9uTmFtZSBhcyB0aGUga2V5XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2Vzc2lvbk5hbWUgLSBzZXNzaW9uIG5hbWUgdG8gYmUgc2VhcmNoZWQgZm9yIGluIGNocm9tZS5zdG9yYWdlXHJcbiAgICogQHJldHVybnMge09iamVjdH0gLSBzZXNzaW9uIG9iamVjdCBmb3VuZCBpbiBzdG9yYWdlXHJcbiAgICovXHJcbiAgc3RhdGljIGFzeW5jIGdldFNlc3Npb25Gcm9tU3RvcmFnZShzZXNzaW9uTmFtZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChzZXNzaW9uTmFtZSk7XHJcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgc2Vzc2lvbiBpbiBzdG9yYWdlLCB0aGVuIHJldHVybiBpdFxyXG4gICAgICBpZiAoT2JqZWN0LmtleXMocmVzcG9uc2UpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgXCJTZXNzaW9uIG5vdCBmb3VuZCBpbiBzdG9yYWdlIVwiO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNlYXJjaGVkIGNocm9tZS5zdG9yZ2FnZSB1bmRlciB0aGUgQUxMIFNFU1NJT05TIGtleSBpbiB0aGUgc2Vzc2lvbnMgYXJyYXkgZm9yIHRoZSBwYXNzZWQgaW4gc2Vzc2lvbiBuYW1lXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2Vzc2lvbk5hbWUgLSByZXByZXNlbnRzIHRoZSBzZXNzaW9uIG5hbWUgdGhhdCBpcyBiZWluZyBzZWFyY2hlZCBpbiBjaHJvbWUuc3RvcmFnZVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIHJlc29sdmVkIG9yIHJlamVjdGVkIGRlcGVuZGluZyBvbiBpZiB0aGUgc2Vzc2lvbiBuYW1lIGZvciB0aGUgc2Vzc2lvbiBpcyBhbHJlYWR5IGluIHN0b3JhZ2VcclxuICAgKi9cclxuICBzdGF0aWMgYXN5bmMgc2Vzc2lvbkV4aXN0cyhzZXNzaW9uTmFtZSkge1xyXG4gICAgY29uc3QgYWxsU2Vzc2lvbnMgPSBhd2FpdCBTdG9yYWdlLmdldEFsbFNlc3Npb25OYW1lc0Zyb21TdG9yYWdlKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFNlc3Npb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChhbGxTZXNzaW9uc1tpXS5zZXNzaW9uTmFtZSA9PT0gc2Vzc2lvbk5hbWUpIHtcclxuICAgICAgICByZXR1cm4gYWxsU2Vzc2lvbnNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTZWxlY3RlZCBzZXNzaW9uIGlzIG5vdCBmb3VuZCFcIik7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzeW5jVG9Mb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh0aGlzLnZpZGVvU2Vzc2lvbik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGFuIG9iamVjdCBpbiBjaHJvbWUuc3RvcmFnZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxyXG4gICAqL1xyXG4gIHN0YXRpYyBhc3luYyB3cml0ZU9ialRvU3RvcmFnZShvYmplY3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KG9iamVjdCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICNzZXRWaWRlb1Nlc3Npb25Gcm9tTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQodGhpcy5TVE9SQUdFX0tFWSwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgc2Vzc2lvbiBpbiBzdG9yYWdlLCB0aGVuIHJldHVybiBpdFxyXG4gICAgICBpZiAoT2JqZWN0LmtleXMocmVzcG9uc2UpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLnZpZGVvU2Vzc2lvbiA9IHJlc3BvbnNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudmlkZW9TZXNzaW9uID0ge1xyXG4gICAgICAgICAgW3RoaXMuU1RPUkFHRV9LRVldOiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25OYW1lOiB0aGlzLlNUT1JBR0VfS0VZLFxyXG4gICAgICAgICAgICBib29rbWFya3M6IHt9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnN5bmNUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZEJvb2ttYXJrKGJvb2ttYXJrKSB7XHJcbiAgICBjb25zdCB7IGJvb2ttYXJrcyB9ID0gdGhpcy52aWRlb1Nlc3Npb25bdGhpcy5TVE9SQUdFX0tFWV07XHJcbiAgICBib29rbWFya3NbYm9va21hcmsudGltZXN0YW1wXSA9IGJvb2ttYXJrO1xyXG4gICAgYXdhaXQgdGhpcy5zeW5jVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlbW92ZUJvb2ttYXJrKHRpbWVzdGFtcCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBib29rbWFya3MgfSA9IHRoaXMudmlkZW9TZXNzaW9uW3RoaXMuU1RPUkFHRV9LRVldO1xyXG4gICAgICBpZiAoYm9va21hcmtzW3RpbWVzdGFtcF0pIHtcclxuICAgICAgICBkZWxldGUgYm9va21hcmtzW3RpbWVzdGFtcF07XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBgQ2FuJ3QgcmVtb3ZlIGJvb2ttYXJrIGF0ICR7dGltZXN0YW1wfSBiZWNhdXNlIGl0IGRvZXNuJ3QgZXhpc3RgO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHRvZ2dsZUJvb2ttYXJrTmVzdGluZyh0aW1lc3RhbXApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgYm9va21hcmtzIH0gPSB0aGlzLnZpZGVvU2Vzc2lvblt0aGlzLlNUT1JBR0VfS0VZXTtcclxuICAgICAgY29uc3QgdGFyZ2V0Qm9va21hcmsgPSBib29rbWFya3NbdGltZXN0YW1wXTtcclxuICAgICAgaWYgKHRhcmdldEJvb2ttYXJrKSB7XHJcbiAgICAgICAgdGFyZ2V0Qm9va21hcmsuaXNOZXN0ZWQgPSAhdGFyZ2V0Qm9va21hcmsuaXNOZXN0ZWQ7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBgQ2FuJ3QgdG9nZ2xlIGJvb2ttYXJrIG5lc3RpbmcgYXQgJHt0aW1lc3RhbXB9IGJlY2F1c2UgaXQgZG9lc24ndCBleGlzdGA7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgYXNzb2NpYXRlZCBib29rbWFyayB3aXRoIHRoZSB0aW1lc3RhbXAsIG9yIHVuZGVmaW5lZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGN1cnJlbnRUaW1lc3RhbXAgLSBmb3JtYXQgaGg6bW06c3MgdGltZXN0YW1wXHJcbiAgICogQHJldHVybnMge09iamVjdH0gLSB0aGUgYm9va21ha3Igb2JqZWN0IGZyb20gdGhlIGN1cnJlbnQgc2Vzc2lvblxyXG4gICAqL1xyXG4gIGdldEJvb2ttYXJrQXRUaW1lc3RhbXAoY3VycmVudFRpbWVzdGFtcCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlkZW9TZXNzaW9uW3RoaXMuU1RPUkFHRV9LRVldLmJvb2ttYXJrc1tjdXJyZW50VGltZXN0YW1wXTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5yZW1vdmUodGhpcy5TVE9SQUdFX0tFWSwgKCkgPT4ge30pO1xyXG4gIH1cclxuXHJcbiAgcHJpbnRCb29rbWFya3NQcmV0dHkoKSB7XHJcbiAgICBjb25zb2xlLmNsZWFyKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgYCVjU2Vzc2lvbiBOYW1lOiAlYyR7dGhpcy52aWRlb1Nlc3Npb25bdGhpcy5TVE9SQUdFX0tFWV0uc2Vzc2lvbk5hbWV9YCxcclxuICAgICAgXCJjb2xvcjogeWVsbG93XCIsXHJcbiAgICAgIFwiY29sb3I6ICNERUI4ODdcIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IGJvb2ttYXJrRnJvbUxvY2FsU3RvcmFnZSA9XHJcbiAgICAgIHRoaXMudmlkZW9TZXNzaW9uW3RoaXMuU1RPUkFHRV9LRVldLmJvb2ttYXJrcztcclxuICAgIGNvbnNvbGUubG9nKFwiJWNDdXJyZW50IEJvb2ttYXJrczogXCIsIFwiY29sb3I6IHJlZFwiKTtcclxuICAgIGNvbnNvbGUudGFibGUoYm9va21hcmtGcm9tTG9jYWxTdG9yYWdlKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL1N0b3JhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiBWaWRlbyBjbGFzcyBtYW5hZ2VzIHRoZSBIVE1MIHZpZGVvIGZvdW5kIGluIHRoZSBET00uIEl0IGluc3RhbnRpYXRlc1xyXG4gKiBhIFN0b3JhZ2UgY2xhc3MgaW5zdGFuY2Ugd2hpY2ggaG9sZHMgdGhlIGJvb2ttYXJrcyByZWxhdGluZyB0byB0aGVcclxuICogY3VycmVudGx5IGxvYWRlZCB2aWRlbyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgc2Vzc2lvbiBuYW1lXHJcbiAqL1xyXG4vLyBUT0RPOiBwYXNzaW5nIHRoZSBkYXRlIHRvIHRoaXMgY29uc3RydWN0b3IgbWlnaHQgbm90IGJlIG5lY2Vzc2FyeVxyXG5leHBvcnQgY2xhc3MgVmlkZW8ge1xyXG4gIGNvbnN0cnVjdG9yKHZpZGVvRWxlbWVudCwgc2Vzc2lvbk5hbWUsIGRhdGUpIHtcclxuICAgIHRoaXMudmlkZW8gPSB2aWRlb0VsZW1lbnQ7XHJcbiAgICB0aGlzLnNlc3Npb25OYW1lID0gc2Vzc2lvbk5hbWU7XHJcbiAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZShzZXNzaW9uTmFtZSwgZGF0ZSk7XHJcbiAgfVxyXG5cclxuICBwbGF5KCkge1xyXG4gICAgdGhpcy52aWRlby5wbGF5KCk7XHJcbiAgfVxyXG5cclxuICBwYXVzZSgpIHtcclxuICAgIHRoaXMudmlkZW8ucGF1c2UoKTtcclxuICB9XHJcblxyXG4gIGp1bXBUb1RpbWVzdGFtcChzZWNvbmRzKSB7XHJcbiAgICB0aGlzLnZpZGVvLmN1cnJlbnRUaW1lID0gc2Vjb25kcztcclxuICB9XHJcblxyXG4gIGdldEN1cnJlbnRUaW1lc3RhbXAoKSB7XHJcbiAgICAvLyBnZXQgdGhlIGN1cnJlbnQgdmlkZW8gdGltZSBpbiBzZWNvbmRzXHJcbiAgICBjb25zdCBjdXJyZW50VmlkZW9UaW1lID0gTWF0aC5mbG9vcih0aGlzLnZpZGVvLmN1cnJlbnRUaW1lKTtcclxuICAgIC8vIHJldHVybiB0aGUgY29udmVydGVkIHNlY29uZHMgaW50byBhIHN0cmluZyB0aW1lc3RhbXBcclxuICAgIHJldHVybiBuZXcgRGF0ZShjdXJyZW50VmlkZW9UaW1lICogMTAwMCkudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkQm9va21hcmsoYm9va21hcmspIHtcclxuICAgIHRoaXMucGF1c2UoKTtcclxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5hZGRCb29rbWFyayhib29rbWFyayk7XHJcbiAgICB0aGlzLnBsYXkoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlbW92ZUJvb2ttYXJrKHRpbWVzdGFtcCkge1xyXG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZUJvb2ttYXJrKHRpbWVzdGFtcCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVCb29rbWFya05lc3RpbmcodGltZXN0YW1wKSB7XHJcbiAgICB0aGlzLnN0b3JhZ2UudG9nZ2xlQm9va21hcmtOZXN0aW5nKHRpbWVzdGFtcCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBNU0cgPSB7XHJcbiAgU1VDQ0VTUzogXCJzdWNjZXNzXCIsXHJcbiAgRkFJTFVSRTogXCJmYWlsdXJlXCIsXHJcbiAgVE9HR0xFOiBcInRvZ2dsZVwiLFxyXG4gIENSRUFURV9ORVdfU0VTU0lPTjogXCJjcmVhdGVOZXdTZXNzaW9uXCIsXHJcbiAgU0VMRUNUX1NFU1NJT046IFwic2VsZWN0U2Vzc2lvblwiLFxyXG4gIERFTEVURV9TRVNTSU9OOiBcImRlbGV0ZVNlc3Npb25cIixcclxuICBFRElUX1NFU1NJT046IFwiZWRpdFNlc3Npb25cIixcclxuICBKVU1QX1RPX1RJTUVTVEFNUDogXCJqdW1wVG9UaW1lc3RhbXBcIixcclxuICBERUxFVEVfQk9PS01BUks6IFwiZGVsZXRlQm9va21hcmtcIixcclxuICBUT0dHTEVfQk9PS01BUktfTkVTVElORzogXCJ0b2dnbGVCb29rbWFya05lc3RpbmdcIixcclxuICBBRERfQk9PS01BUks6IFwiYWRkQm9va21hcmtcIixcclxuICBDT1BZX1RBQkxFOiBcImNvcHlUYWJsZVwiLFxyXG4gIEdFVF9CT09LTUFSS19BVF9USU1FU1RBTVA6IFwiZ2V0Qm9va21hcmtBdFRpbWVzdGFtcFwiLFxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb2ttYXJrIHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgdGV4dCwgdGltZXN0YW1wID0gbnVsbCkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgdGhpcy5pc05lc3RlZCA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlTdHJpbmdUb0NsaXBib2FyZChzdHIpIHtcclxuICAvLyBDcmVhdGUgbmV3IGVsZW1lbnRcclxuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbiAgLy8gU2V0IHZhbHVlIChzdHJpbmcgdG8gYmUgY29waWVkKVxyXG4gIGVsLnZhbHVlID0gc3RyO1xyXG4gIC8vIFNldCBub24tZWRpdGFibGUgdG8gYXZvaWQgZm9jdXMgYW5kIG1vdmUgb3V0c2lkZSBvZiB2aWV3XHJcbiAgZWwuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgXCJcIik7XHJcbiAgZWwuc3R5bGUgPSB7IHBvc2l0aW9uOiBcImFic29sdXRlXCIsIGxlZnQ6IFwiLTk5OTlweFwiIH07XHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XHJcbiAgLy8gU2VsZWN0IHRleHQgaW5zaWRlIGVsZW1lbnRcclxuICBlbC5zZWxlY3QoKTtcclxuICAvLyBDb3B5IHRleHQgdG8gY2xpcGJvYXJkXHJcbiAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xyXG4gIC8vIFJlbW92ZSB0ZW1wb3JhcnkgZWxlbWVudFxyXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TWFwVG9UYWJsZVN0cmluZyhib29rbWFya3MpIHtcclxuICBjb25zdCBUQUJfQ0hBUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoOSk7XHJcbiAgY29uc3QgTkVXTElORV9DSEFSID0gU3RyaW5nLmZyb21DaGFyQ29kZSgxMCk7XHJcbiAgbGV0IGZvcm1hdGVkU3RyaW5nID0gXCJcIjtcclxuICBmb3IgKGxldCBrZXkgaW4gYm9va21hcmtzKSB7XHJcbiAgICAvLyB0aW1lc3RhbXAgKyBUQUIgKyBib29rbWFyayArIE5FV0xJTkVcclxuICAgIGZvcm1hdGVkU3RyaW5nICs9IGtleSArIFRBQl9DSEFSICsgYm9va21hcmtzW2tleV0udGV4dCArIE5FV0xJTkVfQ0hBUjtcclxuICB9XHJcblxyXG4gIHJldHVybiBmb3JtYXRlZFN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUYWJsZVRvQ2xpcGJvYXJkKGJvb2ttYXJrcykge1xyXG4gIGNvcHlTdHJpbmdUb0NsaXBib2FyZChmb3JtYXRNYXBUb1RhYmxlU3RyaW5nKGJvb2ttYXJrcykpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ3VpZCgpIHtcclxuICBsZXQgczQgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgICAuc3Vic3RyaW5nKDEpO1xyXG4gIH07XHJcbiAgLy9yZXR1cm4gaWQgb2YgZm9ybWF0ICdhYWFhYWFhYSctJ2FhYWEnLSdhYWFhJy0nYWFhYSctJ2FhYWFhYWFhYWFhYSdcclxuICByZXR1cm4gKFxyXG4gICAgczQoKSArXHJcbiAgICBzNCgpICtcclxuICAgIFwiLVwiICtcclxuICAgIHM0KCkgK1xyXG4gICAgXCItXCIgK1xyXG4gICAgczQoKSArXHJcbiAgICBcIi1cIiArXHJcbiAgICBzNCgpICtcclxuICAgIFwiLVwiICtcclxuICAgIHM0KCkgK1xyXG4gICAgczQoKSArXHJcbiAgICBzNCgpXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVzdGFtcFRvU2Vjb25kcyh0aW1lc3RhbXApIHtcclxuICBjb25zdCBhcnJheSA9IHRpbWVzdGFtcC5zcGxpdChcIjpcIik7IC8vIHNwbGl0IGl0IGF0IHRoZSBjb2xvbnNcclxuICAvLyBtaW51dGVzIGFyZSB3b3J0aCA2MCBzZWNvbmRzLiBIb3VycyBhcmUgd29ydGggNjAgbWludXRlcy5cclxuICByZXR1cm4gK2FycmF5WzBdICogNjAgKiA2MCArICthcnJheVsxXSAqIDYwICsgK2FycmF5WzJdO1xyXG59XHJcblxyXG4vLyBzZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIGFjdGl2ZSB0YWIncyBjb250ZW50IHNjcmlwdFxyXG5leHBvcnQgY29uc3Qgc2VuZE1lc3NhZ2VUb0FjdGl2ZVRhYiA9IChwYXlsb2FkLCBjYWxsYmFjaykgPT4ge1xyXG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XHJcbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCBwYXlsb2FkLCBjYWxsYmFjayk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBkYXRlIGZyb20gdGhlIGZvcm1hdCB5eXl5LW1tLWRkIHRvIG1tL2RkL3l5eXlcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGUgLSBkYXRlIGluIHRoZSBmb3JtYXQgeXl5eS1tbS1kZFxyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGVQaWNrZXJTdGFtcChkYXRlKSB7XHJcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF0ZS5zcGxpdChcIi1cIik7XHJcbiAgcmV0dXJuIFttb250aCwgZGF5LCB5ZWFyXS5qb2luKFwiL1wiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgZGF0ZSBmcm9tIHRoZSBmb3JtYXQgbW0vZGQveXl5eSB0byB5eXl5LW1tLWRkXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRlIC0gZGF0ZSBpbiB0aGUgZm9ybWF0IG1tL2RkL3l5eXlcclxuICogQHJldHVybnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb3JtYXREYXRlUGlja2VyKGRhdGUpIHtcclxuICBjb25zdCBbbW9udGgsIGRheSwgeWVhcl0gPSBkYXRlLnNwbGl0KFwiL1wiKTtcclxuICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldLmpvaW4oXCItXCIpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZXJyb3IgbWVzc2FnZSBmcm9tIGFuIGVycm9yIG9iamVjdCwgb3IgdGhlIHN0cmluZyBtc2cgaXRzZWxmXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0IHwgU3RyaW5nfSBlcnJvciAtIHRoZSBlcnJvciB0aGF0IGNvbnRhaW5zIHRoZSBtc2csIG9yIGlzIHRoZSBtc2dcclxuICogQHJldHVybnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFcnJvck1zZyhlcnJvcikge1xyXG4gIHJldHVybiB0eXBlb2YgZXJyb3IgPT09IFwib2JqZWN0XCIgPyBlcnJvci5tZXNzYWdlIDogZXJyb3I7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IGRhdGVcclxuICpcclxuICogQHJldHVybnMge1N0cmluZ30gLSB0aGUgY3VycmVudCBkYXRlIGZvcm1hdHRlZCBhcyBcInl5eXktbW0tZGRcIlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnREYXRlKCkge1xyXG4gIHJldHVybiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc29sZS5sb2coXCJDb250ZW50IFNjcmlwdCBSYW4hXCIpO1xyXG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4vU2Vzc2lvblwiO1xyXG5pbXBvcnQgeyBNU0cgfSBmcm9tIFwiLi91dGlsaXR5XCI7XHJcblxyXG4vLyBUT0RPOiByZXBsYWNlIGFsbCBzdHJpbmdzIHdpdGggY29uc3RhbnRzXHJcblxyXG5sZXQgaW5pdGlhbFBhZ2VMb2FkID0gdHJ1ZTtcclxubGV0IHNlc3Npb24gPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIGhhbmRsZXMgdGhlIG1lc3NhZ2VzIHNlbnQgZnJvbSBvdGhlciBzY3JpcHRzXHJcbiAqIHRoaXMgbWFuYWdlcyB0aGUgbmVzc2VjYXJ5IGV2ZW50cyBmb3IgdGhlIGNvbnRlbnQgc2NyaXB0IGFuZCBzZXJ2ZXJzXHJcbiAqIGFzIGEgbWlkZGxlIG1hbiBmb3IgaG93IGFsbCB0aGUgcmVzb3VyY2Ugc2NyaXB0cyBjb21tdW5pY2F0ZSB3aXRoXHJcbiAqIHRoZSBjb250ZW50IHNjcmlwdFxyXG4gKi9cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2csIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgLy8gTVNHIGlzIGFuIG9iamVjdCBmcm9tIHRoZSB1dGlsaXR5LmpzIGZpbGUgdGhhdCByZXBsYWNlcyBhbGwgc3RyaW5nc1xyXG4gIHN3aXRjaCAobXNnLmFjdGlvbikge1xyXG4gICAgY2FzZSBNU0cuVE9HR0xFOlxyXG4gICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBydW4gY29kZSB3aGVuIHRoZSBjb250ZW50IHNjcmlwdCBpcyBpbml0aWFsbHkgbG9hZGVkXHJcbiAgICAgIGlmIChpbml0aWFsUGFnZUxvYWQpIHtcclxuICAgICAgICBpbml0aWFsUGFnZUxvYWQgPSBmYWxzZTtcclxuICAgICAgICBzZXNzaW9uID0gbmV3IFNlc3Npb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXNzaW9uLnRvZ2dsZVNpZGVtZW51VmlzaWJsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiBNU0cuU1VDQ0VTUyB9KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIE1TRy5DUkVBVEVfTkVXX1NFU1NJT046XHJcbiAgICAgIGNvbnN0IHsgc2Vzc2lvbk5hbWUsIGRhdGUgfSA9IG1zZy5wYXlsb2FkO1xyXG4gICAgICBzZXNzaW9uXHJcbiAgICAgICAgLmNyZWF0ZU5ld1Nlc3Npb24oeyBzZXNzaW9uTmFtZSwgZGF0ZSB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN0YXR1czogTVNHLlNVQ0NFU1MgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IE1TRy5GQUlMVVJFLCBwYXlsb2FkOiBlcnJvciB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgLy8gaW5kaWNhdGUgdGhhdCB0aGUgcmVzcG9uc2UgaXMgYXN5bmNocm91bnVzXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgY2FzZSBNU0cuQ09QWV9UQUJMRTpcclxuICAgICAgc2Vzc2lvblxyXG4gICAgICAgIC5jb3B5Qm9va21hcmtzQXNUYWJsZShtc2cucGF5bG9hZC5zZXNzaW9uTmFtZSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IE1TRy5TVUNDRVNTIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiBNU0cuRkFJTFVSRSwgcGF5bG9hZDogZXJyb3IgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgY2FzZSBNU0cuU0VMRUNUX1NFU1NJT046XHJcbiAgICAgIHNlc3Npb25cclxuICAgICAgICAuc2VsZWN0U2Vzc2lvbihtc2cucGF5bG9hZClcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IE1TRy5TVUNDRVNTIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiBNU0cuRkFJTFVSRSwgcGF5bG9hZDogZXJyb3IgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIC8vIGluZGljYXRlIHRoYXQgdGhlIHJlc3BvbnNlIGlzIGFzeW5jaHJvdW51c1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGNhc2UgTVNHLkRFTEVURV9TRVNTSU9OOlxyXG4gICAgICBzZXNzaW9uXHJcbiAgICAgICAgLnJlbW92ZVNlc3Npb24obXNnLnBheWxvYWQpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiBNU0cuU1VDQ0VTUyB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN0YXR1czogTVNHLkZBSUxVUkUsIHBheWxvYWQ6IGVycm9yIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAvLyBpbmRpY2F0ZSB0aGF0IHRoZSByZXNwb25zZSBpcyBhc3luY2hyb3VudXNcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBjYXNlIE1TRy5FRElUX1NFU1NJT046XHJcbiAgICAgIGNvbnN0IHsgb2xkVmFsdWUsIG5ld1ZhbHVlIH0gPSBtc2cucGF5bG9hZDtcclxuICAgICAgc2Vzc2lvblxyXG4gICAgICAgIC51cGRhdGVTZXNzaW9uTmFtZShvbGRWYWx1ZSwgbmV3VmFsdWUpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiBNU0cuU1VDQ0VTUyB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN0YXR1czogTVNHLkZBSUxVUkUsIHBheWxvYWQ6IGVycm9yIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAvLyBpbmRpY2F0ZSB0aGF0IHRoZSByZXNwb25zZSBpcyBhc3luY2hyb3VudXNcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBjYXNlIE1TRy5HRVRfQ1VSUkVOVF9USU1FU1RBTVA6XHJcbiAgICAgIC8vIHBhdXNlIHRoZSB2aWRlbyBpZiBhc2tlZCBmb3JcclxuICAgICAgaWYgKG1zZz8ucGF5bG9hZC5wYXVzZVZpZGVvICYmIHNlc3Npb24udmlkZW8pIHtcclxuICAgICAgICBzZXNzaW9uLnZpZGVvLnBhdXNlKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gc2VuZCB0aGUgY3VycmVudCB0aW1lc3RhbXAsIG9yIGZhaWx1cmVcclxuICAgICAgY29uc3QgZGF0YSA9IHNlc3Npb24uZ2V0Q3VycmVudFRpbWVzdGFtcCgpO1xyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHsgdGltZXN0YW1wLCBib29rbWFyayB9ID0gZGF0YTtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgc3RhdHVzOiBNU0cuU1VDQ0VTUyxcclxuICAgICAgICAgIHBheWxvYWQ6IHsgdGltZXN0YW1wLCBib29rbWFyayB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7XHJcbiAgICAgICAgICBzdGF0dXM6IE1TRy5GQUlMVVJFLFxyXG4gICAgICAgICAgcGF5bG9hZDogXCJGYWlsZWQgdG8gZ2V0IGN1cnJlbnQgYm9va21hcmtcIixcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgTVNHLkFERF9CT09LTUFSSzpcclxuICAgICAgc2Vzc2lvblxyXG4gICAgICAgIC5hZGRCb29rbWFyayhtc2cucGF5bG9hZC5ib29rbWFyaylcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IE1TRy5TVUNDRVNTIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IE1TRy5GQUlMVVJFIH0pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICBhbGVydChcIkZhaWxlZCBpbiBjb250ZW50IHNjcmlwdFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBjYXNlIE1TRy5KVU1QX1RPX1RJTUVTVEFNUDpcclxuICAgICAgc2Vzc2lvbi5qdW1wVG9UaW1lc3RhbXAobXNnLnBheWxvYWQpO1xyXG4gICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IE1TRy5TVUNDRVNTIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgTVNHLkRFTEVURV9CT09LTUFSSzpcclxuICAgICAgc2Vzc2lvblxyXG4gICAgICAgIC5kZWxldGVCb29rbWFyayhtc2cucGF5bG9hZClcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IE1TRy5TVUNDRVNTIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiBNU0cuRkFJTFVSRSwgcGF5bG9hZDogZXJyb3IgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgY2FzZSBNU0cuVE9HR0xFX0JPT0tNQVJLX05FU1RJTkc6XHJcbiAgICAgIHNlc3Npb25cclxuICAgICAgICAudG9nZ2xlQm9va21hcmtOZXN0aW5nKG1zZy5wYXlsb2FkKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN0YXR1czogTVNHLlNVQ0NFU1MgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IE1TRy5GQUlMVVJFLCBwYXlsb2FkOiBlcnJvciB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBjYXNlIE1TRy5HRVRfQk9PS01BUktfQVRfVElNRVNUQU1QOlxyXG4gICAgICBjb25zdCBib29rbWFyayA9IHNlc3Npb24uZ2V0Qm9va21hcmtBdFRpbWVzdGFtcChtc2cucGF5bG9hZCk7XHJcbiAgICAgIGJvb2ttYXJrXHJcbiAgICAgICAgPyBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IE1TRy5TVUNDRVNTLCBwYXlsb2FkOiBib29rbWFyayB9KVxyXG4gICAgICAgIDogc2VuZFJlc3BvbnNlKHtcclxuICAgICAgICAgICAgc3RhdHVzOiBNU0cuRkFJTFVSRSxcclxuICAgICAgICAgICAgcGF5bG9hZDogYE5vIGJvb2ttYXJrIGF0ICR7bXNnLnBheWxvYWR9YCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gVE9ETzogd2lyZSB0aGUgZXZlbnQgbGlzdGVuZXJzIChtYXliZSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcclxuICBpZiAoZS5jdHJsS2V5ICYmIGUua2V5ID09IFwiYlwiKSB7XHJcbiAgICBzZXNzaW9uLnZpZGVvLmFkZEJvb2ttYXJrKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgaWYgKGUuY3RybEtleSAmJiBlLmtleSA9PSBcIjtcIikge1xyXG4gICAgLy8gcHJpbnQgYm9va21hcmtzIHByZXR0eVxyXG4gICAgc2Vzc2lvbi52aWRlby5zdG9yYWdlLnByaW50Qm9va21hcmtzUHJldHR5KCk7XHJcbiAgICBzZXNzaW9uLnZpZGVvLmNvcHlTdHJpbmdUb0NsaXBib2FyZCh2aWRlby5mb3JtYXRNYXBUb1RhYmxlU3RyaW5nKCkpO1xyXG4gIH1cclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gIGlmIChlLmN0cmxLZXkgJiYgZS5rZXkgPT0gXCIuXCIpIHtcclxuICAgIC8vIGFzayB1c2VyIGZvciB0aW1lc3RhbXBcclxuICAgIGNvbnN0IHVzZXJUaW1lU3RhbXAgPSBwcm9tcHQoXCJFbnRlciB0aGUgdGltZXN0YW1wIEhIOk1NOlNTXCIpO1xyXG4gICAgaWYgKHVzZXJUaW1lU3RhbXApIHtcclxuICAgICAgY29uc3QgdGltZVN0YW1wID0gdXNlclRpbWVTdGFtcC5zcGxpdChcIjpcIik7IC8vIHNwbGl0IGl0IGF0IHRoZSBjb2xvbnNcclxuICAgICAgLy8gbWludXRlcyBhcmUgd29ydGggNjAgc2Vjb25kcy4gSG91cnMgYXJlIHdvcnRoIDYwIG1pbnV0ZXMuXHJcbiAgICAgIGNvbnN0IHNlY29uZHMgPVxyXG4gICAgICAgICt0aW1lU3RhbXBbMF0gKiA2MCAqIDYwICsgK3RpbWVTdGFtcFsxXSAqIDYwICsgK3RpbWVTdGFtcFsyXTtcclxuXHJcbiAgICAgIC8vIGp1bXAgdG8gdGhhdCB0aW1lc3RhbXBcclxuICAgICAgc2Vzc2lvbi52aWRlby5qdW1wVG9UaW1lc3RhbXAoc2Vjb25kcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIFRPRE86IHJlbW92ZSB0aGlzLiBJdCdzIGZvciB0ZXN0aW5nXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgaWYgKGUuY3RybEtleSAmJiBlLmtleSA9PSBcImBcIikge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQobnVsbCwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBUT0RPOiByZW1vdmUgdGhpcy4gSXQncyBmb3IgdGVzdGluZ1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gIGlmIChlLmN0cmxLZXkgJiYgZS5rZXkgPT0gXCIqXCIpIHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuY2xlYXIoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlNUT1JBR0UgQ0xFQVJFRCFcIik7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiVmlkZW8iLCJTdG9yYWdlIiwiY29weVRhYmxlVG9DbGlwYm9hcmQiLCJ0aW1lc3RhbXBUb1NlY29uZHMiLCJTZXNzaW9uIiwic2Vzc2lvbk5hbWUiLCJ2aWRlbyIsInNpZGViYXJJZnJhbWUiLCJjb25zb2xlIiwibG9nIiwiU0lERUJBUl9QQUdFX1VSTCIsInNldFRpbWVvdXQiLCJ0b2dnbGVTaWRlbWVudVZpc2libGl0eSIsInNlc3Npb25JbmZvIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJkYXRlIiwic2Vzc2lvbkV4aXN0cyIsInRoZW4iLCJyZXMiLCJhZGRTZXNzaW9uTmFtZVRvU3RvcmFnZSIsImVycm9yIiwic2VsZWN0ZWRTZXNzaW9uIiwicmVzdWx0IiwicmVtb3ZlU2Vzc2lvbkZyb21TdG9yYWdlIiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsImN1cnJlbnRTZXNzaW9uTmFtZSIsIm5ld05hbWVWYWwiLCJuZXdEYXRlVmFsIiwiZ2V0U2Vzc2lvbkZyb21TdG9yYWdlIiwiZm91bmRTZXNzaW9uIiwic2Vzc2lvbk5hbWVDaGFuZ2VkIiwid3JpdGVPYmpUb1N0b3JhZ2UiLCJyZW1vdmUiLCJnZXRTZXNzaW9uQm9va21hcmtzIiwicmVzcG9uc2UiLCJib29rbWFya3MiLCJ2YWx1ZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImFkZCIsInRpbWVzdGFtcCIsImdldEN1cnJlbnRUaW1lc3RhbXAiLCJib29rbWFyayIsInN0b3JhZ2UiLCJnZXRCb29rbWFya0F0VGltZXN0YW1wIiwiYWRkQm9va21hcmsiLCJqdW1wVG9UaW1lc3RhbXAiLCJyZW1vdmVCb29rbWFyayIsInRvZ2dsZUJvb2ttYXJrTmVzdGluZyIsInJlcGVhdENvdW50IiwiaW50ZXJ2YWxJZCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIlVSTCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjaHJvbWUiLCJydW50aW1lIiwiZ2V0VVJMIiwidmlkZW9TZXNzaW9uIiwiU1RPUkFHRV9LRVkiLCJzeW5jIiwic2V0Iiwic3luY1RvTG9jYWxTdG9yYWdlIiwidGFyZ2V0Qm9va21hcmsiLCJpc05lc3RlZCIsImN1cnJlbnRUaW1lc3RhbXAiLCJjbGVhciIsImJvb2ttYXJrRnJvbUxvY2FsU3RvcmFnZSIsInRhYmxlIiwiQUxMX1NFU1NJT05TIiwiY3VycmVudFNlc3Npb25zIiwiZ2V0QWxsU2Vzc2lvbk5hbWVzRnJvbVN0b3JhZ2UiLCJwdXNoIiwic2Vzc2lvbnMiLCJnZXQiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwic2hvdWxkUmVtb3ZlU2Vzc2lvbiIsImZvdW5kIiwiaSIsInNwbGljZSIsImFsbFNlc3Npb25zIiwiRXJyb3IiLCJvYmplY3QiLCJ2aWRlb0VsZW1lbnQiLCJwbGF5IiwicGF1c2UiLCJzZWNvbmRzIiwiY3VycmVudFRpbWUiLCJjdXJyZW50VmlkZW9UaW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwic3Vic3RyIiwiTVNHIiwiU1VDQ0VTUyIsIkZBSUxVUkUiLCJUT0dHTEUiLCJDUkVBVEVfTkVXX1NFU1NJT04iLCJTRUxFQ1RfU0VTU0lPTiIsIkRFTEVURV9TRVNTSU9OIiwiRURJVF9TRVNTSU9OIiwiSlVNUF9UT19USU1FU1RBTVAiLCJERUxFVEVfQk9PS01BUksiLCJUT0dHTEVfQk9PS01BUktfTkVTVElORyIsIkFERF9CT09LTUFSSyIsIkNPUFlfVEFCTEUiLCJHRVRfQk9PS01BUktfQVRfVElNRVNUQU1QIiwiQm9va21hcmsiLCJ0aXRsZSIsInRleHQiLCJjb3B5U3RyaW5nVG9DbGlwYm9hcmQiLCJzdHIiLCJlbCIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwicG9zaXRpb24iLCJsZWZ0Iiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJyZW1vdmVDaGlsZCIsImZvcm1hdE1hcFRvVGFibGVTdHJpbmciLCJUQUJfQ0hBUiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIk5FV0xJTkVfQ0hBUiIsImZvcm1hdGVkU3RyaW5nIiwia2V5IiwiZ3VpZCIsInM0IiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJhcnJheSIsInNwbGl0Iiwic2VuZE1lc3NhZ2VUb0FjdGl2ZVRhYiIsInBheWxvYWQiLCJjYWxsYmFjayIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsImN1cnJlbnRXaW5kb3ciLCJzZW5kTWVzc2FnZSIsImlkIiwiZm9ybWF0RGF0ZVBpY2tlclN0YW1wIiwieWVhciIsIm1vbnRoIiwiZGF5Iiwiam9pbiIsInJlbW92ZUZvcm1hdERhdGVQaWNrZXIiLCJnZXRFcnJvck1zZyIsIm1lc3NhZ2UiLCJnZXRDdXJyZW50RGF0ZSIsImluaXRpYWxQYWdlTG9hZCIsInNlc3Npb24iLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsIm1zZyIsInNlbmRlciIsInNlbmRSZXNwb25zZSIsImFjdGlvbiIsInN0YXR1cyIsImNyZWF0ZU5ld1Nlc3Npb24iLCJjb3B5Qm9va21hcmtzQXNUYWJsZSIsInNlbGVjdFNlc3Npb24iLCJyZW1vdmVTZXNzaW9uIiwidXBkYXRlU2Vzc2lvbk5hbWUiLCJHRVRfQ1VSUkVOVF9USU1FU1RBTVAiLCJwYXVzZVZpZGVvIiwiZGF0YSIsImUiLCJhbGVydCIsImRlbGV0ZUJvb2ttYXJrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImN0cmxLZXkiLCJwcmludEJvb2ttYXJrc1ByZXR0eSIsInVzZXJUaW1lU3RhbXAiLCJwcm9tcHQiLCJ0aW1lU3RhbXAiXSwic291cmNlUm9vdCI6IiJ9