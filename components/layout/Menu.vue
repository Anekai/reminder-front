<template>
  <div class="wrapper">
    <div class="main-header">
      <div class="logo-header" data-background-color="blue">
        <a href="/home" class="logo" style="width: 100%; text-align: center;">
          <!--<img :src="logo" alt="navbar brand" class="navbar-brand w-100" style="background-color: white; padding: 5px; border-radius: 15px;">-->
          <div style="background-color: white; border-radius: 100px; margin-top: 2px;">
            Help Desk
          </div>
        </a>
      </div>
      <nav class="navbar navbar-header navbar-expand-lg" data-background-color="blue">
      </nav>
    </div>
    <div class="sidebar sidebar-style-2">
      <div class="sidebar-wrapper scrollbar scrollbar-inner pb-0">
        <div class="sidebar-content pb-0">
          <div class="user">
            <div class="info">
              <a data-toggle="collapse" href="#profileMenu" aria-expanded="true">
                <span class="font-weight-bold">
                  {{ userName() }}
                  <span class="caret" style="top: 9px"></span>
                </span>
              </a>
              <div class="clearfix"></div>

              <div class="collapse in" id="profileMenu">
                <ul class="nav">
                  <li>
                    <a href="/perfil">
                      <span class="link-collapse">Meu Perfil</span>
                    </a>
                  </li>
                  <li>
                    <a href="/alterar-senha">
                      <span class="link-collapse">Alterar Senha</span>
                    </a>
                  </li>
                  <li>
                    <a href="/atualizar-menu" @click.prevent="atualizarMenu">
                      <span class="link-collapse">Atualizar Menu</span>
                    </a>
                  </li>
                  <li>
                    <a href="/logout" @click.prevent="logout">
                      <span class="link-collapse">Sair</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul class="nav nav-primary">
            <li v-for="(menu,i) in menus" :key="i" :class="'nav-item ' + (isCurrentPath(menu) ? 'active' : '')">
              <a v-if="!menu.submenus" :href="menu.path">
								<i :class="menu.icon"></i>
								<p>{{ menu.label }}</p>
							</a>
              <template v-else>
                <a data-toggle="collapse" :href="'#' + menu.label" class="collapsed" aria-expanded="false">
                  <i :class="menu.icon"></i>
                  <p>{{ menu.label }}</p>
                  <span class="caret"></span>
                </a>
                <div :class="'collapse' + (isCurrentPath(menu) ? ' show' : '')" :id="menu.label">
                  <ul class="nav nav-collapse">
                    <li v-for="(submenu,j) in menu.submenus" :key="j" :class="isCurrentPath(submenu) ? 'active' : ''">
                      <a :href="submenu.path">
                        <span class="sub-item">{{ submenu.label }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-panel">
      <div class="container">
        <div class="page-inner">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "Layout",
  mixins: [globalMixin],
  components: {
  },
  data() {
    return {
      menus: [],
      //logo: require('~/assets/img/logo-horizontal.png'),
    }
  },
  created() {
    this.menus = this.getMenu
  },
  methods: {
    isCurrentPath(menu) {
      let currentPath = this.$route.path

      if (menu.path) {
        return menu.path.replace("/list", "") == currentPath.replace("/list", "").replace("/form", "")
      } else if (menu.submenus) {
        for (let submenu of menu.submenus) {
          if (submenu.path.replace("/list", "") == currentPath.replace("/list", "").replace("/form", "")) {
            return true
          }
        }
      }

      return false
    },
    async atualizarMenu() {
      await this.loadMenu()
      this.menus = this.getMenu
    },
    userName() {
      return this.getUser.name
    },
    userType() {
      return this.getUser.tipo
    }
  }
};
</script>

<style scoped>
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ebebeb; 
    border-radius: 5px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #d3d3d3;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #bdbdbd; 
  }
</style>
