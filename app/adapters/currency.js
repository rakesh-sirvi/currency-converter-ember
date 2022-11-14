import RESTAdapter from '@ember-data/adapter/rest';

export default class CurrencyAdapter extends RESTAdapter {
  host = 'https://api.exchangerate.host';

  buildURL() {
    return `${this.host}/latest?base=USD`;
  }
}
