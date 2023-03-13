/**
 * moderation: 文本审核，免费的，建议使用
 */

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import stringify from "json-stringify-safe";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const prompt = `周一周一不如归西`;

const response = await openai.createModeration({
  input: prompt,
});

fs.writeFileSync(
  `${__dirname}/moderation/response-${new Date()
    .toUTCString()
    .replace(/(:|\s)/g, "-")
    .replace(/(,|\.)/g, "")}.json`,
  stringify(response),
  {
    flag: "a", // a：追加写入；w：覆盖写入
  },
  (err) => {
    if (err) {
      fs.writeFileSync(
        `${__dirname}/moderation/error-response-${new Date()
          .toUTCString()
          .replace(/(:|\s)/g, "-")
          .replace(/(,|\.)/g, "")}.json`,
        stringify(err),
        opt,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }
  }
);
