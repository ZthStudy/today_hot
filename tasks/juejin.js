const { Task } = require("../tools");

const config = {
  pageUrl: "https://juejin.cn",
  pageSelector: ".entry-list .item a.title",
  title: "今日掘金",
};

module.exports = {
  task: async () => {
    return await Task(config, async (page) => {
      //菜单导航选择器
      const navSelector = ".view-nav .nav-item";
      await Promise.all([
        page.waitForNavigation(),
        page.click(`${navSelector}:nth-child(3)`),
      ]);
    });
  },
};
