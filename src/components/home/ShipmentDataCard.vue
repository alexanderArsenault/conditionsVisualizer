<template>
  <v-card outlined :class=" {'killed' : failConditionOne}">
    <v-card-title class="ml-4 mt-4 pb-0 pt-0">
      <v-row>
        <v-col md="6">{{card.title}}</v-col>
        <v-col md="6" class="pl-5">{{ failConditionOne ? 'Rejected' : statusFormat}}</v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="shipment-card">
      <v-row>
        <v-col class="pt-0 pb-0" md="6">
          <v-list class="pt-0 pb-0" dense>
            <v-list-item>
              <v-list-item-content class="caption">Owner:</v-list-item-content>
              <v-list-item-content class="body">{{ card.owner }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="caption">Dispatched On:</v-list-item-content>
              <v-list-item-content class="body">{{ card.dispatched | formatdate }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="caption">Dispatched From:</v-list-item-content>
              <v-list-item-content class="body">{{ card.sending}}</v-list-item-content>
            </v-list-item>
            <v-list-item v-if="hasDeviations">
              <v-list-item-content class="caption">Deviations:</v-list-item-content>
              <v-list-item-content class="body">{{ deviations.length }}</v-list-item-content>
            </v-list-item>
            <v-list-item v-if="hasDeviations">
              <v-list-item-content class="caption">Schedule Deviation:</v-list-item-content>
              <v-list-item-content class="body">{{ scheduleDeviation }} {{ scheduleDeviation === 0 ? '' : 'hours'}}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col class="pt-0 pb-0" md="6">
          <v-list class="pt-0 pb-0" dense>
            <v-list-item>
              <v-list-item-content class="caption">Custodian:</v-list-item-content>
              <v-list-item-content class="body">{{ card.custodian }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="caption">Delivered On:</v-list-item-content>
              <v-list-item-content class="body">{{ card.delivered | formatdate }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="caption">Delivered To:</v-list-item-content>
              <v-list-item-content class="body">{{ card.receiving }}</v-list-item-content>
            </v-list-item>
            <v-list-item v-if="hasDeviations">
              <v-list-item-content class="caption">Items Expired:</v-list-item-content>
              <v-list-item-content class="body">{{expiredItems}} {{ card.items_expired }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
// TODO: URL ICOM / IFRAME
// TODO: Hide items/ deviations/ schedule deviations if no fault
// TODO: see status
export default {
  name: "shipmentDataCard",
  props: {
    card: {
      type: Object
    },
    deviation: {
      type: Boolean
    },
    deviations: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    statusFormat() {
      let readable = "";
      switch (this.hasDeviations) {
        case true:
          readable = "Partial Release";
          break;
        default:
          readable = "Shipment Released";
      }
      return readable;
    },
    hasDeviations() {
      return this.deviations.length > 0
    },
    scheduleDeviation(){
      return this.deviations.reduce( (acc, curr) => {
        if (curr.time_deviation === undefined) return acc
        return acc = acc + curr.time_deviation
      }, 0)
    },
    expiredItems(){
      return this.deviations.reduce( (acc, curr) => {
        if (curr.items_expired === undefined) return acc
        return acc = acc + curr.items_expired
      }, 0)
    },
    failConditionOne(){
			return this.deviations.filter( x => x.id === 'ID1908464').length > 0
		}
  }
};
</script>
<style lang="scss" scoped>
.shipment-card {
  .v-list-item {
    min-height: 30px;
  }
  .v-list-item__content {
    padding: 4px 0;
  }
}

.has-deviation.killed {
  border: 1px solid red !important;
}
</style>