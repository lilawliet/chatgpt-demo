import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import stringify from "json-stringify-safe";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OPENAI_API_KEY = "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";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-RaKLyo4NeCHGWzbKdTtUTcHd",
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
console.log(response);
const opt = {
  flag: "a", // a：追加写入；w：覆盖写入
};

fs.writeFileSync(
  `${__dirname}/${new Date().valueOf()}.json`,
  stringify(response),
  opt,
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);
