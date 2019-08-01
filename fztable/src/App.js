import React from 'react'
// import './App.css'
import './scss/main.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Mainpage from './pages/Mainpage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Mainpage} />
      </Switch>
    </Router>
  )
}

export default App
