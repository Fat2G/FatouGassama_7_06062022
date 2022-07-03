import { useEffect, React } from "react";
import FormSignup from "../components/FormSignup";
import HeaderLogo from "../components/HeaderLogo";

const Signup = () => {
  useEffect(() => {
    // Utilisation du hook d'effet en enlevant la class non voulue aubody afin d'ajouter une.
    document.body.classList.remove("login");
    document.body.classList.add("signup");
  }, []);
  
  return (
    <div>
      <HeaderLogo />
      <FormSignup />
    </div>
  );
};

export default Signup;
