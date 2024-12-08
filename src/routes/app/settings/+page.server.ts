import { getAppVersion } from "$utils/app-version.server";

export const load = () => {
    return {
        appVersion: getAppVersion()
    };
};
