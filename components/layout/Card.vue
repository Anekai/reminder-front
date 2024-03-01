<template>
  <div :class="'card' + (marginBottom ? '' : ' mb-0')" :style="cardStyle">
    <div class="card-header" v-if="showHeader">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
    <div class="card-action" v-if="showFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "LayoutCard",
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    marginBottom: {
      type: Boolean,
      default: true
    },
    cardStyle: String
  },
}
</script>