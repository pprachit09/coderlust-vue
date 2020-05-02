<template>
  <div class="row q-mb-sm">
    <q-input 
      outlined
      label="Due Date"
      :value="dueDate"
      @input="$emit('update:dueDate', $event)"
      clearable
      clear-icon="close">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date
              :value="dueDate"
              @input="$emit('update:dueDate', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
  export default {
    props: ['dueDate']
  }
</script>

<style>

</style>