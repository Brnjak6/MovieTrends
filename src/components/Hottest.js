import React, { useContext, useEffect, useState } from 'react'
import { HottestContext } from './HottestContext'
import YoutubeVideo from './YoutubeVideo'
import styled from 'styled-components'

function Hottest() {
    const [popularMovie, setPopularMovie] = useState(null)
    const { video, reviews } = useContext(HottestContext)
    const [videoValue, setVideoValue] = video
    const [reviewsValue, setReviewsValue] = reviews
    const urlPopular = (`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`)
    const urlVideo = (`https://api.themoviedb.org/3/movie/${popularMovie?.id}/videos?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`)
    const urlReviews = `https://api.themoviedb.org/3/movie/${popularMovie?.id}/reviews?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`

    useEffect(() => {
        fetch(urlPopular)
            .then(res => res.json())
            .then(data => setPopularMovie(data.results[1]))
    }, [urlPopular])

    useEffect(() => {
        if (!popularMovie) {
            return;
        } else {
            fetch(urlVideo)
                .then(res => res.json())
                .then(data => setVideoValue(data.results[0].key))
        }
    }, [popularMovie])

    useEffect(() => {
        if (!popularMovie) {
            return;
        } else {
            fetch(urlReviews)
                .then(res => res.json())
                .then(data => setReviewsValue(data.results.splice(0, 3)))
        }
    }, [popularMovie])

    const openTab = (url) => {
        window.open(url)
    }

    return (

        videoValue && <>
            <Container>
                <TitleBG>
                    <Title>{popularMovie?.title} - the most popular movie recently</Title>
                </TitleBG>
                <YoutubeVideo embedId={videoValue} />


                <TitleRevs>Popular reviews</TitleRevs>
                <Reviews>
                    {reviewsValue?.map(rev => (
                        <Review key={rev.id}>
                            <h4><Color>Author:</Color> {rev.author}</h4>
                            <Content>{rev.content.substring(0, 300)}... full review <Here onClick={() => openTab(rev.url)}>here</Here></Content>
                            <p><Color>Added on:</Color> {rev.created_at.substring(0, 10)}</p>
                        </Review>
                    ))}
                </Reviews>
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
margin-top: 10rem;
`
const TitleBG = styled.div`
background: ${props => props.theme.colors.secondary};
padding: .3rem 2.2rem;
clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
margin-bottom: 2rem;
text-align: center;
`

const Title = styled.h3`
font-size: 2rem;
font-weight: lighter;
color: ${props => props.theme.colors.main};

 @media only screen and (max-width: 930px) {
    font-size: 1.6rem;
    width: 70vw;
}
 @media only screen and (max-width: 700px) {
    font-size: 1.4rem;
}
`
const Reviews = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;

h4 {
    font-weight: lighter;
}

p {
    font-weight: lighter;
}
`

const Review = styled.div`
width: 25rem;
margin: 1rem 1rem;
font-size: 1.2rem;

 @media only screen and (max-width: 700px) {
    font-size: 1.1rem;
}
 @media only screen and (max-width: 500px) {
    width: 80vw;
}
`

const Content = styled.div`
margin: 2rem 0;
`
const Color = styled.span`
color: ${props => props.theme.colors.secondary};
`
const Here = styled(Color)`
cursor: pointer;
`

const TitleRevs = styled.h3`
font-size: 1.7rem;
margin: 3rem 0;
`

export default Hottest
