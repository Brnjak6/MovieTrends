import React, { useState } from 'react'
import Home from './pages/Home'
import { BounceLoader } from 'react-spinners'
import GlobalStyle from './global/GlobalStyle'
import Navigation from './global/Navigation'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    < Router >
      <div className="App">
        <GlobalStyle />
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router >
  );


}

export default App;
