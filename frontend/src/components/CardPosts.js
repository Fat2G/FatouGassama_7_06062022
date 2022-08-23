import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrashCan,
  faPenToSquare,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

const CardPosts = () => {
  return (
    <div>
      <main>
        <article className="ctn-card">
          <div className="card-header">
            <div className="card-user">
              <div className="user">
                <FontAwesomeIcon className="id-user" icon={faUser} />
              </div>

              <h2> Identifiant </h2>
            </div>
            <div className="card-admin">
              <FontAwesomeIcon className="icon-modif" icon={faPenToSquare} />
              <FontAwesomeIcon className="icon-del" icon={faTrashCan} />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            dolore magni provident deleniti dicta id, sapiente sed natus ipsam
            nihil accusamus saepe fugit tempora repellat, facilis eaque adipisci
            veniam corporis? Consectetur cum totam placeat repellendus aperiam!
            Dolores temporibus est consequuntur deleniti, harum nulla quod rerum
            eius sint velit ducimus eos aliquid laboriosam fugit soluta ab
            suscipit odio et a consequatur. Quaerat officia ad deleniti est
            illum magnam molestiae doloribus labore eaque neque quas sequi
            dignissimos corporis, exercitationem necessitatibus. Velit vero
            eaque cupiditate incidunt, mollitia iure corrupti consequatur quasi
            eum nemo.
          </p>
          <p> Publié le XX/XX/XXXX</p>

          <hr />
          <div className="like-dislike">
            <div className="like">
              <FontAwesomeIcon className="like-icon" icon={faThumbsUp} />
              <p className="like-num">0</p>
            </div>
            <div className="dislike">
              <FontAwesomeIcon className="dislike-icon" icon={faThumbsDown} />
              <p className="dislike-num">2</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default CardPosts;
