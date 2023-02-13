import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service country;

  @tracked theme = localStorage.getItem('currencyAppTheme') ?? this.systemTheme;

  @tracked sidebarWidth = 0;

  countryId = (name) => name.split(' ').join('').toLowerCase();

  get systemTheme() {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  constructor() {
    super(...arguments);

    const selectedCountry = document.querySelector(
      `#${this.countryId(this.country.selectedCountry)}`
    );

    if (selectedCountry !== null) {
      setTimeout(() => {
        window.scrollTo(selectedCountry).offset().top();
        // selectedCountry.scrollIntoView();
      }, 0);
    }
  }

  @action
  changeTheme() {
    if (this.theme === 'light') this.theme = 'dark';
    else this.theme = 'light';
  }

  @action
  toggleNav() {
    this.searchText = '';
    if (this.sidebarWidth !== 0) {
      this.sidebarWidth = 0;
    } else this.sidebarWidth = 250;
  }

  @action
  onClickWhenSidebarOpen() {
    this.sidebarWidth = 0;
  }

  @action
  onKeyPress(event) {
    if (event.keyCode === 27) {
      this.sidebarWidth = 0;
    }
  }
}
