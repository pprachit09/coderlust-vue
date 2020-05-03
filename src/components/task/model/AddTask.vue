<template>
  <q-card>
    <model-header>Add Task</model-header>
    <q-form
      @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <model-task-name 
          :name.sync="taskToSubmit.name"
          ref="ModelTaskName"/>
        
        <model-task-due-date :dueDate.sync="taskToSubmit.dueDate" />

        <model-task-due-time
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime" />
      </q-card-section>
        <model-button></model-button>
    </q-form>
  </q-card>
</template>

<script>
  import { mapActions } from 'vuex'
  import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

  export default {
    mixins: [mixinAddEditTask],
    data() {
      return {
        taskToSubmit : {
          name: '',
          completed: false,
          dueDate: '',
          dueTime: ''
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['addTask']),
      submitTask() {
        this.addTask(this.taskToSubmit)
        this.$emit('close')
      }
    }
  }
</script>
