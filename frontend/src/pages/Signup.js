import { useEffect, React } from "react";
import FormSignup from "../components/FormSignup";
import HeaderLogo from "../components/HeaderLogo";

const Signup = () => {
  useEffect(() => {
    // Utilisation du hook d'effet en enlevant la classe non voulue au body au profit d'une nouvelle classe.
    document.body.classList.remove( "dashboard", "profile");
    document.body.classList.add("login", "signup");
  }, []);
  
  return (
    <div>
      <HeaderLogo />
      <FormSignup />
    </div>
  );
};

export default Signup;
