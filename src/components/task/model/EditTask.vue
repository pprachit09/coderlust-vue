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
  export default {
    props: ['task', 'id'],
    data() {
      return {
        taskToSubmit : {
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask']),
      submitForm() {
        this.$refs.ModelTaskName.$refs.name.validate()
        if (!this.$refs.ModelTaskName.$refs.name.hasError) {
          this.submitTask()
        }
      },
      submitTask() {
        this.updateTask({
          id: this.id,
          updates: this.taskToSubmit
        })
        this.$emit('close')
      }
    },
    components: {
      'model-header': require('./shared/ModelHeader').default,
      'model-task-name': require('./shared/ModelTaskName').default,
      'model-task-due-date': require('./shared/ModelDueDate').default,
      'model-task-due-time': require('./shared/ModelDueTime').default,
      'model-button': require('./shared/ModelButtons').default
    },
    mounted() {
      this.taskToSubmit = Object.assign({}, this.task)
    }
  }
</script>
