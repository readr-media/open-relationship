export const characterFields = {
  name: {
    label: "姓名",
    info:
      "若名字有分隔點，請用全形分隔點「・」 原住民中文名與羅馬拼音之間需要空格 若名字之間有空格，請用半形空格",
    value: "",
    inputStatus: { type: "text" },
    required: true,
    verify: ["required"],
    formState: true,
  },
  alternative: {
    label: "別名",
    info: "",
    value: "",
    inputStatus: { type: "text" },

    formState: true,
  },
  other_names: {
    label: "舊名",
    info: "",
    value: "",
    inputStatus: { type: "text" },
    formState: true,
  },
  // identifiers: {
  //   label: "ID",
  //   info: "",
  //   value: "",
  //   inputStatus: { type: "text" },
  // },
  email: {
    label: "電子信箱",
    info: "作答示範：readr123@gmail.com",
    value: "",
    inputStatus: { type: "text" },
    verify: ["emailFormat"],
    formState: true,
  },
  gender: {
    label: "生理性別",
    info: "單選題：男、女",
    value: "",
    inputStatus: {
      type: "radio",
      multi: [
        { label: "男", value: "男" },
        { label: "女", value: "女" },
      ],
    },
    formState: true,
  },

  birth_date: {
    label: "出生日期",
    info: "時間格式：yyyy-mm-dd ，若只知道年份可以只填年份",
    value: "",
    inputStatus: { type: "date" },
    verify: ["dateFormat"],

    formState: true,
  },
  death_date: {
    label: "死亡日期",
    info: "時間格式：yyyy-mm-dd ，若只知道年份可以只填年份",
    value: "",
    inputStatus: { type: "date" },
    verify: ["dateFormat"],

    formState: true,
  },
  image: {
    label: "大頭照",
    info: "",
    value: "",
    inputStatus: { type: "text" },
    verify: ["urlFormat"],
    formState: true,
  },
  summary: {
    label: "一句話描寫這個人",
    info: "",
    value: "",
    inputStatus: { type: "text" },
    formState: true,
  },
  biography: {
    label: "詳細生平",
    info: "",
    value: "",
    inputStatus: { type: "textarea" },
    formState: true,
  },
  national_identity: {
    label: "國籍",
    info: "",
    value: "",
    inputStatus: { type: "text" },
    formState: true,
  },
  contact_details: {
    label: "聯絡方式",
    info: "臺灣臺北市鉛筆路31號 02-1234-5678 john@example.com",
    value: "",
    inputStatus: { type: "text" },
    formState: true,
  },
  links: {
    label: "網站",
    info: "人物的 wiki 頁面或是官方網站",
    value: "",
    inputStatus: { type: "text" },
    verify: ["urlFormat"],

    formState: true,
  },
  source: {
    label: "資料來源",
    info: "網站連結",
    value: "",
    inputStatus: { type: "text" },
    required: true,
    verify: ["required", "urlFormat"],
    formState: true,
  },
};