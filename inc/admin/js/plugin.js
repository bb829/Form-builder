// require('bundle.js')

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

function deleteInput(id) {
    jQuery('#' + id).closest('.form-control').remove();
}

jQuery(document).ready(function ($) {

    // Sets input value based on option type
    function setInputValue(name, option) {

        if (name && option) {

            if (name === 'value') {

                const value = $(option).val();
                const targetID = $(option).closest('.inputOptions').attr('data-edit-input');
                $("#" + targetID).val(value);

            }

            if (name === 'placeholder') {

                let value = $(option).val();
                let targetID = $(option).closest('.inputOptions').attr('data-edit-input');

                $("#" + targetID).attr('placeholder', value);

            }
            
            if (name === 'price') {

                const value = $(option).val();
                const targetID = $(option).closest('.inputOptions').attr('data-edit-input');
                $("#" + targetID).val(value);

            }

            if (name === 'label') {

                const value = $(option).val();
                const targetID = $(option).closest('.inputOptions').attr('data-edit-input');
                $("#" + targetID).siblings('label').html(value);

            }
        
        }
        
    }

    // Opens options for input
    $(document).on('click', 'input[name="myplugin_input"]', function () {
                
        // Gets input ID and options ID
        var inputID = $(this).attr('id');
        var optionsID = $('.inputOptions').attr('data-edit-input');


        // Declares options variable to be later used to set options based on input type
        let options;

        // Sets options based on input type

        // Price input options
        if ($(this).is('[input-price]')) {

            options = [
                {
                    name: 'placeholder',
                    value: function() {
                        let input = document.createElement('input');
                        input.className = 'inputPlaceholderOption inputOption w-100';
                        input.type = 'text';
                        input.name = 'inputPlaceholderOption';
                        input.placeholder = 'Input placeholder';
                        return input;
                    }
                },
                {
                    name: 'label',
                    value: function() {
                        let input = document.createElement('input');
                        input.className = 'labelOption inputOption w-100';
                        input.type = 'text';
                        input.name = 'labelOption';
                        input.placeholder = 'Input label';
                        return input;
                    }
                },
                {
                    name: 'price',
                    value: function() {
                        let input = document.createElement('input');
                        input.className = 'inputPriceAmount inputOption w-100';
                        input.type = 'number';
                        input.name = 'inputPriceAmount';
                        input.placeholder = 'Price amount';
                        return input;
                    }
                },
                {
                    name: 'deleteInput',
                    value: function() {
                        let button = document.createElement('button');
                        button.className = 'deleteInput inputOption w-100';
                        button.innerHTML = 'Delete input';
                        button.addEventListener('click', function() {
                            deleteInput(inputID);
                        });
                        return button;
                    }
                }
            ];

            if ($(this).prop('placeholder').length > 0) {
                $('.inputPlaceholderOption').val($(this).prop('placeholder'));
            }

            if ($(this).prop('placeholder').length == 0) {
                $('.inputPlaceholderOption').val('');
            }

            if ($(this).val().length > 0) {
                $('.inputPriceAmount').val($(this).val());
            }

            if ($(this).val().length == 0) {
                $('.inputPriceAmount').val('');
            }

        }

        // E-mail input options
        if ($(this).is('[input-email]')) {

            options =
                [
                    {
                        name: 'placeholder',
                        value: function() {
                            let input = document.createElement('input');
                            input.className = 'inputPlaceholderOption inputOption w-100';
                            input.type = 'text';
                            input.name = 'inputPlaceholderOption';
                            input.placeholder = 'Input placeholder';
                            return input;
                        }
                    },
                    {
                        name: 'value',
                        value: function() {
                            let input = document.createElement('input');
                            input.className = 'inputValue inputOption w-100';
                            input.type = 'text';
                            input.name = 'inputValue';
                            input.placeholder = 'Default value';
                            return input;
                        }
                    },
                    {
                        name: 'label',
                        value: function() {
                            let input = document.createElement('input');
                            input.className = 'labelOption inputOption w-100';
                            input.type = 'text';
                            input.name = 'labelOption';
                            input.placeholder = 'Input label';
                            return input;
                        }
                    },
                    {
                        name: 'deleteInput',
                        value: function() {
                            let button = document.createElement('button');
                            button.className = 'deleteInput inputOption w-100';
                            button.innerHTML = 'Delete input';
                            button.addEventListener('click', function() {
                                deleteInput(inputID);
                            });
                            return button;
                        }
                    }

                ];

            if ($(this).prop('placeholder').length > 0) {
                $('.inputPlaceholderOption').val($(this).prop('placeholder'));
            }

            if ($(this).prop('placeholder').length == 0) {
                $('.inputPlaceholderOption').val('');
            }

        }


        // Text input options
        if ($(this).is('[input-text]')) {

            options =
                [
                    {
                        name: 'placeholder',
                        value: function() {
                            let input = document.createElement('input');
                            input.className = 'inputPlaceholderOption inputOption w-100';
                            input.type = 'text';
                            input.name = 'inputPlaceholderOption';
                            input.placeholder = 'Input placeholder';
                            return input;
                        }
                    },
                    {
                        name: 'value',
                        value: function() {
                            let input = document.createElement('input');
                            input.className = 'inputValue inputOption w-100';
                            input.type = 'text';
                            input.name = 'inputValue';
                            input.placeholder = 'Default value';
                            return input;
                        }
                    },
                    {
                        name: 'label',
                        value: function() {
                            let input = document.createElement('input');
                            input.className = 'labelOption inputOption w-100';
                            input.type = 'text';
                            input.name = 'labelOption';
                            input.placeholder = 'Input label';
                            return input;
                        }
                    },
                    {
                        name: 'deleteInput',
                        value: function() {
                            let button = document.createElement('button');
                            button.className = 'deleteInput inputOption w-100';
                            button.innerHTML = 'Delete input';
                            button.addEventListener('click', function() {
                                deleteInput(inputID);
                            });
                            return button;
                        }
                    }

                ];

            if ($(this).prop('placeholder').length > 0) {
                $('.inputPlaceholderOption').val($(this).prop('placeholder'));
            }

            if ($(this).prop('placeholder').length == 0) {
                $('.inputPlaceholderOption').val('');
            }

        }

        if ($(this).is('[input-phone]')) {

            options =
                [
                    {
                        name: 'placeholder',
                        value: function() {
                            let input = document.createElement('input');
                            input.className = 'inputPlaceholderOption inputOption w-100';
                            input.type = 'text';
                            input.name = 'inputPlaceholderOption';
                            input.placeholder = 'Input placeholder';
                            return input;
                        }
                    },
                    {
                        name: 'value',
                        value: function() {
                            let input = document.createElement('input');
                            input.className = 'inputValue inputOption w-100';
                            input.type = 'tel';
                            input.name = 'inputValue';
                            input.placeholder = 'Default value';
                            return input;
                        }
                    },
                    {
                        name: 'label',
                        value: function() {
                            let input = document.createElement('input');
                            input.className = 'labelOption inputOption w-100';
                            input.type = 'text';
                            input.name = 'labelOption';
                            input.placeholder = 'Input label';
                            return input;
                        }
                    },
                    {
                        name: 'deleteInput',
                        value: function() {
                            let button = document.createElement('button');
                            button.className = 'deleteInput inputOption w-100';
                            button.innerHTML = 'Delete input';
                            button.addEventListener('click', function() {
                                deleteInput(inputID);
                            });
                            return button;
                        }
                    }

                ];

            if ($(this).prop('placeholder').length > 0) {
                $('.inputPlaceholderOption').val($(this).prop('placeholder'));
            }

            if ($(this).prop('placeholder').length == 0) {
                $('.inputPlaceholderOption').val('');
            }

        }


        // Gets parent .inputOptions of clicked input
        let parentElement = $(this).parents('.formData').siblings('.inputElements').find('.inputOptions');

        // Checks if inputID is not equal to optionsID and sets new optionsID from inputID if not
        if (inputID != optionsID) {
            $(this).parents('.formData').siblings('.inputElements').find('.inputOptions').attr('data-edit-input', inputID);
            $(parentElement).html('');
        }

        // Removes d-none class from inputOptions and adds d-flex class if inputOptions has d-none class
        if ($(inputOptions).hasClass('d-none')) {
            $(this).parents('.formData').siblings('.inputElements').find('.inputOptions').removeClass('d-none');
            $(this).parents('.formData').siblings('.inputElements').find('.inputOptions').addClass('d-flex');
        }

        // Loops through options and appends them to the .inputOptions parent of this clicked input
        options.forEach(option => {
            let element = option.value();

            $(document).on('input', '.inputOption', function() {
                setInputValue(option.name, element);
            });

            if (inputID != optionsID) {
                $(parentElement).prepend(element);
            }
        });

    });

    // Resets the input options fields and hides it
    $(document).on('click', '.inputSaveOptions', function () {
        $('.inputOptions').addClass('d-none');
        $('.inputOptions').removeClass('d-flex');
    });


    // Adds available inputs to form
    $(document).on('click', '.addInput', function () {
        let randomNumber = Math.floor(1000 + Math.random() * 9000);
        const inputText = '<div class="form-control d-flex flex-column"><label for="input-' + randomNumber + '">Input text</label><input input-text id="input-' + randomNumber + '" type="text" name="myplugin_input" value="" /></div>';
        const inputPrice = '<div class="form-control d-flex flex-column"><label for="input-' + randomNumber + '">Price amount</label><input input-price id="input-' + randomNumber + '" type="number" name="myplugin_input" value="" /></div>';
        const inputEmail = '<div class="form-control d-flex flex-column"><label for="input-' + randomNumber + '">E-mail</label><input input-email id="input-' + randomNumber + '" type="email" name="myplugin_input" value="" /></div>';
        const inputPhone = '<div class="form-control d-flex flex-column"><label for="input-' + randomNumber + '">Phone</label><input input-phone id="input-' + randomNumber + '" type="tel" name="myplugin_input" value="" /></div>';
        const inputPassword = '<input type="password" name="myplugin_password" value="" />';
        const textarea = '<textarea name="myplugin_textarea"></textarea>';

        if ($(this).attr('data-type') === 'text') {
            $(this).parents('.inputElements').siblings('.formData').append(inputText);
        }
        if ($(this).attr('data-type') === 'price') {
            $(this).parents('.inputElements').siblings('.formData').append(inputPrice);
        }
        if ($(this).attr('data-type') === 'email') {
            $(this).parents('.inputElements').siblings('.formData').append(inputEmail);
        }

        if ($(this).attr('data-type') === 'phone') {
            $(this).parents('.inputElements').siblings('.formData').append(inputPhone);
        }
    });

    // Saves new form and refreshes form list
    $(document).on('click', '.saveForm', function () {

        var data = {
            'action': 'myplugin_save_data',
            'formTitle': $('.formTitle').val(),
            'formData': $(newFormData).html()
        };

        $.post(ajaxurl, data, function (response) {
            formNewWrapper.classList.add('d-none');
            refreshForm();
            listWrapper.classList.remove('d-none');
        });
    });


    // Retrieves and outputs form to be edited
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

    // Saves edited form and refreshes form list
    $(document).on('click', '.saveEditForm', function () {

        const formID = $(this).parents('.formEditWrapper').attr('id');

        var data = {
            'action': 'myplugin_save_form',
            'formID': formID,
            'formTitle': $('.editFormTitle').val(),
            'formData': $('.editFormData').html()
        };

        $.post(ajaxurl, data, function (response) {
            $('.formEditWrapper').remove();
            refreshForm();
            $(listWrapper).removeClass('d-none');
        });
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.inputOptions').length && !$(event.target).closest('.formData input').length) {
            $('.inputOptions').removeClass('d-flex');
            $('.inputOptions').addClass('d-none');
        }
    });
    
    $(document).on('click', '.cancel', function () {
        $(".formWrapper").addClass("d-none");
        $('.formWrapper input').val('').attr('placeholder', '');
        $('.formData').html('');
        $(listWrapper).removeClass('d-none');
    });
});