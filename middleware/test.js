const UmbracoHeadless = require('umbraco-headless')
const umbracoConfig = require('../umbraco.config')
export default async function (ctx, app, route, payload) {

  let umbraco = new UmbracoHeadless.HeadlessService(umbracoConfig);
  umbraco.IsAuthenticated = true;
  umbraco.BaseUrl = umbracoConfig.url;

  const res = await app.$umbraco.query(query, 'XPath').getAll();

  const content = res.results
  console.log(data)
  return (ctx.payload = {
    template: content.contentTypeAlias,
    content: content.content,
    nodeId: content.id
  })
}
