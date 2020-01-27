<template>
  <div class="profile">
    <p class="user-icon">
      <a :href="authurl">
        <p v-if="is_valid_hash"><img :src="userprofile.icon" /></p>
        <p v-else><img src="../assets/anonymous.png" /></p>
      </a>
    </p>
    <h2 class="user-name">{{ userprofile.name }}</h2>
    <hr/>
    <p>Please, authorization on twitch.</p>
  </div>
</template>

<script>
import base64url from "base64url"

export default {
  name: 'profile',
  data () {
    return {
      userprofile: {
        name: '',
        icon: ''
      },
      // for Authorizing with OpenID Connect
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
  created: function () {
    if (this.is_valid_hash) {
      this.userprofile.name = this.decoded_id_token.preferred_username
      this.userprofile.icon = this.decoded_id_token.picture
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
      try {
        return document.location.hash.slice(1).split('&').map(
          function (value) {
            var dic = {}
            dic[value.split('=')[0]] = value.split('=')[1]
            return dic
          }
        ).reduce((a,b) => Object.assign(a,b,{})) || null
      } catch(e) {
        return null
      }
    },
    decoded_id_token: function () {
      try {
        return JSON.parse(base64url.decode(this.hashvalues.id_token.split('.')[1]))
      } catch(e) {
        return null
      }
    },
    is_valid_hash: function () {
      if (this.decoded_id_token === null) {
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
.user-icon {
  margin: 50px;
}

.user-icon img {
  border-radius: 50%;
  border: solid 1px #c0c0c0;
  width: 150px;
  height: 150px;
}

.user-name {
  font-weight: bold;
}
</style>