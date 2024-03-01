<template>
  <LayoutMenu>
    <template #body>
      <PermissionValidator permission="cadastro-usuarios">
        <template #body>
          <AdminUsuarioList/>
        </template>
      </PermissionValidator>
    </template>
  </LayoutMenu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexUsuarioList'
})
</script>
