<template>
  <form v-if="isActive" @submit.prevent="searchSubmitted" :class="['view-state search-state', {'active': isActive }]">
    <input v-model="searchValue" class="search-input" type="search" placeholder="Search" name="q">
    <button class="search-button" type="submit" :disabled="isEmpty">Search</button>
  </form>  
</template>

<!-- TODO: re-apply last submitted term when leaving input field, in list view -->

<script>
import eventHub from '../shared/event-hub'

export default {
  props: ['searchTerm'],
  data () {
    return {
      isActive: true,
      isListView: this.searchTerm ? this.searchTerm : '',
      searchValue: this.searchTerm ? this.searchTerm : ''
    }
  },
  methods: {
    searchSubmitted: function () {
      // save submitted value
      this.searchValue = document.querySelector('input[name=q]').value.trim().toLowerCase();

      // check if a search value exists
      if (this.searchValue) {
        // trigger search notification
        this.searchNotification();
        // if not in list-state, deactivate component
        if (!this.searchTerm) {
          this.isActive = false;
        }
      } else {
        // re-apply last submitted term
        this.searchValue = this.searchTerm;
      }
    },
    searchNotification () {
      // send notification that a search request was submitted
      eventHub.$emit('search-submitted', this.searchValue);
    } 
  },
  computed: {
    isEmpty () {
      // if not in list view, test whether text is in the search field
      if (!this.isListView) {
        return this.searchValue.trim().length === 0;
      }
    }
  },
  mounted () {
    // if in list view, add search term to input
    if (this.isListView) {
      document.querySelector('input[name=q]').value = this.searchValue;
    }
  }
}
</script>