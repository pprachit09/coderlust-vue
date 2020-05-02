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
      :rules="[val => !!val || 'Field is required']" />
  </div>
</template>

<script>
  export default {
    props: ['name']    
  }
</script>

<style>

</style>