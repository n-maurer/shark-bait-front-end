import { INCREMENT, DECREMENT, RESET } from "./num-wrong.types";

const INITIAL_STATE = {
    numberWrong: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                numberWrong: state.numberWrong + 1,
            };

        case DECREMENT:
            return {
                ...state,
                numberWrong: state.numberWrong - 1,
            };

        case RESET:
            return {
                ...state,
                numberWrong: 0,
            };

        default:
            return state;
    }
};

export default reducer;
