import React, { Component } from "react";

import Navigation from "../../Components/Navigation/Navigation";
import PortalContainer from '../Portal/PortalContainer/PortalContainer'


class Portal extends Component {
    render() {
        return (
            <div className="d-flex flex-row">
                <Navigation />
                <PortalContainer />
            </div>
        )
    }
}

export default Portal;