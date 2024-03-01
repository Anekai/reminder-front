const env = {
  VUE_APP_API_URL:process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL:'http://localhost:8000/',
  NUXT_PORT:process.env.NUXT_PORT ? process.env.NUXT_PORT:'3000',
  NUXT_HOST:process.env.NUXT_HOST ? process.env.NUXT_HOST:'0.0.0.0',
}

export default env;