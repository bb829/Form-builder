const inputs = [
    {
        type: 'text',
        html: function () {
            let randomNumber = Math.floor(1000 + Math.random() * 9000);
            let div = document.createElement('div');
            div.className = 'form-control d-flex flex-column';
            let label = document.createElement('label');
            label.setAttribute('for', 'input-' + randomNumber);
            label.textContent = 'Input text';
            let input = document.createElement('input');
            input.id = 'input-' + randomNumber;
            input.type = 'text';
            input.name = 'name';
            input.setAttribute('input-text', '');
            div.appendChild(label);
            div.appendChild(input);
            return div.outerHTML;
        }
    },
    {
        type: 'price',
        html: function () {
            let randomNumber = Math.floor(1000 + Math.random() * 9000);
            let div = document.createElement('div');
            div.className = 'form-control d-flex flex-column';
            let label = document.createElement('label');
            label.setAttribute('for', 'input-' + randomNumber);
            label.textContent = 'Price amount';
            let input = document.createElement('input');
            input.id = 'input-' + randomNumber;
            input.type = 'number';
            input.name = 'price';
            input.setAttribute('input-price', ''); // Set custom attribute
            div.appendChild(label);
            div.appendChild(input);
            return div.outerHTML;
        }
    },
    {
        type: 'email',
        html: function () {
            let randomNumber = Math.floor(1000 + Math.random() * 9000);
            let div = document.createElement('div');
            div.className = 'form-control d-flex flex-column';
            let label = document.createElement('label');
            label.setAttribute('for', 'input-' + randomNumber);
            label.textContent = 'E-mail';
            let input = document.createElement('input');
            input.id = 'input-' + randomNumber;
            input.type = 'email';
            input.name = 'email';
            input.setAttribute('input-email', ''); // Set custom attribute
            div.appendChild(label);
            div.appendChild(input);
            return div.outerHTML;
        }
    },
    {
        type: 'phone',
        html: function () {
            let randomNumber = Math.floor(1000 + Math.random() * 9000);
            let div = document.createElement('div');
            div.className = 'form-control d-flex flex-column';
            let label = document.createElement('label');
            label.setAttribute('for', 'input-' + randomNumber);
            label.textContent = 'Phone';
            let input = document.createElement('input');
            input.id = 'input-' + randomNumber;
            input.type = 'tel';
            input.name = 'phone';
            input.setAttribute('input-phone', ''); // Set custom attribute
            div.appendChild(label);
            div.appendChild(input);
            return div.outerHTML;
        }
    },
    {
        type: 'password',
        html: function () {
            let input = document.createElement('input');
            input.type = 'password';
            input.name = 'myplugin_password';
            return input.outerHTML;
        }
    },
    {
        type: 'textarea',
        html: function () {
            let textarea = document.createElement('textarea');
            textarea.name = 'myplugin_textarea';
            return textarea.outerHTML;
        }
    }
];

const createInput = (parentElement, name) => {
    const input = inputs.find(input => input.type === name);
    jQuery(parentElement).append(input.html);
}

export const inputsViewModel = {
    inputs,
    createInput
};