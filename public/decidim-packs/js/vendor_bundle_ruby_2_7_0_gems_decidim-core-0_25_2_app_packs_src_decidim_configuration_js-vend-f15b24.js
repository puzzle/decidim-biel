"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["vendor_bundle_ruby_2_7_0_gems_decidim-core-0_25_2_app_packs_src_decidim_configuration_js-vend-f15b24"],{

/***/ "./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.25.2/app/packs/src/decidim/configuration.js":
/*!**************************************************************************************************!*\
  !*** ./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.25.2/app/packs/src/decidim/configuration.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.25.2/app/packs/src/decidim/confirm.js":
/*!********************************************************************************************!*\
  !*** ./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.25.2/app/packs/src/decidim/confirm.js ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rails_ujs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rails/ujs */ "./node_modules/@rails/ujs/lib/assets/compiled/rails-ujs-exposed.js");
/* harmony import */ var _rails_ujs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rails_ujs__WEBPACK_IMPORTED_MODULE_0__);
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
/**
 * A custom confirm dialog for Decidim based on Foundation reveals.
 *
 * Note that this needs to be loaded before the application JS in order for
 * it to gain control over the confirm events BEFORE rails-ujs is loaded.
 */



var TEMPLATE_HTML = null;

var ConfirmDialog = /*#__PURE__*/function () {
  function ConfirmDialog(sourceElement) {
    _classCallCheck(this, ConfirmDialog);

    this.$modal = $(TEMPLATE_HTML);
    this.$source = sourceElement;
    this.$content = $(".confirm-modal-content", this.$modal);
    this.$buttonConfirm = $("[data-confirm-ok]", this.$modal);
    this.$buttonCancel = $("[data-confirm-cancel]", this.$modal); // Avoid duplicate IDs and append the new modal to the body

    var titleId = "confirm-modal-title-" + Math.random().toString(36).substring(7);
    this.$modal.removeAttr("id");
    $("#confirm-modal-title", this.$modal).attr("id", titleId);
    this.$modal.attr("aria-labelledby", titleId);
    $("body").append(this.$modal);
    this.$modal.foundation();
  }

  _createClass(ConfirmDialog, [{
    key: "confirm",
    value: function confirm(message) {
      var _this = this;

      this.$content.html(message);
      this.$buttonConfirm.off("click");
      this.$buttonCancel.off("click");
      return new Promise(function (resolve) {
        _this.$buttonConfirm.on("click", function (ev) {
          ev.preventDefault();

          _this.$modal.foundation("close");

          resolve(true);

          _this.$source.focus();
        });

        _this.$buttonCancel.on("click", function (ev) {
          ev.preventDefault();

          _this.$modal.foundation("close");

          resolve(false);

          _this.$source.focus();
        });

        _this.$modal.foundation("open").on("closed.zf.reveal", function () {
          _this.$modal.remove();
        });
      });
    }
  }]);

  return ConfirmDialog;
}(); // Override the default confirm dialog by Rails
// See:
// https://github.com/rails/rails/blob/fba1064153d8e2f4654df7762a7d3664b93e9fc8/actionview/app/assets/javascripts/rails-ujs/features/confirm.coffee
//
// There is apparently a better way coming in Rails 6:
// https://github.com/rails/rails/commit/e9aa7ecdee0aa7bb4dcfa5046881bde2f1fe21cc#diff-e1aaa45200e9adcbcb8baf1c5375b5d1
//
// The old approach is broken according to https://github.com/rails/rails/issues/36686#issuecomment-514213323
// so for the moment this needs to be executed **before** Rails.start()


var allowAction = function allowAction(ev, element) {
  var message = $(element).data("confirm");

  if (!message) {
    return true;
  }

  if (!_rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().fire(element, "confirm")) {
    return false;
  }

  if (TEMPLATE_HTML === null) {
    TEMPLATE_HTML = $("#confirm-modal")[0].outerHTML;
    $("#confirm-modal").remove();
  }

  var dialog = new ConfirmDialog($(element));
  dialog.confirm(message).then(function (answer) {
    var completed = _rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().fire(element, "confirm:complete", [answer]);

    if (answer && completed) {
      // Allow the event to propagate normally and re-dispatch it without
      // the confirm data attribute which the Rails internal method is
      // checking.
      $(element).data("confirm", null);
      $(element).removeAttr("data-confirm"); // The submit button click events won't do anything if they are
      // dispatched as is. In these cases, just submit the underlying form.

      if (ev.type === "click" && ($(element).is('button[type="submit"]') || $(element).is('input[type="submit"]'))) {
        $(element).parents("form").submit();
      } else {
        var origEv = ev.originalEvent || ev;
        var newEv = origEv;

        if (typeof Event === "function") {
          // Clone the event because otherwise some click events may not
          // work properly when re-dispatched.
          newEv = new origEv.constructor(origEv.type, origEv);
        }

        ev.target.dispatchEvent(newEv);
      }
    }
  });
  return false;
};

