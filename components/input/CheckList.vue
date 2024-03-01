<template>
  <div :class="'form-check' + (errors ? ' has-error has-feedback' : '')">
    <label class="w-100">{{ label }}</label>
    <div class="custom-control custom-checkbox w-100" v-for="(item,i) in items" :key="i">
      <input
        :id="_uid + '-checklist-' + i"
        type="checkbox"
        class="custom-control-input"
        @click="check(item)"
        :checked="isChecked(item)"
      >
      <label class="custom-control-label" :for="_uid + '-checklist-' + i">{{ item[field] }}</label>
    </div>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "InputCheckList",
  mixins: [globalMixin],
  props: {
    id: String,
    label: String,
    path: String,
    value: Array,
    field: String,
    errors: Array,
    disabled: Boolean
  },
  data() {
    return {
      valueData: [],
      items: []
    };
  },
  watch: {
    value(input) {
      this.valueData = input
    },
    valueData(input) {
      this.$emit('update:value', input)
    }
  },
  created() {
    if (this.path != null) {
      this.search()
    }
  },
  methods: {
    async search() {
      let response = await this.requestAPI('GET', this.path)

      this.items = response.data.itens
    },
    isChecked(item) {
      for (const v of this.valueData) {
        if (v.id == item.id) {
          return true
        }
      }
      return false
    },
    check(item) {
      for (const k in this.valueData) {
        var v = this.value[k]
        if (v.id == item.id) {
          this.valueData.splice(k, 1)
          return
        }
      }
      this.valueData.push(item)
    },
  },
};
</script>