<template>
  <div>
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
          <v-container v-for="(owner, index) in deviationsByOwnership" :key="`owner-${index}`">
            <v-list-item class="mb-0">
              {{owner.title}}
              <span v-if="owner.timeline.length < 1" class="caption pl-2">- No Deviations Recorded</span>
            </v-list-item>
            <v-timeline v-if="owner.timeline.length > 0" dense>
              <v-timeline-item
                three-line
                small
                v-for="(deviation, index) in owner.timeline"
                :key="`deviation-${owner.title}-${index}`"
              >
                <p class="body-1 mb-0">Deviation: {{ deviation.id }}</p>
                <p class="caption">{{ deviation.time | formatdate }}</p>
              </v-timeline-item>
            </v-timeline>
          </v-container>
        </v-col>
        <v-col class="pt-0 pb-0 pr-7" md="8">
          <div class="psb-container">
            <radial-bar-chart></radial-bar-chart>
          </div>
          <v-simple-table class="bands-table mb-10">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center caption">Temperature Bands</th>
                  <th class="text-center caption">Time Allowed</th>
                  <th class="text-center caption">Time Spent</th>
                  <th class="text-center caption">Excursions Allowed</th>
                  <th class="text-center caption">Total Excursions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="band in updatedBands" :key="band.name">
                  <td class="text-center">{{ band.title }}</td>
                  <td class="text-center">{{ band.allowed }}</td>
                  <td class="text-center">{{ band.spent }}</td>
                  <td class="text-center">{{ band.excursions_allowed }}</td>
                  <td class="text-center">{{ band.excursions_total }}</td>
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
import RadialBarChart from "./RadialBarChart.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    IconInsightCards,
    RadialBarChart
  },
  computed: {
    ...mapState(["bands"]),
    ...mapGetters(["deviationsByOwnership", 'activeDeviations', 'updatedBands'])
  },
  data() {
    return {
      insights: [
        {
          title: "Patient",
          subtitle: "Custodian",
          icon: "mdi-truck",
          color: "indigo",
          colorModifier: "darken-4"
        },
        {
          title: "Released",
          subtitle: "Quality Release Status",
          icon: "mdi-box",
          color: "red"
        },
        {
          title: "Product OK",
          subtitle: "Article State",
          icon: "mdi-check",
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
  td {
    height: 32px;
    padding: 0 5px;
  }
}
.v-timeline-item {
  padding-bottom: 0;
  margin-bottom: 15px;
  .caption {
    margin-bottom: 0;
  }
}
</style>