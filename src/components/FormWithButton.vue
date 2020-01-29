<template>
  <div class="form-with-button">
    <input type="text" :placeholder="$props.formLabel" v-model="formValue">
    <button v-on:click="submitForm">{{ $props.buttonLabel }}</button>
  </div>
</template>

<script>
export default {
  name: 'FromWithButton',
  data () {
    return {
      formValue: ''
    }
  },
  props: {
    formLabel: { type: String, default: 'Text' },
    buttonLabel: { type: String, default: 'Submit' }
  },
  methods: {
    submitForm: function () {
      this.$emit('submitForm', this.formValue)
    }
  },
  watch: {
    '$props.set': function (newValue) {
      if (this.formValue == '') {
        this.formValue = newValue
      }
    }
  }
}
</script>

<style>
.form-with-button input {
  border: none;
  border-radius: 20px 0px 0px 20px;
  width: 180px;
  box-shadow: none;
  padding: 10px;
  background-color: #f0f0f0;
  font-size: 10pt;
}

.form-with-button input:focus {
  outline: 0;
}

.form-with-button input::placeholder {
  color: #b0b0b0;
}

.form-with-button input:-ms-input-placeholder {
  color: #b0b0b0;
}

.form-with-button input::-ms-input-placeholder {
  color: #b0b0b0;
}

.form-with-button button {
  border: none;
  border-radius: 0px 20px 20px 0px;
  padding: 10px;
  color: #ffffff;
  background-color: #0f0f5e;
  font-size: 10pt;
}

.form-with-button button:focus {
  outline: 0;
}
</style>