import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ExchangeController extends Controller {
  @tracked from = {
    currency: this.getCurrencyByCode('USD'),
    amount: this.getCurrencyByCode('USD').rate,
  };

  @tracked to = {
    currency: this.getCurrencyByCode('INR'),
    amount: this.getCurrencyByCode('INR').rate,
  };

  get currencies() {
    return this.model;
  }

  getCurrencyByCode(code) {
    return this.model.find((currency) => currency.code === code);
  }

  get exchangeRate() {
    const fromRate = this.from.currency.rate;
    const toRate = this.to.currency.rate;
    return toRate / fromRate;
  }

  @action
  changeFrom(evt) {
    this.from = {
      ...this.from,
      currency: this.getCurrencyByCode(evt.target.value),
    };
    this.to = {
      ...this.to,
      amount: this.from.amount * this.exchangeRate,
    };
  }

  @action
  changeTo(evt) {
    this.to = {
      ...this.to,
      currency: this.getCurrencyByCode(evt.target.value),
    };
    this.from = {
      ...this.from,
      amount: this.to.amount / this.exchangeRate,
    };
  }

  @action
  handleFromAmount(evt) {
    const { value } = evt.target;
    this.from = { ...this.from, amount: value };
    this.to = { ...this.to, amount: value * this.exchangeRate };
  }

  @action
  handleToAmount(evt) {
    const { value } = evt.target;
    this.to = { ...this.to, amount: value };
    this.from = { ...this.from, amount: value / this.exchangeRate };
  }
}
