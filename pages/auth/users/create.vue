<template>
  <div>
    <div class="page-title">
      <h2>
        <i class="fas fa-lock float--right text--primary" />
        <nuxt-link to="/auth">
          Auth
        </nuxt-link>
        <small>/ <nuxt-link to="/auth/users">Users</nuxt-link></small>
        <small>/ Create</small>
      </h2>
      <div class="section--padding-small">
        <nuxt-link :to="`/auth/users`" class="button button--small">
          <i class="fas fa-undo" /> Return
        </nuxt-link>
      </div>
    </div>
    <div class="padding--medium">
      <div class="form" style="max-width: 500px;">
        <da-form-lineinput v-model="newUser.username" label="Username" />
        <da-form-password v-model="newUser.password" label="Password" />
        <da-form-switch v-model="newUser.is_active" label="Active?" />
      </div>
      <a href="#" class="button button--primary" @click.prevent="createUser()">
        Create
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        username: '',
        password: '',
        is_active: true,
      },
    }
  },

  methods: {
    async createUser() {
      try {
        await this.$axios.post('/auth/users', this.newUser)
        this.$router.push(`/auth/users/${this.newUser.username}`)
      } catch (err) {
        if (err.response.data.status === 'ACCESS_DENIED') {
          this.$toasted.show(
            'Sorry, you do not have enough permission to perform this action!',
            {
              icon: 'exclamation',
              duration: 3000,
            }
          )
        }
      }
    },
  },
  head() {
    return {
      title: `Create | Users | Auth | ${this.$appSettings.appName} Admin`,
    }
  },
}
</script>
