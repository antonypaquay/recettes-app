import React, {Component} from "react";


//NOTE créer un context
const ColorContext = React.createContext();

// créer un component qui retourne un provider
class ColorProvider extends Component {

    state = {
        color: "seagreen"
    }

    render(){
        return(
            <ColorContext.Provider
                value={{
                    state: this.state
                }}
            >
                {this.props.children}
            </ColorContext.Provider>
        )
    }
}

export {ColorContext};

export default ColorProvider;