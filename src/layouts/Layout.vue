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
      <div class="banner-container bg-secondary">
        <div class="constrain">
          <q-banner
            dense
            inline-actions
            class="bg-secondary text-white">
            <template v-slot:avatar>
              <q-avatar
                color="white"
                text-color="white"
                icon="icon"
                font-size="22px" />
            </template>
            <b>Install App?</b>

            <template v-slot:action>
              <q-btn
                flat
                class="q-px-sm"
                label="Yes"
                dense />
              <q-btn
                flat
                class="q-px-sm"
                label="Later"
                dense />
              <q-btn
                flat
                class="q-px-sm"
                label="Never"
                dense />
            </template>
          </q-banner>
        </div>
      </div>
      <q-tabs
        class="lt-sm"
      >
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
      content-class="bg-grey-9"
    >
      <q-list dark>
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
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
</style>