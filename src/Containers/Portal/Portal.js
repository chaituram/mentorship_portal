import React, { Component } from "react";

import Navigation from "../../Components/Navigation/Navigation";
import PortalContainer from '../Portal/PortalContainer/PortalContainer'


class Portal extends Component {
    componentDidMount() {
        console.log(this.props, 'mentorshipId');
    }
    render() {
        return (
            <div className="d-flex flex-row">
                <Navigation />
                <PortalContainer mentorshipId={this.props.match.params.id} />
            </div>
        )
    }
}

export default Portal;