<template>
  <!-- Where all the magic happens -->

  <div>
    <ul>

      <li v-for="data in hest" :key="data.id">
        <nuxt-link :to="data._links.self.href">
          {{data.name}}
        </nuxt-link>

      </li>

    </ul>

    <component v-for="data in hest" v-if="data.contentTypeAlias" :key="data.id" :content="hest" :is="data.contentTypeAlias" :data="data" :res="res" :hest="hest"></component>
  </div>
</template>

<script>

  export default {

  async asyncData ({ app, route, payload }) {
    
    // If there is a cached payload, use that
    if (payload) {
      return { content: payload };
    }

    const site = await app.$umbraco.getById(1064);
    const root = await app.$umbraco.getById(1065);

    // No payload so lookup the page contents from the endpoint
    let query = site;
    let cleanPath = route.path.replace(/^\/+|\/+$/g, '');
    if (cleanPath) {
      let pathParts = cleanPath.split('/');
      query = pathParts.reduce((acc, cur) => {
        if (cur) {
          acc += `/*[@urlName='${cur}']`;
        }
        return acc;
      }, query);
    }
    const res = await app.$umbraco.query(query, 'XPath').getAll();
    const firstchild = await app.$umbraco.getFirstChild(site);
    const children = await app.$umbraco.getChildren(site);
    const values = await app.$umbraco.getChildren(site);
    const hest = await app.$umbraco.getChildren(root);
    const props = await app.$umbraco.getChildren(root);

    console.log(site);

    console.log(firstchild);
    console.log(children.totalResults);
    console.log(children.results[0]);
    console.log(props);

    const content = (props && props.page == 1)
      ? props.results[0]
      : null;

    console.log(content);
    console.log(hest._links);
    console.log(hest._links.page);


    return {
      content: content,
      res: res,
      values: values,
      root: root,
      hest: hest.results
    }

  }


}
</script>
