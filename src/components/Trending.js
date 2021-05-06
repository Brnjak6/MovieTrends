import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { BounceLoader } from 'react-spinners'
import TrendingMovie from './TrendingMovie'
const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_MOVIE_KEY}`;


const Trending = () => {
    const [trendingMovies, setTrendingMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const fetchTrending = async () => {
        setIsLoading(true);

        try {
            const request = await axios.get(url).then(data => data.data.results);
            setTrendingMovies(request)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            setIsError(true)
        }
    }
    useEffect(() => {
        fetchTrending()
    }, [])

    if (isLoading) {
        return (
            <Load>
                <BounceLoader color='#AA8500' />
            </Load>
        )

    } else if (isError) {
        return (
            <Header>There was a problem with network</Header>
        )
    } else {
        return (<Container>
            { trendingMovies && <TrendingMovie data={trendingMovies} />}
        </Container>
        )
    }

}

const Container = styled.div`
margin-top: 10rem;

@media only screen and (max-width: 550px) {
    margin-top: 5rem;
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
font-family: 'Nunito', sans-serif;
`

const Load = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
align-self: center;
`

export default Trending
