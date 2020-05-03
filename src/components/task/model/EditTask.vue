<template>
  <q-card>
    <model-header>Edit Task</model-header>
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
    props: ['task', 'id'],
    mixins: [mixinAddEditTask],
    data() {
      return {
        taskToSubmit : {
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask']),
      submitTask() {
        this.updateTask({
          id: this.id,
          updates: this.taskToSubmit
        })
        this.$emit('close')
      }
    },
    mounted() {
      this.taskToSubmit = Object.assign({}, this.task)
    }
  }
</script>
