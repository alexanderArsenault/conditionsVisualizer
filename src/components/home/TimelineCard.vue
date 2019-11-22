<template>
  <div class="event-card">
    <div
      class="icon-circle"
      :style="'border:1px solid ' + color"
    >
      <v-icon
        :color="color"
      >
        {{ icon }}
      </v-icon>
    </div>
    <div class="event-text">
      <h3>
        <slot name="title" /><span><slot name="subtitle" /></span>
      </h3>
      <p>
        <slot name="date" />
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimelineCard',
  props: {
    color: {
      type: String,
      default: '#000'
    },
    icon: {
      type: String,
      default: 'mdi-check'
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
      top: calc(100% + 9px);
      border-left: 1px solid lightgrey;
      height: 25px;
    }
  }
}

.event-card {
  display: flex;
  padding: 20px 0;
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
