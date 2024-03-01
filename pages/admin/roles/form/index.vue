<template>
  <LayoutMenu>
    <template #body>
      <PermissionValidator permission="grupo">
        <template #body>
          <AdminGrupoForm/>
        </template>
      </PermissionValidator>
    </template>
  </LayoutMenu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexGrupoForm'
})
</script>
