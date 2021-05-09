<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-toolbar-title>VueGraphQl</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <PastLanches />
    </v-main>
  </v-app>
</template>

<script>
import PastLanches from './components/PastLanches';

export default {
  name: 'App',

  components: {
    PastLanches
  }
};
</script>
