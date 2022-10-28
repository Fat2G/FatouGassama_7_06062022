import { React, useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const userId = useContext(Context);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, userId));
    setIsLiked(true);
  };
  const unlike = () => {
    dispatch(unlikePost(post._id, userId));
    setIsLiked(false);
  };

  // si l'id de l'utilisateur est parmi ceux qui ont liké le post, setIsLiked devient true
  // le useEffect est relancé lorsque sont trouvés l'id utilisateur, le tableau des utilisateurs ayant liké le post et lorsque isLiked est incrémenté
  useEffect(() => {
    if (post.likers.includes(userId)) setIsLiked(true);
    else setIsLiked(false);
  }, [userId, post.likers, isLiked]);

  return (
    <div>
      <div className="like-container">
        {userId && isLiked === false && (
          <FontAwesomeIcon
            className="unlike-icon"
            icon={faHeart}
            onClick={like}
          />
        )}
        {userId && isLiked && (
          <FontAwesomeIcon
            className="like-icon"
            icon={faHeart}
            onClick={unlike}
          />
        )}
        <p className="like-num">{post.likers.length}</p>
      </div>
    </div>
  );
};

export default LikeButton;
