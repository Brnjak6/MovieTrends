import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import searchSvg from '../img/search.svg'
import { InputSearchContext } from '../components/InputSearchContext'


function Navigation() {
    const [inputMovie, setInputMovie] = useState('');
    const [inputSearch, setInputSearch] = useState('')
    const [inputData, setInputData] = useContext(InputSearchContext)
    const InputUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${inputMovie}&page=1`;

    const inputHandler = (e) => {
        setInputMovie(e.target.value)
    }



    const handleInputSearch = () => {
        fetch(InputUrl)
            .then(res => res.json())
            .then(data => {
                setInputData(data.results)
            })
    }

    return (
        <Section>
            <h2>Movieverse</h2>
            <Search>
                <Input value={inputMovie} onChange={inputHandler} type="search" placeholder="Search" />
                <Svg src={searchSvg} onClick={handleInputSearch} />
            </Search>
            <h2></h2>
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
const Search = styled.form`
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
