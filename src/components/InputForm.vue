<template>
  <div class="simple-form">
    <input type="text" :placeholder="$props.formLabel" v-model="formValue">
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  data () {
    return {
      formValue: ''
    }
  },
  props: {
    formLabel: { type: String, default: 'Text' },
    defaultValue: { type: String, default: '' }
  },
  created: function () {
    this.formValue = this.$props.defaultValue
  },
  watch: {
    formValue: function () {
      this.$emit('submitForm', this.formValue)
    }
  }
}
</script>

<style>
.simple-form input {
  border: none;
  border-radius: 20px 20px 20px 20px;
  width: 180px;
  box-shadow: none;
  padding: 10px;
  background-color: #f0f0f0;
  font-size: 10pt;
}

.simple-form input:focus {
  outline: 0;
}

.simple-form input::placeholder {
  color: #b0b0b0;
}

.simple-form input:-ms-input-placeholder {
  color: #b0b0b0;
}

.simple-form input::-ms-input-placeholder {
  color: #b0b0b0;
}
</style>