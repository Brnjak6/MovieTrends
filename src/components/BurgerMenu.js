import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeButton from '../components/ThemeButton'

function BurgerMenu({ theme, isBurgerOpen, setIsBurgerOpen }) {
    return (
        <Menu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: .5,
                ease: "easeInOut",
            }}
        >
            <List>
                <Li to="/" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>Home</Li>
                <Li to="/trending" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>Trending</Li>
                <Li to="/top_rated" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>Top Rated</Li>
                <Li to="/favorites" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>Favorites</Li>
            </List>
            <ThemeButton theme={theme} />
        </Menu>
    )
}

const Menu = styled(motion.div)`
z-index: 750;
width: 100%;
height: 100%;
position: fixed;
background: ${props => props.theme.colors.background};
color: ${props => props.theme.colors.secondary};
display: flex; 
justify-content: center;
flex-direction: column;
align-items: center;
`

const List = styled.ul`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding-bottom: 4rem;
`
const Li = styled(Link)`
text-decoration: none;
font-size: 2rem;
color: ${props => props.theme.colors.secondary};
 background-image: linear-gradient(120deg, transparent 0%, transparent 50%, ${props => props.theme.colors.secondary} 50%);
background-size: 250%;
border-radius: 5px;
color: ${props => props.theme.colors.secondary};
transition: all .4s;
margin: 2rem 0;


&:hover,
&:active {
    background-position: 100%;
    color: ${props => props.theme.colors.main};
}

&:active {
    transform: translateY(3px)
}

@media only screen and (max-width: 450px) {
        font-size: 1.5rem;
}

`

export default BurgerMenu
