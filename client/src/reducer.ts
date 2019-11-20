import { SET_USER, CLEAR_USER, RESET } from './actions'

interface Action {
  type: string;
  payload: object;
}

interface State {
  user: object;
  authenticated: boolean;
}

export const initialState = {
  user: {},
  authenticated: false,
}

export const init = (): State => initialState

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, authenticated: true }
    case CLEAR_USER:
      return { ...state, user: initialState.user, authenticated: false }
    case RESET:
      return init()
    default:
      throw new Error()
  }
}
