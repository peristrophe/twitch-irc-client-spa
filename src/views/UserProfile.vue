<template>
  <div class="profile">
    <p class="users-icon">
      <a :href="authurl"><img src="../assets/anonymous.png"></a>
    </p>
    <h2 class="user-id">Anonymous User</h2>
    <hr/>
    <p>Please, authorization on twitch.</p>
  </div>
</template>

<script>
const base64url = require('base64url')
export default {
  name: 'profile',
  data () {
    return {
      authendpoint: 'https://id.twitch.tv/oauth2/authorize',
      params: {
        client_id: '122xg9vquuuq3zi6w610iibumg5j15',
        redirect_uri: 'http://localhost:8080',
        response_type: 'token+id_token',
        scope: 'chat:read+chat:edit+openid',
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
  computed: {
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
    authurl: function () {
      return this.authendpoint + '?' + this.queryparams
    },
    hashvalues: function () {
      if (document.location.hash) {
        return document.location.hash.slice(1).split('&').map(
          function (value) {
            var dic = {}
            dic[value.split('=')[0]] = value.split('=')[1]
            return dic
          }
        ).reduce((a,b) => Object.assign(a,b,{}))
      } else {
        return null
      }
    },
    decoded_id_token: function () {
      return this.hashvalues.id_token
    }
  }
}
</script>

<style>
.profile hr {
  border: solid 1px;
  width: 80%;
}
.users-icon {
  margin: 50px;
}

.users-icon img {
  border-radius: 50%;
  border: solid 1px #c0c0c0;
  width: 150px;
  height: 150px;
}

.user-id {
  font-weight: bold;
}
</style>