import React, { Component } from "react";
import base from "./base";
// CSS
import "./App.css";
import Header from "./components/Header";
import Admin from "./components/Admin";
import Card from "./components/Card";
// import recettes
import recettes from "./recettes";

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {}
  };

  componentDidMount() {
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context: this,
      state: "recettes"
    });
  }

  componentWillUnmount() {
    //close the connection
    base.removeBinding(this.ref);
  }

  ajouterRecette = recette => {
    const recettes = { ...this.state.recettes };
    recettes[`recette-${Date.now()}`] = recette;
    this.setState({ recettes });
  };

  majRecette = (key, newRecette) => {
    // on fait une copie de tout le state existant
    const recettes = { ...this.state.recettes };
    // on passe la clé et la recette modifiée 
    recettes[key] = newRecette;
    // mise à jour de cette recette
    this.setState({ recettes });
  };

  supprimerRecette = key => {
    const recettes = { ...this.state.recettes };
    recettes[key] = null;
    this.setState({ recettes })
  }

  chargerExemple = recettes => this.setState({ recettes });

  render() {
    const cards = Object.keys(this.state.recettes).map(key => {
      return <Card key={key} details={this.state.recettes[key]} />;
    });

    return (
      <div className="box">
        <Header pseudo={this.state.pseudo} />
        <h1>Bonjour {this.state.pseudo}</h1>
        <div className="cards">{cards}</div>
        <Admin
          recettes={this.state.recettes}
          ajouterRecette={this.ajouterRecette}
          majRecette={this.majRecette}
          supprimerRecette={this.supprimerRecette}
          chargerExemple={() => this.chargerExemple(recettes)}
        />
      </div>
    );
  }
}

export default App;
