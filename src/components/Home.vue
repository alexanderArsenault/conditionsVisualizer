<template>
  <v-container fluid class="size-me">
    <p class="display-1 mt-5">Shipment Overview</p>
    <icon-insight-cards :cards="insights"></icon-insight-cards>
    <v-row>
      <v-col md="4">
        <v-sheet class="pb-6" elevation="1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Timeline</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-chevron-down</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <events-timeline />
        </v-sheet>
      </v-col>
      <v-col md="8">
        <v-sheet elevation="1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Shipment Data</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-container class="pt-0">
            <v-row :key="`shipment-card-${index}`" v-for="(shipment, index) in shipmentCards">
              <v-col>
                <shipment-data-card :card="shipment" />
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <p class="display-1 mb-10 mt-5">Article Overview</p>

    <v-sheet class="mb-3" elevation="1">
      <v-row class="mr-5 ml-5 pb-4 pt-4">
        <v-col class="overview-header-item" md="4">
          <p class="body-2">Product Details</p>
          <p class="subtitle">Anineziperine™</p>
        </v-col>
        <v-col class="overview-header-item" md="4">
          <p class="body-2">Product Identifier</p>
          <p class="subtitle">HG-705215-AE</p>
        </v-col>
        <v-col class="overview-header-item" md="4">
          <p class="body-2">Production Batch</p>
          <p class="subtitle">#02990005</p>
        </v-col>
      </v-row>
    </v-sheet>
    <icon-insight-cards :cards="insights"></icon-insight-cards>

    <v-sheet class="mt-3" elevation="2">
      <v-list-item>Product Stability Budget</v-list-item>
      <v-row class="pb-5">
        <v-col class="pt-0 pb-0" md="4">
          <v-list class="pt-0 pb-0" dense>
            <v-list-item>
              <v-list-item-content class="top-fix caption">Status:</v-list-item-content>
              <v-list-item-content class="body">Automated Rejection, Verify Data</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="caption">Contact:</v-list-item-content>
              <v-list-item-content class="body">Marie S.B Mueller</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="top-fix caption">Location:</v-list-item-content>
              <v-list-item-content class="body">Hospital Warehouse</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="top-fix caption">Deviations:</v-list-item-content>
              <v-list-item-content>
                <p class="body">#STF00023462</p>
                <p class="link pb-2">(see map)</p>
                <p class="body">#STF00023462</p>
                <p class="link pb-2">(see map)</p>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="top-fix caption">Alarms:</v-list-item-content>
              <v-list-item-content>
                <p class="body-1">Over20ColdChain</p>
                <p class="body-2">J.P Langley</p>
                <p class="body-2">{{new Date() | formatdate }}</p>
                <p class="body-2">078-***-****</p>
                <p class="body-2 link">and 4 others</p>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col class="pt-0 pb-0 pr-7" md="8">
          <div class="psb-container">
            <radial-bar-chart></radial-bar-chart>
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center caption">Temperature Bands</th>
                  <th class="text-center caption">Time Allowed</th>
                  <th class="text-center caption">Time Spent</th>
                  <th class="text-center caption">Time Allowed</th>
                  <th class="text-center caption">Time Spent</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="band in bands" :key="band.name">
                  <td class="text-center">{{ band.title }}</td>
                  <td class="text-center">{{ band.allowed }}</td>
                  <td class="text-center">{{ band.spent }}</td>
                  <td class="text-center">{{ band.three }}</td>
                  <td class="text-center">{{ band.four }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script>
import IconInsightCards from "./home/IconInsightCards";
import EventsTimeline from "./home/EventsTimeline.vue";
import ShipmentDataCard from "./home/ShipmentDataCard.vue";
import RadialBarChart from "./RadialBarChart.vue";

export default {
  name: "Home",
  components: {
    IconInsightCards,
    ShipmentDataCard,
    EventsTimeline,
    RadialBarChart
  },
  data() {
    return {
      bands: [
        {
          title: "> 15°C",
          allowed: 2,
          spent: 1,
          three: 45,
          four: 100
        },
        {
          title: "8°C - 15°C",
          allowed: 720,
          spent: 450,
          three: 45,
          four: 100
        },
        {
          title: "2°C - 8°C",
          allowed: 3200,
          spent: 2400,
          three: 45,
          four: 100
        },
        {
          title: "< -2°C",
          allowed: 2,
          spent: 1,
          three: 45,
          four: 100
        }
      ],
      insights: [
        {
          title: "I'm the title",
          subtitle: "I'm the subtitle",
          icon: "mdi-truck",
          color: "indigo",
          colorModifier: "darken-4"
        },
        {
          title: "I'm the title",
          subtitle: "I'm the subtitle",
          icon: "mdi-box",
          color: "red"
        },
        {
          title: "I'm the title",
          subtitle: "I'm the subtitle",
          icon: "mdi-check",
          color: "black"
        }
      ],
      shipmentCards: [
        {
          title: "#OA 66780093",
          custodian: "Marie S.B Mueller",
          sending: "Wholesaler",
          receiving: "Hospital Warehouse",
          transport: "Air",
          forwarder: "UPS",
          transporter: "KLM",
          sent: new Date(),
          received: new Date()
        },
        {
          title: "#OA 66780093",
          custodian: "Marie S.B Mueller",
          sending: "Wholesaler",
          receiving: "Hospital Warehouse",
          transport: "Air",
          forwarder: "UPS",
          transporter: "KLM",
          sent: new Date(),
          received: new Date()
        },
        {
          title: "#OA 66780093",
          custodian: "Marie S.B Mueller",
          sending: "Wholesaler",
          receiving: "Hospital Warehouse",
          transport: "Air",
          forwarder: "UPS",
          transporter: "KLM",
          sent: new Date(),
          received: new Date()
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.overview-header-item {
  text-align: center;
  &:first-of-type {
    text-align: left;
  }
  &:last-of-type {
    text-align: right;
  }
  > p {
    margin-bottom: 0;
    padding-bottom: -10px;
  }
}
.link {
  color: #385898;
  text-decoration: underline;
}
.top-fix {
  align-self: flex-start;
}

.psb-container {
  width: 300px;
  margin: 0 auto;
  height: 300px;
  margin-top: -40px;
}
</style>
