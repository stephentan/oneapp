import path from "path";
import fs from "fs";
export function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }

  fs.mkdirSync(dirname);
}
