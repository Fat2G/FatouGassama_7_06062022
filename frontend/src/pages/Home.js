import { useEffect, React } from "react";
import FormLogin from "../components/auth/FormLogin";
import HeaderLogo from "../components/HeaderLogo";

const Index = () => {
  // Utilisation du hook d'effet en enlevant la classe non voulue au body au profit d'une nouvelle classe.
  useEffect(() => {
    document.body.classList.remove("signup", "dashboard", "profile");
    document.body.classList.add("login");    
  }, []);

  return (
    <div>
      <HeaderLogo />
      <FormLogin />
    </div>
  );
};

export default Index;
