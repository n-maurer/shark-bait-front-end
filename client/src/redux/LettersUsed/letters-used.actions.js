import {
    CHANGE_LETTER_STATUS,
    RESET_LETTERS_STATUS,
} from "./letters-used.types";

export const changeLetterStatus = (letter, status) => {
    return {
        type: CHANGE_LETTER_STATUS,
        payload: {
            letter: letter,
            status: status,
        },
    };
};

export const resetLetters = () => {
    return {
        type: RESET_LETTERS_STATUS,
    };
};
