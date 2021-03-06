import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./combinedReducers";

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)

export type stateType = ReturnType<typeof reducers>