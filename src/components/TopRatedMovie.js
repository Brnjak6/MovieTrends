import React, { useState } from 'react'
import styled from 'styled-components'
import Carousel from 'react-elastic-carousel'
import Modal from './Modal'
import './Carousel.css'
import './RatingColors.css'


function TopRatedMovie(props) {

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 700, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
        { width: 1500, itemsToShow: 5 },
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
            <Carousel style={{ display: "flex" }} breakPoints={breakPoints} >
                {props.data.map(movie => (
                    <Item key={movie.id}>
                        <h4>{movie.title}</h4>
                        <Image src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} onClick={() => {
                            setActiveMovie(movie)
                            openModal()
                        }
                        }
                        />

                        <h4>Rating: <span className={`rating ${RatingValue(movie.vote_average)}`}>{movie.vote_average}</span></h4>
                    </Item>
                ))}
            </Carousel>
            <div>
                {isModalOpened && <Modal closeModal={closeModal} activeMovie={activeMovie} />}
            </div>
        </>
    )
}

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
}
`
const Image = styled.img`
height: 300px;
width: 200px;
margin: 20px 0;
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
font-family: 'Nunito', sans-serif;

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
