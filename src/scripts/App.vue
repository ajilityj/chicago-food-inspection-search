<template>
  <section id="app" class="app-container">
    <SearchView></SearchView>
    <ListView :restaurants="restaurants"></ListView>
    <DetailView></DetailView>
  </section>
</template>

<script>
import axios from 'axios';
import SearchView from './components/SearchView.vue';
import ListView from './components/ListView.vue';
import DetailView from './components/DetailView.vue';

export default {
  components: {
    SearchView,
    ListView,
    DetailView
  },
  data () {
    return {
      restaurants: []
    }
  },
  methods: {
    focusOnSearchInput: function () {
      const searchInput = document.querySelector('input[type=search]');
      searchInput.focus();
    },
    fetchAll: function () {
      return axios.get('https://data.cityofchicago.org/resource/cwig-ma7x.json')
        .then(response => {
          this.restaurants = response.data;
        }).catch(error => {
          console.error('fetchAll: ' + error);
        });
    }
  },
  mounted: function () {
    this.fetchAll();
    this.focusOnSearchInput();
  }
}
</script>