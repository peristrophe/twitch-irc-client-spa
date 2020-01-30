<template>
  <div class="settings">
    <a :href="authURL">
      <p v-if="hasUserProfile" class="usericon">
        <img :src="$userProfile.picture"/>
      </p>
      <p v-else class="usericon">
        <img src="../assets/thumb-anonymous.png"/>
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
.settings {
  position: fixed;
  left: 0px;
  top: 80px;
  width: 100%;
  height: 70%;
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