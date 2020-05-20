<template>
  <div>
    <div class="page-title">
      <h2>
        <i class="fas fa-lock float--right text--primary" />
        Auth
      </h2>
      <div class="section--padding-small">
        <nuxt-link
          :to="`/auth/users`"
          class="button button--primary button--small"
        >
          <i class="fas fa-user" /> Manage Users
        </nuxt-link>
        <nuxt-link
          :to="`/auth/groups`"
          class="button button--primary button--small"
        >
          <i class="fas fa-users" /> Manage Groups
        </nuxt-link>
      </div>
    </div>
    <div class="padding--medium" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Auth | ${this.$appSettings.appName} Admin`,
    }
  },
}
</script>
