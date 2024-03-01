<template>
  <div :class="'form-group' + (errors ? ' has-error has-feedback' : '')">
    <label :for="id">{{ label }}</label>
    <textarea v-model="valueData" :type="type ? type : 'text'" :id="id" class="form-control" :style="readonly ? 'opacity: 1 !important' : ''" :readonly="readonly" :disabled="disabled"></textarea>
    <small v-for="(error,i) in errors" :key="i" class="form-text text-muted">{{ error }}</small>
  </div>
</template>

<script>
export default {
  name: "InputTextArea",
  props: {
    id: String,
    label: String,
    value: String,
    type: String,
    errors: Array,
    readonly: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      valueData: null
    }
  },
  methods: {
  },
  watch: {
    value(input) {
      this.valueData = input
    },
    valueData(input) {
      this.$emit('update:value', input)
    }
  }
}
</script>