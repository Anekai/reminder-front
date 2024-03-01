<template>
  <LayoutForm
    formTitle="Local"
    apiPath="/locais"
    listPath="/cadastros/local/list"
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
        id="logradouro"
        label="Logradouro *"
        :value.sync="model.logradouro"
        :errors="getErrors('logradouro')"
      />

      <InputLookupAIO
        id="cidade"
        label="Cidade *"
        modalTitle="Buscar Cidade"
        path="/cidades"
        descriptionField="descricao"
        :value.sync="model.cidade_id"
        :searchFields="['cidade.nome', 'cidade.nome_pesquisa', 'estado.nome', 'uf']"
        :errors="getErrors('cidade_id')"
      >
        <template slot="listHeader">
          <th>
            Nome
          </th>
        </template>
        <template slot="list" slot-scope="{ row }">
          <td>
            {{ row.nome }} / {{ row.uf }}
          </td>
        </template>
      </InputLookupAIO>
    </template>

    <template slot="detailsHeader">
      <ul class="nav nav-pills nav-secondary" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="pill" href="#detail-professores" role="tab" aria-controls="detail-professores" aria-selected="true">Professores</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="pill" href="#detail-modulos" role="tab" aria-controls="detail-modulos" aria-selected="false">Módulos</a>
        </li>
      </ul>
    </template>

    <template slot="details">
      <div class="tab-content mt-2 mb-3">
        <div class="tab-pane fade show active" id="detail-professores" role="tabpanel" aria-labelledby="detail-professores-tab">
          <LayoutListDetail
            ref="detailProfessores"
            v-if="model.id"
            apiPath="/professores-locais"
            modalId="modalProfessor"
            :pageSize="1000"
            title="Professor"
            :showEditButton="false"
            parentKey="local_id"
            :model="{
              local_id: {
                field: 'local_id',
                value: model.id
              }
            }"
            :formModel.sync="professorModel"
            :errors.sync="detailProfessorErrors"
          >
            <template slot="header">
              <th scope="col" style="width: 130px">
                Código
              </th>
              <th scope="col">
                Nome
              </th>
            </template>
            <template slot="list" slot-scope="{ row }">
              <td>
                {{ row.codigo_professor }}
              </td>
              <td>
                {{ row.nome_professor }}
              </td>
            </template>
            <template slot="detailForm">
              <InputLookupInput
                id="professor"
                label="Professor *"
                path="/professores"
                descriptionField="descricao"
                :value.sync="professorModel.professor_id"
                :selectedModel="professorLookupModel"
                :errors="getDetailProfessorErrors('professor_id')"
              />
            </template>
          </LayoutListDetail>
        </div>
        <div class="tab-pane fade" id="detail-modulos" role="tabpanel" aria-labelledby="detail-modulos-tab">
          <LayoutListDetail
            ref="detailModulos"
            v-if="model.id"
            apiPath="/modulos-locais"
            modalId="modalModulo"
            :pageSize="1000"
            title="Módulo"
            :showEditButton="false"
            parentKey="local_id"
            :model="{
              local_id: {
                field: 'local_id',
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
            </template>
            <template slot="list" slot-scope="{ row }">
              <td>
                {{ row.nome_modulo }}
              </td>
              <td style="text-align: right">
                {{ row.semestre_modulo }}
              </td>
            </template>
            <template slot="detailForm">
              <InputLookupInput
                id="modulo"
                label="Módulo *"
                path="/modulos"
                descriptionField="nome"
                :value.sync="moduloModel.modulo_id"
                :selectedModel="moduloLookupModel"
                :errors="getDetailModuloErrors('modulo_id')"
              />
            </template>
          </LayoutListDetail>
        </div>
      </div>
      <InputLookupModal
        id="professor"
        modalTitle="Buscar Professor"
        path="/professores"
        :selectedModel.sync="professorLookupModel"
        :searchFields="['professor.nome', 'professor.codigo']"
      >
        <template slot="listHeader">
          <th style="width: 130px">
            Código
          </th>
          <th>
            Nome
          </th>
        </template>
        <template slot="list" slot-scope="{ row }">
          <td>
            {{ row.codigo }}
          </td>
          <td>
            {{ row.nome }}
          </td>
        </template>
      </InputLookupModal>

      <InputLookupModal
        id="modulo"
        modalTitle="Buscar Módulos"
        path="/modulos"
        :selectedModel.sync="moduloLookupModel"
        :filters="{
          id: {
            field: 'modulo.tipo',
            operator: '=',
            value: 'PRATICO'
          }
        }"
        :searchFields="['modulo.nome']"
      >
        <template slot="listHeader">
          <th>
            Nome
          </th>
          <th style="width: 130px">
            Semestre
          </th>
        </template>
        <template slot="list" slot-scope="{ row }">
          <td>
            {{ row.nome }}
          </td>
          <td>
            {{ row.semestre }}
          </td>
        </template>
      </InputLookupModal>
    </template>
  </LayoutForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "CursoForm",
  mixins: [globalMixin],
  data() {
    return {
      model: {},
      errors: {},
      professorModel: {},
      detailProfessorErrors: {},
      moduloModel: {},
      detailModuloErrors: {},
      professorLookupModel: null,
      moduloLookupModel: null
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