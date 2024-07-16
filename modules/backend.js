import { variables } from './inc/variables.js';
import { optionsViewModel } from './inc/options.js';
import { inputsViewModel } from './inc/inputs.js';

if (variables.createForm) {
    variables.createForm.addEventListener('click', function () {
        variables.listWrapper.classList.add('d-none');
        variables.formNewWrapper.classList.remove('d-none');
        variables.formNewWrapper.classList.add('d-flex');
    });
}

const refreshForm = () => {
    var data = {
        'action': 'forms_refresh_forms'
    };

    jQuery.post(ajaxurl, data, function (response) {
        jQuery(".formList").html(response);
    });
}

const editFormOptions = (ID) => {
    data = {
        'action': 'edit_form_options',
        'formID': ID
    }

    $.post(ajaxurl, data, function (response) {
        console.log(response);
    });
}

const showFormEntries = (element) => {
    const id = jQuery(element).val();
    const data = {
        'action': 'forms_form_entries',
        'formID': id
    };

    jQuery.post(ajaxurl, data, function (response) {
        let parsedResponse = response;
        if (parsedResponse && typeof parsedResponse === 'object') {
            let parentDiv = document.querySelector('.formEntries');
            let html = '';
            Object.entries(parsedResponse).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        html += '<div class="tertiaryBG p-2 m-2 rounded d-flex flex-column">';
                        if (subKey === 'entry_data') {
                            try {
                                subValue = JSON.parse(subValue);
                            } catch (e) {
                                console.error('Error parsing JSON:', e);
                            }
                            if (typeof subValue === 'object' && subValue !== null) {
                                Object.entries(subValue).forEach(([k, v]) => {
                                    html += `<strong>${k}:</strong> <span>${v}</span>`;
                                });
                            } else {
                                html += `<strong>${subKey}:</strong> <span>${subValue}</span>`;
                            }
                        } else {
                            html += `<strong>${key}.${subKey}:</strong> <span>${subValue}</span>`;
                        }
                        html += '</div>';
                    });
                } else {
                    html += '<div>';
                    html += `<strong>${key}:</strong> <span>${value}</span>`;
                    html += '</div>';
                }
            });
            parentDiv.innerHTML = html;
        }
    });
}

const deleteForm = (id) => {

    var data = {
        'action': 'forms_delete_form',
        'formID': id
    };

    jQuery.post(ajaxurl, data, function (response) {
        refreshForm();
    });
}

const clearForm = () => {
    jQuery(".formWrapper").addClass("d-none");
    jQuery('.formWrapper input').val('').attr('placeholder', '');
    jQuery('.formData').html('');
    jQuery(variables.listWrapper).removeClass('d-none');
};

