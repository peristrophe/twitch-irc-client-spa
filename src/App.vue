<template>
  <div id="app">
    <div id="nav">
        <router-link to="/">
          <div class="nav-link round-l">
            <p :class="attrLinkS"><img src="./assets/icon-gear-white.png"/>Set</p>
          </div>
        </router-link>
        <router-link to="/chat">
          <div class="nav-link round-r">
            <p :class="attrLinkC"><img src="./assets/icon-dialogue-white.png"/>Chat</p>
          </div>
        </router-link>
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
    },
    attrLinkC: function() {
      if (this.$route.path == '/chat') {
        return 'disable'
      } else {
        return ''
      }
    },
    attrLinkS: function() {
      if (this.$route.path == '/') {
        return 'disable'
      } else {
        return ''
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
  height: 30px;
  display: table;
}
#nav a {
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#nav .nav-link {
  width: 120px;
  height: 30px;
  margin: auto;
  background-color: #0f0f5e;
  display: table-cell;
  text-align: center;
}
#nav .round-l {
  border-radius: 0px 0px 0px 10px;
}
#nav .round-r {
  border-radius: 0px 0px 10px 0px;
}
#nav .nav-link p {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
}
#nav .nav-link .disable {
  color: #808080;
}
#nav .nav-link img {
  margin: 5px;
  width: 30px;
  height: 30px;
}
#nav .nav-link .disable img {
  filter: contrast(0%) ;
}
</style>
