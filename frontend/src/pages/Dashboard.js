import { useEffect, React } from "react";
import NavBar from "../components/NavBar";
import CardPosts from "../components/CardPosts";
import BackToTopButton from "../components/BackToTopButton";

const Dashboard = () => {
  // Utilisation du hook d'effet en enlevant la classe non voulue au body au profit d'une nouvelle classe.
  useEffect(() => {
    document.body.classList.remove("signup", "login", "profile");
    document.body.classList.add("dashboard");
  }, []);

  return (
    <div>
      <NavBar />
      <CardPosts />
      <CardPosts />
      <CardPosts />
      <CardPosts />
      <CardPosts />
      <CardPosts />
      <CardPosts />

      <BackToTopButton />
    </div>
  );
};

export default Dashboard;
