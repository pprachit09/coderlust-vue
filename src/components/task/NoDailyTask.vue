<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner dense class="bg-deep-purple-1">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      You have not added any daily task
      <template v-slot:action>
        <q-btn
          @click="$root.$emit('showAddDailyTask')"
          flat
          color="primary"
          label="Add Daily Task" />
      </template>
    </q-banner>
  </transition>
</template>

<script>
export default {

}
</script>

<style>

</style>