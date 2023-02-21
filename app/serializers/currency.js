import RESTSerializer from '@ember-data/serializer/rest';
import currencySymbols from 'ember-app/utils/symbols';

/**
import { countries as countriesList } from 'ember-app/utils/countries';
const getCountryFlag = (currency) => {
  const country = countriesList.filter(
    ({ currencyCode }) => currencyCode === currency
  );
  if (country.length > 0) {
    const countryName = country[0]['countryName'].toLowerCase();
    const img = new Image();
    img.src = `https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/${countryName}.png`;

    if (img.complete) return img.src;
    else if (img.onload) return img.src;
    else if (img.onerror) return '';
  }
};
 */

export default class CurrencySerializer extends RESTSerializer {
  normalizeResponse(store, model, payload, ...rest) {
    const currencies = Object.keys(payload.rates).map((currency, idx) => ({
      id: idx + 1,
      code: currency,
      rate: payload.rates[currency],
      description: currencySymbols[currency],
      // img: getCountryFlag(currency),
    }));

    return super.normalizeResponse(store, model, { currencies }, ...rest);
  }
}
