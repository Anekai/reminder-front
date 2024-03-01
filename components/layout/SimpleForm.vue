<template>
  <div class="row">
    <div class="col-md-12">
      <LayoutCard>
        <template slot="header">
          <div class="card-title">{{ formTitle }}</div>
        </template>
        <template slot="body">
          <div class="row">
            <div class="col-12">
              <slot name="form"></slot>
            </div>
          </div>
        </template>
        <template slot="footer">
          <slot name="formButtons"></slot>
        </template>
      </LayoutCard>
    </div>
  </div>
</template>

<script>
// For use on custom forms
export default {
  name: "LayoutSimpleForm",
  props: {
    formTitle: String,
  },
}
</script>