import { extendHex } from "../util/stringUtils";

const colorsListReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_COLOR':
            const newSet = new Set([...state]);
            newSet.add(action.color.length === 4 ? extendHex(action.color) : action.color);
            return newSet;
        case 'SET_COLORS':
            return new Set(action.colors);
        default:
            return state;
    }
};

export default colorsListReducer;