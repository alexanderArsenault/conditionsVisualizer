<template>
  <div>
    <svg
      :width="svgWidth"
      :height="svgHeight"
    >
      <defs>
        <clipPath id="clip">
          <rect
            :width="width"
            :height="height"
          />
        </clipPath>
      </defs>

      <g
        class="graph"
        :transform="`translate(${padding.left},${padding.top})`"
      >

        <g class="temperature">
          <path
            :d="dataLine"
            fill="none"
            clip-path="url(#clip)"
          />

          <g
            class="yAxis"
            :transform="`translate(0,${padding.top})`"
          />
        </g>

        <g class="humidity">
          <path
            :d="data2Line"
            fill="none"
            clip-path="url(#clip)"
          />
          <circle
            v-for="(d, i) in data2Points"
            :key="`c2-${i}`"
            :cx="d.x"
            :cy="d.y"
            r="4"
            clip-path="url(#clip)"
          />
          <g
            class="y2Axis"
            :transform="`translate(${width},${padding.top})`"
          />
        </g>

        <g
          class="xAxis"
          :transform="`translate(0,${svgHeight-padding.bottom})`"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'
import { line, curveCatmullRom } from 'd3-shape'

const aspectRatio = 1 / (16 / 9) // 4:3 aspect ratio for beamer

export default Vue.extend({
  props: {
    live: {
      type: Boolean,
      default: () => true,
    },
    data: {
      type: Array,
      required: true
    },

    data2: {
      type: Array,
      required: false,
      default: () => []
    },

    padding: {
      type: Object,
      default: () => {
        return {
          top: 10,
          right: 10,
          bottom: 40,
          left: 60
        }
      }
    },

    showPastNSeconds: {
      type: Number,
      default: () => 180
    },

    showFutureNSeconds: {
      type: Number,
      default: () => 10
    },

    yAxisFormatter: {
      type: Function,
      default: v => `${v} °C`
    }
  },
  data () {
    return {
      svgWidth: 0,
      now: new Date()
    }
  },

  computed: {
    // height of the svg to match aspect ratio
    svgHeight () {
      return this.svgWidth * aspectRatio
    },

    // dimensions of the graph area (everythin gwithout padding)
    height () {
      return this.svgHeight - this.padding.top - this.padding.bottom
    },
    
    width () {
      return this.svgWidth - this.padding.left - this.padding.right
    },

    xScale () {
      let from = this.xValues[0]
      let to = this.xValues[this.xValues.length - 1]
      return scaleTime()
        .domain([from, to])
        .range([0, this.width])
    },

    yScale () {
      return scaleLinear()
        .domain([0,20])
        .range([this.height, 0])
    },

    y2Scale () {
      return scaleLinear()
        .domain([0, 1])
        .range([this.height, 0])
    },

    xValues () {
      return this.data.map(d => d.x)
    },

    yValues () {
      return this.data.map(d => d.y)
    },

    xAxis () {
      return axisBottom(this.xScale).tickValues(2);
      // return axisBottom(this.xScale).tickValues(this.xScale.domain());
    },

    yAxis () {
      return axisLeft(this.yScale)
        .tickFormat(this.yAxisFormatter)
        .tickSize(-this.width)
        .tickSizeOuter(0)
    },

    lineGenerator () {
      return line()
        .curve(curveCatmullRom)
        .x(d => this.xScale(d.x))
        .y(d => this.yScale(d.y))
    },

    line2Generator () {
      return line()
        .curve(curveCatmullRom)
        .x(d => this.xScale(d.x))
        .y(d => this.y2Scale(d.y))
    },

    dataLine () {
      return this.lineGenerator(this.data)
    },

    data2Line () {
      return this.line2Generator(this.data2)
    },

    dataPoints () {
      return this.data.map(d => {
        return {
          x: this.xScale(d.x),
          y: this.yScale(d.y)
        }
      })
    },

    data2Points () {
      return this.data2.map(d => {
        return {
          x: this.xScale(d.x),
          y: this.y2Scale(d.y)
        }
      })
    }
  },

  watch: {
    xAxis () {
      select(this.$el)
        .select('.xAxis')
        .call(this.xAxis)
    },
    yAxis () {
      select(this.$el)
        .select('.yAxis')
        .call(this.yAxis)
    },
    y2Axis () {
      select(this.$el)
        .select('.y2Axis')
        .call(this.y2Axis)
    }
  },

  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()

    // keep track of current window at around 30 fps
    if (this.live){
      setInterval(this.updateNow, 50)
    }
  },

  methods: {
    onResize () {
      this.svgWidth = this.$el.offsetWidth
    },

    updateNow () {
      this.now = new Date()
    }
  }
})

</script>

<style lang="scss" scoped>
svg {
  display: block;

  .temperature {
    path {
      stroke: #101d32;
      stroke-width: 3;
    }

    circle {
      fill: rgb(238, 68, 170);
      stroke: black;
    }

    ::v-deep .tick line {
      stroke: darkgrey;
      stroke-dasharray: 3, 3;
      shape-rendering: crispEdges;
    }
  }

  .humidity {
    path {
      stroke: lighten(rgb(33, 150, 243), 30%);
      stroke-width: 3;
    }

    circle {
      fill: lighten(rgb(33, 150, 243), 30%);
      stroke: black;
    }
  }

}
</style>
