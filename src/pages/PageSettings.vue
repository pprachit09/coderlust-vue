<template>
  <q-page padding>
    <q-list
      bordered
      padding
      class="q-mb-md">
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle
            color="blue"
            v-model="show12hourTimeFormat" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle
            color="blue"
            v-model="showTaskInOneList" />
        </q-item-section>
      </q-item>

    </q-list>

    <q-list bordered padding>
      <q-item-label header>More</q-item-label>

      <q-item
        to="/settings/help"
        tag="label"
        v-ripple>
          <q-item-section>
            <q-item-label>Help</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right" />
          </q-item-section>
      </q-item>

      <q-item
        @click="visitOurWebsite"
        tag="label"
        v-ripple>
          <q-item-section>
            <q-item-label>Visit Our Website</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right" />
          </q-item-section>
      </q-item>

      <q-item
        @click="EmailUs"
        tag="label"
        v-ripple>
          <q-item-section>
            <q-item-label>Email Us</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right" />
          </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { openURL } from 'quasar'

  export default {
    computed: {
      ...mapGetters('settings', ['settings']),
      show12hourTimeFormat: {
        get() {
          return this.settings.show12hourTimeFormat
        },
        set(value) {
          this.setShow12hourTimeFormat(value)
        }
      },
      showTaskInOneList: {
        get() {
          return this.settings.showTaskInOneList
        },
        set(value) {
          this.setShowTaskInOneList(value)
        }
      }
    },
    methods: {
      ...mapActions('settings', ['setShow12hourTimeFormat', 'setShowTaskInOneList']),
      visitOurWebsite() {
        openURL('https://www.google.com')
      },
      EmailUs() {
        window.location.href = 
          'mailto:pprachit09@gmail.com?subject=Coderlust ToDo feedback'
      }
    }
  }
</script>

<style>

</style>
