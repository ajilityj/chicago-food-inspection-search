<template>
  <div v-if="isActive" :class="['view-state', {'active': isActive }]">
    <p>{{ selectedRestaurant }}</p>
  </div>
</template>

<script>
import eventHub from '../shared/event-hub'

export default {
	props: ['restaurant'],
  data () {
    return {
			isActive: false,
			selectedRestaurant: ''
    }
	},
	mounted () {
		eventHub.$on('restaurant-selected', (restaurant) => {
			this.isActive = true;
			this.selectedRestaurant = restaurant;
		})
	}	
}
</script>