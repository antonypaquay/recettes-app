import React, { Component } from "react";
import base from "../base";
import recettes from "../recettes";

const withFirebase = WrappedComponent =>
  class HOC extends Component {
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
      this.setState({ recettes });
    };

    chargerExemple = recettes => this.setState({ recettes });

    render() {
      return (
        <WrappedComponent
          recettes={this.state.recettes}
          ajouterRecette={this.ajouterRecette}
          majRecette={this.majRecette}
          supprimerRecette={this.supprimerRecette}
          chargerExemple={() => this.chargerExemple(recettes)}
          {...this.props}
        />
      );
    }
  };

export default withFirebase;
