import { SAVE } from "../constants/store/auth";

const INITIAL_STATE = {
  userId: ""
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE:
      return {
        userId: action.payload
      };
    default:
      return state;
  }
}
