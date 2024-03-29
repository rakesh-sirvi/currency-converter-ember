import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import countries from '../utils/countries';

import { API_ENDPOINT_FOR_LOCATION } from '../components/weather-component/utils/constants';

// import ENV from 'ember-app/config/environment';

const API_LOCATION_SUFFIX = `&format=json&apiKey=952e014758764d489f4ba6c954b063aa`;

export default class CountryService extends Service {
  @tracked selectedCountry = localStorage.getItem('country') || 'AR';

  @tracked countryData;

  get availableCountries() {
    return countries;
  }

  constructor() {
    super(...arguments);
    this._getCountryCoordinates();
  }

  @action
  changeCountry(country) {
    this.selectedCountry = country;
    localStorage.setItem('country', country);
    this._getCountryCoordinates();
  }

  async _getCountryCoordinates() {
    try {
      const queryResponse = await fetch(
        `${API_ENDPOINT_FOR_LOCATION}?text=${
          this.availableCountries[this.selectedCountry].countryName
        }${API_LOCATION_SUFFIX}`
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
