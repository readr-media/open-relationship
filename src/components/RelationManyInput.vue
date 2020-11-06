<template>
  <div class="relation-many">
    <div class="relation-many-container">
      <div v-for="item in itemsDisplay" :key="item.name" class="selected-item">
        <span class="selected-item__text" v-text="item.name" />
        <button class="selected-item__remove" @click="removeItem(item)">
          ✕
        </button>
      </div>
      <input
        v-model.trim="text"
        class="relation-many__input"
        type="text"
        @input="fetchSuggestions"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @keydown.enter.prevent="handleKeydownEnter"
        @keydown.delete="handleKeydownDeleteBackspace"
      />
    </div>
    <ul class="relation-many__suggestions">
      <li
        v-for="item in suggestionsCanSelect"
        :key="item.id"
        class="suggestion-item"
        @click="selectItem(item)"
        v-text="item.name"
      />
    </ul>
  </div>
</template>

<script>
import { fetchTags } from '~/apollo/queries/tag.gql'

export default {
  name: 'RelationManyInput',
  props: {
    initialValue: {
      type: Array,
      default: () => [],
    },
    schemaTarget: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isComposing: false,
      items: [],
      suggestions: [],
      suggestionsForApollo: undefined, // issue: https://github.com/nuxt-community/apollo-module/issues/284
      text: '',
    }
  },
  computed: {
    itemsDisplay() {
      return this.items.filter((item) => item.action !== 'disconnect')
    },
    suggestionsCanSelect() {
      return this.suggestions.filter((item) => {
        return !this.items.some(
          (selected) =>
            selected.name === item.name && selected.action !== 'disconnect'
        )
      })
    },
  },
  watch: {
    initialValue(value) {
      this.items = value
    },
  },
  methods: {
    fetchSuggestions() {
      if (this.text) {
        // 定義如何取得對應 schema target 建議的項目
        switch (this.schemaTarget) {
          case 'tag':
            return this.$apollo.addSmartQuery('suggestionsForApollo', {
              query: fetchTags,
              debounce: 500,
              variables: () => ({ name: this.text }),
              update: (data) => {
                this.suggestions = data.allTags || []
                return data.allTags
              },
            })
        }
      }
    },
    removeItem(item) {
      this.$set(item, 'action', 'disconnect')
    },
    selectItem(item) {
      this.$set(item, 'action', 'connect')
      this.items.push(item)
      this.text = ''
      this.suggestions = []
    },
    handleCompositionStart() {
      this.isComposing = true
    },
    handleCompositionEnd() {
      this.isComposing = false
    },
    handleKeydownEnter() {
      if (this.text && !this.isComposing) {
        const hasSelected = this.items.find(
          (selected) => selected.name === this.text
        )
        if (hasSelected && hasSelected.action === 'disconnect') {
          this.$set(hasSelected, 'action', 'connect')
          return (this.text = '')
        } else if (hasSelected) {
          return
        }
        const hasSuggestion = this.suggestions.find(
          (suggestion) => suggestion.name === this.text
        )
        if (hasSuggestion) {
          this.$set(hasSuggestion, 'action', 'connect')
          this.items.push(hasSuggestion)
          this.text = ''
        } else {
          const newItem = {
            name: this.text,
            action: 'create',
          }
          this.items.push(newItem)
          this.text = ''
        }
      }
    },
    handleKeydownDeleteBackspace() {
      if (!this.isComposing && !this.text && this.items.length > 0) {
        this.items.pop()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.relation-many {
  &-container {
    display: flex;
    flex-wrap: wrap;
    padding: 2px 2px 5px;
    border-bottom: 1px lightgray solid;
    overflow: hidden;
    > * {
      margin-right: 5px;
    }
    .selected-item {
      display: inline-flex;
      margin-top: 5px;
      padding: 5px;
      background-color: rgba(212, 212, 212, 0.2);
      border-radius: 5px;
      &__text {
        white-space: nowrap;
      }
      &__remove {
        margin-left: 2px;
        @include media-breakpoint-up(lg) {
          margin-left: 5px;
        }
      }
    }
  }
  &__input {
    flex: 1;
    padding: 0 0 0 5px;
  }
  &__suggestions {
    max-height: 500px;
    padding: 0.5rem 0;
    overflow-y: auto;
    .suggestion-item {
      padding: 0.75rem 0 0.75rem 0.75rem;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: rgba(212, 212, 212, 0.2);
      }
    }
  }
}
</style>
