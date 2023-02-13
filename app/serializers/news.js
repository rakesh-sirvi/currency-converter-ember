import RESTSerializer from '@ember-data/serializer/rest';

export default class NewsSerializer extends RESTSerializer {
  normalizeResponse(store, model, payload, ...rest) {
    const news = payload.data.map((data, idx) => ({
      id: 'news_' + idx,
      headline: data.title,
      description: data.description,
      image: data.image_url,
      url: data.url,
      providerName: data.source,
      providerImage: '',
      published: data.published_at,
    }));

    return super.normalizeResponse(store, model, { news }, ...rest);
  }
}
