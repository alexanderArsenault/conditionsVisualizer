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
          <Graph v-if="transformedTemperatureSeries" :live="false" :data='formattedTemperatureDate' ></Graph>
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
    transformations: [
      {
        start: 50,
        end: 72,
        amount: 2,
      },

      // {
      //   start: 150,
      //   end: 172,
      //   amount: 2,
      // },
      // {
      //   start: 200,
      //   end: 250,
      //   amount: 4,
      // },
      // {
      //   start: 370,
      //   end: 450,
      //   amount: 2,
      // },
    ],
    bands: [
      { 
        k: "< 2°C",
        min:-1000,
        max: 2,
        hours: 1,
        v: 100
      },
      { 
        k: "2-8°C",
        min: 2,
        max: 8,
        hours: 1500,
        v: 100
      },
      { 
        k: "8-15°C",
        min: 8,
        max: 15,
        hours: 500,
        v: 100
      },
      { 
        k: "> 15°C",
        min: 15,
        max: 1000,
        hours: 1,
        v: 100
      },
    ]
  }),
  computed: {
    stabilityBudget(){
      return this.bands.reduce( (acc, curr) => {
        let formatentry = {
          k: curr.k,
          v: Math.max((100 - parseInt(this.getMillisecondsSpentBetweenTemperatures(curr.min, curr.max) / (curr.hours * 60 * 60 * 1000) * 100)), 0)
        }
        return [...acc, formatentry]
      }, [])
    },
    formattedTemperatureDate(){
      return temperatures.temps.reduce( (acc, curr) => {
        return [
          ...acc,
          {
          x: new Date(curr.x),
          y: curr.y
        }]
      }, [])
    },
    transformedTemperatureSeries(){
      return this.transformations.reduce( (acc, curr) => {
        return this.addTemperatureBetweenIndexs(
          curr.start,
          curr.end,
          curr.amount,
          acc
        )
      }, this.formattedTemperatureDate)
    }
  },
  methods: {
    addTemperatureBetweenIndexs(start, end, amount, array){
      for (let i = start; i < end; i++){
        let halfway = parseInt((start + end) / 2)
        let taperedamount = amount / Math.abs(i - halfway)


        if (taperedamount === Infinity) taperedamount = 1
        array[i].y = array[i].y + taperedamount
      }
      return array
    },
    getMillisecondsSpentBetweenTemperatures(min, max){
      let lasttime = null
      
      return this.formattedTemperatureDate.reduce((acc, curr) => {
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