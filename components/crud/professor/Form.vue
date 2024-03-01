<template>
  <LayoutForm
    formTitle="Professor"
    apiPath="/professores"
    listPath="/cadastros/professor/list"
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

      <InputText
        id="titulacao"
        label="Titulação *"
        :value.sync="model.titulacao"
        :errors="getErrors('titulacao')"
      />
    </template>

    <template slot="detailsHeader">
      <ul class="nav nav-pills nav-secondary" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="pill" href="#detail-locais" role="tab" aria-controls="detail-locais" aria-selected="true">Locais</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="pill" href="#detail-modulos" role="tab" aria-controls="detail-modulos" aria-selected="false">Módulos</a>
        </li>
      </ul>
    </template>

    <template slot="details">
      <div class="tab-content mt-2 mb-3">
        <div class="tab-pane fade show active" id="detail-locais" role="tabpanel" aria-labelledby="detail-locais-tab">
          <LayoutListDetail
            ref="detailLocais"
            v-if="model.id"
            apiPath="/professores-locais"
            modalId="modalLocal"
            :pageSize="1000"
            :showEditButton="false"
            title="Local"
            parentKey="professor_id"
            :model="{
              professor_id: {
                field: 'professor_id',
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
        <div class="tab-pane fade" id="detail-modulos" role="tabpanel" aria-labelledby="detail-modulos-tab">
          <LayoutListDetail
            ref="detailModulos"
            v-if="model.id"
            apiPath="/modulos-professores"
            modalId="modalModulo"
            :pageSize="1000"
            parentKey="professor_id"
            title="Módulo"
            :model="{
              professor_id: {
                field: 'professor_id',
                value: model.id
              }
            }"
            :formModel.sync="moduloModel"
            :errors.sync="detailModuloErrors"
          >
            <template slot="header">
              <th scope="col">
                Nome
              </th>
              <th scope="col" style="width: 100px;">
                Semestre
              </th>
              <th scope="col" style="width: 100px;">
                Capacidade de Alunos
              </th>
              <th scope="col" style="width: 100px;">
                Limite de Tolerância
              </th>
            </template>
            <template slot="list" slot-scope="{ row }">
              <td>
                {{ row.nome_modulo }}
              </td>
              <td style="text-align: right">
                {{ row.semestre_modulo }}
              </td>
              <td style="text-align: right">
                {{ row.capacidade_alunos }}
              </td>
              <td style="text-align: right">
                {{ row.limite_tolerancia }}
              </td>
            </template>
            <template slot="detailForm">
              <InputLabel
                v-if="moduloModel.id"
                label="Módulo"
                :value="moduloModel.nome_modulo"
              />

              <InputSelect
                v-else
                id="modulo"
                label="Módulo *"
                path="/modulos"
                field="nome"
                :value.sync="moduloModel.modulo_id"
                :errors="getDetailModuloErrors('modulo_id')"
              />

              <InputNumber
                id="capacidade_alunos"
                label="Capacidade de alunos *"
                :value.sync="moduloModel.capacidade_alunos"
                :errors="getDetailModuloErrors('capacidade_alunos')"
              />

              <InputNumber
                id="limite_tolerancia"
                label="Limite de Tolerância *"
                :value.sync="moduloModel.limite_tolerancia"
                :errors="getDetailModuloErrors('limite_tolerancia')"
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
  name: "ProfessorForm",
  mixins: [globalMixin],
  data() {
    return {
      model: {},
      errors: {},
      localModel: {},
      detailLocalErrors: {},
      moduloModel: {},
      detailModuloErrors: {},
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
    getDetailLocalErrors(field) {
      if (this.detailLocalErrors) {
        return this.detailLocalErrors[field]
      } else {
        return null
      }
    },
    getDetailModuloErrors(field) {
      if (this.detailModuloErrors) {
        return this.detailModuloErrors[field]
      } else {
        return null
      }
    },
  }
}
</script>