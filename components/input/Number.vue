<template>
  <div :class="'form-group' + (errors ? ' has-error has-feedback' : '')">
    <label :for="id">{{ label }}</label>
    <input v-model="valueData" type="number" :id="id" class="form-control" :disabled="disabled">
    <small v-for="(error,i) in errors" :key="i" class="form-text text-muted">{{ error }}</small>
  </div>
</template>

<script>
export default {
  name: "InputNumber",
  props: {
    id: String,
    label: String,
    value: Number,
    errors: Array,
    disabled: Boolean
  },
  data() {
    return {
      valueData: null
    }
  },
  watch: {
    value(input) {
      this.valueData = input
    },
    valueData(input) {
      if (input == null || input == "") {
        this.$emit('update:value', null)
      } else {
        this.$emit('update:value', Number(input))
      }
    }
  }
}
</script>