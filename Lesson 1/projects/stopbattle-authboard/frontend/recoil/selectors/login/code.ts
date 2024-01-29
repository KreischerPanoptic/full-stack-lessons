import { selector } from "recoil";
import { totpCodeState } from "../../atoms/login/code";

export const totpCodeValueState = selector({
    key: "totpCodeValueState",
    get: ({ get }) => {
        const code = get(totpCodeState);
        return code;
    }
});
