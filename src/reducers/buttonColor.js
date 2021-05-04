// Button color reducer

const buttonColorReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BUTTON_COLOR':
            return action.color;
        default:
            return state;
    }
};

export default buttonColorReducer;