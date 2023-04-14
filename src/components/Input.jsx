import React from 'react';
import '../styles/Input.css';

function Input(props){
    return (
        <div className='inp-container'>
            <label htmlFor={props.name}>
                {props.children}
                <span id={`message_${props.name}`}></span>
            </label>
            <input 
                type={props.type}
                name={props.name}
                id={props.name}
                placeholder={props.eg}
            />
        </div>
    );
}

export default Input;