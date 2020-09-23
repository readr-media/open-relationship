export const characterFields = {
  name: {
    label: "人物的姓名",
    info: "作答示範：原住民名字中間使用半形空格，例：Walis Nokan",
    value: "",
    inputStatus: { type: "text" },
    readOnly: true,
  },
  alternative: {
    label: "人物是否有其他名字",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
  other_names: {
    label: "人物是否有其他別稱",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
  identifiers: {
    label: "ID",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
  gender: {
    label: "人物的生理性別",
    info: "",
    value: "",
    inputStatus: {
      type: "radio",
      multi: [
        { label: "男", value: "男" },
        { label: "女", value: "女" },
      ],
    },
  },
  email: {
    label: "人物的電子信箱",
    info: "作答示範：readr123@gmail.com",
    value: "",
    inputStatus: { type: "text" },
  },
  birth_date: {
    label: "出生日期",
    info: "",
    value: "",
    inputStatus: { type: "date" },
  },
  death_date: {
    label: "死亡日期",
    info: "",
    value: "",
    inputStatus: { type: "date" },
  },
  image: {
    label: "大頭照",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
  summary: {
    label: "一句話描寫這個人",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
  biography: {
    label: "詳細生平",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
  national_identity: {
    label: "國籍",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
  contact_details: {
    label: "聯絡方式",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
  links: {
    label: "網站",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
  source: {
    label: "資料來源",
    info: "",
    value: "",
    inputStatus: { type: "text" },
  },
};
