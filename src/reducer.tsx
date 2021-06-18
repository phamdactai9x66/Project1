import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import reducerCombine from "./redux/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension"

const creactCheckStatus = (store: any) => (next: any) => (action: any) => {
    return next(action)
}

const store = createStore(reducerCombine,
    composeWithDevTools(applyMiddleware(thunk, creactCheckStatus)))

export default store


