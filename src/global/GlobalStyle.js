import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    min-height: 100vh;
    background: linear-gradient(to bottom, #1C1C1C, #000);
    font-family: 'Nunito', sans-serif;
    color: #CDCCCC;
    overflow-x: hidden;
}

h1 {
    font-size: 3rem;
    font-weight: lighter;
    letter-spacing: .2rem;
}

input {
    background: inherit;
    border: 2px solid #AA8500;
    border-radius: 20px; 
    padding: .7rem;
    width: 20vw;
    outline: none;

}

h2 {
    padding: 0 20px;
    font-size: 2.5rem;
    color: #AA8500;
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