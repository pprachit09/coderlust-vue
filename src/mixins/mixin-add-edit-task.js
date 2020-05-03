export default {
  methods: {
    submitForm() {
      this.$refs.ModelTaskName.$refs.name.validate()
      if (!this.$refs.ModelTaskName.$refs.name.hasError) {
        this.submitTask()
      }
    }
  },
  components: {
    'model-header': require('components/task/model/shared/ModelHeader').default,
    'model-task-name': require('components/task/model/shared/ModelTaskName').default,
    'model-task-due-date': require('components/task/model/shared/ModelDueDate').default,
    'model-task-due-time': require('components/task/model/shared/ModelDueTime').default,
    'model-button': require('components/task/model/shared/ModelButtons').default
  }
}