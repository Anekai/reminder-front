<template>
  <div :class="'form-group' + (errors ? ' has-error has-feedback' : '')">
    <label :for="id">{{ label }}</label>
    <select v-model="valueData" :id="id" class="form-control" :disabled="disabled">
      <option v-if="showEmptyValue" :value="null"></option>
      <option v-for="(option,i) in options" :key="i" :value="i">
        {{ option }}
      </option>
    </select>
    <small v-for="(error,i) in errors" :key="i" class="form-text text-muted">{{ error }}</small>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"

// Select input for fixed values
export default {
  name: "InputSimpleSelect",
  mixins: [globalMixin],
  props: {
    errors: Array,
    id: String,
    label: String,
    showEmptyValue: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: String,
    options: Object
  },
  data() {
    return {
      valueData: null,
    }
  },
  watch: {
    value(input) {
      this.valueData = input
    },
    valueData(input) {
      this.$emit('update:value', input)
    },
  },
}
</script>