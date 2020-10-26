<template>
  <div class="contact">
    <div class="contact__title">
      留下 email，<br class="contact__break-line" />通知你最新進度！
    </div>
    <form class="contact__form" @submit.prevent="handleSubmit">
      <input v-model="email" class="contact__input" type="email" required />
      <Button class="contact__submit" title="送出" @click="handleClick" />
    </form>
    <p
      v-if="isSuccess || isError"
      :class="{ error: isError }"
      class="contact__message"
    >
      {{
        isSuccess
          ? '謝謝你的訂閱，您已加入電子報名單。'
          : '發生錯誤，請稍後再試'
      }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

import Button from '../components/Button'

const API_URL =
  'https://www.readr.tw/project-api/googlesheet?spreadsheet_id=1-7YTT5Y-VINVAYy8Aem0kGnerQfTEoBASQxI_J1YR8c&range=Email&value_input_option=RAW'
const SLUG = 'whoareyou.readr.tw'

export default {
  components: {
    Button,
  },
  data() {
    return {
      email: '',
      isError: false,
      isSuccess: false,
    }
  },
  methods: {
    handleClick() {
      this.$ga.event({
        eventCategory: 'projects',
        eventAction: 'click',
        eventLabel: 'send email',
      })
    },
    handleSubmit() {
      this.addToGoogleSheet()
    },
    async addToGoogleSheet() {
      const params = {
        majorDimension: 'ROWS',
        values: [[this.email, dayjs().format('YYYYMMDDHHmm'), SLUG, SLUG]],
      }
      try {
        await axios.post(API_URL, params, {
          headers: { 'Content-Type': 'application/json' },
        })
        this.email = ''
        this.isSuccess = true
      } catch (error) {
        this.isError = true
        console.error('[ERROR] Submit to sheet.', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/breakpoint.scss';

.contact {
  padding: 42px 20px;
  background-color: #ebebeb;
  > * {
    max-width: 610px;
    margin-left: auto;
    margin-right: auto;
  }
  &__title {
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 1px;
    text-align: center;
  }
  &__break-line {
    @include atMedium {
      display: none;
    }
  }
  &__form {
    margin: 20px auto 0;
    @include atMedium {
      display: flex;
    }
  }
  &__input {
    display: inline-block;
    width: 100%;
    height: 50px;
    padding: 0 0 0 10px;
    font-size: 16px;
    background-color: #ffffff;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
    @include atMedium {
      flex: 1;
      width: auto;
    }
  }
  &__submit {
    display: inline-block;
    width: 100%;
    margin-top: 10px;
    @include atMedium {
      width: 100px;
      margin: 0 0 0 10px;
    }
  }
  &__message {
    margin-top: 5px;
    font-size: 12px;
    text-align: right;
    &.error {
      color: red;
    }
  }
}
</style>
