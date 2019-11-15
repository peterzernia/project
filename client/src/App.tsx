import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StateContext, DispatchContext } from './context'
import { reducer, initialState, init } from './reducer'
import Nav from './components/Nav'
import Home from './containers/Home'
import Login from './containers/Login'

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState, init)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Router>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
