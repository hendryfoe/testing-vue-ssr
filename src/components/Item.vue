<template>
  <div>Item Page</div>
</template>

<script>
import ItemStoreModule from '../store/modules/item';

export default {
  asyncData({ store, route }) {
    store.registerModule('item', ItemStoreModule);
    // return the Promise from the action
    return store.dispatch('item/fetch', route.params.id);
  },

  computed: {
    // display the item from store state.
    item() {
      return this.$store.state.items[this.$route.params.id];
    },
    entities() {
      return this.$store.state.item.entities;
    },
  },

  // IMPORTANT: avoid duplicate module registration on the client
  // when the route is visited multiple times.
  destroyed() {
    this.$store.unregisterModule('item');
  },
};
</script>

<style>
</style>
