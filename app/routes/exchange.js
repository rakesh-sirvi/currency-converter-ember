import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ExchangeRoute extends Route {
  @service store;

  model() {
    // const res2 = await fetch('https://api.exchangerate.host/symbols');
    return this.store.findAll('currency');
  }
}
