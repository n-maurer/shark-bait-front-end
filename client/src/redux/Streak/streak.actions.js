import { INCREMENTSTREAK, RESETSTREAK } from "./streak.types";

export const increaseStreak = () => {
    return {
        type: INCREMENTSTREAK,
    };
};

export const resetStreak = () => {
    return {
        type: RESETSTREAK,
    };
};
