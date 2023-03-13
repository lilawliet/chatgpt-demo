import fs from "fs";
import stringify from "json-stringify-safe";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const writeIntoFile = (response, packagesName) => {
  fs.writeFileSync(
    `${__dirname}/${packagesName}/response-${new Date()
      .toUTCString()
      .replace(/(:|\s)/g, "-")
      .replace(/(,|\.)/g, "")}.json`,
    stringify(response),
    {
      flag: "a", // a：追加写入；w：覆盖写入
    },
    (err: any) => {
      if (err) {
        fs.writeFileSync(
          `${__dirname}/${packagesName}/error-response-${new Date()
            .toUTCString()
            .replace(/(:|\s)/g, "-")
            .replace(/(,|\.)/g, "")}.json`,
          stringify(err),
          {
            flag: "a", // a：追加写入；w：覆盖写入
          },
          (err: any) => {
            if (err) {
              console.error(err);
            }
          }
        );
      }
    }
  );
};
