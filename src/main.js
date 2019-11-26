import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store';


Vue.config.productionTip = false

Vue.filter('formatdate', (date) => {
  var d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear(),
  hours = d.getHours(),
  minutes = d.getMinutes();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  if (minutes.length < 2)
    minutes = '0' + minutes
  return [hours,minutes].join(':') + ', ' + [year, month, day].join('-');
})

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
