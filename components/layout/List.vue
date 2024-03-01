<template>
  <div class="row">
    <div class="col-md-12">
      <LayoutCard>
        <template slot="header">
          <div class="card-title">Filtrar {{ title }}</div>
        </template>
        <template slot="body">
          <div class="row">
            <div class="col-12">
              <slot name="form"></slot>
            </div>
          </div>
        </template>
        <template slot="footer">
          <button @click="filter" class="btn btn-primary font-weight-bold">
            <div class="button-loader-container">
              <div>Buscar</div>
              <div v-if="loading" class="loader loader-sm button-loader-custom"></div>
            </div>
          </button>
          <button @click="clearFilters" class="btn btn-primary font-weight-bold">Limpar</button>
          <button @click="newRecord" class="btn btn-primary font-weight-bold">Cadastrar</button>
        </template>
      </LayoutCard>
      <LayoutCard :showFooter="false">
        <template slot="header">
          <div class="card-title">Listar {{ title }}</div>
        </template>
        <template slot="body">
          <div class="row">
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
          </div>
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
                    <div title="Editar" @click="editRecord(row)">
                      <i class="fas fa-edit"></i>
                    </div>
                    <div title="Excluir" @click="confirmDeleteRecord(row)">
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
          <div class="row">
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
          </div>
        </template>
      </LayoutCard>
    </div>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"
import utilsMixin from "@/lib/utils"

export default {
  name: "LayoutList",
  mixins: [globalMixin, utilsMixin],
  props: {
    apiPath: String,
    formPath: String,
    title: String,
    model: Object,
    order: Array,
    pageSize: Number
  },
  data() {
    return {
      list: [],
      currentPage: 0,
      maxRecords: 0,
      pages: [],
      totalPages: 0,
      loading: false,
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
    }
  },
  created() {
    this.filter()
  },
  methods: {
    async filter() {
      this.loading = true
      let query = {
        limit: this.limit,
        offset: this.offset,
        where: [],
        orderby: []
      }

      if (this.model) {
        for (const item in this.model) {
          if (this.model[item].value) {
            query['where'].push({
              field: this.model[item].field,
              operator: this.model[item].operator,
              value: (this.model[item].operator == 'like' || this.model[item].operator == 'ilike') ? '%' + this.model[item].value + '%' : this.model[item].value
            })
          }
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
      this.loading = false
    },
    clearFilters() {
      let clearModel = this.model

      for (let field in tempModel) {
        clearModel[field].value = null
      }

      this.$emit('update:model', clearModel)
    },
    async newRecord() {
      this.goTo(this.formPath)
    },
    async editRecord(row) {
      this.goTo(this.formPath + "?id=" + row.id)
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

.button-loader-custom {
  margin-left: 5px;
  border-color: white;
  border-bottom-color: transparent;
}

.button-loader-container  {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
