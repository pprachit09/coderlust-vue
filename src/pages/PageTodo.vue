<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md" style="max-width: 350px">
      <q-list separator bordered>
        <task
          v-for="(task, key) in tasks"
          :key="key"
          :task=task
          :id="key"
        >
        </task>
      </q-list>
    </div>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
        ...mapGetters('tasks', ['tasks'])
    },
    components: {
      'task': require('../components/task/Task').default
    }
  }
</script>

<style>

</style>
