<template>
  <div id="app">
    <div id="nav">
      <template v-if="$route.path == '/chat'">
        <router-link to="/">
          <p class="nav-link"><img src="./assets/icon-gear-white.png"></p>
        </router-link>
      </template>
      <template v-else>
        <router-link to="/chat">
          <p class="nav-link"><img src="./assets/icon-dialogue-white.png"></p>
        </router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function () {
    if (this.hasValidHash) {
      this.$accessToken = this.hashValues.access_token
      this.$idToken = this.decodedIdToken

      this.$userProfile.id = this.decodedIdToken.sub
      this.$userProfile.picture = this.decodedIdToken.picture
      this.$userProfile.displayName = this.decodedIdToken.preferred_username

      var customHeader = { headers: {'Authorization': `Bearer ${this.$accessToken}`} }
      this.$http.get(`https://api.twitch.tv/helix/users?id=${this.$userProfile.id}`, customHeader)
                .then(response => (this.$userProfile.loginName = response.data.data[0].login))
    }
  },
  computed: {
    hashValues: function () {
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
    decodedIdToken: function () {
      try {
        return JSON.parse(this.$base64URL.decode(this.hashValues.id_token.split('.')[1]))
      } catch(e) {
        return null
      }
    },
    hasValidHash: function () {
      if (this.decodedIdToken === null) {
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
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 60px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav .nav-link {
  position: absolute;
  right: 0px;
  width: 60px;
  height: 60px;
  margin: 0px;
  border-radius: 0px 0px 0px 100%;
  background-color: #0f0f5e;
  text-align: right;
}

#nav .nav-link img {
  margin: 5px;
  width: 40px;
  height: 40px;
}
</style>
