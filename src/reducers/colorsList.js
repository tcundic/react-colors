
const colorsListReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_COLOR':
            const newSet = new Set();
            state.forEach(color => newSet.add(color));
            newSet.add(action.color);
            return newSet;
        default:
            return state;
    }
};

export default colorsListReducer;