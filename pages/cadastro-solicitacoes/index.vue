<template>
  <LayoutMenu>
    <template #body>
      <PermissionValidator permission="cadastro-solicitacoes">
        <template #body>
          <CadastroSolicitacoes/>
        </template>
      </PermissionValidator>
    </template>
  </LayoutMenu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexCadastroSolicitacoes'
})
</script>
  