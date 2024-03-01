<template>
  <LayoutCard :showHeader="false" :showFooter="false">
    <template slot="body">
      <div v-for="(menu,i) in menus" :key="i">
        <h4 v-if="menu.submenus">{{ menu.label }}</h4>
        <ul>
          <li v-for="(submenu,j) in menu.submenus" :key="j">
            <a :href="submenu.path">
              <span>{{ submenu.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </template>
  </LayoutCard>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: 'Home',
  mixins: [ globalMixin ],
  data() {
    return {
      menus: []
    }
  },
  async created() {
    await this.requestAPI('GET', '/check-authentication')
    this.menus = this.getMenu
  },
}
</script>
