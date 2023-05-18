import { INCREMENT, DECREMENT, RESET } from "./num-wrong.types";

export const increaseNumWrong = () => {
    return {
        type: INCREMENT,
    };
};

export const decreaseNumWrong = () => {
    return {
        type: DECREMENT,
    };
};

export const resetNumWrong = () => {
    return {
        type: RESET,
    };
};
