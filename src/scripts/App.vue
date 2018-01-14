<template>
  <div>
    <SearchView></SearchView>
    <ListView :data="data"></ListView>
  </div>
</template>

<script>
import axios from 'axios';
import SearchView from './components/SearchView.vue';
import ListView from './components/ListView.vue';

export default {
  components: {
    SearchView,
    ListView
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    fetchAll: function () {
      return axios.get('https://data.cityofchicago.org/resource/cwig-ma7x.json')
        .then(response => {
          this.data = response.data;
        }).catch(error => {
          console.error('fetchAll: ' + error);
        })
    }
  },
  mounted: function () {
    this.fetchAll()
  }
}
</script>