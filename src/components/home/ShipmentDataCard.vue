<template>
  <v-card outlined>
    <v-card-title class="ml-4 mt-4 pb-0 pt-0">
      <v-row>
        <v-col md="6">{{card.title}}</v-col>
        <v-col md="6" class="pl-5">{{statusFormat}}</v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="shipment-card">
      <v-row>
        <v-col class="pt-0 pb-0" md="6">
          <v-list class="pt-0 pb-0" dense>
            <v-list-item>
              <v-list-item-content class="caption">Custodian:</v-list-item-content>
              <v-list-item-content class="body">{{ card.custodian }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="caption">Owner:</v-list-item-content>
              <v-list-item-content class="body">{{ card.owner }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="caption">Sending Site:</v-list-item-content>
              <v-list-item-content class="body">{{ card.sending}}</v-list-item-content>
            </v-list-item>
						<v-list-item>
              <v-list-item-content class="caption">Time Sent:</v-list-item-content>
              <v-list-item-content class="body">{{ card.dispatched | formatdate }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col class="pt-0 pb-0" md="6">
          <v-list dense>
						<v-list-item>
              <v-list-item-content class="caption">Deviations:</v-list-item-content>
              <v-list-item-content class="body">{{ card.deviations }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="caption">Time Delta:</v-list-item-content>
              <v-list-item-content class="body">{{ card.time_delta }}</v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="caption">Receiving Site:</v-list-item-content>
              <v-list-item-content class="body">{{ card.receiving }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="caption">Time Delivered:</v-list-item-content>
              <v-list-item-content class="body">{{ card.delivered | formatdate }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "shipmentDataCard",
  props: {
    card: {
      type: Object
    }
  },
  computed: {
    statusFormat(){
      let readable = '';
      switch (this.card.status){
        case 0:
          readable = 'Product OK'
          break;
        case 1:
          readable = 'Deviations Occurred'
          break;
        case 2:
          readable = 'Budget Depleted'
          break;
        default:
          readable = ' Product OK'
      }
      return readable
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
</style>