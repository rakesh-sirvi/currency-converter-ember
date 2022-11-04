import Model, { attr } from '@ember-data/model';

export default class CurrencyModel extends Model {
  @attr('string') code;
  @attr('number') rate;
  @attr('string') description;
  @attr('string') img;
}
