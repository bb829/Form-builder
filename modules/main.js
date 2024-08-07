const axios = require('axios');

export const pay = (price) => {
  const formattedPrice = Number(price).toFixed(2);
  const data = {
    amount: {
      currency: 'EUR',
      value: formattedPrice
    },
    description: 'My first API payment',
    method: 'ideal',
    redirectUrl: 'https://companyurl.nl/',
    webhookUrl: 'https://companyurl/wp-json/forms/v1/payment-webhook',
  };

  axios.post('https://companyurl.nl/wp-json/forms/v1/payment', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.data && response.data._links && response.data._links.checkout) {
      console.log(response.data);
      window.location.href = response.data._links.checkout.href;
    } else {
      console.error('Invalid response', response);
    }
  })

};
