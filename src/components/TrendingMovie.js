import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Carousel from 'react-elastic-carousel'
import './Carousel.css'
import './RatingColors.css'
import Modal from './Modal'
const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`


function TrendingMovie(props) {
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
            <Carousel style={{ display: "flex" }} breakPoints={breakPoints}>
                {props.data.map(movie => (
                    <Section key={movie.id}>
                        <h4>{movie.title}</h4>
                        <Image src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} onClick={() => {
                            setActiveMovie(movie)
                            openModal()
                        }}
                        />
                        <h4>Rating: <span className={`rating ${ratingColor(movie.vote_average)}`}>{movie.vote_average}</span> </h4>
                    </Section>
                ))}
            </Carousel>

            <div>
                {isModalOpened && <Modal closeModal={closeModal} activeMovie={activeMovie} />}
            </div>
        </>
    )
}



const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 30vw;
text-align: center;
padding: 60px 0px;
&:hover {
       color: #AA8500;
}
h4 {
    height: 55px;
    font-size: 1.3rem;
    letter-spacing: .2rem;
}
`
const Image = styled.img`
height: 350px;
width: 250px;
margin: 20px 0;
border: 4px solid #CDCCCC;
border-radius: 15px;
cursor: pointer;

&:hover {
    border: 7px solid #AA8500;
}
`
const Wrap = styled.div`
display: flex;
overflow-x: auto;
&::-webkit-scrollbar {
    width: 0;
}
`

export default TrendingMovie
