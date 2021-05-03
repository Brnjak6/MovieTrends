import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import styled from 'styled-components'

const Modal = ({ closeModal, activeMovie }) => {
  const [showMore, setShowMore] = useState(false);
  const [moreDetails, setMoreDetails] = useState('')
  const urlID = `https://api.themoviedb.org/3/movie/${activeMovie?.id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`

  const handleEscKey = e => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [handleEscKey])

  const showMoreHandler = () => {
    setShowMore(true)
    fetch(urlID)
      .then(res => res.json())
      .then(data => {
        setMoreDetails(data)
      })
  }

  return (
    <Styling>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: .1
          }
        }}>
        <div

          className="modalOverlay" onClick={closeModal} onKeyDown={handleEscKey}>
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
              <button className="button" onClick={() => setShowMore(false)}>Return</button>
            </motion.div>
            // End Of Show More Modal 
          ) : (
            <>
              <section className="section">
                <h3 className="title">{activeMovie?.title}</h3>
                <p className="overview"><span className="description">Description</span> <br /> <br /> {activeMovie?.overview}</p>
                <button className="button" onClick={showMoreHandler}>Show More</button>
              </section>
              <div className="img-container">
                <button className="btn" onClick={closeModal}>x</button>
                <h4 className="date">Release date: {activeMovie?.release_date.substring(0, 4)}</h4>
                <img src={`http://image.tmdb.org/t/p/w185${activeMovie?.poster_path}`} alt="" className="image" />
              </div>
            </>
          )}

        </div>
      </motion.div>
    </Styling>
  );
};

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
  background: linear-gradient(to bottom, #1C1C1C, #000);
  display: flex;
  justify-content: space-around;
  z-index: 5;
   border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 1rem;
  font-family: 'Poppins', sans-serif;
}

.section {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  width: 100%;
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
  align-self: center;
  letter-spacing: .2rem;
}

.btn {
  position: absolute;
 top: 3%;
 right: 3%;
 padding: .3rem .8rem;
 background: ${props => props.theme.colors.secondary};
 font-size: 1.5rem;
 outline: none;
 border: none;
 border-radius: 50%;

 color: #CDCCCC;
 box-shadow: 0px 7px 15px 5px rgba(0,0,0,0.50);
 cursor: pointer;
 display: flex;
 justify-content: center;
 align-items: center;
 transition: .2s;
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

.vote-count {
  margin-top: 3rem;
  color: ${props => props.theme.colors.secondary};
  letter-spacing: .2rem;
}

/* Show More Modal */

.show-more-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.4rem;
  font-family: 'Poppins', sans-serif;
  padding: 1rem;
  line-height: 4rem;
}

.details-title {
  text-align: center;
  margin: 2rem 0;
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
   height: 90vh;
 }

 .section {
   width: 50%;
 }

 .image {
   width: 300px;
   height: 500px;
 }

 .title {
   font-size: 1.5rem;
 }

 .overview {
   margin-top: 2rem;
   font-size: 1.35rem;
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
   height: 90vh;
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
   font-size: 1.3rem;
   letter-spacing: .2rem;
   line-height: 2rem;
   width: 100%;
 }

 .image {
   display: none;
 }

 .date {
   font-size: 1.5rem;
 }

 .show-more-container {
   font-size: 1.3rem;
 }

}

@media only screen and (max-width: 900px) {
  .section {
    width: 90%;
  }
  .overview {
    font-size: 1rem;
    margin-top: .4rem;
    width: 80%;
  }

  .title {
    font-size: 1.5rem;
    width: 80%;
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

@media only screen and (max-width: 600px) {
  .modal {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
.title {
  margin-bottom: .5rem;
  font-size: 1.5rem;
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
  top: 3rem;
  right: 3rem;
}

.show-more-container {
  width: 90%;
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
  line-height: 1.7rem;
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
   right: 2rem;
 }

}
@media only screen and (max-width: 350px) {
.title {
  margin-bottom: .5rem;
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
   font-size: 1.1rem;
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
