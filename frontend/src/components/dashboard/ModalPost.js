import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty } from "../utils/IsEmpty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faCircleXmark,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";

const ModalPost = () => {
  const [message, setMessage] = useState("");
  const [postPic, setPostPic] = useState(null);
  const [file, setFile] = useState();
  // fenêtre pop-up
  const [modalPost, setModalPost] = useState(false);
  // puisque setModal est false il devient true et inversement
  const toggleModalPost = (e) => {
    e.preventDefault();
    setModalPost(!modalPost);
  };
  // redux
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();

  // prise en charge de l'image à envoyer
  const handlePic = (e) => {
    setPostPic(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  // envoie du post
  const handlePost = async (e) => {
    if (message || file) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message et/ou une image.");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPic("");
    setFile("");
    setModalPost(!modalPost);
  };

  //On empêche de scroller lorsque le popup apparait avec un overflow-y: hidden en css
  if (modalPost) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div>
      <FontAwesomeIcon
        className="icon-navbar icon-spe"
        icon={faCommentDots}
        onClick={toggleModalPost}
      />

      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition (modal) est remplie.
      Peut etre considéré comme une version minifié d'un opérateur ternaire. */}
      {modalPost && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="modal-icons">
              <div className="addImg-ctn">
                <span className="addImg-message">Ajouter une image</span>
                <label htmlFor="file-post" className="addImg-modal">
                  <FontAwesomeIcon icon={faFolderPlus} />
                </label>
                <input
                  type="file"
                  id="file-post"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePic(e)}
                />
                <img src={postPic} alt="" className="preview-img" />
              </div>
              <FontAwesomeIcon
                className="close-modal"
                onClick={cancelPost}
                icon={faCircleXmark}
              />
            </div>
            <div className="modal-area">
              <textarea
                id="post"
                name="post"
                rows="5"
                cols="33"
                placeholder="Que voulez-vous partager ?"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
              <div className="bnt-post">
                <button
                  type="button"
                  className="btn btn-modal"
                  onClick={handlePost}
                >
                  Publier
                </button>
                {message || postPic ? (
                  <button
                    className="btn btn-modal btn-cancel"
                    onClick={cancelPost}
                  >
                    Annuler
                  </button>
                ) : null}
              </div>
            </div>
            {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
            {!isEmpty(error.format) && <p>{error.format}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPost;
