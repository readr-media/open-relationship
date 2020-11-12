<template>
  <div class="RelationInput">
    <input v-if="readonly" v-model="field.value.name" readonly />
    <vue-autosuggest
      v-else
      v-model="field.value.name"
      :sectionConfigs="sectionConfigs"
      :suggestions="filteredOptions"
      :inputProps="{
        id: 'autosuggest__input',
        placeholder: '輸入名稱',
      }"
      class="autosuggest"
      @input="onInputChange"
      @selected="onSelected"
      @blur="handleBlur"
    >
      <span
        v-if="selected.info"
        slot="after-input"
        class="selected-info"
        v-text="`（${selected.info}）`"
      />
      <div
        slot-scope="{ suggestion }"
        style="display: flex; align-items: center"
      >
        <!-- 由於不同表單提供的欄位資訊不同，請先組好要顯示的資訊 -->
        <div style="{ display: 'flex', color: 'navyblue'}">
          {{ suggestion.item.name
          }}<span v-if="suggestion.item.info"
            >（{{ suggestion.item.info }}）</span
          >
        </div>
      </div>
    </vue-autosuggest>
  </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'
import relationInputMixin from '../mixins/relationInputMixin'

export default {
  components: { VueAutosuggest },
  mixins: [relationInputMixin],
  props: {
    field: {
      type: Object,
      required: true,
    },
    organizationRelation: {
      type: Object,
      default: () => ({}),
    },
    personRelation: {
      type: Object,
      default: () => ({}),
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // input's content
      input: '',
      // chosen item from list
      selected: '',
      // fetched list(for apollo)
      allPersons: [],
      allOrganizations: [],
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
    // 在新增人物關係、組織關係時，建議選單中不會列出已選擇的項目
    selectedIds() {
      const formName = this.$route.path?.split('/')[1]
      let ids = []
      if (formName === 'person-relation') {
        ids = [
          this.personRelation.person_id?.value?.id,
          this.personRelation.related_person_id?.value?.id,
        ]
      } else if (formName === 'organization-relation') {
        ids = [
          this.organizationRelation.organization_id?.value?.id,
          this.organizationRelation.related_organization_id?.value?.id,
        ]
      }
      return ids.filter((id) => id)
    },
  },
  watch: {
    selected(value) {
      this.suggestions[0].data = this.suggestions[0].data.filter(
        (item) => item.id !== value.id
      )
    },
  },

  methods: {
    // event fired when typing
    async onInputChange(text) {
      this.selected = {}
      this.field.value.id = ''
      switch (this.field.inputStatus.target) {
        case 'person':
          await this.searchPersons(text)
          break

        case 'organization':
          await this.searchOrganizations(text)
          break

        default:
          break
      }
    },
    handleBlur() {
      setTimeout(() => {
        const hasSelected = this.selected?.id
        const hasSameNameItem = this.suggestions[0].data.find(
          (item) => item.name === this.field.value.name
        )
        if (!hasSelected && hasSameNameItem) {
          this.selected = hasSameNameItem
          this.field.value.id = hasSameNameItem.id
        }
      }, 500)
    },
    // event fired when selected an item
    onSelected(item) {
      if (item) {
        // get selected item from list
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
      }
    },
  },
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

  .autosuggest {
    position: relative;
    .selected-info {
      color: grey;
    }
    .autosuggest__results-container {
      position: absolute;
      z-index: 10;
      top: 28px;
      left: 0;
      width: 100%;
      max-height: 200px;
      overflow-y: auto;
      background-color: #fff;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
