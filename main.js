const axios = require('axios');

export const pay = (amount) => {
  
  const data = {
    amount: {
      currency: 'EUR',
      value: amount
    },
    description: 'My first API payment',
    method: 'ideal',
    redirectUrl: 'https://secretsofhealing.nl/',
    webhookUrl: 'https://secretsofhealing.nl/wp-json/myplugin/v1/payment-webhook',
  };

  axios.post('https://secretsofhealing.nl/wp-json/myplugin/v1/payment', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log(response.data);
      window.location.href = response.data._links.checkout.href;
    })
    .catch(error => {
      console.error(error);
    });

};
