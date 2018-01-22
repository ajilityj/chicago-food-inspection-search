<template>
  <div v-if="isActive" :class="['view-state search-state', {'active': isActive }]">
    <form @submit.prevent="searchSubmitted">
      <input v-model="searchValue" class="search-input" type="text" placeholder="Search" name="q" @blur="searchBlur">
      <button class="search-button" type="submit" :disabled="isEmpty"><span>Search</span></button>
    </form> 
		<p class="results-message">
			<span v-if="!isListView">Search results of the 1,000 most recent food inspections by the City of Chicago.</span>
			<span v-if="resultsLength">Showing 1-5 of {{ resultsLength }} results for "{{ searchTerm }}"</span>
			<span v-if="isListView && !resultsLength">Sorry, no results were found for "{{ searchTerm }}".</span>		
		</p>
  </div>   
</template>

<script>
import eventHub from '../shared/event-hub'

export default {
  props: ['searchTerm', 'resultsLength'],
  data () {
    return {
      isActive: true,
      isListView: this.searchTerm ? this.searchTerm : '',
      searchValue: this.searchTerm ? this.searchTerm : ''
    }
  },
  methods: {
    searchBlur: function () {
      // if in list view and search value is blank, re-submit search
      if (this.isListView && this.searchValue === '') {
        this.searchSubmitted();
      }
    },
    searchSubmitted: function () {
      // save submitted term
      this.searchValue = document.querySelector('input[name=q]').value.trim();

      // check if a search value exists
      if (this.searchValue) {
        // trigger search notification
        this.searchNotification();
        // if not in list-state, deactivate search component
        if (!this.isListView) {
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