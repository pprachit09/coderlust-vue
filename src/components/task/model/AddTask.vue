<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn 
        dense
        round
        v-close-popup
        icon="close" />
    </q-card-section>
    <q-form
      @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <q-input 
            outlined 
            v-model="taskToSubmit.name"
            class="col"
            label="Task Name"
            ref="name"
            autofocus
            clearable
            clear-icon="close"
            :rules="[val => !!val || 'Field is required']" />
        </div>
        
        <div class="row q-mb-sm">
          <q-input 
            outlined
            label="Due Date"
            v-model="taskToSubmit.dueDate"
            clearable
            clear-icon="close">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="taskToSubmit.dueDate" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div 
          class="row q-mb-sm"
          v-if="taskToSubmit.dueDate">
            <q-input 
              outlined
              label="Due Time"
              v-model="taskToSubmit.dueTime"
              clearable
              clear-icon="close"
              class="col">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="taskToSubmit.dueTime" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn 
          flat
          label="Save"
          color="primary"
          type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
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
      submitForm() {
        this.$refs.name.validate()
        if (!this.$refs.name.hasError) {
          this.submitTask()
        }
      },
      submitTask() {
        this.addTask(this.taskToSubmit)
        this.$emit('close')
      }
    }
  }
</script>
