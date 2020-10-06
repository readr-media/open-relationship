<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@voerro/vue-tagsinput@2.2.0/dist/style.css"
    />
    <span>
      <VoerroTagsInput
        v-model="selectedTags"
        elementId="tags"
        typeahead="true"
        placeholder="新增關係"
        wrapper-class="wrapper-class"
      />
    </span>
  </div>
</template>

<script>
export default {
  props: ['field'],
  data() {
    return {
      selectedTags: [
        { key: 'web-development', value: 'Web Development' },
        { key: 'php', value: 'PHP' },
        { key: 'javascript', value: 'JavaScript' },
      ],
    }
  },
}
</script>

<style lang="scss">
.wrapper-class {
  border-bottom: 1px solid transparent;
  border-color: #dbdbdb;
  input {
    border-bottom: none !important;
  }
}
</style>
