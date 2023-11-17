const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const DB_PATH = path.join(__dirname, "/db.json");

exports.getDb = async () => {
  return JSON.parse(await readFile(DB_PATH, "utf-8"));
};

exports.saveDb = async (db) => {
  // 第二个参数为null表示有格式化,第三个表示缩进两个空格
  const data = JSON.stringify(db, null, "  ");
  await writeFile(DB_PATH, data);
};
