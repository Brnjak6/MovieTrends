import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { ReactComponent as Search } from '../img/search.svg'
import { ReactComponent as PopCorn } from '../img/popcorn.svg'
import { InputSearchContext } from '../components/InputSearchContext'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import ThemeButton from '../components/ThemeButton'
import BurgerMenu from '../components/BurgerMenu'

function Navigation({ theme }) {
    const [inputMovie, setInputMovie] = useState('');
    const [inputData, setInputData] = useContext(InputSearchContext);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false)

    const InputUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${inputMovie}&page=1`;

    const inputHandler = (e) => {
        setInputMovie(e.target.value)
    }

    let history = useHistory();

    const handleInputSearch = (e) => {
        e.preventDefault()
        if (inputMovie.length === 0) {
            return alert('Imput should not be empty')
        }
        fetch(InputUrl)
            .then(res => res.json())
            .then(data => {
                setInputData(data.results)
            })
        history.push('/search')
    }

    const returnToMain = () => {
        setInputData('');
        setInputMovie('')
    }

    return (
        <Container>
            <Section>
                <Logo to="/" onClick={returnToMain}>
                    <PopCornSvg />FV
                </Logo>
                <SearchForm onSubmit={handleInputSearch}>
                    <Input value={inputMovie} onChange={inputHandler} type="search" placeholder="Search" />
                    <SearchBtn onClick={handleInputSearch} />
                </SearchForm>
            </Section>

            <Nav>
                <Li to="/trending">Trending</Li>
                <Li to="/top_rated">Top Rated</Li>
                <Li to="/favorites">Favorites</Li>
                <ThemeButton theme={theme} />
            </Nav>
            <BurgerBox >
                <Burger onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
                    <BurgerLines />
                </Burger>
            </BurgerBox>
            {isBurgerOpen && <BurgerMenu theme={theme} setIsBurgerOpen={setIsBurgerOpen} isBurgerOpen={isBurgerOpen} />}
        </Container >
    )
}

const BurgerBox = styled.div`
display: flex;
align-items: center;
justify-content: center;
z-index: 800;

@media only screen and (min-width: 930px) {
    display: none;
}
`

const Burger = styled.div`
 position: relative;
    height: 50px;
    width: 55px;
    padding-top: 23px;
    box-sizing: border-box;
    cursor: pointer;
    transition: .2s all;

    &:active {
    transform: rotate(-45deg);
}
`

const BurgerLines = styled.div`
   width: 50%;
    height: 2.5px;
    border-radius: 5px;
    display: block;
    background-color: ${props => props.theme.colors.secondary};
    transition-duration: 250ms;
    position: absolute;

    &::before,
    &::after {
    content: '';
    width: 100%;
    height: 2.5px;
    border-radius: 5px;
    display: block;
    background-color: ${props => props.theme.colors.secondary};
    position: absolute;
    transition: 200ms;
    }

    &::before {
    top: -8px;
    }

    &::after {
        top: 8px;
    }
`

const PopCornSvg = styled(PopCorn)`
width: 1.7rem;
height: 1.7rem;
fill: ${props => props.theme.colors.secondary};
`

const SearchBtn = styled(Search)`
width: 1.5rem;
height: 1.5rem;
fill: ${props => props.theme.colors.secondary};
position: absolute;
top: 23%;
right: 13%;
cursor: pointer;

@media only screen and (max-width: 930px) {
    width: 1.3rem;
    height: 1.3rem;
}
`

const Section = styled.div`
display: flex;
align-items: center;
margin-left: 3%;
`

const Container = styled.section`
display: flex;
position: fixed;
justify-content: space-between;
margin-bottom: 4rem;
height: 8vh;
top: 0%;
width: 100%;
z-index: 100;
background: ${props => props.theme.colors.navigation};
box-shadow: 0px 4px 10px -4px ${props => props.theme.colors.secondary};

h2 {
    cursor: pointer;
}
`
const Logo = styled(Link)`
font-size: 3rem;
letter-spacing: .4rem;
font-family: 'Nunito', cursive;
text-decoration: none;
color: ${props => props.theme.colors.secondary};

@media only screen and (max-width: 930px) {
    font-size: 1.7rem;
}
@media only screen and (max-width: 350px) {
    display: none;
}
`

const SearchForm = styled.form`
display: flex;
width: 22vw;
margin-left: 40px;
position: relative;

@media only screen and (max-width: 930px) {
    width: 45vw;
}
@media only screen and (max-width: 400px) {
    width: 55vw;
    margin-left: .6rem;
}
`

const Input = styled.input`
caret-color: ${props => props.theme.colors.main};
color: inherit;
font-size: 1rem;
  background: inherit;
   padding: .7rem;
    width: 20vw;
    outline: none;
    border: 2px solid ${props => props.theme.colors.secondary};
    border-radius: 15%;

    @media only screen and (max-width: 930px) {
    padding: .5rem;
    width: 41vw;
}
    @media only screen and (max-width: 400px) {
    width: 51vw;
}
`

const Nav = styled.ul`
display: flex;
justify-content: center;
align-items: center;
justify-self: flex-end;
margin-right: 3%;

@media only screen and (max-width: 930px) {
    display: none;
}
`

const Li = styled(Link)`
text-decoration: none;
color: ${props => props.theme.colors.secondary};
font-size: 1.6rem;
transition: .2s all;
opacity: .9;
margin-left: 1.7rem;

&:active {
    transform: translateY(3px)
}

&:hover {
    opacity: 1;
}
`


export default Navigation
