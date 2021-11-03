const { Task } = require("../tools");

const config = {
  pageUrl: "https://news.zhibo8.cc/nba/more.htm",
  pageSelector: ".articleList a",
  title: "今日直播吧",
};

module.exports = {
  task: async () => {
    return await Task(config);
  },
};
