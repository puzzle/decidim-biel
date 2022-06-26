/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./vendor/bundle/ruby/2.7.0/gems/decidim-api-0.26.2/app/packs/entrypoints/decidim_api_graphiql.js":
/*!********************************************************************************************************!*\
  !*** ./vendor/bundle/ruby/2.7.0/gems/decidim-api-0.26.2/app/packs/entrypoints/decidim_api_graphiql.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var entrypoints_decidim_api_graphiql_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! entrypoints/decidim_api_graphiql.scss */ "./vendor/bundle/ruby/2.7.0/gems/decidim-api-0.26.2/app/packs/entrypoints/decidim_api_graphiql.scss");
/* harmony import */ var entrypoints_decidim_api_graphiql_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(entrypoints_decidim_api_graphiql_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index-exposed.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'graphiql'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var src_decidim_configuration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/decidim/configuration */ "./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.26.2/app/packs/src/decidim/configuration.js");
/* eslint-disable require-jsdoc */





window.Decidim = window.Decidim || {};
window.Decidim.config = new src_decidim_configuration__WEBPACK_IMPORTED_MODULE_4__["default"]();
var parameters = {}; // Parse the search string to get url parameters.

var search = window.location.search;
search.substr(1).split("&").forEach(function (entry) {
  var eq = entry.indexOf("=");

  if (eq >= 0) {
    parameters[decodeURIComponent(entry.slice(0, eq))] = decodeURIComponent(entry.slice(eq + 1));
  }
}); // if variables was provided, try to format it.

if (parameters.variables) {
  try {
    parameters.variables = JSON.stringify(JSON.parse(parameters.variables), null, 2);
  } catch (error) {// Do nothing, we want to display the invalid JSON as a string, rather
    // than present an error.
  }
}

var updateURL = function updateURL() {
  var newSearch = Object.keys(parameters).map(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
  }).join("&");
  history.replaceState(null, null, "?" + newSearch);
}; // When the query and variables string is edited, update the URL bar so
// that it can be easily shared


var onEditQuery = function onEditQuery(newQuery) {
  parameters.query = newQuery;
  updateURL();
};

var onEditVariables = function onEditVariables(newVariables) {
  parameters.variables = newVariables;
  updateURL();
}; // Defines a GraphQL fetcher using the fetch API.


var graphQLFetcher = function graphQLFetcher(graphQLParams) {
  var graphQLEndpoint = window.Decidim.config.get("graphql_endpoint");
  return fetch(graphQLEndpoint, {
    method: "post",
    headers: JSON.parse(window.Decidim.config.get("request_headers")),
    body: JSON.stringify(graphQLParams),
    credentials: "include"
  }).then(function (response) {
    try {
      return response.json();
    } catch (error) {
      return {
        "status": response.status,
        "message": "The server responded with invalid JSON, this is probably a server-side error",
        "response": response.text()
      };
    }
  });
};

window.addEventListener("DOMContentLoaded", function () {
  // Render <GraphiQL /> into the body.
  react_dom__WEBPACK_IMPORTED_MODULE_2__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'graphiql'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
    fetcher: graphQLFetcher,
    defaultQuery: window.Decidim.config.get("default_query"),
    query: parameters.query,
    variables: parameters.variables,
    onEditQuery: onEditQuery,
    onEditVariables: onEditVariables
  }), document.getElementById("graphiql-container"));
});

/***/ }),

/***/ "./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.26.2/app/packs/src/decidim/configuration.js":
/*!**************************************************************************************************!*\
  !*** ./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.26.2/app/packs/src/decidim/configuration.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Configuration; }
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var Configuration = /*#__PURE__*/function () {
  function Configuration() {
    _classCallCheck(this, Configuration);

    this.config = {};
  }

  _createClass(Configuration, [{
    key: "set",
    value: function set(key, value) {
      if (value === void 0) {
        value = null;
      }

      if (_typeof(key) === "object") {
        this.config = Object.assign({}, this.config, key);
      } else {
        this.config[key] = value;
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.config[key];
    }
  }]);

  return Configuration;
}();



/***/ }),

/***/ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js":
/*!******************************************************************!*\
  !*** ./node_modules/expose-loader/dist/runtime/getGlobalThis.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line func-names
module.exports = function () {
  if (typeof globalThis === "object") {
    return globalThis;
  }

  var g;

  try {
    // This works if eval is allowed (see CSP)
    // eslint-disable-next-line no-new-func
    g = this || new Function("return this")();
  } catch (e) {
    // This works if the window reference is available
    if (typeof window === "object") {
      return window;
    } // This works if the self reference is available


    if (typeof self === "object") {
      return self;
    } // This works if the global reference is available


    if (typeof __webpack_require__.g !== "undefined") {
      return __webpack_require__.g;
    }
  }

  return g;
}();

/***/ }),

/***/ "./vendor/bundle/ruby/2.7.0/gems/decidim-api-0.26.2/app/packs/entrypoints/decidim_api_graphiql.scss":
/*!**********************************************************************************************************!*\
  !*** ./vendor/bundle/ruby/2.7.0/gems/decidim-api-0.26.2/app/packs/entrypoints/decidim_api_graphiql.scss ***!
  \**********************************************************************************************************/
/***/ (function() {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\nError: Failed to find 'graphiql/graphiql.css'\n  in [\n    /code/pz/decidim-biel/vendor/bundle/ruby/2.7.0/gems/decidim-api-0.26.2/app/packs/entrypoints\n  ]\n    at /code/pz/decidim-biel/node_modules/postcss-import/lib/resolve-id.js:35:13\n    at processResult (/code/pz/decidim-biel/node_modules/webpack/lib/NormalModule.js:758:19)\n    at /code/pz/decidim-biel/node_modules/webpack/lib/NormalModule.js:860:5\n    at /code/pz/decidim-biel/node_modules/loader-runner/lib/LoaderRunner.js:400:11\n    at /code/pz/decidim-biel/node_modules/loader-runner/lib/LoaderRunner.js:252:18\n    at context.callback (/code/pz/decidim-biel/node_modules/loader-runner/lib/LoaderRunner.js:124:13)\n    at Object.loader (/code/pz/decidim-biel/node_modules/postcss-loader/dist/index.js:96:7)");

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"decidim_api_graphiql": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkapp"] = self["webpackChunkapp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_react-dom_index_js"], function() { return __webpack_require__("./vendor/bundle/ruby/2.7.0/gems/decidim-api-0.26.2/app/packs/entrypoints/decidim_api_graphiql.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=decidim_api_graphiql.js.map