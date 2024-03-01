<template>
  <div>
    <div :class="'form-group' + ((errors_1 || errors_2) ? ' has-error has-feedback' : '')">
      <label :for="id_1">{{ label }}</label>
      <div class="d-block">
        <date-picker
          :id="id_1"
          v-model="valueData_1"
          language="pt-br"
          valueType="format"
          :disabled="disabled"
          input-class="form-control"
          style="width: calc(50% - 23px)"
        ></date-picker>
        <div class="d-inline-block text-center" style="width: 40px;">até</div>
        <date-picker
          :id="id_2"
          v-model="valueData_2"
          language="pt-br"
          valueType="format"
          :disabled="disabled"
          input-class="form-control"
          style="width: calc(50% - 24px)"
        ></date-picker>
      </div>
      <small v-for="(error,i) in errors_1" :key="i" class="form-text text-muted">{{ error }}</small>
      <small v-for="(error,i) in errors_2" :key="i" class="form-text text-muted">{{ error }}</small>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/pt-br';
import 'vue2-datepicker/index.css';

export default {
  name: "InputDatePeriod",
  props: {
    label: String,
    id_1: String,
    id_2: String,
    value_1: String,
    value_2: String,
    errors_1: Array,
    errors_2: Array,
    disabled: Boolean
  },
  components: {
    DatePicker
  },
  data() {
    return {
      valueData_1: null,
      valueData_2: null
    }
  },
  watch: {
    value_1(input) {
      this.valueData_1 = input
    },
    value_2(input) {
      this.valueData_2 = input
    },
    valueData_1(input) {
      if (input == null || input == "") {
        this.$emit('update:value_1', null)
      } else {
        this.$emit('update:value_1', input)
      }
    },
    valueData_2(input) {
      if (input == null || input == "") {
        this.$emit('update:value_2', null)
      } else {
        this.$emit('update:value_2', input)
      }
    }
  },
}
</script>