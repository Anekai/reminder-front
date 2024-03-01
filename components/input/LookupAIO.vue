<template>
  <div>
    <div :class="'form-group' + (errors ? ' has-error has-feedback' : '')">
      <label :for="id">{{ label }}</label>
      <div class="d-flex">
        <button
          type="button"
          data-toggle="modal"
          :data-target="'#' + id + '_lookup_modal'"
          class="btn btn-primary"
          @click="focusSearch"
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

    <LayoutModal
      :id="id + '_lookup_modal'"
      :title="modalTitle"
      :showFooter="false"
      @showModal="focusSearch"
    >
      <template slot="body">
        <div class="d-flex mb-3">
          <input ref="lookupSearchInput" v-model="searchValue" @keyup.enter="search(true)" type="text" class="form-control mr-2">
          <button type="button" class="btn btn-primary" @click="search(true)">
            Buscar
          </button>
        </div>

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
          <div class="col-md-12">
            <table class="table table-hover">
              <thead>
                <tr>
                  <slot name="listHeader"></slot>
                  <th scope="col" class="text-center" style="width: 100px;">Selecionar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row,i) in list" :key="i">
                  <slot name="list" :row="row"></slot>
                  <td>
                    <div class="action d-flex justify-content-center">
                      <div title="Selecionar" data-dismiss="modal" @click="selectModel(row)">
                        <i class="fas fa-arrow-alt-circle-right fa-lg"></i>
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
        </div>
      </template>
    </LayoutModal>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "InputLookupAIO",
  mixins: [globalMixin],
  props: {
    id: String,
    errors: Array,
    descriptionField: String,
    label: String,
    modalTitle: String,
    path: String,
    value: Number,
    filters: Object,
    searchFields: Array,
  },
  data() {
    return {
      model: null,
      searchValue: null,
      list: [],
      currentPage: 0,
      maxRecords: 0,
      pages: [],
      totalPages: 0,
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
    currentPage() {
      this.search(false)
    },
  },
  computed: {
    description() {
      return this.model != null ? this.model[this.descriptionField] : null;
    },
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
  methods: {
    focusSearch() {
      setTimeout(() => {
        this.$refs.lookupSearchInput.focus()
      }, 100)
    },
    selectModel(row) {
      this.model = row
    },
    clearModel() {
      this.model = null
    },
    async searchById(id) {
      if (id != null && id != "") {
        let response = await this.requestAPI('GET', this.path + "/" + id)

        this.model = response.data
      }
    },
    async search(resetPage) {
      let query = {
        limit: this.limit,
        offset: this.offset,
        where: [],
      }

      if (this.filters) {
        for (const item in this.filters) {
          query['where'].push({
            field: this.filters[item].field,
            operator: this.filters[item].operator,
            whereType: this.filters[item].whereType ? this.filters[item].whereType : 'and',
            value: this.filters[item].value
          })
        }
      }

      if (this.searchValue) {
        for (const item in this.searchFields) {
          query['where'].push({
            field: this.searchFields[item],
            operator: 'ilike',
            whereType: item == 0 ? 'and' : 'or',
            value: '%' + this.searchValue + '%'
          })
        }
      }

      let response = await this.requestAPI('GET', this.path, null, query)

      this.list = response.data.itens
      this.maxRecords = response.data.max

      if (resetPage) {
        this.currentPage = 0
      }
      this.paginate()
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

ul.pagination {
  margin: 2px 0;
  white-space: nowrap;
  justify-content: flex-end;
}
</style>