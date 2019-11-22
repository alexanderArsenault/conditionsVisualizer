<template>
    <v-row>
      <v-col
        v-for="(card, index) in cards"
        :key="index"
      >
        <v-card
          :key="index"
          :elevation="1"
          tile
        >
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon
                class="outlined"
                :color="`${card.color} ${card.colorModifier}`"
              >
                {{ card.icon }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="my-2">
              <v-list-item-title
                :class="[card.color && `${card.color}--text`, card.colorModifier && `text--${card.colorModifier}`]"
                class="title font-weight-regular"
              >
                {{ card.title }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ card.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
</template>
<script>
export default {
  name: 'IconInsightCard',
  props: {
    cards: {
      type: Array,
    },
  }
}
</script>
