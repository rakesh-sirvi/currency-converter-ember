import RESTAdapter from '@ember-data/adapter/rest';

export default class NewsAdapter extends RESTAdapter {
  host = 'https://bing-news-search1.p.rapidapi.com';

  headers = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '7dcb741adamsh9a1e580d8d291f7p180c0bjsn7766bf702906',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  };

  buildURL() {
    return `${this.host}/news`;
  }
}
