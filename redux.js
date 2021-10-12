import { createStore } from "redux";

const actions = {
    showSettings: 'SHOW_SETTINGS',
    hideSettings: 'HIDE_SETTINGS',
    inProgress: 'IN_PROGRES',
    idle: 'IDLE',
    articlesRefreshed: 'ARTICLES_REFERSHED'
};

const initialState = {
    showSettings: false,
    inProgress: false,
    articles: []
};

const reducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case actions.showSettings:
            return { ...state, showSettings: true };
        case actions.hideSettings:
            return { ...state, showSettings: false };
        case actions.inProgress:
            return { ...state, inProgress: true };
        case actions.idle:
            return { ...state, inProgress: false };
        case actions.articlesRefreshed:
            return { ...state, articles: action.articles}
        default:
            // throw exception - invalid action
            return state;
    }
};

const store = createStore(reducer);

const dispatch = store.dispatch;

export {reducer, actions, store, dispatch};