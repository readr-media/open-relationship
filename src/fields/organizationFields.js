export const organizationFields = {
  name: {
    label: '組織名稱',
    info: ['若名字之間有空格，請用半形空格'],
    value: '',
    inputStatus: { type: 'text' },
    required: true,
    verify: ['required'],
    formState: true,
  },
  alternative: {
    label: '組織別名',
    info: [],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
  },
  other_names: {
    label: '組織舊名',
    info: [],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
  },
  identifiers: {
    label: '統一編號',
    info: [],
    value: '',
    inputStatus: { type: 'text' },
    // verify: ["indentifiersFormat"],
    formState: true,
  },
  classification: {
    label: '組織類型',
    info: ['例如：政府機關、有限公司、股份有限公司、委員會、基金會、協會等等'],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
  },
  // area: {
  //   label: "組織地區",
  //   info: [],
  //   value: "",
  //   inputStatus: { type: "text" },
  //   formState: true,
  // },
  abstract: {
    label: '一句話描述該組織',
    info: [],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
  },
  description: {
    label: '組織詳細介紹',
    info: [],
    value: '',
    inputStatus: { type: 'textarea' },
    formState: true,
  },
  founding_date: {
    label: '創立時間',
    info: ['時間格式：yyyy-mm-dd ，若只知道年份可以只填年份'],
    value: '',
    inputStatus: { type: 'date' },
    verify: ['dateFormat'],
    formState: true,
  },
  dissolution_date: {
    label: '解散時間',
    info: ['時間格式：yyyy-mm-dd ，若只知道年份可以只填年份'],
    value: '',
    inputStatus: { type: 'date' },
    verify: ['dateFormat'],
    formState: true,
  },
  image: {
    label: '圖像',
    info: ['請貼上圖檔的 url 網址'],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
  },
  contact_details: {
    label: '聯絡方式',
    info: ['臺灣臺北市鉛筆路31號', '02-1234-5678', 'john@example.com'],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
  },
  links: {
    label: '網站',
    info: ['該組織的維基百科頁面或是官方網站'],
    value: '',
    inputStatus: { type: 'text' },
    formState: true,
  },
  address: {
    label: '組織稅籍登記地址',
    info: [],
    value: '',
    inputStatus: { type: 'text' },
    verify: ['urlFormat'],
    formState: true,
  },
  tags: {
    label: 'tag',
    info: [],
    value: [],
    inputStatus: { type: 'relationMany', target: 'tag' },
    verify: [],
  },
  source: {
    label: '資料來源',
    info: ['網站連結'],
    value: '',
    inputStatus: { type: 'text' },
    required: true,
    verify: ['required', 'urlFormat'],
    formState: true,
  },

  // area: { label: "地區", type: Relationship, many: false, ref: 'Area' },
  // memberships: { label: "成員", type: Relationship, many: true, ref: 'Membership' },
  // posts: { label: "posts", type: Relationship, many: true, ref: 'Post' },
  // motions: { label: "發起活動", type: Relationship, many: true, ref: 'Motion' },
  // vote_events: { label: "選舉/投票", type: Relationship, many: true, ref: 'Vote_event' },
  // votes: { label: "votes", type: Relationship, many: true, ref: 'Vote' },
  // identifiers: { label: "identifiers", type: Relationship, many: false, ref: 'User',  isRequired: true},
}
