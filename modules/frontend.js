export const submitForm = (event, id) => {
    event.preventDefault();

    var form = jQuery(event.target).closest('form');
    var formFields = jQuery(form).find('input, select, textarea');
    var errors = [];

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        var re = /^06\d{8}$/;
        return re.test(phone);
    }

    function validateDate(date) {
        var re = /^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-]\d{4}$/;
        return re.test(date);
    }

    jQuery(form).find('.form-control').removeClass('border-red');
    jQuery(form).find('.form-errors').html('');
    jQuery(form).find('.form-success').remove();
    jQuery(form).find('.form-errors').remove();

    formFields.each(function () {

        if (jQuery(this).attr('required') && !jQuery(this).val()) {
            console.error('Please fill in all required fields');
            errors.push('Please fill in all required fields');
            jQuery(this).closest('.form-control').addClass('border-red');
            return;
        }
        if (jQuery(this).attr('type') === 'text' && jQuery(this).val() == '') {
            console.error('Please enter a valid text');
            errors.push('Please enter a valid text');
            jQuery(this).closest('.form-control').addClass('border-red');
            return;
        }
        if (jQuery(this).attr('type') === 'file' && jQuery(this).val() == '') {
            console.error('Please upload a file');
            errors.push('Please upload a file');
            jQuery(this).closest('.form-control').addClass('border-red');
            return;
        }
        if (jQuery(this).attr('type') === 'email' && !validateEmail(jQuery(this).val())) {
            console.error('Please enter a valid email');
            errors.push('Please enter a valid email');
            jQuery(this).closest('.form-control').addClass('border-red');
            return;
        }
        if (jQuery(this).attr('type') === 'tel' && !validatePhone(jQuery(this).val())) {
            console.error('Please enter a valid phone number');
            errors.push('Please enter a valid phone number');
            jQuery(this).closest('.form-control').addClass('border-red');
            return;
        }
        if (jQuery(this).attr('type') === 'number' && isNaN(+jQuery(this).val()) && jQuery(this).val() == '') {
            console.error('Please enter a valid number');
            errors.push('Please enter a valid number');
            jQuery(this).closest('.form-control').addClass('border-red');
            return;
        }
        if (jQuery(this).attr('type') === 'date' && !validateDate(jQuery(this).val())) {
            console.error('Please enter a valid date');
            errors.push('Please enter a valid date');
            jQuery(this).closest('.form-control').addClass('border-red');
            return;
        }
    });

    if (errors.length > 0) {
        if (jQuery(form).find('.form-errors').length == 0) {
            jQuery(form).append('<div class="form-errors d-flex flex-wrap column-gap-3 row-gap-3"></div>');
        }

        errors.forEach(error => {
            if (jQuery(".form-errors:contains('" + error + "')").length == 0) {
                jQuery('.form-errors').append('<span class="form-error px-2 py-1 rounded">' + error + '</span>');
            }
        });
    }

    if (errors.length == 0) {
        var formData = new FormData(form[0]);

        formData.append('action', 'forms_send_form');
        formData.append('formID', id);

        jQuery.ajax({
            url: ajaxurl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
                if (response.redirectUrl) {
                    window.location.href = response.redirectUrl;
                } else if (response.error) {
                    console.error(response.error);
                } else {
                    if (jQuery(form).find('.form-success').length == 0) {
                        jQuery(form).append('<span class="form-success d-flex align-self-start px-2 py-1 rounded">Form submitted!</span>');
                    }
                    if (typeof response === 'object' && !Array.isArray(response)) {
                        for (var key in response) {
                            if (response.hasOwnProperty(key)) {
                                console.log('Key:', key, 'Value:', response[key]);
                            }
                        }
                    } 
                }
            }
        });

    }

}

window.submitForm = submitForm;