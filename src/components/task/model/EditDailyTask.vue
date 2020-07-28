<template>
  <q-card>
    <model-header>Edit Daily Task</model-header>
    <q-form
      @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <model-task-name 
          :name.sync="taskToSubmit.name"
          ref="ModelTaskName"/>
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
      ...mapActions('dailyTasks', ['updateTask']),
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
