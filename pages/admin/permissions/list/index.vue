<template>
  <LayoutMenu>
    <template #body>
      <PermissionValidator permission="permissao">
        <template #body>
          <AdminPermissaoList/>
        </template>
      </PermissionValidator>
    </template>
  </LayoutMenu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPermissaoList'
})
</script>
