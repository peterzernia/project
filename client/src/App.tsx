import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StateContext, DispatchContext } from './context'
import { reducer, initialState } from './reducer'
import { SET_USER } from './actions'
import Nav from './components/Nav'
import Home from './containers/Home'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Register from './containers/Register'

import './App.css'

export default function App(): React.ReactElement {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({
        type: SET_USER,
        payload: user,
      })
    }
  }, [])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Router>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
