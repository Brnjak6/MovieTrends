import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import TrendingMovie from './TrendingMovie'
const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_MOVIE_KEY}`;

function Trending() {
    const [trendingMovies, setTrendingMovies] = useState(null);
    const [loading, setLoading] = useState(true)

    const fetchTrending = async () => {
        setLoading(true);

        try {
            const request = await axios.get(url).then(data => data.data.results);
            setLoading(false)
            setTrendingMovies(request)

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTrending()
    }, [])

    if (loading) {
        return (
            <h2>Loading</h2>
        )
    }
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
position: relative;
margin-top: 40px;
font-size: 2.5rem;
letter-spacing: .2rem;
margin: auto;
width: fit-content;

&::before {
content: "";
display: block;
width: 20rem;
height: 2px;
background: #AA8500;
position: absolute;
left: 100%;
top: 50%;
 }

 &::after {
content: "";
display: block;
width: 20rem;
height: 2px;
background: #AA8500;
position: absolute;
right: 100%;
top: 50%;
 }
`



export default Trending
