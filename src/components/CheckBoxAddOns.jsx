import React from 'react';
import '../styles/CheckBoxAddOns.css';

function CheckBoxAddOns(props){
    return (
        <label className='addOns-item' htmlFor={props.name}>
            <div className='iconCheck'>
                <input type='checkbox' name={props.inp} id={props.name} value={props.val} />
                <div className='backgrounAddOns'></div>
            </div>
            <div className='infoAddOns'>
                <div>
                    <strong>{props.title}</strong>
                    <span>{props.desc}</span>
                </div>
            </div>
            <div className='priceAddOns'>
                <strong>{`+$${props.price}/${props.time}`}</strong>
            </div>
        </label>
    );
}

export default CheckBoxAddOns;