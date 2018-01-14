<template>
  <div :class="{'hide': searchSubmitted }">
    <input type="search" placeholder="Search" name="q">
    <button @click="search">Search</button>
  </div>
</template>

<script>
import eventHub from '../shared/event-hub'

export default {
  data () {
    return {
      searchValue: '',
      searchSubmitted: false
    }
  },
  methods: {
    search: function () {
      this.searchSubmitted = true;
      this.searchValue = document.querySelector('input[name=q]').value;
      this.searchEmitted();
    },
    searchEmitted () {
      eventHub.$emit('search-submitted', this.searchValue);
    } 
  }
}
</script>