import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const NEWS_API = 'https://api.newscatcherapi.com/v2/latest_headlines';

export default class NewsComponentNewsComponent extends Component {
  app_name = 'News';

  @service('country') countryService;

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
      const res = await fetch(`${NEWS_API}?lang=en&countries=${this.country}`, {
        headers: {
          'x-api-key': '33LfjlCywN07vmV5V74InuSJ-MA8214SOXBs6dCDAAs',
        },
      });
      const data = await res.json();
      this.newsData = data?.articles;
      this.fetchState = { loading: false, error: '' };
    } catch (err) {
      this.fetchState = { loading: false, error: 'something went wrong!' };
    }
  }
}
