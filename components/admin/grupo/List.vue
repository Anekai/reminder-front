<template>
  <LayoutList
    ref="list"
    title="Grupos de Usuário"
    apiPath="/roles"
    formPath="/admin/grupo/form"
    :model="model"
    :order="order"
  >
    <template slot="form">
      <InputText
        id="name"
        label="Nome"
        :value.sync="model.name.value"
      />
    </template>
    <template slot="header">
      <th scope="col">Nome</th>
    </template>
    <template slot="list" slot-scope="{ row }">
      <td>
        {{ row.name }}
      </td>
    </template>
  </LayoutList>
</template>

<script>

export default {
  name: "GrupoList",
  data() {
    return {
      model: {
        name: {
          field: "name",
          operator: "ilike",
          value: null
        },
      },
      order: [
        {
          field: "name",
          type: "ASC"
        }
      ]
    }
  },
}
</script>