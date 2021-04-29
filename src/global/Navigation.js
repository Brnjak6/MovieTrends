import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import searchSvg from '../img/search.svg'

function Navigation() {
    const [input, setInput] = useState("")
    const [searchedMovie, setSearchedMovie] = useState(null)

    const movieInput = (e) => {
        setInput(e.target.value)
    }

    const searchMovie = () => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${input}&page=1`)
            .then(data => setSearchedMovie(data.data.results[1].title))
    }

    return (
        <Section>
            <h2>Movieverse</h2>
            <Search>
                <Input onChange={movieInput} type="search" placeholder="Search a movie" />
                <Svg src={searchSvg} onClick={searchMovie} />
            </Search>
        </Section>
    )
}

const Section = styled.section`
display: flex;
align-items: center;
margin-bottom: 4rem;
height: 10vh;
background: #262626;
box-shadow: 0px 4px 10px -2px #000000;
`
const Search = styled.div`
display: flex;
width: 22vw;
margin-left: 40px;
position: relative;
`
const Svg = styled.img`
cursor: pointer;
position: absolute;
top: 28%;
right: 15%;
`
const Input = styled.input`
caret-color: #CDCCCC;
color: inherit;
font-size: 1rem;
`


export default Navigation
