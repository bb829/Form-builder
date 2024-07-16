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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   submitForm: () => (/* binding */ submitForm)\n/* harmony export */ });\nconst submitForm = (event, id) => {\n    event.preventDefault();\n\n    var form = jQuery(event.target).closest('form');\n    var formFields = jQuery(form).find('input, select, textarea');\n    var errors = [];\n\n    function validateEmail(email) {\n        var re = /^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n        return re.test(String(email).toLowerCase());\n    }\n\n    function validatePhone(phone) {\n        var re = /^06\\d{8}$/;\n        return re.test(phone);\n    }\n\n    function validateDate(date) {\n        var re = /^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-]\\d{4}$/;\n        return re.test(date);\n    }\n\n    jQuery(form).find('.form-control').removeClass('border-red');\n    jQuery(form).find('.form-errors').html('');\n    jQuery(form).find('.form-success').remove();\n    jQuery(form).find('.form-errors').remove();\n\n    formFields.each(function () {\n\n        if (jQuery(this).attr('required') && !jQuery(this).val()) {\n            console.error('Please fill in all required fields');\n            errors.push('Please fill in all required fields');\n            jQuery(this).closest('.form-control').addClass('border-red');\n            return;\n        }\n        if (jQuery(this).attr('type') === 'text' && jQuery(this).val() == '') {\n            console.error('Please enter a valid text');\n            errors.push('Please enter a valid text');\n            jQuery(this).closest('.form-control').addClass('border-red');\n            return;\n        }\n        if (jQuery(this).attr('type') === 'file' && jQuery(this).val() == '') {\n            console.error('Please upload a file');\n            errors.push('Please upload a file');\n            jQuery(this).closest('.form-control').addClass('border-red');\n            return;\n        }\n        if (jQuery(this).attr('type') === 'email' && !validateEmail(jQuery(this).val())) {\n            console.error('Please enter a valid email');\n            errors.push('Please enter a valid email');\n            jQuery(this).closest('.form-control').addClass('border-red');\n            return;\n        }\n        if (jQuery(this).attr('type') === 'tel' && !validatePhone(jQuery(this).val())) {\n            console.error('Please enter a valid phone number');\n            errors.push('Please enter a valid phone number');\n            jQuery(this).closest('.form-control').addClass('border-red');\n            return;\n        }\n        if (jQuery(this).attr('type') === 'number' && isNaN(+jQuery(this).val()) && jQuery(this).val() == '') {\n            console.error('Please enter a valid number');\n            errors.push('Please enter a valid number');\n            jQuery(this).closest('.form-control').addClass('border-red');\n            return;\n        }\n        if (jQuery(this).attr('type') === 'date' && !validateDate(jQuery(this).val())) {\n            console.error('Please enter a valid date');\n            errors.push('Please enter a valid date');\n            jQuery(this).closest('.form-control').addClass('border-red');\n            return;\n        }\n    });\n\n    if (errors.length > 0) {\n        if (jQuery(form).find('.form-errors').length == 0) {\n            jQuery(form).append('<div class=\"form-errors d-flex flex-wrap column-gap-3 row-gap-3\"></div>');\n        }\n\n        errors.forEach(error => {\n            if (jQuery(\".form-errors:contains('\" + error + \"')\").length == 0) {\n                jQuery('.form-errors').append('<span class=\"form-error px-2 py-1 rounded\">' + error + '</span>');\n            }\n        });\n    }\n\n    if (errors.length == 0) {\n        var formData = new FormData(form[0]);\n\n        formData.append('action', 'forms_send_form');\n        formData.append('formID', id);\n\n        jQuery.ajax({\n            url: ajaxurl,\n            type: 'POST',\n            data: formData,\n            processData: false,\n            contentType: false,\n            success: function (response) {\n                console.log(response);\n                if (response.redirectUrl) {\n                    window.location.href = response.redirectUrl;\n                } else if (response.error) {\n                    console.error(response.error);\n                } else {\n                    if (jQuery(form).find('.form-success').length == 0) {\n                        jQuery(form).append('<span class=\"form-success d-flex align-self-start px-2 py-1 rounded\">Form submitted!</span>');\n                    }\n                    if (typeof response === 'object' && !Array.isArray(response)) {\n                        for (var key in response) {\n                            if (response.hasOwnProperty(key)) {\n                                console.log('Key:', key, 'Value:', response[key]);\n                            }\n                        }\n                    } \n                }\n            }\n        });\n\n    }\n\n}\n\nwindow.submitForm = submitForm;\n\n//# sourceURL=webpack://Form-builder/./modules/frontend.js?");

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