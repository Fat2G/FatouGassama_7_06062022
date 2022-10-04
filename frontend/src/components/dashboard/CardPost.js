import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../utils/IsEmpty";
import { dateFormat } from "../utils/DateFormat";
import LikeButton from "./LikeButton";
import { updatePost, deletePost } from "../../actions/post.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const CardPosts = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [file, setFile] = useState();
  const [postPic, setPostPic] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate || file) {
      const data = new FormData();
      data.append("message", textUpdate);
      data.append("file", file);
      dispatch(updatePost(post._id, data));
      setTimeout(function () {
        window.location.reload();
      });
    }
    setIsUpdated(false);
  };

  const deleteItem = () => {
    dispatch(deletePost(post._id));
  };

  // prise en charge de l'image à envoyer
  const handlePic = (e) => {
    setPostPic(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  return (
    <div key={post._id}>
      <article className="ctn-card">
        <div className="card-header">
          <div className="user-img">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData.reduce(
                  (lastValue, currentUser) =>
                    currentUser._id === post.posterId
                      ? currentUser.picture
                      : lastValue,
                  "./uploads/profil/defaultImg.jpg"
                )
              }
              alt="img utilisateur"
            />
          </div>
          <h2>
            {!isEmpty(usersData[0]) &&
              usersData.reduce(
                (lastValue, currentUser) =>
                  currentUser._id === post.posterId
                    ? currentUser.username
                    : lastValue,
                "Anonyme"
              )}
          </h2>
        </div>
        <div className="message">
          {isUpdated === false && <p>{post.message}</p>}
          {isUpdated && (
            <div className="update-post">
              <textarea
                defaultValue={post.message}
                onChange={(e) => setTextUpdate(e.target.value)}
              />
              <div className="icon">
                <>
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
                </>
              </div>
              <div className="btn-container">
                <button className="btn btn-modif" onClick={updateItem}>
                  Modifier
                </button>
              </div>
            </div>
          )}
          {post.picture && (
            <img src={post.picture} alt="post img" className="post-img" />
          )}
        </div>
        <h3> {dateFormat(post.createdAt)}</h3>
        <hr />
        <div className="update-container">
          <LikeButton post={post} />
          {(userData._id === post.posterId || userData.admin === 1) && (
            <div className="card-modifDel">
              <FontAwesomeIcon
                className="icon-modif"
                icon={faPenToSquare}
                onClick={() => setIsUpdated(!isUpdated)}
              />
              <FontAwesomeIcon
                className="icon-del"
                icon={faTrashCan}
                onClick={() => {
                  if (window.confirm("Voulez-vous supprimer ce post?")) {
                    deleteItem();
                  }
                }}
              />
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default CardPosts;
