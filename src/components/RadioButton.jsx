import React from 'react';
import '../styles/RadioButton.css';
import IconArcade from '../assets/icon-arcade.svg';
import IconAdvanced from '../assets/icon-advanced.svg';
import IconPro from '../assets/icon-pro.svg';

function RadioButton(props){
    const setIcon = (pln) => {
        if(pln === 'arcade') return IconArcade;
        else if(pln === 'advanced') return IconAdvanced;
        else return IconPro;
    }
    return (
        <label className='plan' htmlFor={props.name}>
            <img className='icon' src={setIcon(props.name)} alt={props.name}/>
            <span className='plan-title'>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</span>
            <span className='plan-time'>{props.time}</span>
            <span className='plan-yr' style={(Number(props.t_plan) === 0) ? {'display':'none'} : {'display':'block'} }>2 months free</span>
            <input name={props.inp} id={props.name} type='radio' value={props.value}/>
            <div className='background-plan'></div>
        </label>
    );
}

export default RadioButton;