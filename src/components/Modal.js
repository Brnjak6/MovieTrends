import './Modal.css'

const Modal = ({ closeModal, activeMovie }) => {
    return (
        <div className="modalOverlay" onClick={closeModal}>
            <div className="modal">

                <section className="section">
                    <h4 className="title">{activeMovie?.title}</h4>
                    <p><span>Description</span> <br /> {activeMovie?.overview}</p>
                    <p className="vote-count">Vote count <br /> <span>{activeMovie?.vote_count}</span></p>
                </section>
                <div className="img-container">
                    <button className="btn" onClick={closeModal}>Return</button>
                    <button className="btn x" onClick={closeModal}>x</button>
                    <h4 className="date">Release date: {activeMovie?.release_date.substring(0, 4)}</h4>
                    <img src={`http://image.tmdb.org/t/p/w185${activeMovie?.poster_path}`} alt="" className="image" />
                </div>
            </div>
        </div>
    );
};

export default Modal;
