import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './containers/Home'
import Login from './containers/Login'

export default function App() {
  return (
    <Router>
      <Nav />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Router>
  )
}
