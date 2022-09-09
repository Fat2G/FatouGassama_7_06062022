import { useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPic } from "../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  // récupération des données de l'utilisateur stockées dans le reducer
  const userData = useSelector((state) => state.userReducer);
  // action qui dispatch l'image vers le store
  const dispatch = useDispatch();

  const handlePic = (e) => {
    e.preventDefault();
    //objet permettant de rassembler l'image et les informations eventuelles
    const data = new FormData();
    data.append("name", userData.username);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPic(data, userData._id));
  };

  // Si l'input file est vide le bouton envoyer est désactivé
  const btnDisabled = () => {
    let picFile = document.querySelector("#file").file;

    if (picFile !== "") {
      document.querySelector("#btnSubmit").disabled = false;
    }
  };

  return (
    <div>
      <form action="" method="put" onSubmit={handlePic} className="upload-form">
        <label htmlFor="file" className="upload-pic">
          Changer l'image
        </label>
        <input
          type="file"
          id="file"
          className="input-img"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            setFile(e.target.files[0]);
            btnDisabled();
          }}
        />
        <br />
        <input
          type="submit"
          id="btnSubmit"
          value="Envoyer"
          disabled={true}
          className="upload-pic-send"
        />
      </form>
    </div>
  );
};

export default UploadImg;
