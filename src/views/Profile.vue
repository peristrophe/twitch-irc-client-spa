<template>
  <div class="profile">
    <ChannelForm/>
    <div class="users-icon">
      <a href="./">
        <img src="../assets/anonymous.png">
      </a>
    </div>
  </div>
</template>

<script>
import ChannelForm from '@/components/ChannelForm.vue'

export default {
  name: 'profile',
  components: {
    ChannelForm
  },
  data () {
    return {
      channel: ''
    }
  },
  methods: {
    connect: function () {
      document.location.href = '/chat'
    }
  }
}
</script>

<style>
.channel-form input {
  border: none;
  border-radius: 20px 0px 0px 20px;
  width: 180px;
  box-shadow: none;
  padding: 10px;
  background-color: #f0f0f0;
  font-size: 10pt;
}

.channel-form input:focus {
  outline: 0;
}

.channel-form input::placeholder {
  color: #b0b0b0;
}

.channel-form input:-ms-input-placeholder {
  color: #b0b0b0;
}

.channel-form input::-ms-input-placeholder {
  color: #b0b0b0;
}

.channel-form button {
  border: none;
  border-radius: 0px 20px 20px 0px;
  padding: 10px;
  color: #ffffff;
  background-color: #0f0f5e;
  font-size: 10pt;
}

.channel-form button:focus {
  outline: 0;
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
</style>