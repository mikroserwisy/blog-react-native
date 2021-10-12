const actions = {
    showSettings: 'SHOW_SETTINGS',
    hideSettings: 'HIDE_SETTINGS'
};

const initialState = {
    showSettings: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.showSettings:
            return { showSettings: true };
        case actions.hideSettings:
            return { showSettings: false };
        default:
            // throw exception - invalid action
            return state;
    }
};

export {reducer, actions};