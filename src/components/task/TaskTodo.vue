<template>
  <div>
    <list-header
      bgColor="bg-orange"
    >To Do</list-header>    
    <q-list
      separator 
      bordered>
        <task
          v-for="(task, key) in tasksTodo"
          :key="key"
          :task=task
          :id="key"
        >
        </task>
    </q-list>
  </div>
</template>

<script>
  export default {
    props: ['tasksTodo'],
    components: {
      'task': require('./Task').default,
      'list-header': require('components/shared/ListHeader').default
    }
  }
</script>

<style>

</style>