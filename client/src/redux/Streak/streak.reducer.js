import { INCREMENTSTREAK, RESETSTREAK } from "./streak.types";

const INITIAL_STATE = {
    streak: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCREMENTSTREAK:
            return {
                ...state,
                streak: state.streak + 1,
            };

        case RESETSTREAK:
            return {
                ...state,
                streak: 0,
            };

        default:
            return state;
    }
};

export default reducer;
