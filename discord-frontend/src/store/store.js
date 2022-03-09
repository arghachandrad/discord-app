import { composeWithDevTools } from "redux-devtools-extension"
import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import authReducer from "./reducers/authReducer"
import alertReducer from "./reducers/alertReducer"
import friendReducer from "./reducers/friendsReducer"
import chatReducer from "./reducers/chatReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friend: friendReducer,
  chat: chatReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
