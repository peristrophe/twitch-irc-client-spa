<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view :userprofile="userprofile"/>
  </div>
</template>

<script>
import base64url from "base64url"

export default {
  name: 'app',
  data () {
    return {
      httpclient: null,
      userprofile: {
        id: null,
        login_name: null,
        display_name: 'Anonymous User',
        picture: null
      },
      id_token: {},
      userinfo: null
    }
  },
  methods: {
    get_user_info: function () {
      void(0)
    }
  },
  created: function () {
    if (this.has_valid_hash) {
      this.userprofile.id = this.decoded_id_token.sub
      this.userprofile.picture = this.decoded_id_token.picture
      this.userprofile.display_name = this.decoded_id_token.preferred_username
      this.id_token = this.decoded_id_token
      axios.get('https://api.twitch.tv/helix/users?id=' + this.userprofile.id)
      .then(response => (this.userinfo = JSON.parse(response)))
    }
  },
  computed: {
    hashvalues: function () {
      try {
        return document.location.hash.slice(1).split('&').map(
          function (value) {
            var dic = {}
            dic[value.split('=')[0]] = value.split('=')[1]
            return dic
          }
        ).reduce((a,b) => Object.assign(a,b,{}))
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
    has_valid_hash: function () {
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
