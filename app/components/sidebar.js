import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SidebarComponent extends Component {
  @service country;

  @tracked searchText = '';

  get countryList() {
    return Object.values(this.country.availableCountries)
      .filter((country) =>
        country.countryName
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      )
      .sort();
  }

  get globalCountry() {
    return this.country.availableCountries[this.country.selectedCountry]
      .countryName;
  }

  @action
  selectCountry(newCountry) {
    this.country.changeCountry(newCountry);
    this.args.toggleNav();
    this.searchText = '';
  }

  @action
  filterCountry(e) {
    this.searchText = e.target.value;
  }
}
