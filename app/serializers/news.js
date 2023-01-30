import RESTSerializer from '@ember-data/serializer/rest';

export default class NewsSerializer extends RESTSerializer {
  normalizeResponse(store, model, payload, ...rest) {
    const news = payload.value.map((data, idx) => ({
      id: 'news_' + idx,
      headline: data.name,
      description: data.description,
      image: data.image
        ? `${data.image.thumbnail.contentUrl}&w=${data.image.thumbnail.width}&h=${data.image.thumbnail.height}`
        : '',
      url: data.url,
      providerName: data.provider[0].name,
      providerImage: data.provider[0].image?.thumbnail.contentUrl ?? '',
      published: data.datePublished,
    }));

    return super.normalizeResponse(store, model, { news }, ...rest);
  }
}
