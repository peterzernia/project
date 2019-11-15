import { SET_USER, RESET } from "./actions";

interface Action {
  type: string;
  payload: object;
}

interface State {
  user: object;
}

export const initialState = {
  user: {}
};

export const init = () => initialState;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case RESET:
      return init();
    default:
      throw new Error();
  }
};
