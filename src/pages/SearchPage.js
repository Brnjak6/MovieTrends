import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { InputSearchContext } from "../components/InputSearchContext";
import "../components/RatingColors.css";
import Modal from "../components//Modal";

function SearchPage() {
  const [inputData, setInputData] = useContext(InputSearchContext);
  const [activeMovie, setActiveMovie] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const RatingValue = (value) => {
    if (value < 6.5) {
      return "red";
    } else if (value < 8) {
      return "default";
    } else {
      return "blue";
    }
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return !inputData ? (
    <Load>
      <BounceLoader color="#AA8500" />
    </Load>
  ) : (
    <>
      <List>
        {inputData?.map((result) => (
          <Item key={result.id}>
            <h4>{result.title}</h4>
            <Image
              src={`http://image.tmdb.org/t/p/w185${result.poster_path}`}
              alt={result.title}
              onClick={() => {
                setActiveMovie(result);
                openModal();
              }}
            />
            <h4>
              Rating:{" "}
              <span className={`rating ${RatingValue(result.vote_average)}`}>
                {result.vote_average}
              </span>
            </h4>
          </Item>
        ))}
      </List>
      <div>
        {isModalOpened && (
          <Modal closeModal={closeModal} activeMovie={activeMovie} />
        )}
      </div>
    </>
  );
}

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8rem;
`;

const Item = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18rem;
  text-align: center;
  padding: 60px 30px;

  &:hover {
    color: #aa8500;
  }

  h4 {
    height: 55px;
    font-size: 1.1rem;
    letter-spacing: 0.2rem;
    width: 80%;

    @media only screen and (max-width: 445px) {
      width: 60vw;
    }
  }

  @media only screen and (max-width: 930px) {
    width: 14rem;
  }
`;

const Image = styled.img`
  height: 300px;
  width: 200px;
  margin: 20px 0;
  border: 3px solid #cdcccc;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    border: 4px solid #aa8500;
    box-shadow: 0px 0px 15px 2px rgba(170, 133, 0, 0.44);
  }

  @media only screen and (max-width: 930px) {
    height: 13rem;
    width: 9rem;
  }
`;
const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  align-self: center;
`;

export default SearchPage;
