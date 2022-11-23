import Service, { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrencyService extends Service {
  @tracked _currencies = [];

  @tracked loading = true;

  @tracked errorState = '';

  @inject store;

  constructor() {
    super(...arguments);
    this.store
      .findAll('currency')
      .then((data) => {
        this._currencies = data;
      })
      .catch((err) => {
        this.errorState = err.toString();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  get currencies() {
    return this._currencies;
  }

  getCurrencyByCode(code) {
    return this.currencies.find(
      (currency) => currency.code === code.toUpperCase()
    );
  }
}
