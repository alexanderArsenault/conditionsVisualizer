import Vue from "vue";
import Vuex from "vuex";
import { eventlist } from "./events";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bands: [
      {
        title: "> 25°C",
        v: 100,
        allowed: 6,
        spent: 0,
        excursions_allowed: 1,
        excursions_total: 0
      },
      {
        title: "15°C - 25°C",
        v: 100,
        allowed: 50,
        spent: 0,
        excursions_allowed: 3,
        excursions_total: 0
      },
      {
        title: "8°C - 15°C",
        v: 100,
        allowed: 100,
        spent: 0,
        excursions_allowed: "Infinite",
        excursions_total: 0
      },
      {
        title: "2°C - 8°C",
        v: 100,
        allowed: "Infinite",
        spent: 0,
        excursions_allowed: "n/a",
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
      }
    ],
    events: [...eventlist],
    deviations: [
      {
        event_type: "USER_EVENT",
        stage: "MANUFACTURER",
        title: "Extended exposure to sun on tarmac",
        subtitle:
          "Standing in sun or Tarmac before being loaded into plane hold, this can be an issue for passive cooling box if certified hours of performance has exceeded",
        time: new Date(),
        active: false,
        custodian: "Forwarder 1",
        duration: 2,
        id: "ID1908133",
        magnitude: "+30°C over threshold",
        status: "Released",
        transformations: {
          temperature: [2, 2, 2, 0, 0, 0],
          excursions: [1, 1, 1, 0, 0, 0]
        }
      },
      {
        event_type: "USER_EVENT",
        stage: "MANUFACTURER",
        title: "Unforeseen delay at customs",
        subtitle: "A delay at customs without active heating is a big oopsie",
        time: new Date(),
        active: false,
        custodian: "Forwarder 1",
        duration: 48,
        id: "ID1908417",
        magnitude: "+5°C over threshold",
        status: "Released",
        transformations: {
          temperature: [0, 0, 48, 0, 0, 0],
          excursions: [0, 0, 1, 0, 0, 0]
        }
      },
      {
        event_type: "USER_EVENT",
        stage: "AFFILIATE",
        title: "Failure of truck cooling system",
        subtitle: "The trucks cooling system failed. This is widely regarded to be a bad thing.",
        time: new Date(),
        active: false,
        custodian: "Forwarder 2",
        duration: 6,
        id: "ID1908464",
        magnitude: "-10°C below threshold",
        status: "Released",
        transformations: {
          temperature: [0, 0, 0, 0, 0, 6],
          excursions: [0, 0, 0, 0, 0, 1]
        }
      },
      {
        event_type: "USER_EVENT",
        stage: "WHOLESALER",
        title: "Failure of warehouse environmental controls",
        subtitle: "Blackout & backup system error leads to warehouse environmental controls failing",
        time: new Date(),
        active: false,
        custodian: "Wholesaler",
        duration: 24,
        id: "ID1908501",
        magnitude: "+10°C over threshold",
        status: "Released",
        transformations: {
          temperature: [0, 24, 24, 0, 0, 0],
          excursions: [0, 1, 1, 0, 0, 0]
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
        custodian: "Forwarder 3",
        duration: 2,
        id: "ID1908598",
        magnitude: "+5°C over threshold",
        status: "Released",
        transformations: {
          temperature: [0, 0, 2, 0, 0, 0],
          excursions: [0, 0, 1, 0, 0, 0]
        }
      },
      {
        event_type: "USER_EVENT",
        stage: "PATIENT",
        title: "Extended exposure to heat in car",
        subtitle: "Patient leaves goods in car in a sunny parking lot during shopping",
        time: new Date(),
        active: false,
        custodian: "Patient",
        duration: 2,
        id: "ID1908647",
        magnitude: "+20°C over threshold",
        status: "Released",
        transformations: {
          temperature: [2, 2, 2, 0, 0, 0],
          excursions: [1, 1, 1, 0, 0, 0]
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
        custodian: "Patient",
        duration: 12,
        id: "ID1908949",
        magnitude: "+14°C over threshold",
        status: "Released",
        transformations: {
          temperature: [0, 12, 12, 0, 0, 0],
          excursions: [0, 1, 1, 0, 0, 0]
        }
      }
    ],
    shipments: [
      {
        title: "Manufacturer",
        stage: "MANUFACTURER",
        details: {
          title: "KN-9022232221",
          owner: "Novo Nordisk",
          custodian: "Kühne & Nagel",
          sending: "Norvo Nordisk, Clayton, North Carolina",
          receiving: "Züllig Pharma, Selangor, Malaysia",
          time_deviation: 0,
          condition_deviation: 0,
          url: "https://goo.gl/maps/L8KVMSeG7hs4LbKK6",
          items_expired: "of 550",
          dispatched: "03/05/2019 11:22:00",
          delivered: "03/07/2019 15:07:00"
        }
      },
      {
        title: "Affiliate",
        stage: "AFFILIATE",
        details: {
          title: "ZG-7844932-122",
          owner: "Novo Nordisk",
          custodian: "Züllig Pharma",
          sending: "Züllig Pharma, Selangor, Malaysia",
          receiving: "Apex Pharma Co., Subang Jaya, Malaysia",
          time_deviation: 0,
          condition_deviation: 0,
          url: "https://goo.gl/maps/9d54qkz7DoPSaaDeA",
          items_expired: "of 150",
          dispatched: "03/08/2019 11:10:00",
          delivered: "03/08/2019 18:50:00"
        }
      },
      {
        title: "Wholesaler",
        stage: "WHOLESALER",
        details: {
          title: "MP-448523",
          owner: "Apex Pharma Co",
          custodian: "Malaysia Post",
          sending: "Apex Pharma Co., Subang Jaya, Malaysia",
          receiving: "JH Pharmacy, Sitiawan, Malaysia",
          time_deviation: 0,
          condition_deviation: 0,
          url: "https://goo.gl/maps/9d54qkz7DoPSaaDeA",
          items_expired: "of 10",
          dispatched: "03/21/2019 09:16:00",
          delivered: "03/21/2019 15:43:00"
        }
      },
      {
        title: "Pharmacy",
        stage: "PHARMACY"
      },
      {
        title: "Patient",
        stage: "PATIENT"
      }
    ]
  },
  getters: {
    activeEvents: (state, getters) => {
      return state.events.filter(
        item => item.dynamic === false || (item.dynamic === true && getters.activeDeviationsList.includes(item.id))
      );
    },

    articleEventsByCustodian: (state, getters) => {
      return getters.activeEvents
      // get list of custodians from events
        .reduce((acc, curr) => {
          if (acc.findIndex(x => x === curr.custodian) === -1) {
            acc.push(curr.custodian);
            return acc;
          } else return acc;
        }, [])
        // get all events by the custodian. - sue me, i'm in a rush
        .reduce((acc, curr) => {
          let newobject = {
            custodian: curr,
            timeline: getters.activeEvents.filter(item => item.custodian === curr && item.article_view === true)
          };
          return [...acc, newobject];
        }, []);
    },

    activeDeviations: state => {
      return state.deviations.filter(item => item.active === true);
    },

    activeDeviationsList: (state, getters) => {
      return getters.activeDeviations.reduce((acc, curr) => {
        return [...acc, curr.id];
      }, []);
    },

    deviationsByOwnership: state => {
      return state.shipments.reduce((acc, curr) => {
        let newshipment = {
          title: curr.title,
          details: curr.details
        };
        newshipment.timeline = state.deviations.filter(event => event.stage === curr.stage);
        return [...acc, newshipment];
      }, []);
    },

    timeTotal: (state, getters) => {
      return getters.activeDeviations.reduce(
        (acc, curr) => {
          for (let i = 0; i < acc.length; i++) {
            acc[i] += curr.transformations.temperature[i];
          }
          return acc;
        },
        [0, 0, 0, 0, 0, 0]
      );
    },

    excursionTotal: (state, getters) => {
      return getters.activeDeviations.reduce(
        (acc, curr) => {
          for (let i = 0; i < acc.length; i++) {
            acc[i] += curr.transformations.excursions[i];
          }
          return acc;
        },
        [0, 0, 0, 0, 0, 0]
      );
    },
    // TODO:  Excursion Timeline new transformation format

    updatedBands: (state, getters) => {
      return state.bands.reduce((acc, curr, idx) => {
        curr.spent = getters.timeTotal[idx];
        curr.excursions_total = getters.excursionTotal[idx];
        return [...acc, curr];
      }, []);
    },

    psb: (state, getters) => {
      return getters.updatedBands
        .reduce((acc, curr) => {
          if (curr.allowed === "Infinite" || curr.spent === 0) {
            return [
              ...acc,
              {
                k: curr.title,
                v: 100
              }
            ];
          } else if (curr.spent > curr.allowed) {
            return [
              ...acc,
              {
                k: curr.title,
                v: 0
              }
            ];
          } else {
            return [
              ...acc,
              {
                k: curr.title,
                v: Math.max(0, 100 - (curr.spent / curr.allowed) * 100)
              }
            ];
          }
        }, [])
        .reverse();
    }
  },
  mutations: {
    toggleEventActive(state, target) {
      let idx = state.deviations.findIndex(event => event.title === target.title);
      Vue.set(state.deviations[idx], "active", !target.active);
    }
  },
  actions: {
    toggleEvent({ commit }, target) {
      commit("toggleEventActive", target);
    }
  }
});
