import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import TopRatedMovie from './TopRatedMovie'
import { BounceLoader } from 'react-spinners'
const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`

function TopRated() {
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const fetchTopRated = async () => {
        setLoading(true);

        try {
            const request = await axios.get(url).then(data => data.data.results);
            setLoading(false)
            setTopRatedMovies(request)

        } catch (error) {
            setLoading(false)
            setIsError(true)
        }
    }
    useEffect(() => {
        fetchTopRated()
    }, [])


    if (loading) {
        return (
            <Load>
                <BounceLoader color='#AA8500' />
            </Load>
        )

    } else if (isError) {
        return (
            <Header>There was a problem with network</Header>
        )
    } else
        return (<>
            { topRatedMovies && <TopRatedMovie data={topRatedMovies} />}
        </>
        )
}


const Header = styled.h2`
position: relative;
display: flex;
justify-content: center;
font-size: 2.5rem;
letter-spacing: .2rem;
width: fit-content;
margin: auto;
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


export default TopRated
