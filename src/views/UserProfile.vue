<template>
  <div class="profile">
    <a :href="authurl">
      <p v-if="has_userprofile" class="usericon">
        <img :src="$props.userprofile.picture"/>
      </p>
      <p v-else class="usericon">
        <img src="../assets/anonymous.png"/>
      </p>
    </a>
    <h2 class="username">{{ $props.userprofile.display_name }}</h2>
    <hr/>
    <p>Please, authorization on twitch.</p>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      authendpoint: 'https://id.twitch.tv/oauth2/authorize',
      params: {
        client_id: '122xg9vquuuq3zi6w610iibumg5j15',
        redirect_uri: 'http://localhost:8080',
        response_type: 'token+id_token',
        scope: 'chat:read+chat:edit+user:read:email+openid',
        claims: {
          id_token: {
            email_verified: null,
            picture: null,
            preferred_username: null
          }
        }
      }
    }
  },
  props: {
    userprofile: Object
  },
  computed: {
    authurl: function () {
      return this.authendpoint + '?' + this.queryparams
    },
    queryparams: function () {
      const self = this

      return Object.keys(self.params).map(
        function (key) {
          if (typeof self.params[`${key}`] == 'object') {
            return key + '=' + JSON.stringify(self.params[`${key}`])
          } else {
            return key + '=' + self.params[`${key}`]
          }
        }
      ).join('&')
    },
    has_userprofile: function () {
      if (this.$props.userprofile.id === null) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>
.profile hr {
  border: solid 1px;
  width: 80%;
}
.usericon {
  margin: 50px;
}

.usericon img {
  border-radius: 50%;
  border: solid 1px #c0c0c0;
  width: 150px;
  height: 150px;
}

.username {
  font-weight: bold;
}
</style>