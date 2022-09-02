import { useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { uploadPic } from "../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  // récupération des données de l'utilisateur stockées dans le reducer
  const userData = useSelector((state) => state.userReducer);
  // action qui envoie l'image vers le backend
  const dispatch = useDispatch();

  const handlePic = (e) => {
    e.preventDefault();
    //objet permettant de rassembler l'image et les informations eventuelles
    const formData = new FormData();
    formData.append("name", userData.username);
    formData.append("userId", userData._id);
    formData.append("file", file);

    dispatch(uploadPic(formData, userData._id));
  };

  /**
   * If the file input is not empty, enable the submit button
   */
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
