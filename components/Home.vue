<template>
  <div>
    <div v-for="data in hest" :key="data.id">
      {{hest.name}}
      {{data.richText}}

    </div>

  </div>
</template>

<script>

export default {
    props: ['content', 'res', 'hest', 'data', 'route']
}
</script>

<style>

</style>
