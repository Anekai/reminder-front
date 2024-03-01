<template>
  <div>
    <table :class="'table' + (tableClass ? tableClass : '')">
      <thead>
        <tr>
          <slot name="header"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,i) in list" :key="i">
          <slot name="list" :row="row"></slot>
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
</template>

<script>

export default {
  name: "LayoutTable",
  props: {
    list: Array,
    tableClass: String
  },
}
</script>