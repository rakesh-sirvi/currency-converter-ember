import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

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

  @tracked selectedCountry = this.country.selectedCountry;

  @tracked countryData = this.country.countryData;

  @tracked weatherInfo;

  @tracked locationError;

  @tracked weatherError;

  @tracked couldNotFindData = false;

  @tracked tempUnit = 'C';

  get isLoading() {
    return !this.weatherInfo;
  }

  constructor() {
    super(...arguments);

    this.country._getCountryCoordinates().then(() => {
      this.countryData = this.country.countryData;

      if (this.countryData) this._getWeatherInfo();
    });

    // If we don't get response in 10 s, some error occured
    setTimeout(() => {
      if (this.isLoading) this.couldNotFindData = true;
    }, 10000);
  }

  async _getWeatherInfo() {
    try {
      const queryResponse = await fetch(
        `${API_ENDPOINT_FOR_WEATHER}?latitude=${
          this.countryData.latitude
        }&longitude=${
          this.countryData.longitude
        }&current_weather=true&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min&hourly=relativehumidity_2m,precipitation&timezone=${this.countryData.timeZone.replace(
          '/',
          '%2F'
        )}`
      );
      const data = await queryResponse.json();

      const { current_weather, daily, hourly } = data;

      this.weatherInfo = {
        temp: current_weather.temperature,
        windspeed: `${current_weather.windspeed} km/h`,
        weather: _getWeatherFromCode(current_weather.weathercode),
        windDirectionAngle: current_weather.winddirection,
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
    if (newCountry !== 'India') {
      this.selectedCountry = this.country.selectedCountry;
      this.countryData = this.country.countryData;
    } else {
      this.selectedCountry = 'India';
      this.countryData = INDIA_COORDINATES;
    }
    this._getWeatherInfo();
  }
}
