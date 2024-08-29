<template>
  <v-app>
    <nav>
      <v-toolbar app color="amber darken-2">
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Welcome</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-navigation-drawer app v-model="drawer" color="orange">
        <!-- Navigation Content -->
      </v-navigation-drawer>

      <v-main>
        <NuxtPage />
      </v-main>
    </nav>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
