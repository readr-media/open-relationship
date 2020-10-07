export const personFields = {
  name: {
    label: '姓名',
    info: [
      '若名字有分隔點，請用全形分隔點「・」',
      '原住民中文名與羅馬拼音之間需要空格',
      '若名字之間有空格，請用半形空格',
    ],
    value: '',
    inputStatus: { type: 'text' }, // which type of input it should have
    required: true, // show star
    verify: ['required'], // handle field-verify methods
    formState: true, // if field-erify fails, it'll turn false, and sumbit won't pass.
    correctVerify: null, // correction-verify flag,null,true or false
  },
  alternative: {
    label: '別名',
    info: [],
    value: '',
    inputStatus: { type: 'text' },

    formState: true,
    correctVerify: null,
  },
  other_names: {
    label: '舊名',
    info: [],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
    correctVerify: null,
  },
  // identifiers: {
  //   label: "ID",
  //   info: "",
  //   value: "",
  //   inputStatus: { type: "text" },
  // },
  email: {
    label: '電子信箱',
    info: [],
    value: '',
    inputStatus: { type: 'text' },
    verify: ['emailFormat'],
    formState: true,
    correctVerify: null,
  },
  gender: {
    label: '生理性別',
    info: [],
    value: '',
    inputStatus: {
      type: 'radio',
      multi: [
        { label: '男', value: '男' },
        { label: '女', value: '女' },
      ],
    },
    formState: true,
    correctVerify: null,
  },

  birth_date: {
    label: '出生日期',
    info: ['時間格式：yyyy-mm-dd ，若只知道年份可以只填年份'],
    value: '',
    inputStatus: { type: 'date' },
    verify: ['dateFormat'],

    formState: true,
    correctVerify: null,
  },
  death_date: {
    label: '死亡日期',
    info: ['時間格式：yyyy-mm-dd ，若只知道年份可以只填年份'],
    value: '',
    inputStatus: { type: 'date' },
    verify: ['dateFormat'],

    formState: true,
    correctVerify: null,
  },
  image: {
    label: '大頭照',
    info: ['請貼上圖檔的 url 網址'],
    value: '',
    inputStatus: { type: 'text' },
    verify: ['urlFormat'],
    formState: true,
    correctVerify: null,
  },
  summary: {
    label: '一句話描寫這個人',
    info: [],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
    correctVerify: null,
  },
  biography: {
    label: '詳細生平',
    info: [],
    value: '',
    inputStatus: { type: 'textarea' },
    formState: true,
    correctVerify: null,
  },
  national_identity: {
    label: '國籍',
    info: [],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
    correctVerify: null,
  },
  contact_details: {
    label: '聯絡方式',
    info: ['臺灣臺北市鉛筆路31號', '02-1234-5678', 'john@example.com'],
    value: '',
    inputStatus: { type: 'textarea', size: 'auto' },
    formState: true,
    correctVerify: null,
  },
  links: {
    label: '網站',
    info: ['人物的維基百科頁面或是官方網站'],
    value: '',
    inputStatus: { type: 'text' },
    verify: ['urlFormat'],

    formState: true,
    correctVerify: null,
  },
  source: {
    label: '資料來源',
    info: ['網站連結'],
    value: '',
    inputStatus: { type: 'textarea', size: 'auto' },
    required: true,
    verify: ['required', 'urlFormat'],
    formState: true,
    correctVerify: null,
  },
}
