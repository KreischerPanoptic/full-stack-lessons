import { selector } from "recoil";
import { totpEnabledState } from "../../atoms/login/totpEnabled";

export const totpEnabledValueState = selector({
    key: "totpEnabledValueState",
    get: ({ get }) => {
        const enabled = get(totpEnabledState);
        return enabled;
    }
});
