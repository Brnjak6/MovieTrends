import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { ReactComponent as Search } from '../img/search.svg'
import { ReactComponent as PopCorn } from '../img/popcorn.svg'
import { InputSearchContext } from '../components/InputSearchContext'
import { HottestContext } from '../components/HottestContext'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import ThemeSwitcher from '../components/ThemeSwitcher'

function Navigation() {
    const [inputMovie, setInputMovie] = useState('');
    const [inputData, setInputData] = useContext(InputSearchContext);
    const { video, reviews } = useContext(HottestContext)
    const [videoValue, setVideoValue] = video
    const [reviewsValue, setReviewsValue] = reviews
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
        // setVideoValue(null)
        // setReviewsValue(null)
    }

    const returnToMain = () => {
        setInputData('');
        setInputMovie('')
    }

    return (
        <Container>
            <Section>
                <Logo to="/" onClick={returnToMain}>
                    F<PopCornSvg />V
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
                <ThemeSwitcher />
            </Nav>
        </Container >
    )
}

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
`

const Section = styled.div`
display: flex;
align-items: center;
margin-left: 3%;
`

const Container = styled.section`
display: flex;
justify-content: space-between;
margin-bottom: 4rem;
height: 10vh;
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
`

const SearchForm = styled.form`
display: flex;
width: 22vw;
margin-left: 40px;
position: relative;
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

const Nav = styled.ul`
display: flex;
justify-content: center;
align-items: center;
justify-self: flex-end;
margin-right: 3%;
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
