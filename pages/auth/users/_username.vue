<template>
  <div>
    <div class="page-title">
      <h2>
        <i class="fas fa-lock float--right text--primary" />
        <nuxt-link to="/auth">
          Auth
        </nuxt-link>
        <small>/ <nuxt-link to="/auth/users">Users</nuxt-link></small>
        <small>/ {{ $route.params.username }}</small>
      </h2>
      <div class="section--padding-small">
        <nuxt-link :to="`/auth/users`" class="button button--small">
          <i class="fas fa-undo" /> Return
        </nuxt-link>
        <a
          v-if="user.is_active"
          href="#"
          class="button button--negative button--small"
          @click.prevent="deactivateUser()"
          >Deactivate</a
        >
        <a
          v-else
          href="#"
          class="button button--positive button--small"
          @click.prevent="activateUser()"
          >Activate</a
        >
      </div>
    </div>
    <div class="padding--medium">
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
    let user
    if (params.username !== '__anonymus') {
      user = (await $axios.get(`/auth/users/${params.username}`)).data.payload
    } else {
      user = {
        username: '__anonymus',
        is_active: true,
      }
    }

    const permissions = (
      await $axios.get(`/auth/permissions/for-client/user.${params.username}`)
    ).data.payload
    return { user, permissions }
  },

  data() {
    return {
      permission: {
        newPermission: '',
      },
    }
  },

  methods: {
    async reloadUser() {
      this.user = (
        await this.$axios.get(`/auth/users/${this.$route.params.username}`)
      ).data.payload
    },

    async reloadPermissions() {
      this.permissions = (
        await this.$axios.get(
          `/auth/permissions/for-client/user.${this.$route.params.username}`
        )
      ).data.payload
    },

    async activateUser() {
      await this.$axios.post(
        `/auth/users/${this.$route.params.username}/operations/activate`,
        {}
      )
      this.reloadUser()
    },

    async deactivateUser() {
      await this.$axios.post(
        `/auth/users/${this.$route.params.username}/operations/deactivate`,
        {}
      )
      this.reloadUser()
    },

    async addPermission() {
      await this.$axios.post(
        `/auth/permissions/${this.permission.newPermission}/clients`,
        { client: `user.${this.$route.params.username}` }
      )
      this.permission.newPermission = ''
      this.reloadPermissions()
    },

    async removePermission(permission) {
      await this.$axios.delete(
        `/auth/permissions/${permission}/clients/user.${this.$route.params.username}`
      )
      this.reloadPermissions()
    },
  },

  head() {
    return {
      title: `${this.$route.params.username} | Users | Auth | ${this.$appSettings.appName} Admin`,
    }
  },
}
</script>
