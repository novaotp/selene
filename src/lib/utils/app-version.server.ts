import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(new URL("../../../package.json", import.meta.url));
const pkg = JSON.parse(await readFile(path, "utf8"));

export const getAppVersion = () => pkg.version as string;
