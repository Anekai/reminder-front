<template>
  <div class="wrapper">
    <div class="app-load">
      <div class="m-auto text-center">
        <!--<img :src="logo" class="d-flex mb-4" height="10%" />-->
        Help Desk
        <div class="loader-container">
          <div class="loader loader-lg loader-custom"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "Loading",
  mixins: [globalMixin],
  components: {
  },
  data() {
    return {
      //logo: require('~/assets/img/logo.png'),
    }
  },
  async mounted() {
    var response = await this.requestAPI('GET', '/check-authentication');

    if (response.status != 401) {
      this.$router.push(this.getUser.homePage) 
    } else {
      this.$router.push('/login')
    }
  },
};
</script>

<style scoped>
.app-load {
  height: 100%;
  display: flex;
  background-color: rgb(255, 255, 255);
}

.loader-custom {
  width: 5rem;
  height: 5rem;
  border: 10px solid rgb(0, 0, 0);
  border-bottom-color: transparent;
}

.loader-container  {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>