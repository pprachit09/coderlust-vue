<template>
  <q-item 
    @click="updateTask({ id: id, updates: { completed: !task.completed }})"
    class="bg-indigo-1"
    v-touch-hold:1000.mouse="showEditTaskModel"
    clickable
    v-ripple>
      <q-item-section>
        <q-item-label
          v-html="$options.filters.searchHighlight(task.name, search)"
        />
      </q-item-section>

      <q-item-section side v-if="task.dueDate">
        <div class="row">
          <div class="column justify-center">
            <q-icon 
              name="event"
              size="20px"
              class="q-mr-xs" />
          </div>
        </div>
      </q-item-section>

      <q-item-section side>
        <div class="row">
          <q-btn
            @click.stop="showEditTask = true"
            flat
            round
            dense
            color="blue-grey" 
            icon="edit" />
          <q-btn
            @click.stop="promptToDelete(id)"
            flat
            round
            dense
            color="red" 
            icon="delete" />
        </div>
      </q-item-section>

      <q-dialog v-model="showEditTask">
        <edit-task
          @close="showEditTask = false"
          :task="task"
          :id="id" />
      </q-dialog>
  </q-item>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import { date } from 'quasar'
  const { formatDate } = date

  export default {
    props: ['task', 'id'],
    data() {
      return {
        showEditTask: false
      }
    },
    methods: {
      ...mapActions('dailyTasks', ['updateTask', 'deleteTask']),
      promptToDelete(id) {
          this.$q.dialog({
          dark: true,
          title: 'Confirm',
          message: 'Do you really want to delete this task?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.deleteTask(id) 
        })
      },
      showEditTaskModel() {
        this.showEditTask = true
      }
    },
    components: {
      'edit-task': require('../task/model/EditDailyTask').default
    },
    filters: {
      niceDate(value) {
        return formatDate(value, 'MMM D')
      },
      searchHighlight(value, search) {
        if (search) {
          const searchRegex = new RegExp(
            search,
            'ig'
          )
          return value.replace(
            searchRegex,
            (match) => {
              return '<span class="bg-yellow-6">' + match + '</span>'
            }
          )
        }
        return value
      }
    },
    computed: {
      ...mapState('tasks', ['search']),
      ...mapGetters('settings', ['settings']),
      taskDueTime() {
        if (this.settings.show12hourTimeFormat) {
          return formatDate(
            `${this.task.dueDate} ${this.task.dueTime}`,
            'h:mmA'
          )
        }
        return this.task.dueTime
      }
    }
  }
</script>

<style>

</style>