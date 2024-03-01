<template>
  <div :class="'form-group' + (errors ? ' has-error has-feedback' : '')">
    <label :for="id">{{ label }}</label>
    <div class="d-flex">
      <button
        type="button"
        data-toggle="modal"
        :data-target="'#' + id + '_lookup_modal'"
        class="btn btn-primary"
      >
        <i class="fas fa-search"></i>
      </button>
      <div class="input-icon w-100">
        <input v-model="description" type="text" :id="id" class="form-control ml-2" style="opacity: 1 !important; padding-right: 40px;" readonly="true">
        <span class="input-icon-addon action" style="right: 3px;">
          <div @click="clearModel">
            <i class="fa fa-times"></i>
          </div>
        </span>
      </div>
    </div>
    <small v-for="(error,i) in errors" :key="i" class="form-text text-muted">{{ error }}</small>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"

// Componente criado para ser utilizado dentro de modais (ex: cadastro de detalhes).
// Deve sempre ser utilizado com o componente LookupModal e ambos devem possuir o mesmo id
export default {
  name: "InputLookupInput",
  mixins: [globalMixin],
  props: {
    id: String,
    errors: Array,
    descriptionField: String,
    label: String,
    path: String,
    value: Number,
    selectedModel: Object,
  },
  data() {
    return {
      model: null,
    }
  },
  watch: {
    value(input) {
      this.searchById(input)
    },
    model() {
      if (this.model != null) {
        this.$emit('update:value', this.model.id)
      } else {
        this.$emit('update:value', null)
      }
    },
    selectedModel() {
      if (this.selectedModel != null) {
        this.model = this.selectedModel
      }
    }
  },
  computed: {
    description() {
      return this.model != null ? this.model[this.descriptionField] : null;
    },
  },
  methods: {
    clearModel() {
      this.model = null
    },
    async searchById(id) {
      if (id != null && id != "") {
        let response = await this.requestAPI('GET', this.path + "/" + id)

        this.model = response.data
      } else {
        this.model = null
      }
    },
  },
}
</script>