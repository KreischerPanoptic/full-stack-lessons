import { selector } from "recoil";
import { rememberState } from "../../atoms/login/remember";

export const rememberOnOffState = selector({
    key: "rememberOnOffState",
    get: ({ get }) => {
        const remember = get(rememberState);
        const rememberOnOff = remember === true ? 'on' : 'off';
        return rememberOnOff;
    }
});
