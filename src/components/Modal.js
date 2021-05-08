import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FavoritesContext } from './FavoritesContext';
import { ReactComponent as Heart } from '../img/heart.svg'
import StatusMessage from './StatusMessage';

const Modal = ({ closeModal, activeMovie }) => {
  const [showMore, setShowMore] = useState(false);
  const [moreDetails, setMoreDetails] = useState('');
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [favoritesStatus, setFavoritesStatus] = useState('')
  const urlID = `https://api.themoviedb.org/3/movie/${activeMovie?.id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`;

  useEffect(() => {

    const showMoreHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', showMoreHandler)

    return () => document.removeEventListener('keydown', showMoreHandler)
  })

  const showMoreHandler = () => {
    setShowMore(true)
    fetch(urlID)
      .then(res => res.json())
      .then(data => {
        setMoreDetails(data)
      })
  }

  const addToFavorites = (e) => {
    const exists = favorites.find(movie => movie.id === activeMovie.id);

    if (exists) {
      setFavoritesStatus('Already exists')
      setTimeout(() => {
        setFavoritesStatus('')
      }, 1800)
    } else {
      setFavorites(prevState => [...prevState, activeMovie])
      setFavoritesStatus('Movie added')
      setTimeout(() => {
        setFavoritesStatus('')
      }, 1900)
    }
  }

  return (
    <Styling>
      <div>
        <div

          className="modalOverlay" onClick={closeModal}>
        </div>
        <div className="modal">
          {showMore ? (
            // Show More Modal 
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                type: "tween",
                duration: ".6",
                delay: .5
              }}
              exit={{ opacity: 0 }}
              className="show-more-container">
              <button className="btn" onClick={closeModal}>x</button>
              <h2 className="details-title">{moreDetails.title}</h2>
              <section className="details-container">
                <div className="genres">
                  <span className="span">Genres:</span>
                  {moreDetails.genres?.map(genre => (
                    <div key={Math.random()}>
                      <h4 className="genre-name">{genre.name}</h4>
                    </div>

                  ))}
                </div>
                <h4><span className="span">Homepage:</span><a className="link" href={moreDetails.homepage}>{moreDetails.homepage ? moreDetails.homepage : 'Data unavailable'}</a>
                </h4>
                <div className="companies">
                  <span className="span"> Production companies:</span>
                  {moreDetails.production_companies?.map(company => (
                    <p className="company" key={Math.random()}>{company?.name}</p>

                  ))}</div>
                <p><span className="span">Budget:</span> {!moreDetails.budget === 0 ? `$${moreDetails.budget}` : 'Data unavailable'}</p>
                <p><span className="span"> Revenue:</span> {!moreDetails.revenue === 0 ? `$${moreDetails.revenue}` : 'Data unavailable'}</p>
                <p><span className="span"> Duration:</span> {moreDetails.runtime} minutes</p>

              </section>
              <button onClick={() => setShowMore(false)}>Return</button>
            </motion.div>
            // End Of Show More Modal 
          ) : (
            <>
              <div className="modal-content">
                <section className="section">
                  <h3 className="title">{activeMovie?.title}</h3>
                  <p className="overview"><span className="description">Description</span> <br /> <br /> {activeMovie?.overview}</p>
                  <button style={{ marginTop: "1.3rem" }} onClick={showMoreHandler}>Show More</button>
                </section>
                <div className="img-container">
                  <button className="btn" onClick={closeModal}>x</button>
                  <h4 className="date">Release date: {activeMovie?.release_date.substring(0, 4)}</h4>
                  <HeartSvg className="favorite" onClick={addToFavorites} />
                  <img src={`http://image.tmdb.org/t/p/w185${activeMovie?.poster_path}`} alt="" className="image" />
                </div>
                {favoritesStatus.length > 2 && <StatusMessage status={favoritesStatus} />}
              </div>

            </>
          )}

        </div>
      </div>
    </Styling>
  );
};

