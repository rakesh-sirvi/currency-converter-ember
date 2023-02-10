import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WeatherCacheService extends Service {
  @tracked availableCountries =
    JSON.parse(localStorage.getItem('countryWeatherInfo')) ?? {};

  @action
  addCountryInfo(countryName, info) {
    if (countryName && info) {
      this.availableCountries[countryName] = {
        ...info,
        lastFetched: new Date().getTime(),
      };
      localStorage.setItem(
        'countryWeatherInfo',
        JSON.stringify(this.availableCountries)
      );
    }
  }
}
