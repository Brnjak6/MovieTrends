import React, { useState } from 'react'
import Home from './pages/Home'
import GlobalStyle from './global/GlobalStyle'
import Navigation from './global/Navigation'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SearchProvider } from './components/InputSearchContext'
import Theme from './global/Theme'
import { ThemeProvider } from 'styled-components'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      < Router >
        <GlobalStyle />
        <SearchProvider>
          <Navigation />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </SearchProvider>
      </Router >
    </ThemeProvider>
  );


}

export default App;
