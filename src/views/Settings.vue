<template>
  <div class="settings">
    <a :href="authURL">
      <p v-if="hasUserProfile" class="usericon">
        <img :src="$userProfile.picture"/>
      </p>
      <p v-else class="usericon">
        <img src="../assets/anonymous.png"/>
      </p>
    </a>
    <h2 class="username">{{ $userProfile.displayName }}</h2>
    <!-- <FormWithButton formLabel="Channel Name" buttonLabel="Connect" v-on:submitForm="connect"/> -->
    <InputForm formLabel="Channel Name" :defaultValue="$channelProfile.name" v-on:submitForm="applyChannel"/>
  </div>
</template>

<script>
//import FormWithButton from '@/components/FormWithButton.vue'
import InputForm from '@/components/InputForm.vue'

export default {
  name: 'settings',
  components: {
    InputForm
  },
  methods: {
    applyChannel: function (channel) {
      this.$channelProfile.name = channel
    },
    connect: function (channel) {
      if (this.$channelProfile.name === channel) {
        return
      }
      const self = this

      // ref: https://dev.twitch.tv/docs/irc/guide/
      if (self.$wss === null) {
        self.$wss = new WebSocket('wss://irc-ws.chat.twitch.tv:443')

        self.$wss.onopen = function () {
          self.$wss.send('CAP REQ :twitch.tv/tags twitch.tv/commands\r\n')
          self.$wss.send(`PASS oauth:${self.$accessToken}\r\n`)
          self.$wss.send(`NICK ${self.$userProfile.loginName}\r\n`)
          self.$wss.send(`JOIN #${channel}\r\n`)
        }

        self.$wss.onmessage = function (event) {
          if (event.data.startsWith('PING')) {
            self.$wss.send('PONG :tmi.twitch.tv\r\n')
          } else {
            self.$chatLog.push(event.data)
          }
        }

        self.$channelProfile.channel = channel
      } else if (self.$wss.readyState == WebSocket.OPEN) {
        self.$wss.send(`PART #${self.$channelProfile.name}`)
        self.$wss.send(`JOIN #${channel}\r\n`)
      }
    }
  },
  computed: {
    authURL: function () {
      return `https://id.twitch.tv/oauth2/authorize?${this.queryParams}`
    },
    queryParams: function () {
      const params = {
        client_id: '122xg9vquuuq3zi6w610iibumg5j15',
        redirect_uri: 'http://localhost:8080',
        response_type: [ 'token', 'id_token' ],
        scope: [ 'chat:read', 'chat:edit', 'user:read:email', 'openid' ],
        claims: {
          id_token: {
            email_verified: null,
            picture: null,
            preferred_username: null
          }
        }
      }

      function serialize (key) {
        if (Object.prototype.toString.call(params[key]).indexOf('Array') != -1) {
          return key + '=' + params[key].join('+')
        } else if (Object.prototype.toString.call(params[key]).indexOf('Object') != -1) {
          return key + '=' + JSON.stringify(params[key])
        } else {
          return key + '=' + params[key]
        }
      }

      return Object.keys(params).map(serialize).join('&')
    },
    hasUserProfile: function () {
      if (this.$userProfile.id === null) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>
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