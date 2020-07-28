<template>
    <q-page>
      <div class="q-pa-md absolute full-width full-height column">
        <div class="row q-mb-lg">
          <search />
          <sort />
        </div>

        <p
          v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
        >No Search Results</p>

        <q-scroll-area class="q-scroll-area-tasks">
          <no-task
            v-if="!Object.keys(tasksTodo).length && !search && !settings.showTaskInOneList">
          </no-task>

          <task-todo
            v-if="Object.keys(tasksTodo).length"
            :tasksTodo="tasksTodo" />

          <task-completed
            v-if="Object.keys(tasksCompleted).length"
            :tasksCompleted="tasksCompleted" 
            class="q-mb-xl" />
        </q-scroll-area>

          <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
            <q-btn
              round
              color="deep-purple-6"
              size="24px"
              icon="add"
              class="all-pointer-events"
              @click="showAddTask = true"
            />
          </div>
        </div>

        <q-dialog v-model="showAddTask">
          <add-task @close="showAddTask = false" />
        </q-dialog>

    </q-page>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    data() {
      return {
        showAddTask: false
      }
    },
    computed: {
        ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
        ...mapGetters('settings', ['settings']),
        ...mapState('tasks', ['search'])
    },
    components: {
      'add-task': require('../components/task/model/AddTask').default,
      'task-todo': require('components/task/TaskTodo').default,
      'task-completed': require('components/task/TaskCompleted').default,
      'no-task': require('components/task/NoTask').default,
      'search': require('components/task/tool/Search').default,
      'sort': require('components/task/tool/Sort').default
    },
    mounted() {
      this.$root.$on('showAddTask', () => {
        this.showAddTask = true
      })
    }
  }
</script>

<style>
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
</style>
