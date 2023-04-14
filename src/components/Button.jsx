import React from 'react';
import '../styles/Button.css';

function Button(props){
    const setText = (type) => {
        if(type === 'go-back') return 'Go Back';
        else if(type === 'go-next') return 'Next';
        else return 'Confirm';
    }
    return (
        <div
            className={`button ${props.type}`}
            onClick={props.action}>
            {setText(props.type)}
        </div>
    );
}

export default Button;