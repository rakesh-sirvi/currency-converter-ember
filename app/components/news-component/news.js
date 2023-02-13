import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NewsComponentNewsComponent extends Component {
  app_name = 'News';

  @service('country') countryService;

  @service store;

  @tracked fetchState = { loading: true, error: '' };

  @tracked newsData = [];

  constructor() {
    super(...arguments);
    this._getNewsData();
  }

  get country() {
    return this.countryService.selectedCountry;
  }

  @action
  async _getNewsData() {
    this.fetchState = { loading: true, error: '' };
    try {
      const news = await this.store.query('news', {
        locale: this.country.toLowerCase(),
      });
      this.newsData = news;
      this.fetchState = { loading: false, error: '' };
    } catch (err) {
      console.log(err);
      this.fetchState = { loading: false, error: 'something went wrong!' };
    }
  }
}
