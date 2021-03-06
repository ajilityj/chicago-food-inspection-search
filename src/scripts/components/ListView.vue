<template>
  <div v-if="isActive" :class="['view-state list-state', { 'active': isActive }]">
    <SearchBox :searchTerm="unformattedSearchTerm" :resultsLength="filteredRestaurants.length"></SearchBox>
		<ul class="search-results">		
				<li class="list-item" tabindex="0" 
					v-for="(restaurant, index) in filteredRestaurants" 
					v-if="index < 5" 
					:key="restaurant.inspection_id" 
					@click="restaurantSelected(restaurant, index)" 
					@keyup.enter="restaurantSelected(restaurant, index)"
				>

					<div class="item-image-container">
						<img class="item-image" v-if="restaurant.image" src="restaurant.image">						
					</div>
					
					<div class="item-text-container">
						<span v-if="restaurant.dba_name" class="item-heading">{{ restaurant.dba_name.toLowerCase() }}</span>
						<span v-if="restaurant.address && restaurant.city" class="item-subheading">{{ restaurant.address.toLowerCase() }}{{ restaurant.city.toLowerCase() }}, {{ restaurant.state }} {{ restaurant.zip }}</span>
					
						<p class="item-description item-details">
							<span v-if="restaurant.inspection_date"><strong>Date:</strong> {{ restaurant.inspection_date.substring(0,10) }}</span>
							<span v-if="restaurant.inspection_id"><strong>ID:</strong> {{ restaurant.inspection_id }}</span>
							<span v-if="restaurant.inspection_type"><strong>Type:</strong> {{ restaurant.inspection_type }}</span>
							<span v-if="restaurant.results"><strong>Status:</strong> {{ restaurant.results }}</span>
						</p>
					
						<p class="item-description" v-if="restaurant.violations">
							<strong>Violations:</strong> {{ restaurant.violations.substring(0, 275) }} 
							<span v-if="restaurant.violations.length > 275">...</span>
						</p>
					</div>

				</li>
		</ul>
		<div class="pagination-container" v-if="filteredRestaurants.length > 5">
			<button disabled>&lt; Previous</button>
			<button>Next &gt;</button>
		</div>
  </div>
</template>

<script>
import eventHub from '../shared/event-hub'
import SearchBox from './SearchBox.vue';

export default {
	props: ['restaurants'],
	components: {
    SearchBox
  },
  data () {
    return {
			isActive: false,
			filteredRestaurants: [],
			searchTerm: '',
			selectedRestaurant: {},
			selectedRestaurantIndex: 0,
			unformattedSearchTerm: ''
    }
	},
	methods: {
		filterRestaurants: function () {
			// filter restaurants based on search term
			return this.restaurants.filter((restaurant) => {
				return Object.keys(restaurant).some((key) => {
					return restaurant[key] !== (null||undefined) && restaurant[key].toString().toLowerCase().includes(this.searchTerm);
				});			
			});
		},
		restaurantSelected: function (restaurant, index) {
			// save selected restaurant & index
			this.selectedRestaurant = restaurant;
			this.selectedRestaurantIndex = index;

			// trigger selection notification
			this.selectionNotification();

			// deactivate list component
      this.isActive = false;
    },
    selectionNotification: function () {
			// send notification that a restaurant was selected
      eventHub.$emit('restaurant-selected', {
				selectedRestaurant: this.selectedRestaurant, 
				selectedRestaurantIndex: this.selectedRestaurantIndex, 
				numSearchResults: this.filteredRestaurants.length,
				unformattedSearchTerm: this.unformattedSearchTerm
			});
		}
	},
	mounted () {
		eventHub.$on('search-submitted', (term) => {
			this.isActive = true;
			this.searchTerm = term.toLowerCase();
			this.filteredRestaurants = this.filterRestaurants();
			this.unformattedSearchTerm = term;
		})
	}	
}
</script>