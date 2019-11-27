<template>
  <div>
    <v-sheet class="mb-3" elevation="1">
      <v-row class="mr-5 ml-5 pb-4 pt-4">
        <v-col class="overview-header-item" md="3">
          <p class="body-2">Product Details</p>
          <p class="subtitle">Fiasp™</p>
        </v-col>
        <v-col class="overview-header-item" md="3">
          <p class="body-2">Product Identifier (GTIN)</p>
          <p class="subtitle">7680662010017</p>
        </v-col>
        <v-col class="overview-header-item" md="3">
          <p class="body-2">Serial Number</p>
          <p class="subtitle">126103</p>
        </v-col>
        <v-col class="overview-header-item" md="3">
          <p class="body-2">LOT</p>
          <p class="subtitle">#10802954</p>
        </v-col>
      </v-row>
    </v-sheet>
    <icon-insight-cards :cards="insights"></icon-insight-cards>

    <v-sheet class="mt-3" elevation="2">
      <v-list-item class="headline pt-6 pb-4">Product Stability Budget</v-list-item>
      <v-list-item class="subtitle">Events by Custodian</v-list-item>
      <v-row class="pb-5">
        <v-col class="pt-0 pb-0" md="4">
          <v-expansion-panels accordion mandatory class="event-sidebar">
            <v-expansion-panel
              v-for="(owner, index) in articleEventsByCustodian"
              :key="`owner-${index}`"
            >
              <v-expansion-panel-header>{{owner.custodian}}</v-expansion-panel-header>
              <v-expansion-panel-content>
              <events-icon-timeline style="max-height: 250px;" :eventsList="owner.timeline" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col class="pt-0 pb-0 pr-7" md="8">
          <div class="psb-container">
            <radial-bar-chart :kill="tooManyExcursions"></radial-bar-chart>
          </div>
          <v-simple-table class="bands-table mb-10">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center caption">Temperature Bands</th>
                  <th class="text-center caption">Time Allowed</th>
                  <th class="text-center caption">Time Spent</th>
                  <th class="text-center caption">Excursions Allowed</th>
                  <th :class="['text-center caption', { bold: tooManyExcursions }]">Total Excursions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="band in updatedBands"
                  :key="band.name"
                  :class="{ expired: band.excursions_total > band.excursions_allowed }"
                >
                  <td class="text-center">{{ band.title }}</td>
                  <td class="text-center">{{ band.allowed }}</td>
                  <td class="text-center">{{ band.spent }}</td>
                  <td class="text-center">{{ band.excursions_allowed }}</td>
                  <td
                    :class="['text-center', { bold: band.excursions_total > band.excursions_allowed }]"
                  >{{ band.excursions_total }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table v-if="activeDeviations.length > 0" class="bands-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center caption">Deviation ID</th>
                  <th class="text-center caption">Average Magnitude</th>
                  <th class="text-center caption">Duration</th>
                  <th class="text-center caption">Custodian</th>
                  <th class="text-center caption">Quality Release Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="deviation in activeDeviations" :key="deviation.name">
                  <td class="text-center">{{ deviation.id }}</td>
                  <td class="text-center">{{ deviation.magnitude }}</td>
                  <td class="text-center">{{ deviation.duration }} hrs</td>
                  <td class="text-center">{{ deviation.custodian }}</td>
                  <td class="text-center">{{ deviation.status }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import IconInsightCards from "./home/IconInsightCards";
import EventsIconTimeline from "./home/EventsIconTimeline";
import RadialBarChart from "./RadialBarChart.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    IconInsightCards,
    RadialBarChart,
    EventsIconTimeline
  },
  computed: {
    ...mapState(["bands"]),
    ...mapGetters([
      "articleEventsByCustodian",
      "activeDeviations",
      "updatedBands",
      "activeEvents"
    ]),
    tooManyExcursions() {
      return (
        this.bands.filter(
          band => band.excursions_total > band.excursions_allowed
        ).length > 0
      );
    }
  },
  data() {
    return {
      insights: [
        {
          title: "Patient",
          subtitle: "Custodian",
          icon: "mdi-account",
          color: "indigo",
          colorModifier: "darken-4"
        },
        {
          title: "Released",
          subtitle: "Quality Release Status",
          icon: "mdi-file-document-box-check-outline",
          color: "red"
        },
        {
          title: "Product OK",
          subtitle: "Article State",
          icon: "mdi-checkbox-marked-circle-outline",
          color: "black"
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

.psb-container {
  position: relative;
  width: 320px;
  margin: 0 auto;
  height: 320px;
  margin-top: -40px;
}
.bands-table ::v-deep {
  tr.expired {
    background-color: #ffe3e1;
  }
  td {
    height: 32px;
    padding: 0 5px;
  }
  .bold {
    font-weight: 600;
  }
}
.v-timeline-item {
  padding-bottom: 0;
  margin-bottom: 15px;
  .caption {
    margin-bottom: 0;
  }
}
.event-sidebar ::v-deep{
  .v-expansion-panel-content__wrap {
    padding: 0;
    padding-bottom: 20px;
    padding-left: 5px;
  }
}
</style>