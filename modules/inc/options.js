const options = [
    {
        name: 'placeholder',
        value: function () {
            let input = document.createElement('input');
            input.className = 'inputPlaceholderOption inputOption w-100';
            input.type = 'text';
            input.name = 'inputPlaceholder';
            input.placeholder = 'Input placeholder';
            return input;
        }
    },
    {
        name: 'label',
        value: function () {
            let input = document.createElement('input');
            input.className = 'labelOption inputOption w-100';
            input.type = 'text';
            input.name = 'inputLabel';
            input.placeholder = 'Input label';
            return input;
        }
    },
    {
        name: 'value',
        value: function () {
            let input = document.createElement('input');
            input.className = 'inputValue inputOption w-100';
            input.type = 'text';
            input.name = 'inputValue';
            input.placeholder = 'Default value';
            return input;
        }
    },
    {
        name: 'price',
        value: function () {
            let input = document.createElement('input');
            input.className = 'inputPriceAmount inputOption w-100';
            input.type = 'number';
            input.name = 'inputPrice';
            input.placeholder = 'Price amount';
            return input;
        }
    },
    {
        name: 'deleteInput',
        value: function () {
            let button = document.createElement('button');
            button.className = 'deleteInput inputOption w-100';
            button.innerHTML = 'Delete input';
            button.addEventListener('click', deleteInput);
            return button;
        }
    }
];

const setInputValue = (option) => {

    if (option) {

        if (option.name === 'inputValue') {

            const value = jQuery(option).val();
            
            const targetID = jQuery(option).closest('.inputOptions').attr('data-edit-input');
            jQuery("#" + targetID).attr("value", value);

        }

        if (option.name === 'inputPlaceholder') {

            let value = jQuery(option).val();
            let targetID = jQuery(option).closest('.inputOptions').attr('data-edit-input');

            jQuery("#" + targetID).attr('placeholder', value);

        }

        if (option.name === 'inputPrice') {

            const value = jQuery(option).val();
            const targetID = jQuery(option).closest('.inputOptions').attr('data-edit-input');
            jQuery("#" + targetID).attr("value", value);
        }

        if (option.name === 'inputLabel') {

            const value = jQuery(option).val();
            const targetID = jQuery(option).closest('.inputOptions').attr('data-edit-input');
            jQuery("#" + targetID).siblings('label').html(value);

        }

    }

}

const createInput = (parentElement, name)  => {
    const option = options.find(option => option.name === name);
    jQuery(parentElement).prepend(option.value);
}

const deleteInput = (event) => {
    const id = jQuery(event.target).closest('.inputOptions').attr('data-edit-input');
    jQuery('#' + id).closest('.form-control').remove();
}

export const optionsViewModel = {
    options,
    createInput,
    deleteInput,
    setInputValue
};