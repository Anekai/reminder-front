<template>
  <LayoutMenu>
    <template #body>
      <PermissionValidator permission="painel-monitoramento">
        <template #body>
          <PainelMonitoramento/>
        </template>
      </PermissionValidator>
    </template>
  </LayoutMenu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPainelMonitoramento'
})
</script>
  