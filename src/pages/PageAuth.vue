<template>
  <q-page padding>
    <q-card class="auth-tabs">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="signup" label="Sign up" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <div class="text-h6">Login</div>
            <login-signup :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="signup">
          <div class="text-h6">Sign up</div>
            <login-signup :tab="tab" />
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
  export default {
    data () {
      return {
        tab: 'signup'
      }
    },
    components: {
      'login-signup': require('components/auth/LoginSignUp').default
    }
  }
</script>

<style>
  .auth-tabs {
    max-width: 500px;
    margin: 0 auto;
  }
</style>