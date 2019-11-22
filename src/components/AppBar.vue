<template>
  <div>
    <v-app-bar
      color="primary"
      dense
      dark
    >
      <v-app-bar-nav-icon @click="$emit('openTimeline', true)"></v-app-bar-nav-icon>

      <v-toolbar-title>Modum</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="app-bar-user">
        <p class="caption">Current user</p>
        <p class="body-1">Manufacturer</p>
      </div>
      <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<style lang="scss" scoped>
.app-bar-user {
  display: flex;
  flex-direction: column;
  text-align: right;
  .caption {
    margin-bottom: -5px;
  }
  .body-1 {
    margin-bottom: 0;
  }
}
</style>