import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

import {
  celciusToFarenheit,
  farenheihtToCelcius,
  _getAvgRelativeHumidity,
  _getSunrise,
  _getSunSet,
  _getWeatherFromCode,
  _getWindDirection,
} from './utils/utility';
import { INDIA_COORDINATES } from './utils/constants';

const API_ENDPOINT_FOR_WEATHER = 'https://api.open-meteo.com/v1/forecast';

export default class WeatherComponent extends Component {
  @service country;

  @service weatherCache;

  @tracked selectedCountry = 'India';

  @tracked weatherInfo;

  @tracked locationError;

  @tracked weatherError;

  @tracked couldNotFindData = false;

  @tracked tempUnit = 'C';

  get isLoading() {
    return !this.weatherInfo;
  }

  get countryData() {
    if (this.selectedCountry === 'India') return INDIA_COORDINATES;
    return this.country.countryData;
  }

  get globalCountry() {
    return this.country.availableCountries[this.country.selectedCountry]
      .countryName;
  }

  constructor() {
    super(...arguments);

    this._getWeatherInfo(this.selectedCountry);

    // If we don't get response in 10s, some error occured
    setTimeout(() => {
      if (this.isLoading) this.couldNotFindData = true;
    }, 10000);
  }

  @action
  async _getWeatherInfo(cname) {
    if (typeof cname !== 'string') cname = this.globalCountry;
    try {
      let data;

      const lastFetched =
        this.weatherCache.availableCountries[cname]?.lastFetched ?? 0;
      const currentTime = new Date().getTime();

      if (Math.abs(currentTime - lastFetched) <= 30 * 60 * 100) {
        data = this.weatherCache.availableCountries[cname];
      } else {
        const queryResponse = await fetch(
          `${API_ENDPOINT_FOR_WEATHER}?latitude=${
            this.countryData?.latitude
          }&longitude=${
            this.countryData?.longitude
          }&current_weather=true&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min&hourly=relativehumidity_2m,precipitation&timezone=${this.countryData?.timeZone.replace(
            '/',
            '%2F'
          )}`
        );
        data = await queryResponse.json();
      }

      this.weatherCache.addCountryInfo(cname, data);

      const { current_weather, daily, hourly } = data;

      this.weatherInfo = {
        temp: current_weather.temperature,
        windspeed: `${current_weather.windspeed} km/h`,
        weather: _getWeatherFromCode(current_weather.weathercode),
        windDirectionAngle: htmlSafe(current_weather.winddirection),
        windDirection: _getWindDirection(current_weather.winddirection),
        sunrise: `${_getSunrise(daily.sunrise)} a.m.`,
        sunset: `${_getSunSet(daily.sunset)} p.m.`,
        avg_relative_humidity: `${_getAvgRelativeHumidity(
          hourly.relativehumidity_2m
        )} %`,
        relativehumidity: hourly.relativehumidity_2m,
        temperatures: {
          time: daily.time,
          max: daily.temperature_2m_max,
          min: daily.temperature_2m_min,
        },
        precipitation: hourly.precipitation,
      };
    } catch (error) {
      this.weatherError = error.message;
      console.log(
        'Error occured during fetching weather info: ',
        this.weatherError
      );
      this.couldNotFindData = true;
    }
  }

  @action
  changeTempUnit() {
    if (this.tempUnit === 'C') {
      this.weatherInfo = {
        ...this.weatherInfo,
        temp: celciusToFarenheit(this.weatherInfo.temp),
      };
      this.tempUnit = 'F';
    } else {
      this.weatherInfo = {
        ...this.weatherInfo,
        temp: farenheihtToCelcius(this.weatherInfo.temp),
      };
      this.tempUnit = 'C';
    }
  }

  @action
  changeCountry(newCountry) {
    // To set loading true till new data is fetched
    this.weatherInfo = null;

    if (newCountry !== 'India') {
      this.selectedCountry = newCountry;
    } else {
      this.selectedCountry = 'India';
    }
    this._getWeatherInfo(this.selectedCountry);
  }
}
