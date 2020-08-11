import React from "react";

import { Button } from 'react-bootstrap';
import Classes from "./Button.css";

const button = (props) => (
    <button
        className={props.type}
        onClick={props.clicked}>{props.children}
    </button>
);

export default button;