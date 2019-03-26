<template>
  <div v-if="$nuxt.$route.path == data.url">
    <h1>{{data.contentTypeAlias}}</h1>
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
