import React from "react";

import './Input.css'
let inputElement = null;
const input = (props) => {
    console.log(props.id, 'propsInput');
    const inputClasses = ['form-control'];
    if (!props.inputValidated && props.inputTouched) {
        inputClasses.push('inValid');
    }
    switch (props.inputtype) {
        case ('text'):
            inputElement = <input className={inputClasses.join(' ')}
                key={props.id}
                {...props.elementConfig}
                {...props.value}
                onChange={props.changed}
            />;
            break;
        case ('password'):
            inputElement = <input className={inputClasses.join(' ')}
                key={props.id}
                {...props.elementConfig}
                {...props.value}
                onChange={props.changed}
            />
            break;
        case ('email'):
            inputElement = <input className={inputClasses.join(' ')}
                key={props.id}
                {...props.elementConfig}
                {...props.value}
                onChange={props.changed}
            />
            break;
        case ('number'):
            inputElement = <input className={inputClasses.join(' ')}
                key={props.id}
                {...props.elementConfig}
                {...props.value}
                onChange={props.changed}
            />
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                key={props.id}
                {...props.elementConfig}
                {...props.value}
                onChange={props.changed}
            />
            break;
    }
    return (

        <div className="form-group mb-3">
            <label className="mb-3">{props.label}</label>
            {inputElement}
        </div>
    )

}

export default input;