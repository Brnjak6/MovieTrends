import React, { useState } from 'react'
import styled from 'styled-components'
import Carousel from 'react-elastic-carousel'
import Modal from './Modal'
import { Link } from 'react-router-dom'
import './RatingColors.css'


function TopRatedMovie(props) {

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 400, itemsToShow: 2 },
        { width: 700, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
        { width: 1500, itemsToShow: 6 },
    ]

    const [activeMovie, setActiveMovie] = useState(null);
    const [isModalOpened, setIsModalOpened] = useState(false);

    const openModal = () => {
        setIsModalOpened(true);
    };

    const closeModal = () => {
        setIsModalOpened(false);
    };

    const RatingValue = (value) => {
        if (value < 6.5) {
            return "red";
        } else if (value < 8) {
            return "default";
        } else {
            return "blue"
        }
    }


    return (
        <>
            <Header>TOP RATED</Header>
            <Slider style={{ display: "flex" }} breakPoints={breakPoints} >
                {props.data.map(movie => (
                    <Item key={movie.id}>
                        <h4>{movie.title.length < 31 ? movie.title : movie.title.substring(0, 29) + '...'}</h4>
                        <Image src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} onClick={() => {
                            setActiveMovie(movie)
                            openModal()
                        }
                        }
                        />

                        <h4>Rating: <span className={`rating ${RatingValue(movie.vote_average)}`}>{movie.vote_average}</span></h4>
                    </Item>
                ))}
            </Slider>
            <Button to="/top_rated">Discover More</Button>
            <div>
                {isModalOpened && <Modal closeModal={closeModal} activeMovie={activeMovie} />}
            </div>
        </>
    )
}


const Button = styled(Link)`
display: flex;
justify-content: center;
align-items: center;
margin: auto;
margin-bottom: 7rem;
outline: none;
border: none;
font-family: inherit;
background: rgba(0, 0, 0, 1);
padding: 5px 14px;
border: 3px solid ${props => props.theme.colors.main};
color: #DEDEDE;
border-radius: 25%;
width: fit-content;
font-size: 1.2rem;
cursor: pointer;
text-decoration: none;
transition: .2s all;

&:active {
    transform: translateY(3px)
}
`

const Slider = styled(Carousel)`
.rec.rec-arrow {
    height: 20vh;
    border-radius: 0;
    background-color: ${props => props.theme.colors.secondary} !important;
    opacity: .3;
}

@media only screen and (max-width: 700px) {
    .rec .rec-arrow {
        height: 15rem;

    }
}


.rec.rec-arrow:hover {
    opacity: 1;
    background: ${props => props.theme.colors.secondary} !important;
}

.rec.rec-arrow:focus {
    opacity: 1;
    background-color: ${props => props.theme.colors.secondary} !important;
}

.rec.rec-dot {
    display: none;
}

.rec.rec-arrow:disabled {
    visibility: hidden;
}

.rec-carousel-item:focus {
    outline: none;
    box-shadow: inset 0 0 1px 1px lightgrey;
}

`

const Item = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 30vw;
text-align: center;
padding: 60px 30px;
&:hover {
       color: ${props => props.theme.colors.secondary};
}

h4 {
    height: 55px;
     font-size: 1.2rem;
    letter-spacing: .2rem;
    font-weight: lighter;

    @media only screen and (max-width: 800px) {
        font-size: 1rem;
    }
}
`
const Image = styled.img`
height: 15rem;
width: 10rem;
margin-top: 2.5rem;
margin-bottom: 1rem;
border: 3px solid ${props => props.theme.colors.main};
border-radius: 15px;
cursor: pointer;
&:hover {
    border: 4px solid ${props => props.theme.colors.secondary};
    box-shadow: 0px 0px 5px 2px ${props => props.theme.colors.secondary};
}


`
const Header = styled.h2`
position: relative;
display: flex;
justify-content: center;
font-size: 2.5rem;
letter-spacing: .2rem;
width: fit-content;
margin: auto;
font-family: sans-serif, cursive;

 &::before {
content: "";
display: block;
width: 13rem;
height: 2px;
background: ${props => props.theme.colors.secondary};
position: absolute;
left: 100%;
top: 50%;
 }

 &::after {
content: "";
display: block;
width: 13rem;
height: 2px;
background: ${props => props.theme.colors.secondary};
position: absolute;
right: 100%;
top: 50%;
 }

 @media only screen and (max-width: 800px) {
font-size: 1.8rem;
 &::before {
width: 4rem;
 }
 &::after {
width: 4rem;
 }
}
 @media only screen and (max-width: 600px) {
font-size: 1.8rem;
 &::before {
width: 0rem;
 }
 &::after {
width: 0rem;
 }
}
`

export default TopRatedMovie
