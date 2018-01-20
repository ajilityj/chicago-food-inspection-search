<template>
  <div v-if="isActive" :class="['view-state search-state', {'active': isActive }]">
    <input class="search-input" type="search" placeholder="Search" name="q">
    <button class="search-button" @click="searchSubmitted">Search</button>
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