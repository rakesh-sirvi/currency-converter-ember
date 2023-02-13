import RESTAdapter from '@ember-data/adapter/rest';

export default class NewsAdapter extends RESTAdapter {
  host = 'https://api.thenewsapi.com/v1';

  buildURL() {
    return `${this.host}/news/top?api_token=fNf30qoyqLU4rSDVBpHXyb4BHQl11bgCrnNdA9gf&language=en`;
  }

  query(_, __, query) {
    if (localStorage.getItem(`news.${query.locale}`)) {
      return Promise.resolve(
        JSON.parse(localStorage.getItem(`news.${query.locale}`))
      );
    }
    const data = super.query(...arguments).then((_data) => {
      localStorage.setItem(`news.${query.locale}`, JSON.stringify(_data));
      return _data;
    });

    return data;
  }
}
