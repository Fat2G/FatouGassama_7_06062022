import { useState, React } from "react";

const ModalSuccess = () => { 
  const [modalSuccess, setModalSuccess] = useState(true);

  const toggleModalSuccess = () => {
    setModalSuccess(!modalSuccess);
    window.location = "/";
  };

  return (
    <div>
      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition (modal) est remplie.
      Peut etre considéré comme une version minifié d'un opérateur ternaire. */}
      {modalSuccess && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <h1> Enregistrement réussi ! <br/> Veuillez vous connecter. </h1>
              <div className="btn-ctn">
                <button
                  type="button"
                  className="btn"
                  onClick={toggleModalSuccess}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalSuccess;
