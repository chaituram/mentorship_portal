import React, { Component } from 'react';
import PortalHeader from "../../../Components/PortalHeader/PortalHeader";

import "./PortalContainer.css";

class PortalContainer extends Component {
    render() {
        return (
            <div className="container-wrapper">
                <PortalHeader />
                <div className="container">
                    Data
                </div>
            </div>
        )
    }
}

export default PortalContainer;