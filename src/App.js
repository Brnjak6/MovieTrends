import React from 'react'
import Home from './pages/Home'
import GlobalStyle from './global/GlobalStyle'
import Navigation from './global/Navigation'
import { SearchProvider } from './components/InputSearchContext'
import { FavoriteList } from './components/FavoritesContext'
import Theme from './global/Theme'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Favorites from './pages/Favorites'

function App() {
  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <FavoriteList>
          <SearchProvider>
            <Navigation />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route>
                <Favorites path="favorites" />
              </Route>
            </Switch>
          </SearchProvider>
        </FavoriteList>
      </ThemeProvider>
    </Router>
  );


}

export default App;
