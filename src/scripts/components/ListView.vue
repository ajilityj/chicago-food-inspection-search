<template>
  <div v-if="isActive" :class="['view-state', {'active': isActive }]">
    <input type="text" :placeholder="searchTerm" disabled>
		<ul>
				<li v-for="restaurant in filteredRestaurants" :key="restaurant.inspection_id" @click="restaurantSelected(restaurant)">
					{{ restaurant.dba_name }}
				</li>
		</ul>
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
				return restaurant.dba_name.toUpperCase().indexOf(this.searchTerm.toUpperCase()) > -1;
			});
		},
		restaurantSelected: function (restaurant) {
			this.selectedRestaurant = restaurant;
      this.selectionNotification();
      this.isActive = false;
    },
    selectionNotification () {
      eventHub.$emit('restaurant-selected', this.selectedRestaurant);
    }
	},
	mounted () {
		eventHub.$on('search-submitted', (term) => {
			this.isActive = true;
			this.searchTerm = term;
			this.filteredRestaurants = this.filterRestaurants();
		})
	}	
}
</script>