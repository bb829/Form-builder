function submitForm(event, id) {

    event.preventDefault();

    var form = jQuery(event.target).closest('form');
    var price = jQuery(form).find('input[name="price"]');

    if(price.length) {
        pay(jQuery(price.val()));
    }

    if(!price.length) {
    var formData = new FormData(form[0]);
    formData.append('action', 'myplugin_send_form');
    formData.append('formID', id);

    jQuery.ajax({
        url: ajaxurl,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log('Got this from the server: ' + response);
        }
    });

    }

}