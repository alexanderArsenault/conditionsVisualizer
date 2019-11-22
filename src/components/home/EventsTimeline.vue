<template>
  <div class="timeline-list">
    <timeline-card
      v-for="(event,index) in events"
      :key="index"
      :color="event.color"
      :icon="event.icon"
    >
      <template v-slot:title>
        {{ event.type }}
      </template>
      <template v-slot:subtitle>
        {{ event.detail }}
      </template>
      <template v-slot:date>
        {{ event.time }}
      </template>
    </timeline-card>
  </div>
</template>
<script>
import TimelineCard from './TimelineCard.vue'

export default {
  name: 'ShipmentDetailPage',
  components: {
    TimelineCard
  },
  data () {
    return {
      events: [
        {
          type: 'Recieved:',
          detail: 'Affiliate Warehouse',
          icon: 'mdi-truck',
          time: '3 days ago',
          color: '#002266'
        },
        {
          type: 'Deviation Recorded',
          icon: 'mdi-alert',
          time: '3 days ago',
          color: '#CC6666'
        },
        {
          type: 'Data Integrated:',
          detail: 'MOD-4209',
          icon: 'mdi-chart-line-variant',
          time: '3 days ago',
          color: '#6666FF'
        },
        {
          type: 'Logger Sent:',
          detail: 'MOD-4209',
          icon: 'mdi-check',
          time: '6 days ago',
          color: '#002266'
        },
        {
          type: 'Recieved:',
          detail: 'Affiliate Warehouse',
          icon: 'mdi-airplane',
          time: '3 hours ago',
          color: '#002266'
        },
        {
          type: 'Recieved:',
          detail: 'Affiliate Warehouse',
          icon: 'mdi-airplane',
          time: '3 hours ago',
          color: '#002266'
        },
        {
          type: 'Recieved:',
          detail: 'Affiliate Warehouse',
          icon: 'mdi-airplane',
          time: '3 hours ago',
          color: '#002266'
        },
        {
          type: 'Recieved:',
          detail: 'Affiliate Warehouse',
          icon: 'mdi-truck',
          time: '3 hours ago',
          color: '#002266'
        },
        {
          type: 'Recieved:',
          detail: 'Affiliate Warehouse',
          icon: 'mdi-truck',
          time: '3 hours ago',
          color: '#002266'
        },
        {
          type: 'Recieved:',
          detail: 'Affiliate Warehouse',
          icon: 'mdi-truck',
          time: '3 hours ago',
          color: '#002266'
        }
      ]
    }
  }
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
