const express = require("express");
const path = require("path");
const dayjs = require("dayjs");
const chalk = require("chalk");

const app = express();
const { tasks } = require("./tasks");
const { FileServer } = require("./tools");

const resourcePath = path.join(__dirname, "./resource");

app.use(
  express.static(resourcePath, {
    setHeaders(res) {
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);

async function mainTask() {
  const now = dayjs().format("YYYY-MM-DD");
  console.log(chalk.red(`[Process] 开始获取 [${now}] 资讯`));
  
  const allTaskData = await Promise.all(tasks());

  FileServer.write(
    path.join(resourcePath, "./index.json"),
    JSON.stringify({
      data: {
        date: now,
        data: allTaskData,
      },
    })
  );
}

mainTask();

app.listen(8888);
