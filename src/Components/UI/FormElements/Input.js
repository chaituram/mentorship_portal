import React from "react";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './Input.css'
let inputElement = null;
const input = (props) => {
    // console.log(props.id, 'propsInput');
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
        case ('select'):
            inputElement = <select className={inputClasses.join(' ')}
                key={props.id}
                {...props.elementConfig}
                {...props.value}
                onChange={props.changed}
            >
                <option></option>
            </select>
            break;
        case ('date'):
            inputElement = <input className={inputClasses.join(' ')}
                key={props.id}
                {...props.elementConfig}
                {...props.value}
                onChange={props.changed}
            />
        case ('ckEditor'):
            inputElement = <CKEditor
                data={props.value}
                editor={ClassicEditor}
                // data="<p>Hello from CKEditor 5!</p>"
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    //  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    const data = editor.getData();
                    // const updatedState = {
                    //     ...this.state.task
                    // }
                    // updatedState.description = data;
                    // this.setState({ task: updatedState })
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
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