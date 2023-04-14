import React from 'react';
import '../styles/MenuSteps.css';

function MenuSteps({step}){
    return (
        <div className='menu-steps'>
            <div className='button-step' id='step_no_1'>
                <div className={`number ${step === 1 ? 'selected' : ''}`.trimEnd()}>1</div>
                <div className='title-step'>
                    <span>STEP 1</span>
                    <strong>YOUR INFO</strong>
                </div>
            </div>
            <div className='button-step' id='step_no_2'>
                <div className={`number ${step === 2 ? 'selected' : ''}`.trimEnd()}>2</div>
                <div className='title-step'>
                    <span>STEP 2</span>
                    <strong>SELECT PLAN</strong>
                </div>
            </div>
            <div className='button-step' id='step_no_3'>
                <div className={`number ${step === 3 ? 'selected' : ''}`.trimEnd()}>3</div>
                <div className='title-step'>
                    <span>STEP 3</span>
                    <strong>ADD-ONS</strong>
                </div>
            </div>
            <div className='button-step' id='step_no_4'>
                <div className={`number ${step === 4 ? 'selected' : ''}`.trimEnd()}>4</div>
                <div className='title-step'>
                    <span>STEP 4</span>
                    <strong>SUMMARY</strong>
                </div>
            </div>
        </div>
    );
}

export default MenuSteps;