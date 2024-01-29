import { selector } from "recoil";
import { ipState } from "../../../atoms/shared/ip/ip";

export const ipValueState = selector({
    key: "ipValueState",
    get: ({ get }) => {
        const ip = get(ipState);
        return ip;
    }
});
