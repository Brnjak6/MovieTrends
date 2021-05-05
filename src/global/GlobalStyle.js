import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    min-height: 100vh;
    background: ${props => props.theme.colors.background};
    font-family: 'Nunito', cursive;
    color: ${props => props.theme.colors.main};
    overflow-x: hidden;
}

h1 {
    font-size: 3rem;
    font-weight: lighter;
    letter-spacing: .2rem;
}


button {
outline: none;
border: none;
font-family: inherit;
background: rgba(0, 0, 0, 1);
padding: 5px 14px;
border: 3px solid ${props => props.theme.colors.main};
color: ${props => props.theme.colors.main};
border-radius: 25%;
font-size: 1.2rem;
cursor: pointer;

&:hover {
    border: 3px solid ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.secondary};
}
}

h2 {
    padding: 0 20px;
    font-size: 2.5rem;
    color: ${props => props.theme.colors.secondary};
    font-weight: bold;
    letter-spacing: .1rem;
    font-family: 'Nunito', sans-serif;
}


input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
`

export default GlobalStyle