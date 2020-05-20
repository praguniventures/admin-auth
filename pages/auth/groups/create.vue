<template>
  <div>
    <div class="page-title">
      <h2>
        <i class="fas fa-lock float--right text--primary" />
        <nuxt-link to="/auth">
          Auth
        </nuxt-link>
        <small>/ <nuxt-link to="/auth/groups">Groups</nuxt-link></small>
        <small>/ Create</small>
      </h2>
      <div class="section--padding-small">
        <nuxt-link :to="`/auth/groups`" class="button button--small">
          <i class="fas fa-undo" /> Return
        </nuxt-link>
      </div>
    </div>
    <div class="padding--medium">
      <div class="form" style="max-width: 500px;">
        <da-form-lineinput v-model="newGroup.name" label="Group Name" />
      </div>
      <a href="#" class="button button--primary" @click.prevent="createGroup()">
        Create
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newGroup: {
        name: '',
      },
    }
  },

  methods: {
    async createGroup() {
      await this.$axios.post('/auth/groups', this.newGroup)
      this.$router.push(`/auth/groups/${this.newGroup.name}`)
    },
  },

  head() {
    return {
      title: `Create | Groups | Auth | ${this.$appSettings.appName} Admin`,
    }
  },
}
</script>
