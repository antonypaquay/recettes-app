import React, {Component} from "react";

class Admin extends Component {


    handleClick = e => {
        this.props.chargerExemple();
    }

    render(){
        return(
            <footer>
                <button onClick={this.handleClick}>Remplir</button>
            </footer>
        )
    }
}

export default Admin;