<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item height="70px">
        <v-list-item-content>
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="100px"
            max-width="200px"
            src="../../public/logo_happydom.png"
          ></v-img>
        </v-list-item-content>
      </v-list-item>

      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <router-link
              :to="item.link"
              style="text-decoration: none; color: inherit; display: flex"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      src="https://picsum.photos/1920/1080?random"
      color="#fcb69f"
      dark
      height="70px"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <router-link to="/articles" style="text-decoration: none; color: inherit"
        ><v-toolbar-title>My Articles</v-toolbar-title></router-link
      >
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderAndDrawer",
  data: () => ({
    drawer: null,
    items: [
      { title: "Articles", icon: "mdi-view-dashboard", link: "/articles" },
      { title: "Surprise", icon: "mdi-image", link: "/surprise" },
    ],
    right: null,
  }),
};
</script>
