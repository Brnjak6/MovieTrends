import React, { useState } from 'react'
import Home from './pages/Home'
import GlobalStyle from './global/GlobalStyle'
import Navigation from './global/Navigation'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SearchProvider } from './components/InputSearchContext'

function App() {
  return (
    < Router >
      <div className="App">
        <GlobalStyle />
        <SearchProvider>
          <Navigation />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </SearchProvider>
      </div>
    </Router >
  );


}

export default App;
