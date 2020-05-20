<template>
  <div>
    <div class="page-title">
      <h2>
        <i class="fas fa-lock float--right text--primary" />
        <nuxt-link to="/auth">
          Auth
        </nuxt-link>
        <small>/ <nuxt-link to="/auth/groups">Groups</nuxt-link></small>
        <small>/ {{ $route.params.group }}</small>
      </h2>
      <div class="section--padding-small">
        <nuxt-link :to="`/auth/groups`" class="button button--small">
          <i class="fas fa-undo" /> Return
        </nuxt-link>
      </div>
    </div>
    <div class="padding--medium">
      <h4>Users</h4>
      <table class="table table--bordered">
        <tbody>
          <tr v-for="username in users" :key="username">
            <td>
              <span class="text--primary">{{ username }}</span>
            </td>
            <td>
              <a
                href="#"
                class="buttons buttons--small text--negative"
                @click.prevent="removeUser(username)"
              >
                <i class="fas fa-times" />
                Remove
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <da-form-lineinput v-model="user.newUser" label="New User" />
            </td>
            <td>
              <a
                href="#"
                class="button button--primary button--small"
                @click.prevent="addUser()"
              >
                <i class="fas fa-plus" />
                Add
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="section--padding-small" />
      <h4>Permissions</h4>
      <table class="table table--bordered">
        <tbody>
          <tr v-for="perm in permissions" :key="perm">
            <td>
              <span class="text--primary">{{ perm }}</span>
            </td>
            <td>
              <a
                href="#"
                class="buttons buttons--small text--negative"
                @click.prevent="removePermission(perm)"
              >
                <i class="fas fa-times" />
                Remove
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <da-form-lineinput
                v-model="permission.newPermission"
                label="New Permission"
              />
            </td>
            <td>
              <a
                href="#"
                class="button button--primary button--small"
                @click.prevent="addPermission()"
              >
                <i class="fas fa-plus" />
                Add
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const permissions = (
      await $axios.get(`/auth/permissions/for-client/group.${params.group}`)
    ).data.payload

    const users = (await $axios.get(`/auth/groups/${params.group}/users`)).data
      .payload
    return { permissions, users }
  },

  data() {
    return {
      permission: {
        newPermission: '',
      },
      user: {
        newUser: '',
      },
    }
  },

  methods: {
    async reloadPermissions() {
      this.permissions = (
        await this.$axios.get(
          `/auth/permissions/for-client/group.${this.$route.params.group}`
        )
      ).data.payload
    },

    async reloadUsers() {
      this.users = (
        await this.$axios.get(`/auth/groups/${this.$route.params.group}/users`)
      ).data.payload
    },

    async addPermission() {
      await this.$axios.post(
        `/auth/permissions/${this.permission.newPermission}/clients`,
        { client: `group.${this.$route.params.group}` }
      )
      this.permission.newPermission = ''
      this.reloadPermissions()
    },

    async removePermission(permission) {
      await this.$axios.delete(
        `/auth/permissions/${permission}/clients/group.${this.$route.params.group}`
      )
      this.reloadPermissions()
    },

    async addUser() {
      await this.$axios.post(`/auth/groups/${this.$route.params.group}/users`, {
        username: this.user.newUser,
      })
      this.user.newUser = ''
      this.reloadUsers()
    },

    async removeUser(username) {
      await this.$axios.delete(
        `/auth/groups/${this.$route.params.group}/users/${username}`
      )
      this.reloadUsers()
    },
  },

  head() {
    return {
      title: `${this.$route.params.group} | Groups | Auth | ${this.$appSettings.appName} Admin`,
    }
  },
}
</script>