jQuery(document).ready(function ($) {

    // Adds available inputs to form
    $(document).on('click', '.addInput', function () {

        const formData = $(this).parents('.inputElements').siblings('.formData');

        if ($(this).attr('data-type') === 'text') {
            inputsViewModel.createInput(formData, 'text');
        }
        if ($(this).attr('data-type') === 'price') {
            if ($(this).parents('.inputElements').siblings('.formData').find('input[input-price]').length == 0) {
                inputsViewModel.createInput(formData, 'price');
            }
        }
        if ($(this).attr('data-type') === 'email') {
            inputsViewModel.createInput(formData, 'email');
        }

        if ($(this).attr('data-type') === 'phone') {
            inputsViewModel.createInput(formData, 'phone');
        }
    });

    // Opens options for input
    $(document).on('click', '.formData input', function () {

        // Gets .inputOptions closest to the clicked element
        const parentElement = $(this).parents('.formData').siblings('.inputElements').find('.inputOptions');

        // Gets input ID and options ID
        var inputID = $(this).attr('id');
        var optionsID = $(parentElement).attr('data-edit-input');

        // Checks if inputID is not equal to optionsID and sets new optionsID from inputID if not
        if (inputID != optionsID) {
            $(parentElement).attr('data-edit-input', inputID);
            $(parentElement).html('');
        }

        // Price input options
        if ($(this).is('[input-price]')) {

            if (inputID != optionsID) {

                optionsViewModel.createInput(parentElement, 'placeholder');
                optionsViewModel.createInput(parentElement, 'label');
                optionsViewModel.createInput(parentElement, 'price');
                optionsViewModel.createInput(parentElement, 'deleteInput');

            }

        }

        // E-mail input options
        if ($(this).is('[input-email]')) {

            if (inputID != optionsID) {

                optionsViewModel.createInput(parentElement, 'placeholder');
                optionsViewModel.createInput(parentElement, 'label');
                optionsViewModel.createInput(parentElement, 'value');
                optionsViewModel.createInput(parentElement, 'deleteInput');

            }

        }

        // Text input options
        if ($(this).is('[input-text]')) {

            if (inputID != optionsID) {

                optionsViewModel.createInput(parentElement, 'placeholder');
                optionsViewModel.createInput(parentElement, 'label');
                optionsViewModel.createInput(parentElement, 'value');
                optionsViewModel.createInput(parentElement, 'deleteInput');

            }

        }

        // Phone input options
        if ($(this).is('[input-phone]')) {

            if (inputID != optionsID) {

                optionsViewModel.createInput(parentElement, 'placeholder');
                optionsViewModel.createInput(parentElement, 'label');
                optionsViewModel.createInput(parentElement, 'value');
                optionsViewModel.createInput(parentElement, 'deleteInput');

            }

        }

        // Removes d-none class from inputOptions and adds d-flex class if inputOptions has d-none class
        if ($(variables.inputOptions).hasClass('d-none')) {
            $(this).parents('.formData').siblings('.inputElements').find('.inputOptions').removeClass('d-none');
            $(this).parents('.formData').siblings('.inputElements').find('.inputOptions').addClass('d-flex');
        }

        // Sets options values to input values
        optionsViewModel.options.forEach(option => {
            jQuery(document).on('input', '.inputOption', function () {
                optionsViewModel.setInputValue(this)
            });
        });

    });

    // Saves new form and refreshes form list
    $(document).on('click', '.saveFormButton', function () {
        let formID;
        let price;

        const inputPrice = $(this).closest('div').prev('div').find('input[input-price]');
        const hasPrice = inputPrice.length;

        if ($(this).parents('.formEditWrapper').length > 0) {
            formID = $(this).parents('.formEditWrapper').attr('id');
        }

        if (hasPrice > 0) {
            price = $(inputPrice).attr('value');
        }

        var data = {
            'action': 'forms_save_data',
            'formID': formID,
            'formTitle': $(this).parents('.formButtonWrapper').siblings('.formTitle').find('.formTitleInput').val(),
            'formData': $(this).parents('.formButtonWrapper').siblings('.formContainer').find('.formData').html(),
            'formPrice': price
        };

        $.post(ajaxurl, data, function (response) {
            refreshForm();
            $('.formWrapper').addClass('d-none');
            $('.listWrapper').removeClass('d-none');
        });
    });

    // Retrieves and outputs form to be edited
    $(document).on('click', '.editFormButton', function () {
        variables.listWrapper.classList.add('d-none');

        const formID = $(this).parents('.formItem').attr('id');

        var data = {
            'action': 'forms_edit_form',
            'formID': formID
        };

        $.post(ajaxurl, data, function (response) {
            variables.bosWrapper.insertAdjacentHTML('beforeend', response);
        });
    });

    // Closes input options on document click
    $(document).click(function (event) {
        if (!$(event.target).closest('.inputOptions').length && !$(event.target).closest('.formData input').length) {
            $('.inputOptions').removeClass('d-flex');
            $('.inputOptions').addClass('d-none');
        }
    });

});

window.showFormEntries = showFormEntries
window.editFormOptions = editFormOptions
window.clearForm = clearForm
window.deleteForm = deleteForm