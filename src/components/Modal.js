import { motion } from 'framer-motion';
import './Modal.css'

const Modal = ({ closeModal, activeMovie }) => {
    return (
        <motion.div
            initial={{
                scale: 0
            }}
            animate={{
                scale: 1,
                transition: {
                    duration: .3
                }
            }}
            className="modalOverlay" onClick={closeModal}>
            <motion.div
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1,
                    transition: {
                        duration: .4
                    }
                }}
                className="modal">

                <section className="section">
                    <h4 className="title">{activeMovie?.title}</h4>
                    <p className="overview"><span className="description">Description</span> <br /> <br /> {activeMovie?.overview}</p>
                    <div className="vote-count">Vote count <br /> <span>{activeMovie?.vote_count}</span></div>
                </section>
                <div className="img-container">
                    <button className="btn" onClick={closeModal}>x</button>
                    <h4 className="date">Release date: {activeMovie?.release_date.substring(0, 4)}</h4>
                    <img src={`http://image.tmdb.org/t/p/w185${activeMovie?.poster_path}`} alt="" className="image" />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Modal;
