import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Navigation.css";
const navigation = (props) => {
    return (
        <div>
            <ul className="navbar-nav" id="accordionSidebar">
                <li className="bb-1"><a>Portal Dashboard</a></li>
                <li><a>Backlogs <span className="count">10</span></a></li>
                <li><a>Tasks <span className="count">30</span></a></li>
                <li><a>Completed Tasks <span className="count">3</span></a></li>
                <li><a>Pending Tasks <span className="count">12</span></a></li>
            </ul>
        </div>
    )
}

export default navigation;