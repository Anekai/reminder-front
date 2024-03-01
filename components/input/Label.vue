<template>
  <div class="form-group">
    <label class="control-label">{{ label }}</label>
    <p class="form-control-static">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "InputLabel",
  props: {
    label: String,
    value: String,
  },
}
</script>