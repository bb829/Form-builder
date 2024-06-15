// PLUGIN ELEMENTS
const bosWrapper = document.querySelector('.bosWrapper');
const listWrapper = document.querySelector('.formListWrapper');
const formNewWrapper = document.querySelector('.formNewWrapper');
const newFormData = document.querySelector('.newFormData');
const addText = document.querySelector('.addText');
const createForm = document.querySelector('.createForm');
const formTitle = document.querySelector('.formTitle');
const editFormButton = document.querySelector('.editForm');
const saveEditFormButton = document.querySelector('.saveEditForm');

const inputOptions = document.querySelector('.inputOptions');
const inputOptionsSaveBtn = document.querySelector('.saveInputOptions');
const inputPlaceHolderOption = document.querySelector('.inputPlaceholderOption');

// INPUT FIELDS


createForm.addEventListener('click', function () {
    listWrapper.classList.add('d-none');
    formNewWrapper.classList.remove('d-none');
    formNewWrapper.classList.add('d-flex');
});

function refreshForm() {
    var data = {
        'action': 'myplugin_refresh_forms'
    };

    jQuery.post(ajaxurl, data, function (response) {
        jQuery(".formList").html(response);
    });
}

function deleteForm(id) {

    var data = {
        'action': 'myplugin_delete_form',
        'formID': id
    };

    jQuery.post(ajaxurl, data, function (response) {
        refreshForm();
    });
}

jQuery(document).ready(function ($) {

    $(document).on('click', 'input[name="myplugin_input"]', function () {
    
        var inputID = $(this).attr('id');

        if(inputID != $(inputOptions).attr('data-edit-input')) {
            $(this).parents('.formData').siblings('.inputElements').find('.inputOptions').attr('data-edit-input', inputID).attr('data-placeholder', '');
        }

        if($(this).prop('placeholder').length > 0) {
            $('.inputOption').val($(this).prop('placeholder'));
        }

        if($(this).prop('placeholder').length == 0) {
            $('.inputOption').val('');
        }

        if($(inputOptions).hasClass('d-none')) {
            $(this).parents('.formData').siblings('.inputElements').find('.inputOptions').removeClass('d-none');
            $(this).parents('.formData').siblings('.inputElements').find('.inputOptions').addClass('d-flex');

            return;
        }

    });

    $(document).on('input', '.inputOption', function () {

        placeholder = $(this).val();
        targetID = $(this).closest('.inputOptions').attr('data-edit-input');

        $("#" + targetID).attr('placeholder', placeholder);
    });

    $(inputOptionsSaveBtn).on('click', function () {
        $(inputOptions).attr('data-placeholder', '');
        $(inputOptions).addClass('d-none');
        $(inputOptions).removeClass('d-flex');
    });

    $(document).on('click', '.addInput', function () {
        let randomNumber = Math.floor(1000 + Math.random() * 9000);
        const inputText = '<input id="input-' + randomNumber + '"type="text" name="myplugin_input" value="" />';
        const inputEmail = '<input type="email" name="myplugin_email" value="" />';
        const inputPassword = '<input type="password" name="myplugin_password" value="" />';
        const textarea = '<textarea name="myplugin_textarea"></textarea>';

        if ($(this).parents('.inputElements').siblings('.newFormData')) {
            if($(this).attr('data-type') === 'text') {
                $(this).parents('.inputElements').siblings('.newFormData').append(inputText);
            }
        }
        if ($(this).parents('.inputElements').siblings('.editFormData')) {
            if($(this).attr('data-type') === 'text') {
                $(this).parents('.inputElements').siblings('.editFormData').append(inputText);
            }
        }
    });

    $(document).on('click', '.saveForm', function () {

        var data = {
            'action': 'myplugin_save_data',
            'formTitle': $('.formTitle').val(),
            'formData': $(newFormData).html()
        };

        $.post(ajaxurl, data, function (response) {
            listWrapper.classList.remove('d-none');
            formNewWrapper.classList.add('d-none');

            refreshForm();
        });
    });

    $(document).on('click', '.editForm', function () {
        listWrapper.classList.add('d-none');

        const formID = $(this).parents('.formItem').attr('id');

        var data = {
            'action': 'myplugin_edit_form',
            'formID': formID
        };

        $.post(ajaxurl, data, function (response) {
            bosWrapper.insertAdjacentHTML('beforeend', response);
        });
    });

    $(document).on('click', '.saveEditForm', function () {

        const formID = $(this).parents('.formEditWrapper').attr('id');

        var data = {
            'action': 'myplugin_save_form',
            'formID': formID,
            'formTitle': $('.editFormTitle').val(),
            'formData': $('.editFormData').html()
        };

        $.post(ajaxurl, data, function (response) {
            refreshForm();
            $(listWrapper).removeClass('d-none');
            $('.formEditWrapper').remove();
        });
    });

});