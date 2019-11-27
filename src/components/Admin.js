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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        // passer le user sous forme d'object
        this.handleAuth({user});
      }
    })
  }

  //NOTE  async & await permet t'attendre qu'une instruction soit terminée pour passer à la ligne suivante
  handleAuth = async authData => {
    // récupérer les données dans firebase
    const box = await base.fetch(this.props.pseudo, {
      context: this
    });

    if (!box.chef) {
      await base.post(`${this.props.pseudo}/chef`, {
        data: authData.user.uid
      });
    }

    this.setState({
      uid: authData.user.uid,
      chef: box.chef || authData.user.uid
    });
  };

  // permet de se connecter via firebase
  authenticate = () => {
    // ajouter le provider
    const authProvider = new firebase.auth.FacebookAuthProvider();
    // appeller le l'application firebase
    firebaseApp
      .auth()
      // mode de connexion -> type popup
      .signInWithPopup(authProvider)
      // une fois que la promesse nous renvoie quelque chose on exécute then()
      .then(this.handleAuth);
  };

  logout = async () => {
    console.log("Déconnexion");
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
  };

  render() {
    const {
      ajouterRecette,
      recettes,
      majRecette,
      chargerExemple,
      supprimerRecette
    } = this.props;

    const logout = <button onClick={this.logout}>Déconnexion</button>;

    // si l'utilisateur n'est pas connecté
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}></Login>;
    }

    if (this.state.uid !== this.state.chef) {
      return (
        <div>
          <p>Tu n'es pas le chef de cette boite !</p>
          {logout}
        </div>
      );
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
          {logout}
          <button onClick={chargerExemple}>Remplir</button>
        </footer>
      </div>
    );
  }
}

export default Admin;
