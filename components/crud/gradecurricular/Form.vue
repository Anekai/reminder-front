<template>
  <LayoutForm
    formTitle="Grade Curricular"
    apiPath="/grades-curriculares"
    listPath="/cadastros/grade-curricular/list"
    :model.sync="model"
    :errors.sync="errors"
    :hasDetails="true"
    detailTitle="Estudantes"
  >
    <template slot="form">
      <div class="row">
        <div class="col-6">
          <InputSelect
            id="periodo_id"
            label="Período *"
            path="/periodos"
            field="nome"
            :disabled="model.id != null"
            :value.sync="model.periodo_id"
            :errors="getErrors('periodo_id')"
          />
        </div>
        <div class="col-6">
          <InputSelect
            id="modulo_id"
            label="Módulo *"
            path="/modulos"
            field="nome"
            :value.sync="model.modulo_id"
            :errors="getErrors('modulo_id')"
            :returnSelectedObject="true"
            @selectedObject="moduloSelected($event)"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <InputSelect
            id="professor_id"
            label="Professor *"
            path="/professores"
            field="nome"
            :value.sync="model.professor_id"
            :errors="getErrors('professor_id')"
          />
        </div>
        <div class="col-6">
          <InputText
            id="responsavel"
            label="Responsável"
            :disabled="model.tipo == 'TEORICO'"
            :value.sync="model.responsavel"
            :errors="getErrors('responsavel')"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <InputSelect
            id="local_id"
            label="Local"
            path="/locais"
            field="nome"
            :disabled="model.id != null || model.tipo == 'TEORICO'"
            :value.sync="model.local_id"
            :errors="getErrors('local_id')"
          />
        </div>
        <div class="col-6">
          <InputSimpleSelect
            id="tipo"
            label="Tipo *"
            :options="tipos"
            :disabled="true"
            :value.sync="model.tipo"
            :errors="getErrors('tipo')"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <InputNumber
            id="semestre"
            label="Semestre *"
            :disabled="true"
            :value.sync="model.semestre"
            :errors="getErrors('semestre')"
          />
        </div>
        <div class="col-6">
          <InputNumber
            id="total_horas"
            label="Total de Horas"
            :value.sync="model.total_horas"
            :errors="getErrors('total_horas')"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <InputSimpleSelect
            id="dia_semana"
            label="Dia Semana *"
            :options="dias_semana"
            :value.sync="model.dia_semana"
            :errors="getErrors('dia_semana')"
          />
        </div>
        <div class="col-6">
          <InputSimpleSelect
            id="turno"
            label="Turno *"
            :options="turnos"
            :value.sync="model.turno"
            :errors="getErrors('turno')"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <InputDate
            id="dt_inicial"
            label="Data Inicial *"
            :value.sync="model.dt_inicial"
            :errors="getErrors('dt_inicial')"
          />
        </div>
        <div class="col-6">
          <InputDate
            id="dt_final"
            label="Data Final"
            :value.sync="model.dt_final"
            :errors="getErrors('dt_final')"
          />
        </div>
      </div>
    </template>

    <template slot="details">
      <LayoutListDetail
        ref="detailEstudantes"
        v-if="model.id"
        title="Estudante"
        apiPath="/grades-curriculares-estudantes"
        modalId="modalEstudante"
        :pageSize="1000"
        :showEditButton="false"
        parentKey="grade_curricular_id"
        :model="{
          grade_curricular_id: {
            field: 'grade_curricular_id',
            value: model.id
          }
        }"
        :formModel.sync="estudanteModel"
        :errors.sync="detailEstudanteErrors"
      >
        <template slot="header">
          <th scope="col" style="width: 140px;">
            Código
          </th>
          <th scope="col">
            Nome
          </th>
        </template>
        <template slot="list" slot-scope="{ row }">
          <td>
            {{ row.codigo_estudante }}
          </td>
          <td>
            {{ row.nome_estudante }}
          </td>
        </template>
        <template slot="detailForm">
          <InputSelect
            id="estudante"
            label="Estudante *"
            path="/estudantes"
            field="nome"
            :value.sync="estudanteModel.estudante_id"
            :errors="getDetailGradeCurricularErrors('estudante_id')"
          />
        </template>
      </LayoutListDetail>
    </template>
  </LayoutForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "GradeCurricularForm",
  mixins: [globalMixin],
  data() {
    return {
      model: {},
      errors: {},
      estudanteModel: {},
      detailEstudanteErrors: {},
      dias_semana: {
        SEGUNDA: 'Segunda-Feira',
        TERCA: 'Terça-Feira',
        QUARTA: 'Quarta-Feira',
        QUINTA: 'Quinta-Feira',
        SEXTA: 'Sexta-Feira',
        SABADO: 'Sábado'
      },
      turnos: {
        MANHA: 'Manhã',
        TARDE: 'Tarde',
        VESPERTINO: 'Vespertino'
      },
      tipos: {
        TEORICO: 'Teórico',
        PRATICO: 'Prático'
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
    getDetailGradeCurricularErrors(field) {
      console.log(this.detailEstudanteErrors);
      if (this.detailEstudanteErrors) {
        return this.detailEstudanteErrors[field]
      } else {
        return null
      }
    },
    moduloSelected(modulo) {
      if (modulo != null) {
        this.model.tipo = modulo.tipo
        this.model.semestre = modulo.semestre

        if (this.model.tipo == 'TEORICO') {
          this.model.responsavel = null
          this.model.local_id = null
        }
      } else {
        this.model.tipo = null
      }
    },
  },
}
</script>