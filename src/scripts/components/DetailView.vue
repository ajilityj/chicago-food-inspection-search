<template>
  <div v-if="isActive">
    <a class="return-to-results" @click="returnToResults" href="javascript:void(0)" tabindex="0">&lt; Return to Results</a>
    <div :class="['view-state detail-state', {'active': isActive }]">
      <div class="left-column">
        <div class="item-image-container">
          <img class="item-image" v-if="selectedRestaurant.image" src="selectedRestaurant.image">						
        </div>
        <div class="item-description">
          <p v-if="selectedRestaurant.aka_name" class="aka"><strong>AKA:</strong> {{ selectedRestaurant.aka_name.toLowerCase() }}</p>
          <p v-if="selectedRestaurant.license_"><strong>License #:</strong> {{ selectedRestaurant.license_ }}</p>
          <p v-if="selectedRestaurant.facility_type"><strong>Facility Type:</strong> {{ selectedRestaurant.facility_type }}</p>
        </div>
      </div>

      <div class="item-text-container">
        <span v-if="selectedRestaurant.dba_name" class="item-heading">{{ selectedRestaurant.dba_name.toLowerCase() }}</span>
        <span v-if="selectedRestaurant.address && selectedRestaurant.city" class="item-subheading">{{ selectedRestaurant.address.toLowerCase() }}{{ selectedRestaurant.city.toLowerCase() }}, {{ selectedRestaurant.state }} {{ selectedRestaurant.zip }}</span>

        <p class="item-description item-details">
          <span v-if="selectedRestaurant.inspection_date"><strong>Date:</strong> {{ selectedRestaurant.inspection_date.substring(0,10) }}</span>
          <span v-if="selectedRestaurant.inspection_id"><strong>ID:</strong> {{ selectedRestaurant.inspection_id }}</span>
          <span v-if="selectedRestaurant.inspection_type"><strong>Type:</strong> {{ selectedRestaurant.inspection_type }}</span>
          <span v-if="selectedRestaurant.results"><strong>Status:</strong> {{ selectedRestaurant.results }}</span>
        </p>
    
        <p class="item-description" v-if="selectedRestaurant.violations">
          <strong>Violations:</strong> {{ selectedRestaurant.violations }} 
        </p>
      </div>
    </div>
    <div class="pagination-container" v-if="numSearchResults > 1">
      <button :disabled="isFirstResult">&lt; Previous</button>
      <button :disabled="isLastResult">Next &gt;</button>
    </div>
  </div>
</template>

<script>
import eventHub from '../shared/event-hub'

export default {
	props: ['restaurant'],
  data () {
    return {
			isActive: false,
      selectedRestaurant: '',
      numSearchResults: 0,
      isFirstResult: false,
      isLastResult: false,
      searchTerm: ''  
    }
  },
  methods: {
    returnToResults: function () {
			this.isActive = false;
      // send notification that a search request was submitted
      eventHub.$emit('search-submitted', this.searchTerm);
    }
  },
	mounted () {
		eventHub.$on('restaurant-selected', (x) => {
			this.isActive = true;
      this.selectedRestaurant = x.selectedRestaurant;
      this.numSearchResults = x.numSearchResults;
      this.isFirstResult = x.selectedRestaurantIndex === 0;
      this.isLastResult = (x.selectedRestaurantIndex + 1) === x.numSearchResults;
      this.searchTerm = x.unformattedSearchTerm;
		})
	}	
}
</script>