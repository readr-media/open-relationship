const { Text } = require("@keystonejs/fields");
const { atTracking, byTracking } = require("@keystonejs/list-plugins");

module.exports = {
  fields: {
    name: { label: "你的大名", type: Text },
    email: { label: "你的email address", type: Text },
    feedback: { label: "你的協作心得", type: Text, isMultiline: true },
  },
  plugins: [atTracking(), byTracking()],
};
