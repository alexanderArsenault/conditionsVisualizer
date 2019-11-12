<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-divider class="divider-lighter" dark></v-divider>
      <h2 class="app-bar-header">Pharma Co.</h2>
      <v-divider class="divider-lighter" dark></v-divider>
    </v-app-bar>

    <v-content>
      <v-row>
        <EventPicker/>
      </v-row>
      <v-row >
        <v-col md='8'>
          <Graph :live="false" :data='tempdata' ></Graph>
        </v-col>

        <v-col md="4" class="psb-centered">
          <RadialBarChart :percentages="stabilityBudget"/>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>
<script>
import EventPicker from './components/EventPicker';
import RadialBarChart from './components/RadialBarChart';
import Graph from './components/Graph';
import temperatures from './assets/shipment_data.js'

export default {
  name: 'App',
  components: {
    EventPicker,
    Graph,
    RadialBarChart,
  },
  data: () => ({
    tempdata: [],
    bands: [
      { 
        k: "> 15°C",
        min: 15,
        max: 1000,
        hours: 5,
        v: 100
      },
      { 
        k: "8-15°C",
        min: 8,
        max: 15,
        hours: 100,
        v: 100
      },
      { 
        k: "2-8°C",
        min: 8,
        max: 15,
        hours: 100,
        v: 100
      },
      { 
        k: "< 2°C",
        min:-1000,
        max: 2,
        hours: 1,
        v: 100
      },
    ]
  }),
  mounted(){
    this.tempdata = temperatures.temps.map( entry => {
      return {
        x: new Date(entry.x),
        y: entry.y
      }
    })
  },
  computed: {
    stabilityBudget(){
      return this.bands.reduce( (acc, curr) => {
        acc.unshift({
          k: curr.k,
          v: Math.max((100 - parseInt(this.getMillisecondsSpentBetweenTemperatures(curr.min, curr.max) / (curr.hours * 60 * 60 * 1000) * 100)), 0)
        })
        return acc
      }, [])
    }
  },
  methods: {
    getMillisecondsSpentBetweenTemperatures(min, max){
      let lasttime = null
      
      return this.tempdata.reduce((acc, curr) => {
        if (curr.y > min && curr.y < max) {
          if (lasttime === null) {
            lasttime = curr.x
            return acc
          } else {
            let timediff = new Date(curr.x).valueOf() - new Date(lasttime).valueOf()
            lasttime = curr.x
            return acc + timediff
          }
        } else {
          lasttime = null
          return acc
        }
      }, 0)
    }
  }
};
</script>
<style lang="scss" scoped>
.app-bar-header {
  padding: 0 30px;
}
.divider-lighter {
  border-color: #fff !important;
}
.barchart-container {
  margin-left: auto;
  margin-right: 20px;
  width: 400px;
  height: 400px;
}
.psb-centered {
  align-items: center;
}
</style>