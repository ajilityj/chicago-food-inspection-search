<template>
  <div v-if="isActive" :class="['view-state list-state', {'active': isActive }]">
		<input class="search-term-input" type="text" :placeholder="searchTerm" disabled>

		<ul class="search-results">
				<li class="list-item" v-for="(restaurant, index) in filteredRestaurants" v-if="index < 5" :key="restaurant.inspection_id" @click="restaurantSelected(restaurant)">

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
							<strong>Violations:</strong> {{ restaurant.violations.substring(0, 400) }} 
							<span v-if="restaurant.violations.length > 400">...</span>
						</p>
					</div>

				</li>
		</ul>

		<div class="pagination-container">
			<button @click="showPrev()" disabled>&lt; Previous</button>
			<button @click="showNext()">Next &gt;</button>
		</div>
  </div>
</template>

<script>
import eventHub from '../shared/event-hub'

export default {
	props: ['restaurants'],
  data () {
    return {
			isActive: false,
			searchTerm: '',
			filteredRestaurants: [],
			selectedRestaurant: {}
    }
	},
	methods: {
		filterRestaurants: function () {
			return this.restaurants.filter((restaurant) => {
				return Object.keys(restaurant).some((key) => {
					return restaurant[key] !== null && restaurant[key].toString().toLowerCase().includes(this.searchTerm);
				});			
			});
		},
		restaurantSelected: function (restaurant) {
			this.selectedRestaurant = restaurant;
      this.selectionNotification();
      this.isActive = false;
    },
    selectionNotification: function () {
      eventHub.$emit('restaurant-selected', this.selectedRestaurant);
		}
	},
	mounted () {
		eventHub.$on('search-submitted', (term) => {
			this.isActive = true;
			this.searchTerm = term.toLowerCase();
			this.filteredRestaurants = this.filterRestaurants();
		})
	}	
}
</script>