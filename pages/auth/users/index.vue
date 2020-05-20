<template>
  <div>
    <div class="page-title">
      <h2>
        <i class="fas fa-lock float--right text--primary" />
        <nuxt-link to="/auth">
          Auth
        </nuxt-link>
        <small>/ Users</small>
      </h2>
      <div class="section--padding-small">
        <nuxt-link :to="`/auth`" class="button button--small">
          <i class="fas fa-undo" /> Return
        </nuxt-link>
        <nuxt-link
          :to="`/auth/users/create`"
          class="button button--small button--primary"
        >
          <i class="fas fa-plus" /> Create User
        </nuxt-link>
      </div>
    </div>
    <div class="padding--medium">
      <h4>Users</h4>
      <da-table
        :list-api-url="`/auth/users`"
        row-component="da-auth-user-list-row"
        key-field="username"
      >
        <thead slot="header">
          <tr>
            <th>Username</th>
            <th>Active?</th>
            <th>Superuser?</th>
          </tr>
          <tr>
            <td>
              <nuxt-link to="/auth/users/__anonymus">
                __anonymus
              </nuxt-link>
            </td>
          </tr>
        </thead>
      </da-table>
    </div>
  </div>
</template>

<script>
import Table from '~/components/listing/Table'

export default {
  components: { 'da-table': Table },

  head() {
    return {
      title: `Users | Auth | ${this.$appSettings.appName} Admin`,
    }
  },
}
</script>
