import { SAVE } from "../constants/store/auth";

export const save = id => {
  return {
    type: SAVE,
    payload: id
  };
};


