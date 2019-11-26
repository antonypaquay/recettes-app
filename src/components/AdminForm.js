import React from "react";

// id: key -> permet de changer le nom de la props de id à key
const AdminForm = ({ id: key, majRecette, recettes, supprimerRecette }) => {
  const recette = recettes[key];

  const handleChange = (event, key) => {
    // récupérer le nom du champs et la valeur
    const { name, value } = event.target;
    // copie de la recette clé
    const recette = recettes[key];
    // ajouter la valeur à la copie
    recette[name] = value;
    // on passe la clé de la recette et la maj de la recette clé
    majRecette(key, recette);
  };

  return (
    <div className="card">
      <form className="admin-form">
        <input
          value={recette.nom}
          onChange={e => handleChange(e, key)}
          type="text"
          name="nom"
          placeholder="Nom de la recette"
        />
        <input
          value={recette.image}
          onChange={e => handleChange(e, key)}
          type="text"
          name="image"
          placeholder="Adresse de l'image"
        />
        <textarea
          value={recette.ingredients}
          onChange={e => handleChange(e, key)}
          name="ingredients"
          rows="3"
          placeholder="Liste des ingrédients"
        />
        <textarea
          value={recette.instructions}
          onChange={e => handleChange(e, key)}
          name="instructions"
          rows="15"
          placeholder="Liste des instructions"
        />
      </form>
      <button onClick={() => supprimerRecette(key)}>Supprimer</button>
    </div>
  );
};

export default AdminForm;
