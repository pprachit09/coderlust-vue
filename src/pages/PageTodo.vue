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

          <no-daily-task 
            v-if="!Object.keys(dailyTasksTodo).length" />

          <task-todo
            v-if="Object.keys(tasksTodo).length"
            :tasksTodo="tasksTodo" />
          
          <daily-task 
            v-if="Object.keys(dailyTasksTodo).length"
            :dailyTasksTodo="dailyTasksTodo"
            class="q-mb-xl" />

          <task-completed
            v-if="Object.keys(tasksCompleted).length"
            :tasksCompleted="tasksCompleted" 
            class="q-mb-xl" />

        </q-scroll-area>
          <div class="q-pa-md q-gutter-sm absolute-bottom text-center">
            <q-btn
              padding="xs lg"
              color="secondary"
              size="14px"
              icon="add"
              label="Add Task"
              @click="showAddTask = true"
              class="all-pointer-events"
            />

            <q-btn
              padding="lg xs"
              color="dark"
              size="14px"
              icon="add"
              label="Add Daily Task"
              class="all-pointer-events"
              @click="showAddDailyTask = true"
            />
          </div>
        </div>

        <q-dialog v-model="showAddTask">
          <add-task @close="showAddTask = false" />
        </q-dialog>

        <q-dialog v-model="showAddDailyTask">
          <add-daily-task @close="showAddDailyTask = false" />
        </q-dialog>

    </q-page>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    data() {
      return {
        showAddTask: false,
        showAddDailyTask: false
      }
    },
    computed: {
        ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
        ...mapGetters('settings', ['settings']),
        ...mapState('tasks', ['search']),
        ...mapGetters('dailyTasks', ['dailyTasksTodo'])
    },
    components: {
      'add-task': require('../components/task/model/AddTask').default,
      'task-todo': require('components/task/TaskTodo').default,
      'task-completed': require('components/task/TaskCompleted').default,
      'no-task': require('components/task/NoTask').default,
      'search': require('components/task/tool/Search').default,
      'sort': require('components/task/tool/Sort').default,
      'no-daily-task': require('components/task/NoDailyTask').default,
      'add-daily-task': require('../components/task/model/AddDailyTask').default,
      'daily-task': require('components/task/ShowDailyTask').default
    },
    mounted() {
      this.$root.$on('showAddTask', () => {
        this.showAddTask = true
      }),
      this.$root.$on('showAddDailyTask', () => {
        this.showAddDailyTask = true
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
