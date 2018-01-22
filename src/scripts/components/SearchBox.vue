<template>
  <div v-if="isActive" :class="['view-state search-state', {'active': isActive }]">
    <form @submit.prevent="searchSubmitted">
      <input v-model="searchValue" class="search-input" type="text" placeholder="Search" name="q" @blur="searchBlur">
      <button class="search-button" type="submit" :disabled="isEmpty"><span>Search</span></button>
    </form> 
		<div class="results-message" v-if="!isListView">
      <p>Search results of food inspections completed by the City of Chicago in the last 30 days, based on the following fields:</p>
      <ul>
        <li>Restaurant Name</li>
        <li>License #</li>
        <li>Facility Type</li>
        <li>Address</li>
        <li>Zip Code</li>
        <li>Inspection Date</li>
        <li>Inspection Id</li>
        <li>Inspection Type</li>
        <li>Inspection Result</li>
        <li>Violations</li>
      </ul>
      <div class="footnote">
        <p>This information is derived from inspections of restaurants and other food establishments in Chicago. Inspections are performed by staff from the Chicago Department of Public Health’s Food Protection Program using a standardized procedure. The results of the inspection are inputted into a database, then reviewed and approved by a State of Illinois Licensed Environmental Health Practitioner (LEHP).</p>
        <p>For descriptions of the data elements included in this set, go to <a href="http://bit.ly/tS9IE8" target="_blank" ref="nofollow">http://bit.ly/tS9IE8</a></p>
        <p>For more information about Food Inspections, go to <a href="https://www.cityofchicago.org/city/en/depts/cdph/provdrs/inspections_and_permitting/svcs/food-protection-services.html" target="_blank" ref="nofollow">https://www.cityofchicago.org/city/en/depts/cdph/provdrs/inspections_and_permitting/svcs/food-protection-services.html</a>.</p>
      </div>
    </div>
    <div class="results-message" v-if="resultsLength">
      <p>Showing 1-<span v-if="resultsLength > 5">5</span><span v-else>{{ resultsLength }}</span> of {{ resultsLength }} results for "{{ searchTerm }}"</p>
    </div>
    <div class="results-message" v-if="isListView && !resultsLength">
      <p>Sorry, no results were found for "{{ searchTerm }}".</p>
		</div>
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