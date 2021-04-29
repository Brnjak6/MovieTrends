import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { BounceLoader } from 'react-spinners'
import TrendingMovie from './TrendingMovie'
const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_MOVIE_KEY}`;

function Trending() {
    const [trendingMovies, setTrendingMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchTrending = async () => {
        setIsLoading(true);

        try {
            const request = await axios.get(url).then(data => data.data.results);
            setTrendingMovies(request)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTrending()
    }, [])

    return (
        <>
            {isLoading ? (
                <Load>
                    <BounceLoader color='#AA8500' />
                </Load>
            ) : (
                <div>
                    <Header>TRENDING</Header>
                    <div>
                        {trendingMovies && <TrendingMovie data={trendingMovies} />}
                    </div>

                </div >
            )}
        </>
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
width: 15rem;
height: 2px;
background: #AA8500;
position: absolute;
left: 100%;
top: 50%;
 }

 &::after {
content: "";
display: block;
width: 15rem;
height: 2px;
background: #AA8500;
position: absolute;
right: 100%;
top: 50%;
 }

  @media only screen and (max-width: 800px) {
font-size: 1.8rem;
 &::before {
width: 5rem;
 }
 &::after {
width: 5rem;
 }
}
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
