<template>
  <div :class="'form-group' + (errors ? ' has-error has-feedback' : '')">
    <label :for="id">{{ label }}</label>
    <date-picker
      :id="id"
      v-model="valueData"
      language="pt-br"
      valueType="format"
      :disabled="disabled"
      input-class="form-control"
      class="d-block w-100"
    ></date-picker>
    <small v-for="(error,i) in errors" :key="i" class="form-text text-muted">{{ error }}</small>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/pt-br';
import 'vue2-datepicker/index.css';

export default {
  name: "InputDate",
  props: {
    id: String,
    label: String,
    value: String,
    errors: Array,
    disabled: Boolean
  },
  components: {
    DatePicker
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
        this.$emit('update:value', input)
      }
    }
  },
}
</script>