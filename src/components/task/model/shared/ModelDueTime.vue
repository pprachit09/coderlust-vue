<template>
  <div 
    class="row q-mb-sm">
      <q-input 
        outlined
        label="Due Time"
        :value="dueTime"
        @input="$emit('update:dueTime', $event)"
        clearable
        clear-icon="close"
        class="col">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                @input="$emit('update:dueTime', $event)"
                :value="dueTime"/>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
  </div>
</template>

<script>
  export default {
    props: ['dueTime']
  }
</script>

<style>

</style>