const HeartSvg = styled(Heart)`
height: 40px;
width: 40px;
margin: 5% 0;
fill: ${props => props.theme.colors.secondary};
cursor: pointer;
opacity: .8;
transition: .2s all;
&:hover {
  opacity: 1;
}

&:active {
  transform: translateY(5px)
}
@media only screen and (min-width: 1600px) {
margin: 15% 0;
}

`

const Styling = styled.div`
.modalOverlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;

}

.modal {
  position: fixed;
    top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 80vh;
  background: ${props => props.theme.colors.background};
  display: flex;
  justify-content: space-around;
  z-index: 5;
   border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: .5rem;
  font-family: 'Poppins', sans-serif;
}

.modal-content {
  overflow: auto;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
    overflow-x: hidden;
 ::-webkit-scrollbar {
  width: 10px;

}

::-webkit-scrollbar-track {
  background: #000;
  border-radius: 10px;

}

::-webkit-scrollbar-thumb {
  background: ${props => props.theme.colors.secondary};
      border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: ${props => props.theme.colors.main};
}

}

.section {
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
    padding: 1.5rem 0;
}

.title {
  width: 100%;
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};

  align-self: center;
  letter-spacing: .2rem;
}

.btn {
  position: absolute;
 top: 3%;
 right: 3%;
 font-size: 1.1rem;
 font-weight: bolder;
 outline: none;
 border: none;
 border-radius: 50%;
 color: white;
 background: ${props => props.theme.colors.secondary};
 cursor: pointer;
 display: flex;
 justify-content: center;
 align-items: center;
 transition: .1s;

 &:hover {
    box-shadow: 0px 0px 7px 2px ${props => props.theme.colors.main};
 }
}

.btn:active {
  transform: translateY(3px);
}

.button {
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  border: 3px solid ${props => props.theme.colors.secondary};
  background: transparent;
  color: #CDCCCC;
  padding: 4px 8px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.button:hover {
  background: ${props => props.theme.colors.secondary};
  color: #000;
  transition: .2s;

}

.image {
  width: 15vw;
  height: 40vh;
  border: 2px  solid #000;
  object-fit: fill;
  margin-bottom: 2rem;
  border-radius: 1rem;
}

.img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.date {
  margin-top: 5rem;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.secondary};
}

.overview {
  width: 80%;
  font-size: 1.5rem;
  letter-spacing: .2rem;
  line-height: 1.8rem;
}

.description {
  color: ${props => props.theme.colors.secondary};
  font-size: 1.3rem;
}



/* Show More Modal */

.show-more-container {
  display: flex;
  overflow: auto;
  flex-direction: column;
  width: 100%;
  font-size: 1.4rem;
  padding: 1rem;
  line-height: 4rem;

  ::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #000;
  border-radius: 10px;

}

::-webkit-scrollbar-thumb {
  background: ${props => props.theme.colors.secondary};
      border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: ${props => props.theme.colors.main};
}

}

.details-title {
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.link {
  color: ${props => props.theme.colors.secondary};
  margin-left: 1rem;
  text-decoration: none;
}

.link::after {
  color: ${props => props.theme.colors.secondary};
}

.genres {
  display: flex;
  flex-wrap: wrap;
}

.genre-name {
  margin-left: 1rem;
  border: 2px solid ${props => props.theme.colors.secondary};
  border-radius: 25%;
  padding: 0 9px;
  font-size: 1rem;
}

.companies {
  display: flex;
  flex-wrap: wrap;
}

.span {
  font-weight: bolder;
  color: ${props => props.theme.colors.secondary};
}

.company {
  margin-left: 10px;
}

.company:after { content: ", " }

.company:last-of-type:after { content: "" }

.button {
  width: fit-content;
  border-radius: 10%;
  padding: 4px 10px;
  font-size: 1.4rem;
  align-self: center;
}


@media only screen and (min-width: 1600px) {
.btn {
  margin-top: 1rem;
}

}



@media only screen and (max-width: 1400px) {
.modal {
   width: 80vw;
   height: 80vh;
 }

 .section {
   width: 50%;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
 }

 .image {
   width: 300px;
   height: 500px;
 }

 .title {
   font-size: 1.9rem;
   width: 80%;
 }

 .overview {
   margin-top: 2rem;
   font-size: 1.2rem;
   width: 100%;
 }


 .vote-count {
   font-size: 1rem;
 }

 .date {
   font-size: 1.5rem;
   margin-top: 2rem;
 }

}

@media only screen and (max-width: 1200px) {
  .section {
    width: 70%;
  }
 
 .modal {
   width: 80vw;
   height: 80vh;
   display: flex;
   flex-direction: column;
   align-items: center;
 }

 .title {
   font-size: 1.5rem;
   width: 140%;
 }

 .overview {
   margin-top: 2rem;
   font-size: 1.1rem;
   letter-spacing: .2rem;
   line-height: 2rem;
   width: 100%;
 }

 .image {
   width: 15vw;
   height: 29vh;
 }

 .date {
   font-size: 1.3rem;
 }

 .show-more-container {
   font-size: 1.3rem;
 }

}

@media only screen and (max-width: 900px) {
  .section {
    width: 90%;
  }

  .modal-content {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  } 

  .img-container {
    width: 100%;
  }

  .image {
    width: 30%;
    height: 15rem;
  }

  .overview {
    font-size: 1rem;
    margin-top: .4rem;
    width: 80%;
  }

  .favorite {
    margin: 2rem 0;
  }

  .title {
    font-size: 1.5rem;
    width: 80%;
    margin-top: 2rem;
  }

   .link::before {
 content: " "
 }

   .show-more-container {
   font-size: 1.1rem;
   line-height: 3rem;
 }

 .genre-name {
  margin-left: 1rem;
  border: none;
  padding: 0;
  white-space: nowrap;
}

.details-title {
  font-size: 1.6rem;
  margin: 1rem 0;
}
}

@media only screen and (max-height: 680px) {
 .image {
   display: none;
 }
}

@media only screen and (max-width: 750px) {
  .image {
    display: none;
  }
  .modal-content {
    flex-direction: column;
    justify-content:space-between;
    align-items: center;

  }
  .title {
    margin: 0;
  }
}



@media only screen and (max-width: 600px) {
  .modal {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
.title {
  margin-top: 3rem;
  font-size: 1.2rem;
  width: 100%;
}

.overview {
  font-size: 1rem;
  letter-spacing: .1rem;
  line-height: 1.7rem;
  margin: 1rem 0;
  width: 80%;
}

.description {
  font-size: 1.4rem;
}

.date {
  font-size: 1.3rem;
  margin-top: 0;
}

.btn {
   right: 1.2rem;
   top: 4.2rem;
}

.show-more-container {
  width: 90%;
  margin-top: 8vh;
}
}

@media only screen and (max-width: 400px) {
.title {
  margin-bottom: .5rem;
  font-size: 1.4rem;
}

.overview {
  font-size: 1rem;
  margin-top: 1rem;
  width: 70%;
  line-height: 1.3rem;
}

.description {
  font-size: .9rem;
}

.date {
  font-size: 1.3rem;
  margin-top: 0;
}
.show-more-container {
   font-size: 1.1rem;
   line-height: 2.4rem;
   padding: .3rem;
   width: 90%;
 }


 .button {
   font-size: 1.3rem;
 }

 .btn {
   right: 1.2rem;
   top: 4.5rem;
 }

}
@media only screen and (max-height: 700px) {
  .details-title {
    display: none;
  }
}
@media only screen and (max-width: 380px) {
.title {
  margin-bottom: .5rem;
  margin-top: 3rem;
  font-size: 1rem;
}

.overview {
  font-size: .7rem;
  margin-top: 1rem;
  width: 100%;
  line-height: 1.2rem;
  font-family: 'Poppins', sans-serif;

}

.description {
  font-size: .9rem;
}

.date {
  font-size: 1rem;
  margin-top: 0;
}
.vote-count {
  font-size: .7rem;
  margin-top: 1rem;
}

.show-more-container {
   font-size: 1rem;
   line-height: 2.5rem;
   width: 95%;
 }

.details-title {
  font-size: 1.3rem;
  margin: 1rem 0;
}
}
`

export default Modal;
