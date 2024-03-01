<template>
  <div>
    <div class="row">
      <div class="col-12">
        <LayoutCard>
          <template slot="header">
            <div class="card-title">Filtrar Solicitações</div>
          </template>
          <template slot="body">
            <div class="row">
              <div class="col-4">
                <InputSimpleSelect
                  label="Status"
                  :options="status"
                  :value.sync="searchModel.status"
                />
              </div>
              <div class="col-4">
                <InputSimpleSelect
                  label="Tipo"
                  :options="tipos"
                  :value.sync="searchModel.type"
                />
              </div>
              <div class="col-4">
                <InputSimpleSelect
                  label="Prioridade"
                  :options="prioridades"
                  :value.sync="searchModel.priority"
                />
              </div>
              <div class="col-12">
                <InputDatePeriod
                  label="Data Abertura"
                  :value_1.sync="searchModel.dataAberturaInicial"
                  :value_2.sync="searchModel.dataAberturaFinal"
                />
              </div>
            </div>
          </template>
          <template slot="footer">
            <button @click="filtrar" class="btn btn-primary font-weight-bold">
              <i class="fas fa-search"></i>
              Filtrar
            </button>
            <button @click="limparFiltros" class="btn btn-primary font-weight-bold">
              <i class="fas fa-eraser"></i>
              Remover Filtros
            </button>
            <button @click="novaSolicitacao" data-toggle="modal" data-target="#modal-solicitacao" class="btn btn-primary font-weight-bold">
              <i class="fas fa-plus"></i>
              Nova Solicitação
            </button>
          </template>
        </LayoutCard>
        <LayoutCard
          :showFooter="false"
        >
          <template slot="header">
            Minhas Solicitações
          </template>
          <template slot="body">
            <LayoutTable
              :list="solicitacoes"
            >
              <template slot="header">
                <th scope="col">Titulo</th>
                <th scope="col">Status</th>
                <th scope="col">Tipo</th>
                <th scope="col">Prioridade</th>
                <th scope="col">Dt. Abertura</th>
                <th scope="col">Dt. Iniciação</th>
                <th scope="col">Dt. Conclusão</th>
                <th scope="col">Dt. Cancelamento</th>
                <th scope="col">Dt. Recusa</th>
                <th scope="col">Ações</th>
              </template>
              <template slot="list" slot-scope="{ row }">
                <td>
                  {{ row.title }}
                </td>
                <td>
                  {{ status[row.status] }}
                </td>
                <td>
                  {{ tipos[row.type] }}
                </td>
                <td>
                  {{ prioridades[row.priority] }}
                </td>
                <td>
                  {{ formatIsoDate(row.created_at) }}
                </td>
                <td>
                  {{ row.start_date }}
                </td>
                <td>
                  {{ row.conclusion_date }}
                </td>
                <td>
                  {{ row.cancellation_date }}
                </td>
                <td>
                  {{ row.refusal_date }}
                </td>
                <td>
                  <div class="action d-flex justify-content-center">
                    <div title="Editar" @click="carregarSolicitacao(row)" data-toggle="modal" data-target="#modal-solicitacao">
                      <i class="fas fa-edit"></i>
                    </div>
                    <div title="Cancelar" @click="cancelarSolicitacao(row)">
                      <i class="fas fa-times"></i>
                    </div>
                  </div>
                </td>
              </template>
            </LayoutTable>
          </template>
        </LayoutCard>
      </div>
    </div>

    <LayoutModal
      id="modal-solicitacao"
      :title="(model.id ? 'Editar' : 'Nova') + ' Solicitação'"
    >
      <template slot="body">
        <InputText
          id="title"
          label="Título *"
          :value.sync="model.title"
          :errors="getErrors('title')"
        />
        <InputTextArea
          id="description"
          label="Descrição *"
          :value.sync="model.description"
          :errors="getErrors('description')"
        />
        <InputSimpleSelect
          id="type"
          label="Tipo"
          :showEmptyValue="!model.id"
          :options="tipos"
          :value.sync="model.type"
          :errors="getErrors('type')"
        />
        <InputSimpleSelect
          id="priority"
          label="Prioridade"
          :showEmptyValue="!model.id"
          :options="prioridades"
          :value.sync="model.priority"
          :errors="getErrors('priority')"
        />
      </template>
      <template slot="footer">
        <button @click="salvarSolicitacao" class="btn btn-primary font-weight-bold">
          {{ model.id ? 'Salvar' : 'Cadastrar'}}
        </button>
      </template>
    </LayoutModal>
  </div>
</template>
  
<script>
import globalMixin from "@/lib/global"
import utilsMixin from "@/lib/utils"

export default {
  name: "Geral",
  mixins: [globalMixin, utilsMixin],
  data() {
    return {
      solicitacoes: [],
      model: {},
      searchModel: {},
      status: {
        ABERTA: "Aberta",
        EM_ANDAMENTO: "Em andamento",
        CONCLUIDA: "Concluída",
        CANCELADA: "Cancelada",
        RECUSADA: "Recusada"
      },
      tipos: {
        ERRO: "Erro",
        DUVIDA: "Dúvida",
        SUGESTAO: "Sugestão",
      },
      prioridades: {
        BAIXA: "Baixa",
        MEDIA: "Média",
        ALTA: "Alta",
        URGENTE: "Urgente",
      },
      errors: {}
    }
  },
  created() {
    this.filtrar()
  },
  methods: {
    async filtrar() {
      let response = await this.requestAPI('GET', '/solicitacoes-usuario', null, this.searchModel)

      this.solicitacoes = response.data
    },
    limparFiltros() {
      this.searchModel = {}
    },
    novaSolicitacao() {
      this.model = {}
      this.errors = {}
    },
    carregarSolicitacao(solicitacao) {
      this.model = structuredClone(solicitacao)
      this.errors = {}
    },
    async salvarSolicitacao() {
      let _this = this

      if (this.model.id) {
        let response = await this.requestAPI('PUT', '/support-request/' + this.model.id, this.model)

        if (response.status && response.status == 422) {
          this.errors = response.data.errors
          swal({
            title: "Erro ao editar solicitação!",
            text: "Informações inválidas",
            icon: "error",
            buttons: false,
            timer: 2000
          })
        } else {
          this.errors = {}
          swal({
            title: "Solicitação editada!",
            text: " ",
            icon: "success",
            buttons: false,
            timer: 2000
          }).then(function() {
            _this.filtrar()
            $("#modal-solicitacao").modal('hide')
          })
        }
      } else {
        let response = await this.requestAPI('POST', '/support-request', this.model)

        if (response.status && response.status == 422) {
          this.errors = response.data.errors
          swal({
            title: "Erro ao cadastrar solicitação!",
            text: "Informações inválidas",
            icon: "error",
            buttons: false,
            timer: 2000
          })
        } else {
          this.errors = {}
          swal({
            title: "Solicitação cadastrada!",
            text: " ",
            icon: "success",
            buttons: false,
            timer: 2000
          }).then(function() {
            _this.filtrar()
            $("#modal-solicitacao").modal('hide')
          })
        }
      }
    },
    async cancelarSolicitacao(solicitacao) {
      let response = await this.requestAPI('DELETE', '/support-request/' + solicitacao.id)
      let _this = this

      swal({
        title: "Solicitação cancelada!",
        text: " ",
        icon: "success",
        buttons: false,
        timer: 2000
      }).then(function() {
        _this.filtrar()
      })
    },
    getErrors(field) {
      if (this.errors) {
        return this.errors[field]
      } else {
        return null
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
</style>