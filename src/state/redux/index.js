// redux.js
import { createStore } from "redux";

// Action Types
const actionTypes = {
    SIDEBAR_STATUS : "SIDEBAR_STATUS",
}

// Reducer
const globalState = JSON.parse(localStorage.getItem('reduxState')) || {
   isExpandSidebar: true,
}

const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        case actionTypes.SIDEBAR_STATUS:
            return {
                ...state,
                isExpandSidebar: !state.isExpandSidebar,
            }
        default:
            return state
    }
}

// Store
export const store = createStore(rootReducer)

// Dispatch
export const mapStateToProps = (state) => {
    return state;
}
 
export const mapDispatchToProps = (dispatch) => {
    return {
        handleSidebarStatus: (isExpandSidebar) => {
            dispatch({
                type: actionTypes.SIDEBAR_STATUS,
                payload: !isExpandSidebar,
            });
        },
    }
}

// Subscribe
store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()))
})