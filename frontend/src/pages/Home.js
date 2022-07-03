import { useEffect, React } from "react";
import FormLogin from "../components/FormLogin";
import HeaderLogo from "../components/HeaderLogo";

const Index = () => {
  // Utilisation du hook d'effet en enlevant la class non voulue au body afin d'ajouter une.
  useEffect(() => {
    document.body.classList.remove("signup");
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
