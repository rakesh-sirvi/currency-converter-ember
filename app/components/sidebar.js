import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SidebarComponent extends Component {
  @service country;

  @tracked sidebarWidth = '0';

  @tracked searchText = '';

  get countryList() {
    return this.country.availableCountriesName.filter((country) =>
      country.toLowerCase().includes(this.searchText)
    );
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
