<template>
  <LayoutMenu>
    <template #body>
      <PermissionValidator permission="permissao">
        <template #body>
          <AdminPermissaoForm/>
        </template>
      </PermissionValidator>
    </template>
  </LayoutMenu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPermissaoForm'
})
</script>
