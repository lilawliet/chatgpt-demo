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
const response = await openai.listEngines();

const prompt = "Hello, how are you?";

const options = {
  hostname: "api.openai.com",
  path: "/v1/chat/completions",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
};

const postData = JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: "与你一个用户角色的会话上下文保留多久？可以设置吗？",
    },
  ],
  temperature: 0.7,
  //   prompt: prompt,
  //   temperature: 0.7,
  //   max_tokens: 60,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
});

const opt = {
  flag: "a", // a：追加写入；w：覆盖写入
};

const req = https.request(options, (res) => {
  let responseData = "";

  res.on("data", (chunk) => {
    responseData += chunk;
  });

  res.on("end", () => {
    fs.writeFileSync(
      `${__dirname}/response_${new Date()
        .toISOString()
        .replace(/(-|,|:|\.)/g, "")}.json`,
      responseData,
      opt,
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(postData);
req.end();
