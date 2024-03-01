<template>
  <div class="row">
    <div class="col-md-12">
      <LayoutCard :marginBottom="hasDetails">
        <template slot="header">
          <div v-if="model.id" class="card-title">Editar {{ formTitle }}</div>
          <div v-else class="card-title">Cadastrar {{ formTitle }}</div>
        </template>
        <template slot="body">
          <div class="row">
            <div class="col-12">
              <slot name="form"></slot>
            </div>
          </div>
        </template>
        <template slot="footer">
          <!-- As quebras nos seguinte botões é necessária para evitar um espaçamento inconsistente entre os botões causado pela fonte de texto em componentes inline-block -->
          <button v-if="model.id" @click="save" class="btn btn-primary font-weight-bold mr-1">Salvar</button
          ><button v-if="model.id && showDeleteButton" @click="confirmDeleteRecord" class="btn btn-primary font-weight-bold mr-1">Excluir</button
          ><button v-if="!model.id" @click="create" class="btn btn-primary font-weight-bold mr-1">Cadastrar</button
          ><button v-if="listPath" @click="returnToList" class="btn btn-primary font-weight-bold">Voltar</button>
        </template>
      </LayoutCard>
      <LayoutCard v-if="model.id && hasDetails" :showFooter="false" :marginBottom="false">
        <template slot="header">
          <div v-if="detailTitle" class="card-title">{{ detailTitle }}</div>
          <slot name="detailsHeader"></slot>
        </template>
        <template slot="body">
          <slot name="details"></slot>
        </template>
      </LayoutCard>
    </div>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"
import utilsMixin from "@/lib/utils"

export default {
  name: "LayoutForm",
  mixins: [globalMixin, utilsMixin],
  props: {
    formTitle: String,
    apiPath: String,
    listPath: String,
    model: Object,
    showDeleteButton: {
      type: Boolean,
      default: true
    },
    hasDetails: Boolean,
    detailTitle: String,
    errors: Object
  },
  data() {
    return {
      formModel: {}
    }
  },
  created() {
    this.loadModel()
  },
  watch: {
    model(input) {
      this.formModel = input
    },
    formModel(input) {
      this.$emit('update:model', input)
    },
  },
  methods: {
    async loadModel() {
      if (this.$route.query.id) {
        let response = await this.requestAPI('GET', this.apiPath + "/" + this.$route.query.id)

        this.formModel = response.data
      }
    },
    async create() {
      let response = await this.requestAPI('POST', this.apiPath, this.formModel)

      if (response.status && response.status == 422) {
        this.$emit('update:errors', response.data.errors)

        swal({
          title: "Erro ao cadastrar!",
          text: "Informações inválidas",
          icon: "error",
          buttons: false,
          timer: 2000
        })
      } else {
        let _this = this;
        swal({
          title: "Registro cadastrado!",
          text: " ",
          icon: "success",
          buttons: false,
          timer: 2000
        }).then(function() {
          if (_this.hasDetails) {
            _this.goTo(_this.$route.path + "?id=" + response.data.model.id)
            _this.formModel = response.data.model
          } else {
            _this.returnToList()
          }
        })
      }

    },
    async save() {
      let response = await this.requestAPI('PUT', this.apiPath + '/' + this.model.id, this.formModel)

      if (response.status && response.status == 422) {
        this.$emit('update:errors', response.data.errors)

        swal({
          title: "Erro ao atualizar!",
          text: "Informações inválidas",
          icon: "error",
          buttons: false,
          timer: 2000
        })
      } else {
        let _this = this;
        this.$emit('update:errors', {})
        swal({
          title: "Registro atualizado!",
          text: " ",
          icon: "success",
          buttons: false,
          timer: 2000
        }).then(function() {
          _this.returnToList()
        })
      }
    },
    confirmDeleteRecord() {
      let _this = this;
      swal({
        title: 'Deseja realmente excluir?',
        text: "Esta acão não poderá ser desfeita!",
        icon: 'warning',
        dangerMode: true,
        buttons: {
          confirm: {
            text: 'Excluir',
            className: 'btn btn-primary'
          },
          cancel: {
            visible: true,
            text: 'Cancelar',
            className: 'btn btn-danger'
          }              
        }
      }).then((willDelete) => {
        if (willDelete) {
          _this.deleteRecord()
          
          swal({
            title: "Registro excluído!",
            text: " ",
            icon: "success",
            buttons: false,
            timer: 2000
          }).then(function() {
            _this.returnToList()
          })
        }
      })
    },
    async deleteRecord() {
      await this.requestAPI('DELETE', this.apiPath + '/' + this.formModel.id)
    },
    returnToList() {
      if (this.listPath) {
        this.goTo(this.listPath)
      }
    }
  },
}
</script>

<style scoped>
.card-action > button {
  width: 120px;
}
</style>