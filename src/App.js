import React from "react";
// CSS
import "./App.css";
import Header from "./components/Header";
import Admin from "./components/Admin";
import Card from "./components/Card";
import withFirebase from "./hoc/withFirebase";

const App = ({
  recettes,
  match,
  ajouterRecette,
  majRecette,
  supprimerRecette,
  chargerExemple
}) => {
  const cards = Object.keys(recettes).map(key => {
    return <Card key={key} details={recettes[key]} />;
  });

  return (
    <div className="box">
      <Header pseudo={match.params.pseudo} />
      <h1>Bonjour {match.params.pseudo}</h1>
      <div className="cards">{cards}</div>
      <Admin
        pseudo={match.params.pseudo}
        recettes={recettes}
        ajouterRecette={ajouterRecette}
        majRecette={majRecette}
        supprimerRecette={supprimerRecette}
        chargerExemple={chargerExemple}
      />
    </div>
  );
};

const WrappedComponent = withFirebase(App);

export default WrappedComponent;
