<template>
  <q-form>
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
          Sign up to access your Todos anywhere!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.email"
        label="Email"
        stack-label
        class="col"/>
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.password"
        label="Password"
        type="password"
        stack-label
        class="col"/>
    </div>
    <div class="row">
      <q-space />
      <q-btn
        color="primary"
        label="Sign Up" />
    </div>
  </q-form>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          email: '',
          password: ''
        }
      }
    }
  }
</script>

<style>

</style>