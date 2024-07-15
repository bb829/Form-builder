/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/frontend.js":
/*!*****************************!*\
  !*** ./modules/frontend.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   submitForm: () => (/* binding */ submitForm)\n/* harmony export */ });\nconst submitForm = (event, id) => {\r\n    event.preventDefault();\r\n\r\n    var form = jQuery(event.target).closest('form');\r\n    var formFields = jQuery(form).find('input, select, textarea');\r\n    var errors = [];\r\n\r\n    function validateEmail(email) {\r\n        var re = /^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\r\n        return re.test(String(email).toLowerCase());\r\n    }\r\n\r\n    function validatePhone(phone) {\r\n        var re = /^06\\d{8}$/;\r\n        return re.test(phone);\r\n    }\r\n\r\n    function validateDate(date) {\r\n        var re = /^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-]\\d{4}$/;\r\n        return re.test(date);\r\n    }\r\n\r\n    jQuery(form).find('.form-control').removeClass('border-red');\r\n    jQuery(form).find('.form-errors').html('');\r\n    jQuery(form).find('.form-success').remove();\r\n    jQuery(form).find('.form-errors').remove();\r\n\r\n    formFields.each(function () {\r\n\r\n        if (jQuery(this).attr('required') && !jQuery(this).val()) {\r\n            console.error('Please fill in all required fields');\r\n            errors.push('Please fill in all required fields');\r\n            jQuery(this).closest('.form-control').addClass('border-red');\r\n            return;\r\n        }\r\n        if (jQuery(this).attr('type') === 'text' && jQuery(this).val() == '') {\r\n            console.error('Please enter a valid text');\r\n            errors.push('Please enter a valid text');\r\n            jQuery(this).closest('.form-control').addClass('border-red');\r\n            return;\r\n        }\r\n        if (jQuery(this).attr('type') === 'file' && jQuery(this).val() == '') {\r\n            console.error('Please upload a file');\r\n            errors.push('Please upload a file');\r\n            jQuery(this).closest('.form-control').addClass('border-red');\r\n            return;\r\n        }\r\n        if (jQuery(this).attr('type') === 'email' && !validateEmail(jQuery(this).val())) {\r\n            console.error('Please enter a valid email');\r\n            errors.push('Please enter a valid email');\r\n            jQuery(this).closest('.form-control').addClass('border-red');\r\n            return;\r\n        }\r\n        if (jQuery(this).attr('type') === 'tel' && !validatePhone(jQuery(this).val())) {\r\n            console.error('Please enter a valid phone number');\r\n            errors.push('Please enter a valid phone number');\r\n            jQuery(this).closest('.form-control').addClass('border-red');\r\n            return;\r\n        }\r\n        if (jQuery(this).attr('type') === 'number' && isNaN(+jQuery(this).val()) && jQuery(this).val() == '') {\r\n            console.error('Please enter a valid number');\r\n            errors.push('Please enter a valid number');\r\n            jQuery(this).closest('.form-control').addClass('border-red');\r\n            return;\r\n        }\r\n        if (jQuery(this).attr('type') === 'date' && !validateDate(jQuery(this).val())) {\r\n            console.error('Please enter a valid date');\r\n            errors.push('Please enter a valid date');\r\n            jQuery(this).closest('.form-control').addClass('border-red');\r\n            return;\r\n        }\r\n    });\r\n\r\n    if (errors.length > 0) {\r\n        if (jQuery(form).find('.form-errors').length == 0) {\r\n            jQuery(form).append('<div class=\"form-errors d-flex flex-wrap column-gap-3 row-gap-3\"></div>');\r\n        }\r\n\r\n        errors.forEach(error => {\r\n            if (jQuery(\".form-errors:contains('\" + error + \"')\").length == 0) {\r\n                jQuery('.form-errors').append('<span class=\"form-error px-2 py-1 rounded\">' + error + '</span>');\r\n            }\r\n        });\r\n    }\r\n\r\n    if (errors.length == 0) {\r\n        var formData = new FormData(form[0]);\r\n\r\n        formData.append('action', 'forms_send_form');\r\n        formData.append('formID', id);\r\n\r\n        jQuery.ajax({\r\n            url: ajaxurl,\r\n            type: 'POST',\r\n            data: formData,\r\n            processData: false,\r\n            contentType: false,\r\n            success: function (response) {\r\n                console.log(response);\r\n                if (response.redirectUrl) {\r\n                    window.location.href = response.redirectUrl;\r\n                } else if (response.error) {\r\n                    console.error(response.error);\r\n                } else {\r\n                    if (jQuery(form).find('.form-success').length == 0) {\r\n                        jQuery(form).append('<span class=\"form-success d-flex align-self-start px-2 py-1 rounded\">Form submitted!</span>');\r\n                    }\r\n                    if (typeof response === 'object' && !Array.isArray(response)) {\r\n                        for (var key in response) {\r\n                            if (response.hasOwnProperty(key)) {\r\n                                console.log('Key:', key, 'Value:', response[key]);\r\n                            }\r\n                        }\r\n                    } \r\n                }\r\n            }\r\n        });\r\n\r\n    }\r\n\r\n}\r\n\r\nwindow.submitForm = submitForm;\n\n//# sourceURL=webpack://soh/./modules/frontend.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./modules/frontend.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;