import { useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { uploadImg } from "../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  // action qui envoie l'image vers le backend
  const dispatch = useDispatch();
  // données de l'utilisateur stockées dans le reducer
  const userData = useSelector((state) => state.userReducer);

  const updateImg = (e) => {
    e.preventDefault();
    //objet permettant de rassembler l'image et les informations eventuelles
    const formData = new FormData();
    formData.append("name", userData.username);
    formData.append("userId", userData._id);
    formData.append("file", file);

    dispatch(uploadImg(formData, userData._id));

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/auth/${userData._id}/upload`,
      withCredentials: true,
      data: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form action="" method="put" onSubmit={updateImg} className="upload-form">
        <label htmlFor="file" className="upload-img">
          Changer l'image
        </label>
        <input
          type="file"
          id="file"
          className="input-img"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <input type="submit" value="Envoyer" className="upload-img-send" />
      </form>
    </div>
  );
};

export default UploadImg;
