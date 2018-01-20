<template>
  <form  v-if="isActive" @submit.prevent="searchSubmitted" :class="['view-state search-state', {'active': isActive }]">
    <input v-model="searchValue" class="search-input" type="search" placeholder="Search" name="q">
    <button class="search-button" type="submit" :disabled="isDisabled">Search</button>
  </form>  
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
      // save submitted value
      this.searchValue = document.querySelector('input[name=q]').value;

      // submit search if a search value exists
      if (this.searchValue) {
        // trigger search notification
        this.searchNotification();
        // deactivate component
        this.isActive = false;
      }
    },
    searchNotification () {
      // send notification that a search request was submitted
      eventHub.$emit('search-submitted', this.searchValue);
    } 
  },
  computed: {
    isDisabled () {
      // check whether text is in the search field, if not, disable button
      return this.searchValue.length === 0;
    }
  }
}
</script>