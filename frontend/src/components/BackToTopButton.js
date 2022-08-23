import { useEffect, useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);
  //  création d'un addEventListener afin d'activer le bouton scroll lorsqu'on descend d'au moins 100px vers le bas de la fenêtre
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  //création d'une fonction responsable, lorsque le bouton est cliqué, de renvoyer vers le haut de la page
  const scrollUpButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    //utilisation d'un opérateur ternaire responsable de la mise en place du bouton
    <div>
      {backToTopButton && (
        <button className="backTop-btn" onClick={scrollUpButton}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
