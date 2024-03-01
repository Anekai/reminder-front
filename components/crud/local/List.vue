<template>
  <LayoutList
    title="Locais"
    apiPath="/locais"
    formPath="/cadastros/local/form"
    :model.sync="model"
    :order="order"
  >
    <template slot="form">
      <InputText
        id="nome"
        label="Nome"
        :value.sync="model.nome.value"
      />

      <InputLookupAIO
        id="cidade"
        label="Cidade *"
        modalTitle="Buscar Cidade"
        path="/cidades"
        descriptionField="descricao"
        :value.sync="model.cidade_id.value"
        :searchFields="['cidade.nome', 'cidade.nome_pesquisa', 'estado.nome', 'uf']"
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
    <template slot="header">
      <th scope="col">Nome</th>
      <th scope="col">Cidade</th>
    </template>
    <template slot="list" slot-scope="{ row }">
      <td>
        {{ row.nome }}
      </td>
      <td>
        {{ row.uf }} / {{ row.nome_cidade }}
      </td>
    </template>
  </LayoutList>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "LocalList",
  mixins: [globalMixin],
  data() {
    return {
      cidades: [],
      model: {
        nome: {
          field: "local.nome",
          operator: "ilike",
          value: null
        },
        cidade_id: {
          field: "cidade_id",
          operator: "=",
          value: null
        },
      },
      order: [
        {
          field: "nome",
          type: "ASC"
        }
      ]
    }
  },
}
</script>