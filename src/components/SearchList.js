import React, { useState } from 'react'
import styled from 'styled-components'
import './RatingColors.css'
import Modal from './Modal'

function SearchList({ data }) {
    const [activeMovie, setActiveMovie] = useState(null);
    const [isModalOpened, setIsModalOpened] = useState(false);

    const RatingValue = (value) => {
        if (value < 6.5) {
            return "red";
        } else if (value < 8) {
            return "default";
        } else {
            return "blue"
        }
    }

    const openModal = () => {
        setIsModalOpened(true);
    };

    const closeModal = () => {
        setIsModalOpened(false);
    };

    return (
        <>
            <List>
                {data.map(result => (
                    <Item key={result.id}>
                        <h4>{result.title}</h4>
                        <Image src={`http://image.tmdb.org/t/p/w185${result.poster_path}`} alt={result.title} onClick={() => {
                            setActiveMovie(result)
                            openModal()
                        }}
                        />
                        <h4>Rating: <span className={`rating ${RatingValue(result.vote_average)}`}>{result.vote_average}</span></h4>
                    </Item>
                ))}
            </List>
            <div>
                {isModalOpened && <Modal closeModal={closeModal} activeMovie={activeMovie} />}
            </div>
        </>
    )
}

const List = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`

const Item = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 18rem;
text-align: center;
padding: 60px 30px;

&:hover {
       color: #AA8500;
}

h4 {
    height: 55px;
     font-size: 1.1rem;
    letter-spacing: .2rem;
    width: 80%;
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
    border: 4px solid #AA8500;
    box-shadow: 0px 0px 15px 2px rgba(170,133,0,0.44);
}

`


export default SearchList
