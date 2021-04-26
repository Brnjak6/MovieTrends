import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import TrendingMovie from './TrendingMovie'

function Trending() {
    const [trendingMovies, setTrendingMovies] = useState(null);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_MOVIE_KEY}`)
            .then(data => {
                setTrendingMovies(data.data.results)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <Header>TRENDING</Header>
            {trendingMovies && <TrendingMovie data={trendingMovies} />}
        </div>
    )
}

const Header = styled.h2`
display: flex;
justify-content: center;
margin-top: 40px;
font-size: 5rem;
letter-spacing: .5rem;
`



export default Trending
