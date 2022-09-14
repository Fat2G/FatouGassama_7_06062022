import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "./utils/IsEmpty";
import { dateFormat } from "./utils/DateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const CardPosts = ({ post }) => {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  console.log(usersData);

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
        <div className="like-container">
          <div className="like">
            <FontAwesomeIcon className="like-icon" icon={faHeart} />
            <p className="like-num">0</p>
          </div>
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
