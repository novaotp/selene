import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const getAppVersion = () => {
    const path = fileURLToPath(new URL("../../../package.json", import.meta.url));
    return JSON.parse(readFileSync(path, "utf8")).version as string;
};
