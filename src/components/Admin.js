import React, { Component } from "react";
import AjouterRecette from "./AjouterRecette";
import AdminForm from "./AdminForm";

class Admin extends Component {
  render() {
    const { ajouterRecette, recettes, majRecette, chargerExemple, supprimerRecette } = this.props;
    return (
      <div className="cards">
        <AjouterRecette ajouterRecette={ajouterRecette}></AjouterRecette>
        {Object.keys(recettes).map(key => (
          <AdminForm
            majRecette={majRecette}
            recettes={recettes}
            supprimerRecette={supprimerRecette}
            key={key}
            id={key}
          />
        ))}
        <footer>
          <button onClick={chargerExemple}>Remplir</button>
        </footer>
      </div>
    );
  }
}

export default Admin;
