<template>
  <div class="RelationInput">
    <vue-autosuggest
      v-model="input"
      :sectionConfigs="sectionConfigs"
      :suggestions="filteredOptions"
      :inputProps="{
        id: 'autosuggest__input',
        placeholder: '輸入名稱',
      }"
      @input="onInputChange"
      @click="clickHandler"
      @focus="focusMe"
      @selected="onSelected"
    >
      <div
        slot-scope="{ suggestion }"
        style="display: flex; align-items: center"
      >
        <div style="{ display: 'flex', color: 'navyblue'}">
          {{ suggestion.item.name }}
        </div>
      </div>
    </vue-autosuggest>
  </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'
import gql from 'graphql-tag'

export default {
  components: { VueAutosuggest },
  props: ['field', 'verifyField'],

  data() {
    return {
      target: {
        id: '',
        name: '',
      },
      // input's content
      input: '',
      // chosen item from list
      selected: '',
      // fetched list(for apollo)
      allPersons: [],
      // auto complete list
      suggestions: [
        {
          data: [],
        },
      ],
      sectionConfigs: {
        default: {
          limit: 5,
        },
      },
    }
  },
  computed: {
    filteredOptions() {
      return [
        {
          data: this.suggestions[0].data.filter((option) => {
            return option.name.toLowerCase().includes(this.input.toLowerCase())
          }),
        },
      ]
    },
  },
  methods: {
    // event fired when clicking on the input
    clickHandler(item) {},

    // event fired when selected an item
    onSelected(item) {
      // get selected item
      this.selected = item.item
      // drop it to field value
      this.field.value = {
        name: this.selected.name,
        id: this.selected.id,
      }

      // verify data
      if (this.field.value.name === '') {
        this.field.formState = false
      } else {
        this.field.formState = true
      }
    },

    // event fired when typing
    onInputChange(text) {
      this.searchPerson(text)
    },

    // This is what the <input/> value is set to when you are selecting a suggestion.
    getSuggestionValue(suggestion) {
      return suggestion.item.name
    },

    focusMe(e) {},

    // fetch list from CMS
    searchPerson(text) {
      this.$apollo.addSmartQuery('allPersons', {
        query: gql`
          query allPersons($text: String!) {
            allPersons(search: $text) {
              id
              name
            }
          }
        `,
        variables: {
          text: `${text}`,
        },
        update(data) {
          this.suggestions[0].data = data.allPersons
        },
        error(error) {
          // eslint-disable-next-line no-console
          console.error("We've got an error!", error)
        },
      })
    },
  },
  // apollo: {
  //   allPersons: {
  //     query: gql`
  //       query allPersons($text: String!) {
  //         allPersons(search: $text) {
  //           id
  //           name
  //         }
  //       }
  //     `,
  //     variables: {
  //       text: ``,
  //     },
  //     update(data) {
  //       this.suggestions[0].data = data.allPersons
  //     },
  //   },
  // },
}
</script>

<style lang="scss">
.RelationInput {
  input {
    width: 260px;
    padding: 0.5rem;
  }

  ul {
    width: 100%;
    color: rgba(30, 39, 46, 1);
    list-style: none;
    margin: 0;
    padding: 0.5rem 0 0.5rem 0;
  }
  li {
    margin: 0 0 0 0;
    border-radius: 5px;
    padding: 0.75rem 0 0.75rem 0.75rem;
    display: flex;
    align-items: center;
  }
  li:hover {
    cursor: pointer;
  }

  .autosuggest-container {
    display: flex;
    justify-content: center;
    width: 280px;
  }

  #autosuggest {
    width: 100%;
    display: block;
  }
  .autosuggest__results-item--highlighted {
    background-color: rgba(212, 212, 212, 0.2);
  }
}
</style>
