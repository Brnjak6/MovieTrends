import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import TopRatedMovie from './TopRatedMovie'
const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`

function TopRated() {
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [loading, setLoading] = useState(true)


    const fetchTopRated = async () => {
        setLoading(true);

        try {
            const request = await axios.get(url).then(data => data.data.results);
            setLoading(false)
            setTopRatedMovies(request)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTopRated()
    }, [])

    return (
        <div>
            <Header>TOP RATED</Header>
            <div>
                {topRatedMovies && <TopRatedMovie data={topRatedMovies} />}
            </div>

        </div>
    )
}
const Header = styled.h2`
display: flex;
justify-content: center;
margin-top: 40px;
font-size: 2.5rem;
letter-spacing: .2rem;
width: fit-content;
margin: auto;

 &::before,
        &::after {
            content: "";
            height: 1px;
            display: block;
            background-color: red;
        }
`

export default TopRated
