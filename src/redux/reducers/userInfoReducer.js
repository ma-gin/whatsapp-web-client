import { initialState } from "../store";
import { SET_USER_INFO } from "../actions";

const userInfoReducer = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        loggedUser: action.payload,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
