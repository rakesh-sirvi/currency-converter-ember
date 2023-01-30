import Model, { attr } from '@ember-data/model';

export default class NewsModel extends Model {
  @attr('string') headline;
  @attr('string') description;
  @attr('string') image;
  @attr('string') url;
  @attr('string') providerName;
  @attr('string') providerImage;
  @attr('date') published;
}
