import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CurrencyExchanger extends Component {
  @service('currency') currencyService;

  @tracked fromState = {
    currency: this.from,
    amount: 1,
  };

  @tracked toState = {
    currency: this.to,
    amount: this.to.rate / this.from.rate,
  };

  get from() {
    return this.getCurrencyByCode(this.args.from ?? 'INR');
  }

  get to() {
    return this.getCurrencyByCode(this.args.to ?? 'USD');
  }

  get currencies() {
    return this.currencyService.currencies;
  }

  get exchangeRate() {
    const fromCurrencyRate = this.fromState.currency.rate;
    const toCurrencyRate = this.toState.currency.rate;
    return toCurrencyRate / fromCurrencyRate;
  }

  getCurrencyByCode(code) {
    return this.currencyService.getCurrencyByCode(code);
  }

  @action
  changeFrom(evt) {
    this.fromState = {
      ...this.fromState,
      currency: this.getCurrencyByCode(evt.target.value),
    };
    this.toState = {
      ...this.toState,
      amount: this.fromState.amount * this.exchangeRate,
    };
  }

  @action
  changeTo(evt) {
    this.toState = {
      ...this.toState,
      currency: this.getCurrencyByCode(evt.target.value),
    };
    this.fromState = {
      ...this.fromState,
      amount: this.toState.amount / this.exchangeRate,
    };
  }

  @action
  handleFromAmount(evt) {
    const { value } = evt.target;
    this.fromState = {
      ...this.fromState,
      amount: value,
    };
    this.toState = {
      ...this.toState,
      amount: value * this.exchangeRate,
    };
  }

  @action
  handleToAmount(evt) {
    const { value } = evt.target;
    this.toState = {
      ...this.toState,
      amount: value,
    };
    this.fromState = {
      ...this.fromState,
      amount: value / this.exchangeRate,
    };
  }

  @action
  switch() {
    const tempState = this.fromState;
    this.fromState = this.toState;
    this.toState = tempState;
  }
}
