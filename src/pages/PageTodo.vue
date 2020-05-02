<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search />
    </div>

    <p
      v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
    >No Search Results</p>

    <no-task
      v-if="!Object.keys(tasksTodo).length && !search"></no-task>
      <task-todo
        v-if="Object.keys(tasksTodo).length"
        :tasksTodo="tasksTodo" />

      <task-completed
        v-if="Object.keys(tasksCompleted).length"
        :tasksCompleted="tasksCompleted" />

      <div class="absolute-bottom text-center q-mb-lg">
        <q-btn
          round
          color="primary"
          size="24px"
          icon="add"
          @click="showAddTask = true"
        />
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
        ...mapState('tasks', ['search'])
    },
    components: {
      'add-task': require('../components/task/model/AddTask').default,
      'task-todo': require('components/task/TaskTodo').default,
      'task-completed': require('components/task/TaskCompleted').default,
      'no-task': require('components/task/NoTask').default,
      'search': require('components/task/tool/Search').default
    },
    mounted() {
      this.$root.$on('showAddTask', () => {
        this.showAddTask = true
      })
    }
  }
</script>

<style>

</style>
