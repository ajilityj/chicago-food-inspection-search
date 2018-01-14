<template>
  <div :class="{'hide': !searchSubmitted }">
    <input type="text" :placeholder="searchTerm" disabled>
		<ul v-if="data.length">
				<li v-for="item in data" v-if="item.dba_name.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1" v-html="item.dba_name"></li>
		</ul>
  </div>
</template>

<script>
import eventHub from '../shared/event-hub'

export default {
	props: ['data'],
  data () {
    return {
			searchSubmitted: false,
			searchTerm: ''
    }
	},
	mounted () {
		eventHub.$on('search-submitted', (term) => {
			this.searchSubmitted = true;
			this.searchTerm = term;
		})
	}	
}
</script>