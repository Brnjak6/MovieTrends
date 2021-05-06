import React, { useState } from 'react'
import Home from './pages/Home'
import GlobalStyle from './global/GlobalStyle'
import Navigation from './global/Navigation'
import { SearchProvider } from './components/InputSearchContext'
import { FavoriteList } from './components/FavoritesContext'
import { HottestStatus } from './components/HottestContext'
import { darkTheme, lightTheme } from './global/Theme'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Favorites from './pages/Favorites'
import TrendingPage from './pages/TrendingPage'
import TopRatedPage from './pages/TopRatedPage'
import SearchPage from './pages/SearchPage'

function App() {
  const [theme, setTheme] = useState('dark');

  const handleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  return (
    <Router>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyle />
        <FavoriteList>
          <HottestStatus>
            <SearchProvider>
              <Navigation theme={handleTheme} />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/favorites" >
                  <Favorites />
                </Route>
                <Route path="/trending" >
                  <TrendingPage />
                </Route>
                <Route path="/top_rated" >
                  <TopRatedPage />
                </Route>
                <Route path="/search" >
                  <SearchPage />
                </Route>
              </Switch>
            </SearchProvider>
          </HottestStatus>
        </FavoriteList>
      </ThemeProvider>
    </Router>
  );


}

export default App;
