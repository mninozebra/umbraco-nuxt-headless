<template :v-if="hest.url == $nuxt.$route.path">
  <!-- Where all the magic happens -->

  <div>
    <ul>
      <li v-for="data in content" :key="data.id">
        <nuxt-link :to="data.url">{{data.name}}</nuxt-link>
      </li>
    </ul>
    <br>
    <component v-for="data in content" :key="data.id" :is="data.contentTypeAlias" :data="data"></component>
  </div>
</template>

<script>
export default {
  async asyncData({ app, route, payload }) {
    // If there is a cached payload, use that
    if (payload) {
      return { content: payload };
    }

    const root = await app.$umbraco.getById(1065);

    // No payload so lookup the page contents from the endpoint

    const content = await app.$umbraco.getChildren(root);

    return {
      root: root,
      content: content.results
    };
  }
};
</script>
