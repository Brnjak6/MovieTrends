import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import searchSvg from '../img/search.svg'
import { InputSearchContext } from '../components/InputSearchContext'
import { Link } from 'react-router-dom'
function Navigation() {
    const [inputMovie, setInputMovie] = useState('');
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

    const returnToMain = () => {
        setInputData('');
    }

    return (
        <Section>
            <Logo to="/" onClick={returnToMain}>MV</Logo>
            <Search>
                <Input value={inputMovie} onChange={inputHandler} type="search" placeholder="Search" />
                <Svg src={searchSvg} onClick={handleInputSearch} />
            </Search>
            <Link to="/favorites">Favorites</Link>
        </Section >
    )
}

const Logo = styled(Link)`
font-size: 3rem;
letter-spacing: .4rem;
font-family: 'Nunito', cursive;
text-decoration: none;
color: ${props => props.theme.colors.secondary};
`

const Section = styled.section`
display: flex;
align-items: center;
margin-bottom: 4rem;
height: 10vh;
background: #262626;
box-shadow: 0px 4px 10px -2px #000000;

h2 {
    cursor: pointer;
}
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
caret-color: ${props => props.theme.colors.main};
color: inherit;
font-size: 1.2rem;
  background: inherit;
   padding: .7rem;
    width: 20vw;
    outline: none;
    border: 2px solid ${props => props.theme.colors.secondary};
    border-radius: 15%;
`


export default Navigation
