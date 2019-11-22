import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

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

  return [hours,minutes].join(':') + ', ' + [year, month, day].join('-');
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
