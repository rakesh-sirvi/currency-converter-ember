import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SidebarComponent extends Component {
  @service country;

  @tracked sidebarWidth = '0';

  @tracked searchText = '';

  countryId = (name) => name.split(' ').join('').toLowerCase();

  constructor() {
    super(...arguments);

    const selectedCountry = document.querySelector(
      `#${this.countryId(this.country.selectedCountry)}`
    );

    if (selectedCountry !== null) {
      setTimeout(() => {
        selectedCountry.scrollIntoView();
      }, 0);
    }
  }

  get countryList() {
    return this.country.availableCountriesName
      .filter((country) => country.toLowerCase().includes(this.searchText))
      .sort();
  }

  @action
  toggleNav() {
    if (this.sidebarWidth) {
      this.sidebarWidth = 0;
      // const mainBody = document.querySelector('#main');
      // mainBody.style.backgroundColor = 'rgba(0,0,0,0.4)';
    } else this.sidebarWidth = 250;
  }

  @action
  selectCountry(newCountry) {
    this.country.changeCountry(newCountry);
    this.toggleNav();
    this.searchText = '';
  }

  @action
  filterCountry(e) {
    this.searchText = e.target.value;
  }
}
