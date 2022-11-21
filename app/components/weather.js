import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

import ENV from "ember-app/config/environment";

import { weatherMap } from "../utils/weather-code";

const API_ENDPOINT_FOR_LOCATION = "https://api.geoapify.com/v1/geocode/search";

const API_LOCATION_SUFFIX = `&format=json&apiKey=${ENV.GEOAPIFY_API_KEY}`;

const API_ENDPOINT_FOR_WEATHER = "https://api.open-meteo.com/v1/forecast";

export default class WeatherComponent extends Component {
  @tracked countryData;

  @tracked weatherInfo;

  @tracked locationError;

  @tracked weatherError;

  @tracked couldNotFindData = false;

  get isLoading() {
    return !this.weatherInfo;
  }

  constructor() {
    super(...arguments);

    this._getCountryCoordinates();

    // If we don't get response in 10 s, some error occured
    setTimeout(() => {
      if (this.isLoading)
        this.couldNotFindData = true;
    }, 10000);
  }

  async _getCountryCoordinates() {
    try {
      const queryResponse = await fetch(
        `${API_ENDPOINT_FOR_LOCATION}?text=India${API_LOCATION_SUFFIX}`
      );
      const data = await queryResponse.json();
      this.countryData = {
        latitude: data.results[0].lat,
        longitude: data.results[0].lon,
        timeZone: data.results[0].timezone.name,
      };
      this._getWeatherInfo();
    } catch (error) {
      this.locationError = error.message;
      console.log(
        "Error occured during fetching location info: ",
        this.locationError
      );
      this.couldNotFindData = true;

    }
  }

  async _getWeatherInfo() {
    try {
      const queryResponse = await fetch(
        `${API_ENDPOINT_FOR_WEATHER}?latitude=${
          this.countryData.latitude
        }&longitude=${
          this.countryData.longitude
        }&current_weather=true&daily=sunrise,sunset&hourly=relativehumidity_2m&timezone=${this.countryData.timeZone.replace(
          "/",
          "%2F"
        )}`
      );
      const data = await queryResponse.json();

      this.weatherInfo = {
        temp: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weather: this._getWeatherFromCode(data.current_weather.weathercode),
        sunrise: this._getSunrise(data.daily.sunrise),
        sunset: this._getSunSet(data.daily.sunset),
        relative_humidity: this._getRelativeHumidity(
          data.hourly.relativehumidity_2m
        ),
      };
    } catch (error) {
      this.weatherError = error.message;
      console.log(
        "Error occured during fetching weather info: ",
        this.weatherError
      );
      this.couldNotFindData = true;
    }
  }

  /**
   * @private
   */
  _getWeatherFromCode(code) {
    return Object.keys(weatherMap).find((key) =>
      weatherMap[key].includes(code)
    );
  }

  /**
   * @private
   */
  _getSunrise(sunrise) {
    return sunrise[0].slice(11);
  }

  /**
   * @private
   */
  _getSunSet(sunset) {
    const requiredTime = sunset[0].slice(11);
    let time = requiredTime
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [requiredTime];

    if (time.length > 1) {
      time = time.slice(1);
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }

  /**
   * @private
   */
  _getRelativeHumidity(relative_humidity) {
    // Since the API returns an array of relative humidity for 7 days from today on hourly
    // basis, we need to slice the first 24 elements, i.e., the hourly data for today
    const required_array = relative_humidity.slice(0, 24);

    return (
      required_array.reduce((a, b) => a + b, 0) / required_array.length
    ).toFixed(2);
  }
}
