import React, { Component } from "react";
import AjouterRecette from "./AjouterRecette";

class Admin extends Component {
  handleClick = e => {
    this.props.chargerExemple();
  };

  render() {
    return (
      <div className="cards">
        <AjouterRecette AjouterRecette={this.props.AjouterRecette}></AjouterRecette>
        <footer>
          <button onClick={this.handleClick}>Remplir</button>
        </footer>
      </div>
    );
  }
}

export default Admin;
