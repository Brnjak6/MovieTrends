import React, { useState, useContext } from 'react'
import { FavoritesContext } from '../components/FavoritesContext';
import styled from 'styled-components'
import '../components/RatingColors.css'
import Modal from '../components/Modal'

function Favorites() {
    const [favorites, setFavorites] = useContext(FavoritesContext);
    const [activeMovie, setActiveMovie] = useState(null);
    const [isModalOpened, setIsModalOpened] = useState(false);

    const openModal = () => {
        setIsModalOpened(true);
    };

    const closeModal = () => {
        setIsModalOpened(false);
    };

    const handleRemove = (id) => {
        const NewList = favorites.filter(movie => id !== movie.id)
        setFavorites(NewList)
    }

    {
        if (favorites.length < 1) {
            return (
                <Alert>No Favorites, yet...</Alert>
            )
        } else {
            return (
                <Container>
                    <Alert>Your Favorites</Alert>
                    <Fav>
                        {favorites.map(movie => (
                            <Section key={movie.id}>
                                <h4>{movie.title}</h4>
                                <Image src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} onClick={() => {
                                    setActiveMovie(movie)
                                    openModal()
                                }} />
                                <Remove onClick={(e) => {
                                    handleRemove(movie.id)
                                }}>Remove</Remove>
                            </Section>
                        ))}
                        <div>
                            {isModalOpened && <Modal closeModal={closeModal} activeMovie={activeMovie} />}
                        </div>
                    </Fav>
                </Container>
            )
        }
    }

}

const Alert = styled.h2`
text-align: center;
font-weight: lighter;
font-size: 3rem;
letter-spacing: .3rem;
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

const Remove = styled.div`
background: rgba(0, 0, 0, 1);
padding: 5px 14px;
border: 3px solid ${props => props.theme.colors.main};
border-radius: 25%;
cursor: pointer;

&:hover {
    border: 3px solid ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.secondary};
}
`

const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 30vw;
text-align: center;
padding: 60px 0px;

h4 {
    height: 55px;
    font-size: 1.2rem;
    font-weight: bolder;
    letter-spacing: .2rem;
}
`
const Image = styled.img`
height: 300px;
width: 200px;
margin: 20px 0;
border: 3px solid #CDCCCC;
border-radius: 15px;
cursor: pointer;

&:hover {
    box-shadow: 0px 0px 5px 2px ${props => props.theme.colors.secondary};
    border: 3px solid ${props => props.theme.colors.secondary};
}
`
export default Favorites
