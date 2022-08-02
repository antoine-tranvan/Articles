<template>
  <v-app id="inspire">
    <HeaderAndDrawer />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HeaderAndDrawer from "./components/HeaderAndDrawer.vue";

export default {
  components: { HeaderAndDrawer },
};
</script>
