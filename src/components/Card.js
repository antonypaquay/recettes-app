import React from "react";

const Card = ({ details }) => {
  // formatage liste des ingrédients
  const ingredients = details.ingredients
    // split permet de transformer une chaine en tableau grâce à un séparateur
    .split(",")
    .map(item => <li key={item}>{item}</li>);

  // formatage liste des instructions
  const instructions = details.instructions
    .split("\n")
    .map(item => <li key={item}>{item}</li>);

  const requireImage = chemin => {
    try {
      return require(`../img/${chemin}`);
    } catch (err) {
      return require(`../img/default.jpeg`);
    }
  }

  return (
    <div className="card">
      <div className="image">
        <img src={requireImage(details.image)} alt={details.nom} />
      </div>
      <div className="recette">
        <h2>{details.nom}</h2>
        <ul className="liste-ingredients">{ingredients}</ul>
        <ol className="liste-instruction">{instructions}</ol>
      </div>
    </div>
  );
};

export default Card;
