<template>
  <div :class="'form-group' + (errors ? ' has-error has-feedback' : '')">
    <label :for="id">{{ label }}</label>
    <select v-model="valueData" :id="id" class="form-control" :disabled="disabled">
      <option v-if="showEmptyValue" :value="null"></option>
      <option v-for="(option,i) in values" :key="i" :value="option.id">
        <span v-if="field">
          {{ option[field] }}
        </span>
        <span v-if="fields">
          {{ concatFields(option) }}
        </span>
      </option>
    </select>
    <small v-for="(error,i) in errors" :key="i" class="form-text text-muted">{{ error }}</small>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"

// Select for database values
export default {
  name: "InputSelect",
  mixins: [globalMixin],
  props: {
    errors: Array,
    field: String,
    fields: Array,
    id: String,
    initialValues: Array,
    label: String,
    path: String,
    value: Number,
    showEmptyValue: {
      type: Boolean,
      default: true
    },
    returnSelectedObject: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filters:  {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      valueData: null,
      values: []
    }
  },
  watch: {
    value(input) {
      this.valueData = input
    },
    valueData(input) {
      this.$emit('update:value', input)

      if (this.returnSelectedObject) {
        let selectedObject = null

        for (const object of this.values) {
          if (object.id == input) {
            selectedObject = object
            break;
          }
        }

        this.$emit('selectedObject', selectedObject)
      }
    },
    initialValues(input) {
      this.values = input
    }
  },
  created() {
    if (this.path != null) {
      this.search();
    }
  },
  methods: {
    async search() {
      let response = await this.requestAPI('GET', this.path, this.filters)

      this.values = response.data.itens
    },
    concatFields(option) {
      let values = []

      for (const f of this.fields) {
        values.push(option[f])
      }

      return values.join(" - ")
    }
  },
}
</script>