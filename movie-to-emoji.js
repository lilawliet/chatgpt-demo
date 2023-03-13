import path from "path";
import https from "https";
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

const prompt = `
把电影名字转换成表情。
Back to the Future: 👨👴🚗🕒 
Batman: 🤵🦇 
Transformers: 🚗🤖 
la la land: 
`;

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.8,
  max_tokens: 60,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ["\n"],
});

const opt = {
  flag: "a", // a：追加写入；w：覆盖写入
};

fs.writeFileSync(
  `${__dirname}/response_${new Date()
    .toISOString()
    .replace(/(-|,|:|\.)/g, "")}.json`,
  stringify(response),
  opt,
  (err) => {
    if (err) {
      fs.writeFileSync(
        `${__dirname}/error_response_error_${new Date()
          .toISOString()
          .replace(/(-|,|:|\.)/g, "")}.json`,
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
