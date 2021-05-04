// Button color reducer

import { extendHex } from "../util/stringUtils";

const buttonColorReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BUTTON_COLOR':
            return action.color.length === 4 ? extendHex(action.color) : action.color;
        default:
            return state;
    }
};

export default buttonColorReducer;