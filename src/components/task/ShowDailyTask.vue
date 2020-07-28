<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div :class="{'q-mt-lg' : !settings.showTaskInOneList}">
      <list-header
        v-if="!settings.showTaskInOneList"
        bgColor="bg-indigo-3"
      >Daily Task </list-header>
      <q-list
        separator 
        bordered>
          <daily-task
            v-for="(task, key) in dailyTasksTodo"
            :key="key"
            :task=task
            :id="key"
          >
          </daily-task>
      </q-list>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  export default {
    props: ['dailyTasksTodo'],
    components: {
      'daily-task': require('./DailyTask').default,
      'list-header': require('components/shared/ListHeader').default
    },
    computed: {
      ...mapGetters('settings', ['settings'])
    }
  }
</script>

<style>

</style>