<template>
  <div :class="containerClass">
    <div class="card card-stats card-primary card-round">
      <div class="card-body">
        <div class="row">
          <div class="col-5">
            <div class="icon-big text-center">
              <i :class="icon"></i>
            </div>
          </div>
          <div class="col-7 col-stats">
            <div class="numbers">
              <p class="card-category">{{ title }}</p>
              <h4 class="card-title">{{ value }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutMiniCard",
  props: {
    icon: String,
    title: String,
    value: Number,
    containerClass: {
      type: String,
      default: "col-sm-6 col-md-3"
    }
  },
}
</script>