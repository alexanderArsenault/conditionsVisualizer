<template>
  <v-container outline class="timeline-container">
    <v-sheet >
      <v-tabs grow>
        <v-tab :key="`tab-${idx}`" v-for="(panel, idx) in panels">{{panel.title}}</v-tab>
      </v-tabs>
      <!-- <v-card outlined>
        <v-card-title>Pharmacy</v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="6">
              <p>Product Status</p>
              <p>Remaing Budget</p>
            </v-col>
            <v-col md="6">
              <p>Important</p>
              <p>Information</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card> -->
    </v-sheet>
    <v-card height="calc(100vh - 150px)">
        <v-card-title>Timeline</v-card-title>
      <div v-for="(panel, idx) in panels" class="timeline-list-container" :key="`timeline-group-${idx}`">
        <div class="timeline-item-container" v-for="(item, idx) in panel.timeline" :key="`timeline-item-${idx}`" >
            <div v-if="!item.event" class="timeline-item">
              <p class="body-2 mb-0">
                {{item.title}}
              </p>
            </div>
            <div v-else class="timeline-item timeline-item-actionable">
              <p class="body-1">
                {{item.title}}
              </p>
              <p class="caption mb-0">
                {{item.subtitle}}
              </p>
            </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "EventTimeline",
  data() {
    return {
      panelOpen: 0,
      panels: [
        {
          title: "Manufacturer",
          timeline: [
            {
              title: "Loaded on Truck",
              time: new Date(),
              event: false
            },
            {
              title: "Arrived at airport",
              time: new Date(),
              event: false
            },
            {
              title: "Extended exposure to sun on tarmac",
              subtitle:
                "Standing in sun or Tarmac before being loaded into plane hold, this can be an issue for passive cooling box if certified hours of performance has exceeded",
              time: new Date(),
              event: true,
              temp: "15+",
              duration: "00:00:15:20"
            },
            {
              title: "Plane arrives",
              time: new Date(),
              event: false
            },
            {
              title: "Unforeseen delay at customs",
              subtitle:
                "A delay at customs without active heating is a big oopsie",
              time: new Date(),
              event: true,
              duration: "00:00:15:20"
            },
            {
              title: "Package arrives at Affiliate distributor",
              time: new Date(),
              event: false
            }
          ]
        },
        {
          title: "Affiliate",
          timeline: [
            {
              title: "Package leaves Affiliate distributor",
              time: new Date(),
              event: false
            },
            {
              title: "Failure of truck cooling system",
              subtitle:
                "The trucks cooling system failed. This is widely regarded to be a bad thing.",
              time: new Date(),
              event: true,
              temp: "15+",
              duration: "00:00:15:20"
            },
            {
              title: "Arrives at Wholesaler",
              time: new Date(),
              event: false
            },
            {
              title: "Ownership transfered to Wholesaler",
              time: new Date(),
              event: false
            }
          ]
        },
        {
          title: "Wholesaler",
          timeline: [
            {
              title: "Failure of warehouse environmental controls",
              subtitle:
                "Blackout & backup system error leads to warehouse environmental controls failing",
              time: new Date(),
              event: true,
              temp: "15+",
              duration: "00:00:15:20"
            },
            {
              title: "Product leaves wholesaler",
              time: new Date(),
              event: false
            },
            {
              title: "Product arrives at pharmacy",
              time: new Date(),
              event: false
            },
            {
              title: "Prolonged transfer to storage",
              subtitle:
                "Union mandated break leaves product sitting on the dock before being transfered into condition controlled storage.",
              time: new Date(),
              event: true,
              temp: "15+",
              duration: "00:00:15:20"
            },
            {
              title: "Product put into storage",
              time: new Date(),
              event: false
            }
          ]
        },
        {
          title: "Patient",
          timeline: [
            {
              title: "Product picked up from pharmacy",
              time: new Date(),
              event: false
            },
            {
              title: "Extended exposure to heat in car",
              subtitle:
                "Patient leaves goods in car in a sunny parking lot during shopping",
              time: new Date(),
              event: true,
              temp: "15+",
              duration: "00:00:15:20"
            },
            {
              title: "Product arrives at home and is put into fridge",
              time: new Date(),
              event: false
            },
            {
              title: "Medicine left out of fridge",
              subtitle:
                "Patient forgets to put medicine into fridge after using.",
              time: new Date(),
              event: true,
              temp: "15+",
              duration: "00:00:15:20"
            },
            {
              title: "Product is finished",
              time: new Date(),
              event: false
            },
            {
              title: "Logger returned",
              time: new Date(),
              event: false
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.timeline-scrollarea{
  max-height: 100%;
  overflow: scroll;
}

.timeline-item-container {
  padding-left: 50px;
  margin: 20px 0;
  position: relative;
}

.timeline-item {
    &:before {
    display: block;
    content: ' ';
    height: 10px;
    width: 10px;
    position: absolute;
    left: 20px;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    background-color: #101d32;
  }
}
.timeline-item-actionable {
  border: 1px solid black;
  border-radius: 5px;
  padding: 20px;
}
</style>