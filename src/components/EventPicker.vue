<template>
  <v-container fluid>
    <v-row dense>
      <v-col >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-card-title>
            Pharma Co.
            <v-spacer/>
            <v-icon>mdi-airplane</v-icon>
          </v-card-title>

          <v-divider></v-divider>

          <v-list>
            <v-list-item-group multiple v-model="pharma" color="secondary">
              <v-list-item three-line class="mb-2">
                <v-list-item-content>
                  <v-list-item-title>Left too long on tarmac</v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-spacer></v-spacer>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Headline 5</v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-card-title>
            Affiliate
            <v-spacer/>
            <v-icon>mdi-truck</v-icon>
          </v-card-title>

          <v-divider></v-divider>

          <v-list>
            <v-list-item-group multiple v-model="affiliate" color="secondary">
              <v-list-item three-line class="mb-2">
                <v-list-item-content>
                  <v-list-item-title>Left too long on tarmac</v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-spacer></v-spacer>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Headline 5</v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-card-title>
            Wholesaler
            <v-spacer/>
            <v-icon>mdi-truck</v-icon>
          </v-card-title>

          <v-divider></v-divider>

          <v-list>
            <v-list-item-group multiple v-model="wholesaler" color="secondary">
              <v-list-item three-line class="mb-2">
                <v-list-item-content>
                  <v-list-item-title>Left too long on tarmac</v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-spacer></v-spacer>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Headline 5</v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      
      <v-col >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-card-title>
            Pharmacy
            <v-spacer/>
            <v-icon>mdi-car-estate</v-icon>
          </v-card-title>

          <v-divider></v-divider>

          <v-list>
            <v-list-item-group multiple v-model="pharmacy" color="secondary">
              <v-list-item three-line class="mb-2">
                <v-list-item-content>
                  <v-list-item-title>Left too long on tarmac</v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-spacer></v-spacer>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Headline 5</v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      pharma: [0,1],
      affiliate: [1],
      wholesaler: [0],
      pharmacy: [1],
    }
  }
};

</script>


