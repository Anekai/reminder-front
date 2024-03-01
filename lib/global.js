import { mapGetters, mapActions } from "vuex"
import env from './env'

const globalMixin = {
  computed: {
    ...mapGetters({
      getAuth:"site/getAuth",
      getToken: "site/getToken",
      getMenu: "site/getMenu",
      getUser: "user/getUser",
    })
  },
  methods: {
    ...mapActions({
      setAuth: "site/setAuth",
      setLogout: "site/setLogout",
      setMenu: "site/setMenu",
      setUser: "user/setUser",
      setChangeUserData: "user/setChangeUserData",
    }),
    async requestAPI(method, path, body, params, token) {
      let urlRoute = "api" + path
      let header = {}
      let accessToken =  token ? token : this.getToken 
      header.Authorization = 'Bearer ' + accessToken;

      return await this.$axios({
        method,
        url: urlRoute,
        data: body,
        params: params,
        headers: {...header}
      })
      .then((res) => {
        return res
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            this.setAuth(null)
            sessionStorage.clear()
            this.$router.push('/login')
            return error.response
          } else if (error.response.status === 403) {
            return error.response
          } else if (error.response.status === 404) {
            return error.response
          } else if (error.response.status === 422) {
            return error.response
          } else {
            swal("Erro!", "Ocorreu um erro inesperado!", {
              icon : "error",
              buttons: {
                confirm: {
                  className : 'btn btn-danger'
                }
              },
            })

            throw error
          }
        } else {
          throw error
        }
      })
    },
    getApiUrl() {
      return env.VUE_APP_API_URL;
    },
    async logout(){
      await this.requestAPI('POST', '/logout')
      this.setLogout()
      this.$router.push('/login')
    },
    async loadMenu() {
      const response = await this.requestAPI('GET', '/menu')
      this.setMenu(response.data.menu)
    }
  },
}
export default globalMixin;

