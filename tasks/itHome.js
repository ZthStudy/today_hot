const { Task } = require("../tools");

const config = {
  pageUrl: "https://www.ithome.com/",
  pageSelector: "#rank li a",
  title: "今日之家",
};

module.exports = {
  task: async () => {
    return await Task(config);
  },
};
