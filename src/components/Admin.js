import React, { Component } from "react";
import AjouterRecette from "./AjouterRecette";
import AdminForm from "./AdminForm";
import Login from "./Login";
import firebase from "firebase/app";
import "firebase/auth";
import base, { firebaseApp } from "../base";

class Admin extends Component {
  state = {
    uid: null,
    chef: null
  };

  handleAuth = async authData => {
    const box = await base.fetch(this.props.pseudo, {
      context: this
    });
    if (!box.chef) {
      await base.post(`${this.props.pseudo}/chef`, {
        data: authData.user.uid
      });
    }

    if(this.state.uid !== this.state.chef){
      return(
        <div>
          <p>Tu n'es pas le chef de cette boite !</p>
        </div>
      )
    }

    this.setState({
      uid: authData.user.uid,
      chef: box.chef || authData.user.uid
    });
  };

  authenticate = () => {
    const authProvider = new firebase.auth.FacebookAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.handleAuth);
  };

  render() {
    const {
      ajouterRecette,
      recettes,
      majRecette,
      chargerExemple,
      supprimerRecette
    } = this.props;

    // si l'utilisateur n'est pas connecté
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}></Login>;
    }

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
