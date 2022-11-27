import { weatherGifBackground, weatherMap } from '../../../utils/weather-code';
import { windDirections } from '../../../utils/windDirections';

export const _getWeatherFromCode = (code) => {
  return weatherGifBackground[
    Object.keys(weatherMap).find((key) => weatherMap[key].includes(code))
  ];
};

export const _getWindDirection = (angle) => {
  const val = Math.floor(angle / 22.5 + 0.5);
  return windDirections[val % 16];
};

export const _getSunrise = (sunrise) => {
  return sunrise[0].slice(11);
};

export const _getSunSet = (sunset) => {
  const requiredTime = sunset[0].slice(11);
  let time = requiredTime
    .toString()
    .match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [requiredTime];

  if (time.length > 1) {
    time = time.slice(1);
    time[0] = +time[0] % 12 || 12;
  }
  return time.join('');
};

export const _getAvgRelativeHumidity = (relative_humidity) => {
  // Since the API returns an array of relative humidity for 7 days from today on hourly
  // basis, we need to slice the first 24 elements, i.e., the hourly data for today
  const required_array = relative_humidity.slice(0, 24);

  return (
    required_array.reduce((a, b) => a + b, 0) / required_array.length
  ).toFixed(2);
};

export const celciusToFarenheit = (temp) => {
  return (temp * 1.8 + 32).toFixed(2);
};

export const farenheihtToCelcius = (temp) => {
  return ((temp - 32) / 1.8).toFixed(2);
};

export const _getMinMaxTemp = (temps) => {
  let temperatures = [];

  for (let i = 0; i < 7; ++i) {
    temperatures.push({
      day: temps.time[i]
        .substr(5)
        .split('-')
        .reverse()
        .join('/'),
      min: temps.min[i],
      max: temps.max[i],
    });
  }

  return temperatures;
};

const get12hourTime = (t) => {
  const amOrPm = t < 12 ? 'AM' : 'PM';
  return `${t % 12 || 12} ${amOrPm}`;
};

export const _getRelativeHumidity = (relative_humidity_arr) => {
  relative_humidity_arr = relative_humidity_arr.slice(0, 24);

  let relative_humidity = [];
  let timeCount = 0;

  for (let i = 0; i < 24; ++i) {
    relative_humidity.push({
      time: get12hourTime(timeCount++),
      val: relative_humidity_arr[i],
    });
  }

  return relative_humidity;
};

export const _getPrecipitation = (p_arr) => {
  p_arr = p_arr.slice(0, 24);

  let precipitation = [];
  let timeCount = 0;

  for (let i = 0; i < 24; ++i) {
    precipitation.push({
      time: get12hourTime(timeCount++),
      val: p_arr[i],
    });
  }

  return precipitation;
};
