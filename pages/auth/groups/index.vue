<template>
  <div>
    <div class="page-title">
      <h2>
        <i class="fas fa-lock float--right text--primary" />
        <nuxt-link to="/auth">
          Auth
        </nuxt-link>
        <small>/ Groups</small>
      </h2>
      <div class="section--padding-small">
        <nuxt-link :to="`/auth`" class="button button--small">
          <i class="fas fa-undo" /> Return
        </nuxt-link>
        <nuxt-link
          :to="`/auth/groups/create`"
          class="button button--small button--primary"
        >
          <i class="fas fa-plus" /> Create Group
        </nuxt-link>
      </div>
    </div>
    <div class="padding--medium">
      <h4>Groups</h4>
      <da-table
        :list-api-url="`/auth/groups`"
        row-component="da-auth-group-list-row"
        key-field="name"
      >
        <thead slot="header">
          <tr>
            <th>Name</th>
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
      title: `Groups | Auth | ${this.$appSettings.appName} Admin`,
    }
  },
}
</script>
