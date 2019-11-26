<template>
  <div class="timeline-list">
    <timeline-icon-card
      v-for="(event,index) in eventsList"
      :key="index"
      :color="event.color"
      :icon="'mdi-' + event.icon"
    >
      <template v-slot:title>
        {{ event.title }}
      </template>
      <template v-slot:subtitle>
        {{ event.custodian }}
      </template>
      <template v-slot:date>
        {{ new Date(event.timestamp) | formatdate }}
      </template>
    </timeline-icon-card>
  </div>
</template>
<script>
import TimelineIconCard from './TimelineIconCard.vue'

export default {
  name: 'Timeline',
  props: {
    eventsList: {
      type: Array,
      required: true,
    }
  },
  components: {
    TimelineIconCard
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
.timeline-list {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  max-height: 730px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
