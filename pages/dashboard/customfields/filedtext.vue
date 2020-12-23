<template>
  <v-text-field
    v-model="item.content"
    solo
    dense
  />
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>

</style>
