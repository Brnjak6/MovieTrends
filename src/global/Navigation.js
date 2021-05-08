import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { ReactComponent as Search } from '../img/search.svg'
import { ReactComponent as PopCorn } from '../img/popcorn.svg'
import { InputSearchContext } from '../components/InputSearchContext'
import { Link, useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import BurgerMenu from '../components/BurgerMenu'
import { motion } from 'framer-motion'
import Switch from '@material-ui/core/Switch'
import './Switcher.css'

function Navigation({ theme }) {
    const { pathname } = useLocation()
    const [inputMovie, setInputMovie] = useState('');
    const [inputData, setInputData] = useContext(InputSearchContext);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false)
    const [state, setState] = useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked, });
    };

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
        window.scroll({ top: 0, behavior: 'smooth' })
    }

    return (
        <Container>
            <Section>
                <Logo to="/" onClick={returnToMain} >
                    <PopCornSvg />FV
                </Logo>
                <SearchForm onSubmit={handleInputSearch}>
                    <Input value={inputMovie} onChange={inputHandler} type="search" placeholder="Search" />
                    <SearchBtn onClick={handleInputSearch} />
                </SearchForm>
            </Section>

            <Nav>
                <li>
                    <Li to="/">Home</Li>
                    <Line transition={{ duration: .7 }} initial={{ width: '0%' }} animate={{ width: pathname === '/' ? '70%' : '0%' }} />
                </li>
                <li>
                    <Li to="/trending">Trending</Li>
                    <Line transition={{ duration: .7 }} initial={{ width: '0%' }} animate={{ width: pathname === '/trending' ? '65%' : '0%' }} />
                </li>
                <li>
                    <Li to="/top_rated">Top Rated</Li>
                    <Line transition={{ duration: .7 }} initial={{ width: '0%' }} animate={{ width: pathname === '/top_rated' ? '65%' : '0%' }} />
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Li to="/favorites">Favorites</Li>
                    <Line transition={{ duration: .7 }} initial={{ width: '0%' }} animate={{ width: pathname === '/favorites' ? '65%' : '0%' }} />
                </li>

                <Switch
                    checked={state.checkedA}
                    onChange={handleChange}
                    onClick={theme}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }} />

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

const Container = styled(motion.div)`
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

const BurgerBox = styled.div`
display: flex;
align-items: center;
justify-content: center;
z-index: 800;

@media only screen and (min-width: 1100px) {
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
const Line = styled(motion.div)`
height: .2rem;
background: ${props => props.theme.colors.secondary};
width: 0%;
left: 29%;
bottom: -20%;
position: absolute;
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

const Logo = styled(Link)`
font-size: 3rem;
letter-spacing: .4rem;
font-family: sans-serif, cursive;
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

@media only screen and (max-width: 1100px) {
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

    @media only screen and (max-width: 1100px) {
    padding: .6rem;
    width: 41vw;
}
    @media only screen and (max-width: 420px) {
    width: 51vw;
    padding: .5rem
}
    @media only screen and (max-width: 375px) {
    width: 51vw;
    padding: .5rem;
    font-size: .9rem;
}
`

const Nav = styled.ul`
display: flex;
justify-content: center;
align-items: center;
justify-self: flex-end;
margin-right: 3%;

li {
    list-style-type: none;
    position: relative;
}

@media only screen and (max-width: 1100px) {
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
position: relative;

&:active {
    transform: translateY(3px)
}

&:hover {
    opacity: 1;
}
`


export default Navigation
