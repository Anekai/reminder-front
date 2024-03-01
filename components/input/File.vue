<template>
  <div :class="'form-group' + (errors ? ' has-error has-feedback' : '')">
    <label :for="id">{{ label }}</label>
    <input :id="id" ref="file" type="file" :accept="acceptFiles" @change="uploadFile" class="form-control-file">
    <small v-for="(error,i) in errors" :key="i" class="form-text text-muted">{{ error }}</small>
  </div>
</template>

<script>
export default {
  name: "InputFile",
  props: {
    id: String,
    label: String,
    errors: Array,
    value: File,
    acceptFiles: String
  },
  data() {
    return {
      valueData: null
    }
  },
  watch: {
    value(input) {
      this.valueData = input

      if (this.valueData == null) {
        this.$refs.file.value = ''
      }
    },
    valueData(input) {
      this.$emit('update:value', input)
    }
  },
  methods: {
    uploadFile() {
      this.valueData = this.$refs.file.files[0]
    },
  }
}
</script>