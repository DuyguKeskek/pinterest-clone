<template>
  <v-app>

    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark flat>
        <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">Pinterest</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile ripple v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.title }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <v-toolbar-title class="hidden-xs-only">
          <router-link to="/" tag="span" style="cursor: pointer">
            Pinterest
          </router-link>
        </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field 
      flex prepend-icon="search" 
      placeholder="Search" 
      color="secondary"
      single-line hide-details>
      </v-text-field>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
        <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
        {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <v-container class="mt-4">
      <router-view/>   
      </v-container>   
    </main>    
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      sideNav : true
    }
  },
  computed: {
    horizontalNavItems() {
      return [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin'},
        { icon: 'create', title: 'Sign Up', link: '/signup'}
      ]
    },
    sideNavItems() {
      return [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin'},
        { icon: 'create', title: 'Sign Up', link: '/signup'}
      ]
    }
  },
  methods: {
    toggleSideNav () {
      this.sideNav = !this.sideNav
    }
  }
}
</script>

