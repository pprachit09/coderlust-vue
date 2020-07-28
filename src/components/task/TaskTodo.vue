<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header
        v-if="!settings.showTaskInOneList"
        bgColor="bg-deep-orange-5"
      >To Do</list-header>    
      <q-list
        separator 
        bordered>
          <task
            v-for="(task, key) in tasksTodo"
            :key="key"
            :task=task
            :id="key"
          >
          </task>
      </q-list>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['tasksTodo'],
    components: {
      'task': require('./Task').default,
      'list-header': require('components/shared/ListHeader').default
    },
    computed: {
      ...mapGetters('settings', ['settings'])
    }
  }
</script>

<style>

</style>