import React, { useState } from 'react'
import styled from 'styled-components'
import Carousel from 'react-elastic-carousel'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import './RatingColors.css'


function TrendingMovie(props) {
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

    const ratingColor = (rating) => {
        if (rating < 6.5) {
            return "red";
        } else if (rating < 8) {
            return "default";
        } else {
            return "blue"
        }
    }

    return (
        <>
            <Header>TRENDING</Header>
            <Slider style={{ display: "flex" }} breakPoints={breakPoints}>
                {props.data.map(movie => (
                    <Section key={movie.id}>
                        <h4>{movie.title.length < 31 ? movie.title : movie.title.substring(0, 30) + '...'}</h4>
                        <Image src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} onClick={() => {
                            setActiveMovie(movie)
                            openModal()
                        }}
                        />
                        <h4>Rating: <span className={`rating ${ratingColor(movie.vote_average)}`}>{movie.vote_average}</span> </h4>
                    </Section>
                ))}
            </Slider>
            <Button to="/trending">Discover More</Button>
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
color: ${props => props.theme.colors.secondary};
border-radius: 25%;
width: fit-content;
font-size: 1.2rem;
cursor: pointer;
text-decoration: none;
transition: .2s all;

&:active {
    transform: translateY(3px)
}

&:hover {
    border: 3px solid ${props => props.theme.colors.secondary};
color: ${props => props.theme.colors.secondary};
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


const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 30vw;
text-align: center;
padding: 60px 0px;
&:hover {
       color: ${props => props.theme.colors.secondary};
}
h4 {
    height: 55px;
    font-size: 1.2rem;
    font-weight: lighter;
    letter-spacing: .2rem;

@media only screen and (max-width: 490px) {
     font-size: 1.1rem;
     width: 60vw;
 }
    
}
`
const Image = styled.img`
height: 15rem;
width: 10rem;
margin: 20px 0;
border: 3px solid #CDCCCC;
border-radius: 15px;
cursor: pointer;

 @media only screen and (max-width: 930px) {
     margin: 25px 0;
 }

&:hover {
    box-shadow: 0px 0px 4px 2px ${props => props.theme.colors.secondary};
    border: 3px solid ${props => props.theme.colors.secondary};
}
`

const Header = styled.h2`
display: flex;
justify-content: center;
position: relative;
margin-top: 40px;
font-size: 2.5rem;
letter-spacing: .2rem;
margin: auto;
width: fit-content;
font-family: 'Nunito', cursive;

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

export default TrendingMovie
