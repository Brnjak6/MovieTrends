import React, { useState, useContext, useEffect } from 'react'
import { FavoritesContext } from '../components/FavoritesContext';
import styled from 'styled-components'
import '../components/RatingColors.css'
import Modal from '../components/Modal'
import { BounceLoader } from 'react-spinners'
import axios from 'axios'
import '../components/RatingColors.css'

function TopRatedPage() {
    const [activeMovie, setActiveMovie] = useState(null);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [page, setPage] = useState(2)
    const url = (`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&page=${page}`);

    const fetchMovies = async () => {
        setIsLoading(true);

        try {
            const request = await axios.get(url).then(data => data.data.results);
            setTopRatedMovies(request)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            setIsError(true)
        }
    }
    useEffect(() => {
        fetchMovies()
    }, [url])

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



    const nextPage = () => {
        if (page === 6) {
            return;
        }
        setPage(page + 1)
        window.scroll({ top: 0, behavior: 'smooth' })
    }

    const prevPage = () => {
        if (page === 2) {
            return;
        }
        setPage(page - 1)
        window.scroll({ top: 0, behavior: 'smooth' })
    }

    if (isLoading) {
        return (
            <Load>
                <BounceLoader color='#AA8500' />
            </Load>
        )

    } else if (isError) {
        return (
            <Alert>There was a problem with network...</Alert>
        )
    } else {
        return (
            <Container>
                <Alert>Top rated movies of all time</Alert>
                <Fav>
                    {topRatedMovies?.map(movie => (
                        <Section key={movie.id}>
                            <h4>{movie.title.length > 45 ? movie.title.substring(0, 45) + '...' : movie.title}</h4>
                            <Image src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} onClick={() => {
                                setActiveMovie(movie)
                                openModal()
                            }} />
                            <h4>Rating: <span className={`rating ${ratingColor(movie.vote_average)}`}>{movie.vote_average}</span> </h4>
                        </Section>
                    ))}
                    <div>
                        {isModalOpened && <Modal closeModal={closeModal} activeMovie={activeMovie} />}
                    </div>
                </Fav>
                <Pages>
                    <button className={page < 3 ? 'page_end' : null} onClick={prevPage}>Previous</button>
                    <Number>{page - 1}</Number>
                    <button className={page > 7 ? 'page_end' : null} onClick={nextPage}>Next page</button>
                </Pages>
            </Container>
        )
    }
}

const Load = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
align-self: center;
`

const Alert = styled.h2`
text-align: center;
font-weight: lighter;
font-size: 3rem;
letter-spacing: .3rem;
margin-top: 8rem;

@media only screen and (max-width: 930px) {
     font-size: 2rem;
 }
@media only screen and (max-width: 600px) {
     font-size: 1.6rem;
 }
`

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`

const Fav = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`

const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 18rem;
text-align: center;
padding: 60px 0px;

@media only screen and (max-width: 930px) {
    width: 14rem;
 }

h4 {
    height: 55px;
    font-size: 1.2rem;
    font-weight: lighter;
    letter-spacing: .2rem;
}
`
const Image = styled.img`
height: 18rem;
width: 12rem;
margin: 30px 0;
border: 3px solid #CDCCCC;
border-radius: 15px;
cursor: pointer;

&:hover {
    box-shadow: 0px 0px 5px 2px ${props => props.theme.colors.secondary};
    border: 3px solid ${props => props.theme.colors.secondary};
}

@media only screen and (max-width: 930px) {
    height: 13rem;
    width: 9rem;
 }
`
const Pages = styled.div`
display: flex;
margin-bottom: 2rem;
`
const Number = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 1.7rem;
margin: 0 1rem;
`



export default TopRatedPage
