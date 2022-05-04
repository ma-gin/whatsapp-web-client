import { createStore, compose, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import userInfoReducer from "../reducers/userInfoReducer"
const composeFunction = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
  userInfo: {},
}

const configureStore = createStore(
  userInfoReducer,
  initialState,
  composeFunction(applyMiddleware(thunk))
)

export default configureStore
