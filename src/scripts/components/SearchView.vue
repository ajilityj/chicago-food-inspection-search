<template>
  <div v-if="isActive" :class="['view-state', {'active': isActive }]">
    <input type="search" placeholder="Search" name="q">
    <button @click="searchSubmitted">Search</button>
  </div>
</template>

<script>
import eventHub from '../shared/event-hub'

export default {
  data () {
    return {
      isActive: true,
      searchValue: ''
    }
  },
  methods: {
    searchSubmitted: function () {
      this.searchValue = document.querySelector('input[name=q]').value;
      this.searchNotification();
      this.isActive = false;
    },
    searchNotification () {
      eventHub.$emit('search-submitted', this.searchValue);
    } 
  }
}
</script>