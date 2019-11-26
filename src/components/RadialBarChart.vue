<template>
  <div>
    <svg :width="container" :height="container" v-bind:class="[{expired: minValue==0}, {expired: kill}]">
      <g :transform="`translate(${(container)/2}, ${container/2})`">
        <!-- Axial Axis + labels -->
        <g
          v-for="(tick, i) in axialTicks"
          :key="'axial-group' + i"
          :transform="`rotate(${axialRotation(tick)})` "
        >
          <line :x2="(width / 2) + (width * 0.107)" class="axis" />

          <text
            :x="width / 2 + (width * 0.15)"
            :style="`font-size: 12px; text-anchor:${tick > 50 ? 'end' : 'start'}`"
            :transform="`rotate(${+ -1 * (axialRotation(tick))}, ${width / 2 + (width * 0.15)}, 0) translate(0,4) `"
          >{{tick + '%'}}</text>
        </g>

        <!-- center background -->
        <circle :r="width/4.5" style="fill: #fafafa" />

        <!-- center value -->
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          class="min"
          :y="'-' + width * 0.02"
          :style="{ fontSize: width/5 + 'px' }"
        >{{ stabilityScore }}</text>

        <!-- center label -->
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          :style="{fontSize: width/22 + 'px'}"
          :y="width * 0.09"
        >Stability Score</text>

        <!-- radial axis -->
        <circle
          v-for="(x, i) in psb"
          v-bind:key="`radialaxis-${x.k}`"
          :r="radialAxis(i)"
          fill="transparent"
          stroke-width="1"
          stroke="#aaa"
        />

        <!-- Grey fill background -->
        <path
          v-for="(x, i) in psb"
          v-bind:key="`background-${x.k}`"
          :d="fullPath(i)"
          fill="#e5e5e5"
        />

        <!-- coloured spinner -->
        <path v-for="(x, i) in psb" v-bind:key="x.k" :d="path(i)" :fill="color(x)" />

        <g :transform="`translate(0, ${height* 0.415 * -1})`">
          <!-- labels -->
          <rect
            :y="i*height*(-0.05) + (height * 0.07)"
            :x="- width*0.25 / 2"
            fill="#fff"
            class="band-label"
            :width="width*0.25"
            :height="height*0.05"
            v-for="(x, i) in psb"
            v-bind:key="`bg-${x.k}`"
          />

          <text
            :y="i*height*(-0.0535) + (height * 0.12)"
            v-for="(x, i) in psb"
            v-bind:key="`label-${x.k}`"
            text-anchor="middle"
            v-bind:class="{warning: x.v==0}"
            dominant-baseline="middle"
            :style="{ fontSize: width / 25 + 'px'}"
          >{{ x.k }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { arc } from "d3-shape";
import { TweenLite } from "gsap/TweenLite";
import { scaleLinear } from "d3-scale";
import { interpolateYlOrBr } from "d3-scale-chromatic";
import { mapGetters } from "vuex";

const angularScale = scaleLinear()
  .domain([0, 100])
  .range([0.1 * 2 * Math.PI, 0.9 * 2 * Math.PI]);

export default {
  data() {
    return {
      container: 450,
      width: 400,
      height: 400,
      values: [
        { k: "<-10°C - 0°C", v: 100 },
        { k: "0°C - 2°C", v: 100 },
        { k: "2°C - 8°C", v: 100 },
        { k: "8°C - 15°C", v: 100 },
        { k: "15°C - 25°C", v: 100 },
        { k: "> 25°C", v: 100 },
      ]
    };
  },

  props: {
    kill: {
      type: Boolean,
      default: false,
    }
  },

  watch: {
    psb: "tweento"
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
    this.tweento();
  },

  computed: {
    ...mapGetters(["psb"]),

    minValue() {
      return Math.floor(Math.min(...this.values.map(x => x.v)));
    },

    stabilityScore() {
      if (this.minValue === 0) return 0;
      if (this.kill) return 0;
      return Math.floor(
        this.values.reduce((acc, curr) => {
          return (acc = acc + curr.v);
        }, 0) / this.values.length
      );
    },

    axialTicks() {
      return angularScale.ticks(11);
    }
  },

  methods: {
    tweento() {
      for (let i = 0; i < this.values.length; i++) {
        TweenLite.to(this.$data.values[i], 2, {
          v: this.psb[i].v
        });
      }
    },

    path(i) {
      var a = arc()
        .innerRadius(this.height * 0.3 + i * this.height * 0.05)
        .outerRadius(
          this.height * 0.3 + (i + 1) * this.height * 0.05 - this.height * 0.02
        )
        .startAngle(angularScale(0))
        .endAngle(angularScale(this.values[i].v));
      return a();
    },

    fullPath(i) {
      var a = arc()
        .innerRadius(this.height * 0.3 + i * this.height * 0.05)
        .outerRadius(
          this.height * 0.3 + (i + 1) * this.height * 0.05 - this.height * 0.02
        )
        .startAngle(angularScale(0))
        .endAngle(angularScale(100));
      return a();
    },

    radialAxis(i) {
      // innerRadius + outerRadius / 2
      return (
        (this.height * 0.3 +
          i * this.height * 0.05 +
          (this.height * 0.3 +
            (i + 1) * this.height * 0.05 -
            this.height * 0.01)) /
        2
      );
    },

    axialRotation(tickvalue) {
      // As established in angularScale
      let availableRange = 360 * 0.8;
      // offset from 3pm -> 12am, and move over 1/10th of 360 for the new 0 position
      return -90 + 36 + availableRange * (tickvalue / 100);
    },

    color(x) {
      if (x.v === 100){
        return '#1db954'
      }
      return interpolateYlOrBr(1 - x.v / 100);
    },

    onResize() {
      if (this.$el.offsetWidth > 1) {
        this.container = this.$el.offsetWidth;
        this.width = this.container - 110;
        this.height = this.width;
      }
    }
  }
};
</script>

<style scoped>
h3 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: -10px;
}

svg {
  display: block;
  /* background-color: #eee; */
}
path {
  will-change: d;
}
input {
  margin: 0;
  width: 100%;
}
text {
  font-weight: 100;
  font-family: "Open Sans", sans-serif;
}
.warning text.min {
  fill: red;
}
.expired text.min {
  fill: red;
}
text.warning {
  fill: red;
  font-weight: 800;
}

.axis {
  stroke-width: 1px;
  stroke: #aaa;
}

.band-label {
  background-color: #fff;
  border-radius: 5px;
  padding: 2px;
}
</style>