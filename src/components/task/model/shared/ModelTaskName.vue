<template>
  <div class="row q-mb-sm">
    <q-input 
      outlined 
      :value="name"
      @input="$emit('update:name', $event)"
      class="col"
      label="Task Name"
      ref="name"
      autofocus
      clearable
      clear-icon="close"
      v-select-all
      :rules="[val => !!val || 'Field is required']" />
  </div>
</template>

<script>
  import { selectAll } from 'src/directives/directive-select-all'

  export default {
    props: ['name'],
    directives: {
      selectAll
    }
  }
</script>

<style>

</style>