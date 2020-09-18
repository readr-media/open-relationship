const { Text, Select } = require("@keystonejs/fields");
const { atTracking, byTracking } = require("@keystonejs/list-plugins");

const classification_options = [
  { value: "company", label: "公司企業" },
  { value: "party", label: "政黨" },
  { value: "gov", label: "政府" },
  { value: "ngo", label: "非政府組織" },
  { value: "npo", label: "非營利組織" },
  { value: "community", label: "社會團體" },
  { value: "other", label: "其他" },
];

module.exports = {
  fields: {
    name: { label: "組織名稱", type: Text, isRequired: true },
    alternative: { label: "組織別名", type: Text },
    other_names: { label: "組織舊名", type: Text },
    identifiers: { label: "統一編號", type: Text },
    classification: {
      label: "組織類型",
      type: Select,
      options: classification_options,
      dataType: "string",
    },
    area: { label: "組織地區", type: Text },
    abstract: { label: "一句話描述該組織", type: Text },
    description: { label: "組織詳細介紹", type: Text },
    founding_date: { label: "創立時間", type: CalendarDay },
    dissolution_date: { label: "解散時間", type: CalendarDay },
    image: { label: "圖像", type: Text },
    contact_details: { label: "聯絡方式", type: Text },
    links: { label: "網站", type: Text },
    address: { label: "組織稅籍登記地址", type: Text },
    source: { label: "來源", type: Text },
  },
  plugins: [atTracking(), byTracking()],
  labelResolver: (item) => `${item.name}+${item.address}`,
};
