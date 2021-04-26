import React from 'react'
import Home from './pages/Home'
import GlobalStyle from './global/GlobalStyle'
import Navigation from './global/Navigation'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyle />
        <Navigation />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
