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
    focusOnSearchBox: function () {
      // set focus to search box
      document.querySelector('input[name=q]').focus();
    },
    fetchAll: function () {
      return axios.get('https://data.cityofchicago.org/resource/cwig-ma7x.json')
        .then(response => {
          this.filterRestaurants(response.data);
        }).catch(error => {
          console.error('fetchAll: ' + error);
        });
    },
    filterRestaurants: function (data) {
      const today = new Date(new Date().setHours(0,0,0,0));   
      const priorDate = new Date((new Date(new Date().setDate(today.getDate()-30))).setHours(0,0,0,0));

      // filter inspections through the last 30 days & map utilized data
      this.restaurants = data.filter(item => {
        return new Date(item.inspection_date).getTime() >= priorDate.getTime();
      }).map(item => {
        const temp = {};
        
        temp['aka_name'] = item.aka_name;
        temp['license_'] = item.license_;
        temp['facility_type'] = item.facility_type;
        temp['dba_name'] = item.dba_name;
        temp['address'] = item.address;
        temp['city']  = item.city;
        temp['state'] = item.state;
        temp['zip'] = item.zip;
        temp['inspection_date'] = item.inspection_date;
        temp['inspection_id'] = item.inspection_id;
        temp['inspection_type'] = item.inspection_type;
        temp['results'] = item.results;
        temp['violations'] = item.violations;

        return temp;
      });
    }
  },
  mounted: function () {
    this.fetchAll();
    this.focusOnSearchBox();
  }
}
</script>