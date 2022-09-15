import { React } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../utils/IsEmpty";
import { dateFormat } from "../utils/DateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons"; 
import LikeButton from "../profil/LikeButton";

const CardPosts = ({ post }) => {
  const usersData = useSelector((state) => state.usersReducer);
  // const userData = useSelector((state) => state.userReducer);

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
        <p>{post.message}</p>
        {post.picture && (
          <img src={post.picture} alt="post img" className="post-img" />
        )}
        <h3> {dateFormat(post.createdAt)}</h3>
        <hr />
        <div className="update-container">
          <LikeButton post={post} />
          <div className="card-modifDel">
            <FontAwesomeIcon className="icon-modif" icon={faPenToSquare} />
            <FontAwesomeIcon className="icon-del" icon={faTrashCan} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default CardPosts;
