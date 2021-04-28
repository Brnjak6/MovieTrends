import './Modal.css'

const Modal = ({ closeModal, activeMovie }) => {
    return (
        <div className="modalOverlay" onClick={closeModal}>
            <div className="modal">
                <img src={`http://image.tmdb.org/t/p/w185${activeMovie?.poster_path}`} alt="" />
                <section>
                    <h2>{activeMovie?.title}</h2>
                    <p>Description: {activeMovie?.overview}</p>
                    <p>Vote count:{activeMovie?.vote_count}</p>
                    <h4>Release date: {activeMovie?.release_date.substring(0, 4)}</h4>
                    <button onClick={closeModal}>X</button>
                </section>
            </div>
        </div>
    );
};

export default Modal;
