<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Coderlust Todo
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right" />

        <q-btn
          v-else
          @click="logoutUser"
          flat
          icon-right="account_circle"
          label="Logout"
          class="absolute-right" />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="link in essentialLinks"
          :key="link.title"
          :icon="link.icon" 
          :label="link.title"
          :to="link.link" />
      </q-tabs>    
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          class="text-grey-4"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import { mapState, mapActions } from 'vuex'
import { openURL } from 'quasar'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Todo',
          icon: 'list',
          link: '/'
        },
        {
          title: 'Settings',
          icon: 'settings',
          link: '/settings'
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    openURL
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }    
  }
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
</style>