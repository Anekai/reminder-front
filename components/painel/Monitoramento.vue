<template>
  <div>
    <h4 class="page-title">Painel de Monitoramento</h4>
    <div class="row">
      <LayoutMiniCard
        icon="fas fa-question-circle"
        title="Solicitações"
        containerClass="col-2"
        :value="quantidadeSolicitacoes"
      />
      <LayoutMiniCard
        icon="fas fa-plus-circle"
        title="Abertas"
        containerClass="col-2"
        :value="quantidadeSolicitacoesAbertas"
      />
      <LayoutMiniCard
        icon="fas fa-cog"
        title="Em andamento"
        containerClass="col-2"
        :value="quantidadeSolicitacoesEmAndamento"
      />
      <LayoutMiniCard
        icon="fas fa-check-circle"
        title="Concluídas"
        containerClass="col-2"
        :value="quantidadeSolicitacoesConcluidas"
      />
      <LayoutMiniCard
        icon="fas fa-times-circle"
        title="Canceladas"
        containerClass="col-2"
        :value="quantidadeSolicitacoesCanceladas"
      />
      <LayoutMiniCard
        icon="fas fa-ban"
        title="Recusadas"
        containerClass="col-2"
        :value="quantidadeSolicitacoesRecusadas"
      />
    </div>
    <div class="row">
      <div class="col-12">
        <LayoutCard
          :showFooter="false"
        >
          <template slot="header">
            Em andamento
          </template>
          <template slot="body">
            <LayoutTable
              :list="solicitacoesEmAndamento"
            >
              <template slot="header">
                <th scope="col">Título</th>
                <th scope="col">Solicitante</th>
                <th scope="col">Dt. Abertura</th>
                <th scope="col">Dt. Iniciação</th>
                <th scope="col" class="text-center" style="width: 100px;">Ações</th>
              </template>
              <template slot="list" slot-scope="{ row }">
                <td>
                  {{ row.title }}
                </td>
                <td>
                  {{ row.usuario.name }}
                </td>
                <td>
                  {{ formatIsoDate(row.created_at) }}
                </td>
                <td>
                  {{ row.start_date }}
                </td>
                <td>
                  <div class="action d-flex justify-content-center">
                    <div title="Concluir" @click="carregarSolicitacao(row)" data-toggle="modal" data-target="#modal-concluir-solicitacao">
                      <i class="fas fa-check-circle"></i>
                    </div>
                    <div title="Recusar" @click="carregarSolicitacao(row)" data-toggle="modal" data-target="#modal-recusar-solicitacao">
                      <i class="fas fa-ban"></i>
                    </div>
                  </div>
                </td>
              </template>
            </LayoutTable>
          </template>
        </LayoutCard>
      </div>
      <div class="col-12">
        <LayoutCard
          :showFooter="false"
        >
          <template slot="header">
            Abertas
          </template>
          <template slot="body">
            <LayoutTable
              :list="solicitacoesAbertas"
            >
              <template slot="header">
                <th scope="col">Título</th>
                <th scope="col">Solicitante</th>
                <th scope="col">Dt. Abertura</th>
                <th scope="col" class="text-center" style="width: 100px;">Ações</th>
              </template>
              <template slot="list" slot-scope="{ row }">
                <td>
                  {{ row.title }}
                </td>
                <td>
                  {{ row.usuario.name }}
                </td>
                <td>
                  {{ formatIsoDate(row.created_at) }}
                </td>
                <td>
                  <div class="action d-flex justify-content-center">
                    <div title="Iniciar" @click="iniciarSolicitacao(row)">
                      <i class="fas fa-play-circle"></i>
                    </div>
                    <div title="Recusar" @click="carregarSolicitacao(row)" data-toggle="modal" data-target="#modal-recusar-solicitacao">
                      <i class="fas fa-ban"></i>
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
      id="modal-concluir-solicitacao"
      title="Concluir Solicitação"
    >
      <template slot="body">
        <InputText
          id="title"
          label="Título"
          :value.sync="model.title"
          :readonly="true"
        />
        <InputTextArea
          id="description"
          label="Descrição"
          :value.sync="model.description"
          :readonly="true"
        />
        <InputText
          id="type"
          label="Tipo"
          :value.sync="tipos[model.type]"
          :readonly="true"
        />
        <InputText
          id="priority"
          label="Prioridade"
          :value.sync="prioridades[model.priority]"
          :readonly="true"
        />
        <InputTextArea
          id="response"
          label="Resposta *"
          :value.sync="model.response"
          :errors="getErrors('response')"
        />
      </template>
      <template slot="footer">
        <button @click="concluirSolicitacao" class="btn btn-primary font-weight-bold">
          Concluir
        </button>
      </template>
    </LayoutModal>

    <LayoutModal
      id="modal-recusar-solicitacao"
      title="Recusar Solicitação"
    >
      <template slot="body">
        <InputText
          id="title"
          label="Título"
          :value.sync="model.title"
          :readonly="true"
        />
        <InputTextArea
          id="description"
          label="Descrição"
          :value.sync="model.description"
          :readonly="true"
        />
        <InputText
          id="type"
          label="Tipo"
          :value.sync="tipos[model.type]"
          :readonly="true"
        />
        <InputText
          id="priority"
          label="Prioridade"
          :value.sync="prioridades[model.priority]"
          :readonly="true"
        />
        <InputTextArea
          id="reason_refusal"
          label="Motivo *"
          :value.sync="model.reason_refusal"
          :errors="getErrors('reason_refusal')"
        />
      </template>
      <template slot="footer">
        <button @click="recusarSolicitacao" class="btn btn-primary font-weight-bold">
          Recusar
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
      quantidadeSolicitacoes: 0,
      quantidadeSolicitacoesAbertas: 0,
      quantidadeSolicitacoesEmAndamento: 0,
      quantidadeSolicitacoesConcluidas: 0,
      quantidadeSolicitacoesCanceladas: 0,
      quantidadeSolicitacoesRecusadas: 0,
      solicitacoesEmAndamento: [],
      solicitacoesAbertas: [],
      model: {},
      errors: {},
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
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      let response = await this.requestAPI('GET', '/monitoramento-solicitacoes')
  
      this.quantidadeSolicitacoes = response.data.quantidadeSolicitacoes
      this.quantidadeSolicitacoesAbertas = response.data.quantidadeSolicitacoesAbertas
      this.quantidadeSolicitacoesEmAndamento = response.data.quantidadeSolicitacoesEmAndamento
      this.quantidadeSolicitacoesConcluidas = response.data.quantidadeSolicitacoesConcluidas
      this.quantidadeSolicitacoesCanceladas = response.data.quantidadeSolicitacoesCanceladas
      this.quantidadeSolicitacoesRecusadas = response.data.quantidadeSolicitacoesRecusadas
      this.solicitacoesEmAndamento = response.data.solicitacoesEmAndamento
      this.solicitacoesAbertas = response.data.solicitacoesAbertas
    },
    carregarSolicitacao(solicitacao) {
      this.model = structuredClone(solicitacao)
      this.errors = {}
    },
    async concluirSolicitacao() {
      let response = await this.requestAPI('PUT', '/concluir-solicitacao/' + this.model.id, this.model)
      let _this = this

      if (response.status && response.status == 422) {
        this.errors = response.data.errors
        swal({
          title: "Erro ao concluir solicitação!",
          text: "Dados inválidos",
          icon: "error",
          buttons: false,
          timer: 2000
        })
      } else {
        this.errors = {}
        swal({
          title: "Solicitação concluída!",
          text: " ",
          icon: "success",
          buttons: false,
          timer: 2000
        }).then(function() {
          _this.loadData()
        })
      }
    },
    async recusarSolicitacao() {
      let response = await this.requestAPI('PUT', '/recusar-solicitacao/' + this.model.id, this.model)
      let _this = this

      if (response.status && response.status == 422) {
        this.errors = response.data.errors
        swal({
          title: "Erro ao recusar solicitação!",
          text: "Dados inválidos",
          icon: "error",
          buttons: false,
          timer: 2000
        })
      } else {
        this.errors = {}
        swal({
          title: "Solicitação recusada!",
          text: " ",
          icon: "success",
          buttons: false,
          timer: 2000
        }).then(function() {
          _this.loadData()
        })
      }
    },
    async iniciarSolicitacao(solicitacao) {
      let response = await this.requestAPI('PUT', '/iniciar-solicitacao/' + solicitacao.id)
      let _this = this

      if (response.status && response.status == 422) {
        this.errors = response.data.errors
        swal({
          title: "Erro ao iniciar solicitação!",
          text: " ",
          icon: "error",
          buttons: false,
          timer: 2000
        })
      } else {
        this.errors = {}
        swal({
          title: "Solicitação iniciada!",
          text: " ",
          icon: "success",
          buttons: false,
          timer: 2000
        }).then(function() {
          _this.loadData()
        })
      }
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