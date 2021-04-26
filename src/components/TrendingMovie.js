import React from 'react'
import styled from 'styled-components'

function TrendingMovie(props) {
    return (
        <Wrap>
            {props.data.map(movie => (
                <Section key={movie.id}>
                    <h4>{movie.title}</h4>
                    <Image src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} />
                    <h4>Rating: {movie.vote_average}</h4>
                    <p>{movie.overview}</p>

                </Section>
            ))}
        </Wrap>
    )
}

const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 30vw;
text-align: center;
padding: 60px 30px;
`
const Image = styled.img`
height: 350px;
width: 250px;
margin: 20px 0;
border: 5px solid #CDCCCC;
border-radius: 15px;
`
const Wrap = styled.div`
display: flex;
overflow-x: auto;
&::-webkit-scrollbar {
    width: 0;
}
`

export default TrendingMovie
