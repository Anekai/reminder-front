<template>
  <div class="row">
    <div class="col-12 mb-3">
      <button type="button" @click="newDetailModel()" data-toggle="modal" :data-target="'#' + modalId" class="btn btn-primary font-weight-bold">Novo</button>
    </div>
    <div class="col-sm-12 col-md-5">
      <div role="status">
        Exibindo {{ total == 0 ? 0 : offset + 1 }} a {{ total }} de {{ maxRecords }} registros
      </div>
    </div>
    <div class="col-sm-12 col-md-7">
      <div>
        <ul class="pagination">
          <li :class="'page-item' + (currentPage == 0 ? ' disabled' : '')">
            <a href="#" tabindex="0" class="page-link" @click.prevent="currentPage--" v-text="'<'"></a>
          </li>
          <li
            v-for="(v, i) in pages"
            :key="i"
            :class="'page-item' + (currentPage + 1 == v ? ' active' : '')"
          >
            <a href="#" tabindex="0" class="page-link" @click.prevent="currentPage = v - 1">{{ v }}</a>
          </li>
          <li :class="'page-item' + (totalPages == 0 || currentPage == totalPages - 1 ? ' disabled' : '')">
            <a href="#" tabindex="0" class="page-link" @click.prevent="currentPage++" v-text="'>'"></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-12">
      <table class="table table-hover">
        <thead>
          <tr>
            <slot name="header"></slot>
            <th scope="col" class="text-center" style="width: 200px;">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,i) in list" :key="i">
            <slot name="list" :row="row"></slot>
            <td>
              <div class="action d-flex justify-content-center">
                <slot name="customActions"></slot>
                <div v-if="showEditButton" title="Editar" @click="loadDetailModel(row)" data-toggle="modal" :data-target="'#' + modalId">
                  <i class="fas fa-edit"></i>
                </div>
                <div v-if="showDeleteButton" title="Excluir" @click="confirmDeleteRecord(row)">
                  <i class="fas fa-trash"></i>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="list == null || list.length == 0">
            <td colspan="100">
              <h5 class="text-center mb-0">
                Nenhum registro foi encontrado
              </h5>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-sm-12 col-md-5">
      <div role="status">
        Exibindo {{ total == 0 ? 0 : offset + 1 }} a {{ total }} de {{ maxRecords }} registros
      </div>
    </div>
    <div class="col-sm-12 col-md-7">
      <div>
        <ul class="pagination">
          <li :class="'page-item' + (currentPage == 0 ? ' disabled' : '')">
            <a href="#" tabindex="0" class="page-link" @click.prevent="currentPage--" v-text="'<'"></a>
          </li>
          <li
            v-for="(v, i) in pages"
            :key="i"
            :class="'page-item' + (currentPage + 1 == v ? ' active' : '')"
          >
            <a href="#" tabindex="0" class="page-link" @click.prevent="currentPage = v - 1">{{ v }}</a>
          </li>
          <li :class="'page-item' + (totalPages == 0 || currentPage == totalPages - 1 ? ' disabled' : '')">
            <a href="#" tabindex="0" class="page-link" @click.prevent="currentPage++" v-text="'>'"></a>
          </li>
        </ul>
      </div>
    </div>

    <LayoutModal
      :id="modalId"
      :title="'Cadastrar ' + title"
    >
      <template slot="body">
        <slot name="detailForm"></slot>
      </template>
      <template slot="footer">
        <button @click="save" class="btn btn-primary font-weight-bold">{{ formModel.id ? 'Salvar' : 'Cadastrar'}}</button>
      </template>
    </LayoutModal>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"
import utilsMixin from "@/lib/utils"

