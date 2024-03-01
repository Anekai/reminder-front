<template>
  <div>
    <div class="row" v-if="validating || showError">
      <div class="col-md-12">
        <LayoutCard
          :showHeader="false"
          :showFooter="false"
          :marginBottom="false"
          cardStyle="height: calc(94vh - 86px)"
        >
          <template slot="body">
            <div class="app-load">
              <div class="m-auto text-center">
                <div class="loader-container">
                  <div v-if="validating" class="loader loader-lg loader-custom"></div>
                  <div v-if="showError">
                    <img :src="image" class="d-flex mb-4" style="height: 350px" />
                    <h1 class="text-danger font-weight-bold">Acesso negado!</h1>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </LayoutCard>
      </div>
    </div>
    
    <slot name="body" v-if="!validating && !showError"/>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "PermissionValidator",
  mixins: [globalMixin],
  props: {
    permission: String,
  },
  data() {
    return {
      validating: true,
      showError: false,
      image: require('~/assets/img/403.png'),
    }
  },
  async created() {
    this.validating = true

    const response = await this.requestAPI('GET', '/check-permission', null, {permission: this.permission});

    if (response.status && response.status == 403) {
      this.showError = true
    } else {
      this.showError = false
    }

    this.validating = false
  },
};
</script>

<style scoped>
.app-load {
  height: 100%;
  display: flex;
}

.loader-custom {
  width: 5rem;
  height: 5rem;
  border: 10px solid blue;
  border-bottom-color: transparent;
}

.loader-container  {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>