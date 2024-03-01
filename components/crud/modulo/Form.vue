<template>
  <LayoutForm
    formTitle="Módulo"
    apiPath="/modulos"
    listPath="/cadastros/modulo/list"
    :model.sync="model"
    :errors.sync="errors"
    :hasDetails="true"
  >
    <template slot="form">
      <InputText
        id="nome"
        label="Nome *"
        :value.sync="model.nome"
        :errors="getErrors('nome')"
      />

      <InputSimpleSelect
        id="tipo"
        label="Tipo *"
        :options="tipo"
        :value.sync="model.tipo"
        :errors="getErrors('tipo')"
      />

      <InputNumber
        id="semestre"
        label="Semestre *"
        :value.sync="model.semestre"
        :errors="getErrors('semestre')"
      />

      <InputNumber
        id="total_horas_semanal"
        label="Total de Horas Semanal *"
        :value.sync="model.total_horas_semanal"
        :errors="getErrors('total_horas_semanal')"
      />

      <InputNumber
        id="carga_horaria"
        label="Carga Horária *"
        :value.sync="model.carga_horaria"
        :errors="getErrors('carga_horaria')"
      />
    </template>

    <template slot="detailsHeader">
      <ul class="nav nav-pills nav-secondary" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="pill" href="#detail-professores" role="tab" aria-controls="detail-professores" aria-selected="true">Professores</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="pill" href="#detail-locais" role="tab" aria-controls="detail-locais" aria-selected="false">Locais</a>
        </li>
      </ul>
    </template>

    <template slot="details">
      <div class="tab-content mt-2 mb-3">
        <div class="tab-pane fade show active" id="detail-professores" role="tabpanel" aria-labelledby="detail-professores-tab">
          <LayoutListDetail
            ref="detailProfessores"
            v-if="model.id"
            apiPath="/modulos-professores"
            modalId="modalProfessor"
            :pageSize="1000"
            title="Professor"
            parentKey="modulo_id"
            :model="{
              modulo_id: {
                field: 'modulo_id',
                value: model.id
              }
            }"
            :formModel.sync="professorModel"
            :errors.sync="detailProfessorErrors"
          >
            <template slot="header">
              <th scope="col">
                Nome
              </th>
              <th scope="col" style="width: 100px;">
                Capacidade de Alunos
              </th>
            </template>
            <template slot="list" slot-scope="{ row }">
              <td>
                {{ row.nome_professor }}
              </td>
              <td style="text-align: right">
                {{ row.capacidade_alunos }}
              </td>
            </template>
            <template slot="detailForm">
              <InputLabel
                v-if="professorModel.id"
                label="Professor"
                :value="professorModel.nome_professor"
              />

              <InputSelect
                v-else
                id="professor"
                label="Professor *"
                path="/professores"
                field="nome"
                :value.sync="professorModel.professor_id"
                :errors="getDetailProfessorErrors('professor_id')"
              />

              <InputNumber
                id="capacidade_alunos"
                label="Capacidade de alunos *"
                :value.sync="professorModel.capacidade_alunos"
                :errors="getDetailProfessorErrors('capacidade_alunos')"
              />
            </template>
          </LayoutListDetail>
        </div>
        <div class="tab-pane fade" id="detail-locais" role="tabpanel" aria-labelledby="detail-locais-tab">
          <LayoutListDetail
            ref="detailLocais"
            v-if="model.id"
            apiPath="/modulos-locais"
            modalId="modalLocal"
            :pageSize="1000"
            :showEditButton="false"
            title="Local"
            parentKey="modulo_id"
            :model="{
              modulo_id: {
                field: 'modulo_id',
                value: model.id
              }
            }"
            :formModel.sync="localModel"
            :errors.sync="detailLocalErrors"
          >
            <template slot="header">
              <th scope="col">
                Nome
              </th>
            </template>
            <template slot="list" slot-scope="{ row }">
              <td>
                {{ row.nome_local }}
              </td>
            </template>
            <template slot="detailForm">
              <InputSelect
                id="local"
                label="Local *"
                path="/locais"
                field="nome"
                :value.sync="localModel.local_id"
                :errors="getDetailLocalErrors('local_id')"
              />
            </template>
          </LayoutListDetail>
        </div>
      </div>
    </template>
  </LayoutForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "ModuloForm",
  mixins: [globalMixin],
  data() {
    return {
      model: {},
      errors: {},
      professorModel: {},
      detailProfessorErrors: {},
      localModel: {},
      detailLocalErrors: {},
      tipo: {
        TEORICO: "Teórico",
        PRATICO: "Prático",
      }
    }
  },
  methods: {
    getErrors(field) {
      if (this.errors) {
        return this.errors[field]
      } else {
        return null
      }
    },
    getDetailProfessorErrors(field) {
      if (this.detailProfessorErrors) {
        return this.detailProfessorErrors[field]
      } else {
        return null
      }
    },
    getDetailLocalErrors(field) {
      if (this.detailLocalErrors) {
        return this.detailLocalErrors[field]
      } else {
        return null
      }
    },
  }
}
</script>