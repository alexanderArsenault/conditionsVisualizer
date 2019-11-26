import Vue from "vue";
import Vuex from "vuex";
import { eventlist } from './events'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bands: [
      {
        title: "> 25°C",
        v: 10,
        allowed: 6,
        spent: 0,
        excursions_allowed: 1,
        excursions_total: 0
      },
      {
        title: "15°C - 25°C",
        v: 75,
        allowed: 12,
        spent: 0,
        excursions_allowed: 3,
        excursions_total: 0
      },
      {
        title: "8°C - 15°C",
        v: 75,
        allowed: 24,
        spent: 0,
        excursions_allowed: 'Infinite',
        excursions_total: 0
      },
      {
        title: "2°C - 8°C",
        v: 75,
        allowed: 'Infinite',
        spent: 0,
        excursions_allowed: 'n/a',
        excursions_total: 0
      },
      {
        title: "0°C - 2°C",
        v: 100,
        allowed: 5,
        spent: 0,
        excursions_allowed: 1,
        excursions_total: 0
      },
      {
        title: "<-10°C - 0°C",
        v: 100,
        allowed: 0,
        spent: 0,
        excursions_allowed: 0,
        excursions_total: 0
      },
    ],
    eventlist: [...eventlist],
    events: [
      {
        event_type: "USER_EVENT",
        stage: "MANUFACTURER",
        title: "Extended exposure to sun on tarmac",
        subtitle:
          "Standing in sun or Tarmac before being loaded into plane hold, this can be an issue for passive cooling box if certified hours of performance has exceeded",
        time: new Date(),
        active: false,
        custodian: 'Forwarder 1',
        duration: 2,
        id: 'ID1908133',
        magnitude: "+30°C over threshold",
        status: 'Released',
        transformations: {
          temperature: [2,2,2,0,0,0],
          excursions: [1,1,1,0,0,0]
        }
      },
      {
        event_type: "USER_EVENT",
        stage: "MANUFACTURER",
        title: "Unforeseen delay at customs",
        subtitle: "A delay at customs without active heating is a big oopsie",
        time: new Date(),
        active: false,
        custodian: 'Forwarder 1',
        duration: 48,
        id: 'ID1908417',
        magnitude: '+5°C over threshold',
        status: 'Released',
        transformations: {
          temperature: [0,0,48,0,0,0],
          excursions: [0,0,1,0,0,0]
        }
      },
      {
        event_type: "USER_EVENT",
        stage: "AFFILIATE",
        title: "Failure of truck cooling system",
        subtitle: "The trucks cooling system failed. This is widely regarded to be a bad thing.",
        time: new Date(),
        active: false,
        custodian: 'Forwarder 2',
        duration: 6,
        id: 'ID1908464',
        magnitude: '-10°C below threshold',
        status: 'Released',
        transformations: {
          temperature: [0,0,0,0,0,6],
          excursions: [0,0,0,0,0,1]
        }
      },
      {
        event_type: "USER_EVENT",
        stage: "WHOLESALER",
        title: "Failure of warehouse environmental controls",
        subtitle: "Blackout & backup system error leads to warehouse environmental controls failing",
        time: new Date(),
        active: false,
        custodian: 'Wholesaler',
        duration: 24,
        id: 'ID1908501',
        magnitude: '+10°C over threshold',
        status: 'Released',
        transformations: {
          temperature: [0,24,24,0,0,0],
          excursions: [0,1,1,0,0,0]
        }
      },
      {
        event_type: "USER_EVENT",
        stage: "WHOLESALER",
        title: "Prolonged transfer to storage",
        subtitle:
          "Union mandated break leaves product sitting on the dock before being transfered into condition controlled storage.",
        time: new Date(),
        active: false,
        custodian: 'Forwarder 3',
        duration: 2,
        id: 'ID1908598',
        magnitude: '+5°C over threshold',
        status: 'Released',
        transformations: {
          temperature: [0,0,2,0,0,0],
          excursions: [0,0,1,0,0,0]
        }
      },
      {
        event_type: "USER_EVENT",
        stage: "PATIENT",
        title: "Extended exposure to heat in car",
        subtitle: "Patient leaves goods in car in a sunny parking lot during shopping",
        time: new Date(),
        active: false,
        custodian: 'Patient',
        duration: 2,
        id: 'ID1908647',
        magnitude: '+20°C over threshold',
        status: 'Released',
        transformations: {
          temperature: [2,2,2,0,0,0],
          excursions: [1,1,1,0,0,0]
        }
      },
      // done 2
      {
        event_type: "USER_EVENT",
        stage: "PATIENT",
        title: "Medicine left out of fridge",
        subtitle: "Patient forgets to put medicine into fridge after using.",
        time: new Date(),
        active: false,
        custodian: 'Patient',
        duration: 12,
        id: 'ID1908949',
        magnitude: '+14°C over threshold',
        status: 'Released',
        transformations: {
          temperature: [0,12,12,0,0,0],
          excursions: [0,1,1,0,0,0]
        }
      },
    ],
    shipments: [
      {
        title: "Manufacturer",
        stage: "MANUFACTURER",
        details: {
          title: "#OA 66780093",
          owner: "Wholeslaer",
          custodian: "Marie S.B Mueller",
          sending: "Wholesaler",
          receiving: "Hospital Warehouse",
          time_delta: "4 hours",
          deviations: "No Deviations",
          sent: new Date(),
          received: new Date()
        }
      },
      {
        title: "Affiliate",
        stage: "AFFILIATE",
        details: {
          title: "#OA 66780093",
          owner: "Wholeslaer",
          custodian: "Marie S.B Mueller",
          sending: "Wholesaler",
          receiving: "Hospital Warehouse",
          time_delta: "4 hours",
          deviations: "No Deviations",
          sent: new Date(),
          received: new Date()
        }
      },
      {
        title: "Wholesaler",
        stage: "WHOLESALER",
        details: {
          title: "#OA 66780093",
          owner: "Wholeslaer",
          custodian: "Marie S.B Mueller",
          sending: "Wholesaler",
          receiving: "Hospital Warehouse",
          time_delta: "4 hours",
          deviations: "No Deviations",
          sent: new Date(),
          received: new Date()
        }
      },
      {
        title: "Patient",
        stage: "PATIENT"
      }
    ]
  },
  getters: {
    activeEvents: (state, getters) => {
      return state.eventlist.filter(item => item.dynamic === false || (item.dynamic === true && getters.activeDeviationList.includes(item.id)))
    },
    
    activeDeviations: state => {
      return state.events.filter(item => item.active === true)
    },
    activeDeviationList: (state, getters) => {
      return getters.activeDeviations.reduce( (acc, curr) => {
        return [...acc, curr.id]
      }, [])
    },
    activeDeviationTimeTotal: (state, getters) => {
      return getters.activeDeviations.reduce( (acc, curr) => {
        for (let i = 0; i < acc.length; i++){
          acc[i] += curr.transformations.temperature[i]
        }
        return acc
      },[0,0,0,0,0,0])
    },
    activeDeviationExcursionTotal: (state, getters) => {
      return getters.activeDeviations.reduce( (acc, curr) => {
        for (let i = 0; i < acc.length; i++){
          acc[i] += curr.transformations.excursions[i]
        }
        return acc
      },[0,0,0,0,0,0])
    },
    // TODO:  Excursion Timeline new transformation format

    updatedBands: (state, getters) => {
      return state.bands.reduce( (acc, curr, idx) => {
        curr.spent = getters.activeDeviationTimeTotal[idx]
        curr.excursions_total = getters.activeDeviationExcursionTotal[idx]
        return [...acc, curr]
      }, [])
    },
    eventsByOwnership: state => {
      return state.shipments.reduce((acc, curr) => { 
        let newshipment = {
          title: curr.title,
          details: curr.details,
        }
        newshipment.timeline = state.events.filter( event => event.stage === curr.stage)
        return [...acc, newshipment]
      }, [])
    },
    deviationsByOwnership: state => {
      return state.shipments.reduce((acc, curr) => { 
        let newshipment = {
          title: curr.title,
          details: curr.details,
        }
        newshipment.timeline = state.events.filter( event => event.stage === curr.stage && event.active === true)
        return [...acc, newshipment]
      }, [])
    },
    psb: (state, getters) => {
      return getters.updatedBands.reduce( (acc, curr) => {
        if (curr.allowed === 'Infinite' || curr.spent === 0 ){
          return [...acc, {
            k: curr.title,
            v: 100
          }]
        } else if (curr.spent > curr.allowed) {
          return [...acc, {
            k: curr.title,
            v: 0
          }]
        } else {
          return [...acc, {
            k: curr.title,
            v: Math.max(0, (100 - (curr.spent / curr.allowed) * 100))
          }]
        }
      }, []).reverse()
    }
  },
  mutations: {
    toggleEventActive(state, target){
      let idx = state.events.findIndex( event => event.title === target.title)
      Vue.set(state.events[idx], 'active', !target.active)
    }
  },
  actions: {
    toggleEvent({ commit }, target) {
      commit('toggleEventActive', target)
    }
  }
});
