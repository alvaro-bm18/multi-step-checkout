import React from 'react';
import '../styles/HeaderForm.css';

function HeaderForm(props){
    return (
        <header className='header-section'>
            <strong>{props.title}</strong>
            <span>{props.desc}</span>
        </header>
    );
}

export default HeaderForm;