export default {
  name: "LayoutListDetail",
  mixins: [globalMixin, utilsMixin],
  props: {
    apiPath: String,
    modalId: String,
    model: Object,
    formModel: Object,
    order: Array,
    parentKey: String,
    pageSize: Number,
    title: String,
    errors: Object,
    showEditButton: {
      type: Boolean,
      default: true
    },
    showDeleteButton: {
      type: Boolean,
      default: true
    },
    customSave: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      list: [],
      currentPage: 0,
      maxRecords: 0,
      pages: [],
      totalPages: 0,
      detailModel: {}
    }
  },
  computed: {
    limit() {
      return this.pageSize ? this.pageSize : 10
    },
    offset() {
      return this.limit * this.currentPage
    },
    total() {
      return this.offset + this.list.length
    },
  },
  watch: {
    currentPage() {
      this.filter()
    },
    formModel(input) {
      this.detailModel = input
    },
    detailModel(input) {
      this.$emit('update:formModel', input)
    }
  },
  created() {
    this.filter()
  },
  methods: {
    loadDetailModel(row) {
      this.detailModel = structuredClone(row)
      this.$emit('update:errors', {})
      this.$emit('showModal')
    },
    newDetailModel() {
      this.detailModel = {}

      this.detailModel[this.parentKey] = this.model[this.parentKey].value
      this.$emit('update:errors', {})
      this.$emit('showModal')
    },
    async filter() {
      let query = {
        limit: this.limit,
        offset: this.offset,
        where: [],
        orderby: []
      }

      for (const item in this.model) {
        if (this.model[item].value) {
          query['where'].push({
            field: this.model[item].field,
            operator: this.model[item].operator,
            value: (this.model[item].operator == 'like' || this.model[item].operator == 'ilike') ? '%' + this.model[item].value + '%' : this.model[item].value
          })
        }
      }

      if (this.order) {
        for (const item of this.order) {
          query['orderby'].push({
            field: item.field,
            type: item.type
          })
        }
      }

      let response = await this.requestAPI('GET', this.apiPath, null, query)

      this.list = response.data.itens
      this.maxRecords = response.data.max

      this.paginate()
    },
    async save() {
      if (this.customSave) {
        this.$emit('save')
      } else {
        if (this.formModel.id) {
          let response = await this.requestAPI('PUT', this.apiPath + '/' + this.formModel.id, this.formModel)
    
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
            swal({
              title: "Registro atualizado!",
              text: " ",
              icon: "success",
              buttons: false,
              timer: 2000
            }).then(function() {
              $("#" + _this.modalId).modal('hide')
              _this.filter()
            })
          }
        } else {
          this.formModel[this.parentKey] = this.model[this.parentKey].value
          
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
              $("#" + _this.modalId).modal('hide')
              _this.filter()
            })
          }
        }
      }
    },
    confirmDeleteRecord(row) {
      let _this = this;
      swal({
        title: 'Deseja realmente excluir?',
        text: "Esta acão não poderá ser desfeita!",
        icon: 'warning',
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
          _this.deleteRecord(row)
          
          swal({
            title: "Registro excluído!",
            text: " ",
            icon: "success",
            buttons: false,
            timer: 2000
          }).then(function() {
            _this.filter()
          })
        }
      })
    },
    async deleteRecord(row) {
      await this.requestAPI('DELETE', this.apiPath + '/' + row.id)
    },
    paginate() {
      this.totalPages = Math.ceil(this.maxRecords / this.limit)
      if (this.currentPage >= this.totalPages) {
        this.currentPage = 0
      }
      this.pages = []
      for (let index = 1; index <= this.totalPages; index++) {
        this.pages.push(index)
      }
      if (this.pages.length > 7) {
        var allPages = this.pages
        this.pages = []
        this.pages.push(allPages[0])
        if (this.currentPage < 3) {
          for (let index = 1; index < 6; index++) {
            this.pages.push(allPages[index])
          }
        } else if (this.currentPage > allPages.length - 4) {
          for (let index = allPages.length - 6; index < allPages.length - 1; index++) {
            this.pages.push(allPages[index])
          }
        } else {
          for (let index = this.currentPage - 2; index < this.currentPage + 3; index++) {
            this.pages.push(allPages[index])
          }
        }
        this.pages.push(allPages[allPages.length - 1])
      }
    }
  },
}
</script>

<style scoped>
.action > div {
  cursor: pointer;
  padding: 5px;
}

.card-action > button {
  width: 120px;
}

ul.pagination {
  margin: 2px 0;
  white-space: nowrap;
  justify-content: flex-end;
}
</style>