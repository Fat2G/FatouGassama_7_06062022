import { React, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isEmpty } from "../utils/IsEmpty";
import { dateFormat } from "../utils/DateFormat";
import LikeButton from "../profil/LikeButton";
import { updatePost, deletePost } from "../../actions/post.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const CardPosts = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  const deleteItem = (props) => {
    dispatch(deletePost(props.id));
  };

  return (
    <div key={post._id}>
      <article className="ctn-card">
        <div className="card-header">
          <div className="user-img">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="img utilisateur"
            />
          </div>
          <h2>
            {!isEmpty(usersData[0]) &&
              usersData
                .map((user) => {
                  if (user._id === post.posterId) return user.username;
                  else return null;
                })
                .join("")}
          </h2>
        </div>
        {isUpdated === false && <p>{post.message}</p>}
        {isUpdated && (
          <div className="update-post">
            <textarea
              defaultValue={post.message}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <div className="btn-container">
              <button className="btn" onClick={updateItem}>
                Modifier
              </button>
            </div>
          </div>
        )}
        {post.picture && (
          <img src={post.picture} alt="post img" className="post-img" />
        )}
        <h3> {dateFormat(post.createdAt)}</h3>
        <hr />
        <div className="update-container">
          <LikeButton post={post} />
          {userData._id === post.posterId && (
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
