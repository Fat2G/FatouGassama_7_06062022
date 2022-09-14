import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import { isEmpty } from "../utils/IsEmpty";
import CardPost from "./CardPost";

const FilActu = () => {
  // Hooks utilisés pour rechercher les posts existants et les importer dans le fil d'actualité
  const [fetchPost, setFetchPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    // si fetchPost est true alors il y un dispatch de l'action getPosts
    if (fetchPost) {
      dispatch(getPosts());
      setFetchPost(false);
    }
  }, [fetchPost, dispatch]);

  return (
    <div className="filActu-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <CardPost post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default FilActu;
