import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { API_ENDPOINT_FOR_LOCATION } from '../components/weather-component/utils/constants';

import ENV from 'ember-app/config/environment';

const API_LOCATION_SUFFIX = `&format=json&apiKey=${ENV.GEOAPIFY_API_KEY}`;

export default class CountryService extends Service {
  @tracked selectedCountry = 'Argentina';

  @tracked countryData;

  @action
  changeCountry(country) {
    this.selectedCountry = country;
  }

  async _getCountryCoordinates() {
    try {
      const queryResponse = await fetch(
        `${API_ENDPOINT_FOR_LOCATION}?text=${this.selectedCountry}${API_LOCATION_SUFFIX}`
      );
      const data = await queryResponse.json();
      this.countryData = {
        latitude: data.results[0].lat,
        longitude: data.results[0].lon,
        timeZone: data.results[0].timezone.name,
      };
    } catch (error) {
      console.log(
        'Error occured during fetching location info: ',
        error.message
      );
    }
  }
}
