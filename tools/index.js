/*
 * @Description:
 * @version: 1.0.0
 * @Author: zhangtianhou
 * @Date: 2021-10-21 11:04:54
 * @LastEditors: zhangtianhou
 * @LastEditTime: 2021-10-26 11:08:46
 */

const puppeteer = require("puppeteer");
const chalk = require("chalk");
const chromeFinder = require("chrome-finder");
const fs = require("fs");

module.exports = {
  Task: ({ pageUrl, pageSelector, title }, pageHandle) => {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch({
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          executablePath: chromeFinder(),
        });
        const page = await browser.newPage();
        await page.goto(pageUrl);
        console.log(chalk.blue(`[Process] 开始获取 ${title}`));

        pageHandle && (await pageHandle(page));

        await page.waitForSelector(pageSelector, {
          timeout: 5000,
        });

        // 通过选择器找到对应列表项的标题和链接
        const res = await page.$$eval(pageSelector, (ele) =>
          ele.map((el) => ({
            url: el.href,
            text: el.innerText,
          }))
        );
        console.log({ res });

        await browser.close();
        console.log(res.length && chalk.yellow(`[Success] 成功获取 ${title}`));
        resolve({
          title,
          list: res.slice(0, 20),
        });
      } catch (e) {
        reject(e);
      }
    }).catch((e) => {
      console.log(e);
      console.log(chalk.white.bgRed.bold(`[Failed] 获取${title} 失败`));
    });
  },
  FileServer: {
    read(path) {
      return fs.readFileSync(path);
    },
    write(path, text) {
      return fs.writeFileSync(path, text);
    },
  },
};
