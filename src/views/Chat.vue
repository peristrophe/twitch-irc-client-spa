<template>
  <div class="chat">
    <p id="chatScreen">
      <ul>
        <li v-for="(comment, index) in privmsgs" v-bind:key="index">
          {{ comment }}
        </li>
      </ul>
    </p>
    <div class="msg-form">
      <FormWithButton formLabel="Message" buttonLabel="Send" v-on:submitValue="say"/>
    </div>
  </div>
</template>

<script>
import FormWithButton from '@/components/FormWithButton.vue'

export default {
  name: 'Chat',
  data () {
    return {
      msg: []
    }
  },
  components: {
    FormWithButton
  },
  methods: {
    autoScroll: function () {
      var obj = document.getElementById('chatScreen')
      obj.scrollTo(0, obj.scrollHeight)
    },
    say: function (message) {
      this.$wss.send(`PRIVMSG #${this.$channelProfile.name} :${message}`)
    }
  },
  created: function () {
    if (this.$channelProfile.name == '') {
      return
    }
    const self = this

    // ref: https://dev.twitch.tv/docs/irc/guide/
    self.$wss = new WebSocket('wss://irc-ws.chat.twitch.tv:443')

    self.$wss.onopen = function () {
      self.$wss.send('CAP REQ :twitch.tv/tags twitch.tv/commands\r\n')
      self.$wss.send(`PASS oauth:${self.$accessToken}\r\n`)
      self.$wss.send(`NICK ${self.$userProfile.loginName}\r\n`)
      self.$wss.send(`JOIN #${self.$channelProfile.name}\r\n`)
    }

    self.$wss.onmessage = function (event) {
      if (event.data.startsWith('PING')) {
        self.$wss.send('PONG :tmi.twitch.tv\r\n')
      } else {
        self.msg.push(event.data)
      }
    }
  },
  computed: {
    privmsgs: function () {
      return this.msg.filter(
        function (value) {
          return value.match(/PRIVMSG/)
        }
      ).map(
        function (value) {
          return value.split(';').slice(-1)[0].split(':').slice(2).join(':')
        }
      )
    }
  },
  watch: {
    msg: function () {
      window.setTimeout(this.autoScroll, 100)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
.chat {
  align: center;
  margin: auto;
  padding-top: 50px;
  max-width: 500px;
}
.chat p {
  overflow: scroll;
  word-wrap: break-word;
  height: 80vh;
  margin: 0px;
  border-radius: 10px;
  box-shadow: 2px 2px 3px 3px rgba(0,0,0,0.1) inset;
  background-color: #fefefe;
}
.msg-form {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 50px;
}
ul {
  list-style-type: disc;
  padding: 20;
  overflow: scroll;
}
li {
  text-align: left;
  margin: 5px 10px;
}
a {
  color: #42b983;
}
</style>