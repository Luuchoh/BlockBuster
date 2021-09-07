import { types } from "../types/types";

const initialState = {
  auth: {},
};

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.logIn:
      return {
        uid: action.payload.uid,
        name: action.payload.displayname,
        avatar: action.payload.imageUrl,
      };

    case types.logOut:
      return {
      };

    default:
      return state;
  }
};
