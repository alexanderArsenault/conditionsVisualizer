<template>
  <v-container outline class="timeline-container">
    <v-card-title class="pt-6">Timeline</v-card-title>

    <v-tabs v-model="tab" grow>
      <v-tab :key="`tab-${idx}`" v-for="(panel, idx) in deviationsByOwnership.filter( (entry) => entry.timeline.length > 0)">
        <v-icon left>mdi-numeric-{{ panel.timeline.filter( x => x.active).length }}-box</v-icon>
        {{panel.title}}
      </v-tab>
    </v-tabs>

  <v-divider></v-divider>
    <v-tabs-items v-model="tab" class="pt-5">
      <v-tab-item
        v-for="(panel, panelidx) in deviationsByOwnership.filter( (entry) => entry.timeline.length > 0)"
        class="timeline-list-container"
        :key="`timeline-group-${panelidx}`"
      >
        <div
          class="timeline-item-container"
          v-for="(item, idx) in panel.timeline"
          :key="`timeline-item-${panelidx}-${idx}`"
        >
          <div v-if="item.event_type === 'TRACK_AND_TRACE'" class="timeline-active pl-5">
            <p class="body-2 mb-0">{{item.title}}</p>
            <p class="caption">{{item.time | formatdate}}</p>
          </div>
          <div v-if="item.event_type === 'USER_EVENT'"  @click="activeEvent(item)" :class="[{'timeline-active' : item.active}, 'timeline-item-actionable']">
            <p class="body-1 mb-0">{{item.title}}</p>
            <p class="caption">{{item.time | formatdate}}</p>
            <p class="caption mb-0">{{item.subtitle}}</p>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: "EventTimeline",
  computed: {
    ...mapState(['shipments']),
    ...mapGetters(['deviationsByOwnership'])
  },
  data() {
    return {
      tab: 0,
      panelOpen: 0,
    };
  },
  methods: {
    activeEvent(event){
      this.$store.dispatch('toggleEvent', event)
    }
  }
};
</script>
<style lang="scss" scoped>
.timeline-scrollarea {
  max-height: 100%;
  overflow: scroll;
}

.timeline-item-container {
  padding-left: 50px;
  margin: 20px 0;
  position: relative;
}

.timeline-item-actionable {
  border: 1px solid lightgrey;
  color: #606060;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 20px;
    &:before {
    display: block;
    content: " ";
    height: 10px;
    width: 10px;
    position: absolute;
    left: 20px;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    background-color: #dfdfdf;
  }
}

.timeline-active {
  &:before {
    display: block;
    content: " ";
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

.timeline-item-actionable.timeline-active {
  border-color: #101d32;
  color: #101d32;
  background-color: #b3d4fc;
}
</style>