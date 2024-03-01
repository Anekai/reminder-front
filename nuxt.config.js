import env from './lib/env'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Help Desk',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { type: "text/javascript", src: "/atlantis/js/plugin/webfont/webfont.min.js" },
      { type: "text/javascript", src: "/webfont.js" },
      { type: "text/javascript", src: "/atlantis/js/core/jquery.3.2.1.min.js" },
      { type: "text/javascript", src: "/atlantis/js/core/popper.min.js" },
      { type: "text/javascript", src: "/atlantis/js/core/bootstrap.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/moment/moment.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/chart.js/chart.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/jquery.sparkline/jquery.sparkline.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/chart-circle/circles.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/datatables/datatables.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/bootstrap-notify/bootstrap-notify.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/jqvmap/jquery.vmap.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/gmaps/gmaps.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/dropzone/dropzone.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/fullcalendar/fullcalendar.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/datepicker/bootstrap-datetimepicker.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/bootstrap-tagsinput/bootstrap-tagsinput.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/bootstrap-wizard/bootstrapwizard.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/jquery.validate/jquery.validate.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/summernote/summernote-bs4.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/select2/select2.full.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/sweetalert/sweetalert.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/owl-carousel/owl.carousel.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/jquery.magnific-popup/jquery.magnific-popup.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/sweetalert/sweetalert.min.js" },
      { type: "text/javascript", src: "/atlantis/js/plugin/sortable/sortable.min.js" },
      { type: "text/javascript", src: "/atlantis/js/atlantis.min.js" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/atlantis/css/bootstrap.min.css",
    "@/assets/atlantis/css/atlantis.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['nuxt-vuex-localstorage', {
      localStorage: [ 'site', 'user' ],
    }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: env.VUE_APP_API_URL,
    retry: { retries: 1 }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    port: env.NUXT_PORT,
    server: env.NUXT_HOST,
  }
}