var handleConfirm = function handleConfirm(ev, element) {
  if (!allowAction(ev, element)) {
    _rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().stopEverything(ev);
  }
};

var getMatchingEventTarget = function getMatchingEventTarget(ev, selector) {
  var target = ev.target;

  while (!(!(target instanceof Element) || _rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().matches(target, selector))) {
    target = target.parentNode;
  }

  if (target instanceof Element) {
    return target;
  }

  return null;
};

var handleDocumentEvent = function handleDocumentEvent(ev, matchSelectors) {
  return matchSelectors.some(function (currentSelector) {
    var target = getMatchingEventTarget(ev, currentSelector);

    if (target === null) {
      return false;
    }

    handleConfirm(ev, target);
    return true;
  });
};

document.addEventListener("click", function (ev) {
  return handleDocumentEvent(ev, [(_rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().linkClickSelector), (_rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().buttonClickSelector), (_rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().formInputClickSelector)]);
});
document.addEventListener("change", function (ev) {
  return handleDocumentEvent(ev, [(_rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().inputChangeSelector)]);
});
document.addEventListener("submit", function (ev) {
  return handleDocumentEvent(ev, [(_rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().formSubmitSelector)]);
}); // This is needed for the confirm dialog to work with Foundation Abide.
// Abide registers its own submit click listeners since Foundation 5.6.x
// which will be handled before the document listeners above. This would
// break the custom confirm functionality when used with Foundation Abide.

document.addEventListener("DOMContentLoaded", function () {
  $((_rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().formInputClickSelector)).on("click.confirm", function (ev) {
    handleConfirm(ev, getMatchingEventTarget(ev, (_rails_ujs__WEBPACK_IMPORTED_MODULE_0___default().formInputClickSelector)));
  });
});

/***/ }),

/***/ "./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.25.2/app/packs/src/decidim/editor.js":
/*!*******************************************************************************************!*\
  !*** ./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.25.2/app/packs/src/decidim/editor.js ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createQuillEditor; }
/* harmony export */ });
/* harmony import */ var src_decidim_editor_linebreak_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/editor/linebreak_module */ "./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.25.2/app/packs/src/decidim/editor/linebreak_module.js");
/* eslint-disable require-jsdoc */

var quillFormats = ["bold", "italic", "link", "underline", "header", "list", "video", "image", "alt", "break"];
function createQuillEditor(container) {
  var toolbar = $(container).data("toolbar");
  var disabled = $(container).data("disabled");
  var quillToolbar = [["bold", "italic", "underline", "linebreak"], [{
    list: "ordered"
  }, {
    list: "bullet"
  }], ["link", "clean"]];

  if (toolbar === "full") {
    quillToolbar = [[{
      header: [1, 2, 3, 4, 5, 6, false]
    }]].concat(quillToolbar, [["video"]]);
  } else if (toolbar === "basic") {
    quillToolbar = [].concat(quillToolbar, [["video"]]);
  }

  var $input = $(container).siblings('input[type="hidden"]');
  container.innerHTML = $input.val() || "";
  var quill = new Quill(container, {
    modules: {
      linebreak: {},
      toolbar: {
        container: quillToolbar,
        handlers: {
          "linebreak": src_decidim_editor_linebreak_module__WEBPACK_IMPORTED_MODULE_0__["default"]
        }
      }
    },
    formats: quillFormats,
    theme: "snow"
  });

  if (disabled) {
    quill.disable();
  }

  quill.on("text-change", function () {
    var text = quill.getText(); // Triggers CustomEvent with the cursor position
    // It is required in input_mentions.js

    var event = new CustomEvent("quill-position", {
      detail: quill.getSelection()
    });
    container.dispatchEvent(event);

    if (text === "\n" || text === "\n\n") {
      $input.val("");
    } else {
      $input.val(quill.root.innerHTML);
    }
  }); // After editor is ready, linebreak_module deletes two extraneous new lines

  quill.emitter.emit("editor-ready");
  return quill;
}

/***/ }),

/***/ "./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.25.2/app/packs/src/decidim/input_tags.js":
/*!***********************************************************************************************!*\
  !*** ./vendor/bundle/ruby/2.7.0/gems/decidim-core-0.25.2/app/packs/src/decidim/input_tags.js ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_tagsinput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap-tagsinput */ "./node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.js");
/* harmony import */ var bootstrap_tagsinput__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_tagsinput__WEBPACK_IMPORTED_MODULE_0__);

$(function () {
  var $tagContainer = $(".js-tags-container"); // Initialize

  $tagContainer.tagsinput({
    tagClass: "input__tag",
    trimValue: true
  });
});

/***/ })

}]);
//# sourceMappingURL=vendor_bundle_ruby_2_7_0_gems_decidim-core-0_25_2_app_packs_src_decidim_configuration_js-vend-f15b24.js.map