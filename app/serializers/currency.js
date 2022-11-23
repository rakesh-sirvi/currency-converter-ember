import RESTSerializer from '@ember-data/serializer/rest';
import currencySymbols from 'ember-app/utils/symbols';

export default class CurrencySerializer extends RESTSerializer {
  normalizeResponse(store, model, payload, ...rest) {
    const currencies = Object.keys(payload.rates).map((currency, idx) => ({
      id: idx + 1,
      code: currency,
      rate: payload.rates[currency],
      description: currencySymbols[currency],
      img: `https://raw.githubusercontent.com/transferwise/currency-flags/master/src/rectangular-flags/${currency.toLowerCase()}.png`,
    }));

    return super.normalizeResponse(store, model, { currencies }, ...rest);
  }
}
