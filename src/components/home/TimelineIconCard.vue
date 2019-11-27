<template>
  <div class="event-card">
    <div
      class="icon-circle"
      :style="'border:1px solid ' + colorPick"
    >
      <v-icon
        :color="colorPick"
      >
        {{ icon }}
      </v-icon>
    </div>
    <div class="event-text">
      <h3 :style="'color:' + colorPick">
        <slot name="title" />
      </h3>
      <p><slot name="subtitle" /></p>
      <p>
        <slot name="date" />
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimelineIconCard',
  props: {
    color: {
      type: String,
      default: '#000'
    },
    icon: {
      type: String,
      default: 'mdi-check'
    }
  },
  computed : {
    colorPick(){
      let val = ''
      switch(this.icon){
        case 'mdi-file-document-box-check-outline':
          val = 'green';
        break;
        case 'mdi-location-exit':
          val = '#2196F3'
        break;
        case 'mdi-location-enter':
          val = '#2196F3'
        break;
        case 'mdi-handshake':
          val = '#23395d'
        break;
        case 'mdi-alert-outline':
          val = '#ffae42'
        break;
        default:
          val = 'black'
          break;
      }
      return val
    }
  }
}
</script>
<style lang="scss" scoped>
.event-card {
  &:not(:last-of-type){
    .icon-circle {
      position: relative;
    }
    .icon-circle:after {
      content: ' ';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: calc(100% + 10px);
      border-left: 1px solid lightgrey;
      height: 25px;
    }
  }
}

.event-card {
  display: flex;
  padding: 15px 0;
  align-items: center;
}

.icon-circle {
  padding: 5px;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid black;
}
.event-text {
  padding-left: 15px;
  h3, p {
    margin: 0;
  }
  h3 {
    font-size: 13px;
    span {
      font-weight: 400;
    }
  }
  p {
    color: #777;
    font-size: 12px;
  }
}
</style>
