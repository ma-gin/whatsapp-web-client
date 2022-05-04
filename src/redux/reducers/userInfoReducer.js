import initialState from "../store"
import { SET_USER_INFO } from "../actions"

const useInfoReducer = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return action.payload
    default:
      return state
  }
}

export default useInfoReducer
