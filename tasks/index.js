const juejin = require("./juejin");
const itHome = require("./itHome");
const zhibo8 = require("./zhibo8");

module.exports = {
  tasks: () => {
    return [juejin, itHome, zhibo8].map((item) => item.task());
  },
};
