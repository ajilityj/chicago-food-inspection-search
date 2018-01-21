<template>
  <section id="app" class="app-container">
    <SearchBox></SearchBox>
    <ListView :restaurants="restaurants"></ListView>
    <DetailView></DetailView>
  </section>
</template>

<script>
import axios from 'axios';
import SearchBox from './components/SearchBox.vue';
import ListView from './components/ListView.vue';
import DetailView from './components/DetailView.vue';

export default {
  components: {
    SearchBox,
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
      // set focus to search box
      document.querySelector('input[type=search]').focus();
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