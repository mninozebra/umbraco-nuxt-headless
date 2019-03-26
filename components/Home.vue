<template>
  <div v-if="$nuxt.$route.path == data.url">
    <h1>{{data.name}}</h1>
    <img
      :src="'https://mni-nozebra-dks-humorous-red-panda.s1.umbraco.io' + data.image.url"
      style="width: 25vw; height: 25vh;"
    >
    <br>
    <h2>Last updated:</h2>
    <p>{{data.updateDate}}</p>
    <br>
    <h2>Updated by:</h2>
    <p>{{data.writerName}}</p>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style>
</style>
