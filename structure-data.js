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

const prompt = `
一张表格总结了 Goocrux 的成果：

在最近发现的 Goocrux 星球上发现了许多水果。那里生长着新斯基兹，它们是紫色的，尝起来像糖果。还有 loheckles，它是一种灰蓝色的水果，非常酸，有点像柠檬。 Pounits 呈亮绿色，咸味多于甜味。还有很多 loopnovas，它们是霓虹粉的味道，尝起来像棉花糖。最后，还有一种叫做 glowls 的水果，它有一种非常酸和苦的味道，具有酸性和腐蚀性，并带有淡橙色调。

|水果 |颜色 |风味 |
`;

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0,
  max_tokens: 100,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
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
