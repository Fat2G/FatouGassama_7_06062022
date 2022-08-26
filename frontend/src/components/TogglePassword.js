import { useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const TogglePassword = () => {
  const [password, setPassword] = useState("");

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  return (
    <div>
      <div className="input-form">
        <label htmlFor="password" className="icon-form">
          <FontAwesomeIcon icon={faLock} />
        </label>
        <input
          type={type}
          name="password"
          id="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <FontAwesomeIcon icon={icon} onClick={handleToggle} />
      </div>
    </div>
  );
};

export default TogglePassword;
