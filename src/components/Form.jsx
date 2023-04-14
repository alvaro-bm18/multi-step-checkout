import '../styles/Form.css';
import MenuSteps from './MenuSteps';
import HeaderForm from './HeaderForm';
import Input from './Input';
import Button from './Button';
import RadioButton from './RadioButton';
import CheckBoxAddOns from './CheckBoxAddOns';
import ThankUIcon from '../assets/icon-thank-you.svg';

import React, { useState } from 'react';

export default function Form() {
    const [step, setStep] = useState(1);
    const [plan, setPlan] = useState(0);
    const [time, setTime] = useState(0);
    const [adds, setAdds] = useState([]);
    const [nameU, setName] = useState('');
    const [emailU, setEmail] = useState('');
    const [numberU, setNumber] = useState('');

    const PLANS = [
        {
            name: 'arcade',
            price: [9, 90]
        },
        {
            name: 'advanced',
            price: [12, 120]
        },
        {
            name: 'pro',
            price: [15, 150]
        }
    ];
    const ADD_ONS = [
        {
            name: 'Online service',
            desc: 'Access to multiplayer games',
            price: [1, 10]
        },
        {
            name: 'Larger storage',
            desc: 'Extra 1TB of cloud save',
            price: [2, 20]
        },
        {
            name: 'Customizable Profile',
            desc: 'Custom theme on your profile',
            price: [2, 20]
        }
    ];
    let FORM_DATA = {
        'name': '',
        'email': '',
        'number': '',
        'plan': '',
        'time': '',
        'addOns': []
    };
    const $ = (_) => document.querySelector(_);

    const message = (id, message) => {
        $(`#message_${id}`).innerText = message;
        if (message) $(`#${id}`).className = 'invalid';
        else $(`#${id}`).className = message;

    }
    const valid_step_1 = () => {
        const name_user = $('#nameUser').value.replace(/^\s+|\s+$/gm, '');
        if (!/^[a-zA-ZáéíóúüÁÉÍÓÚ.\s]{3,50}$/.test(name_user)) {
            message('nameUser', 'not valid name, requiered.');
            return false;
        }

        message('nameUser', '');
        const email_user = $('#emailUser').value.replace(/^\s+|\s+$/gm, '');
        if (!/[a-zA-Z0-9.]+@+[a-zA-Z0-9]+.+[a-zA-Z0-9]/.test(email_user)) {
            message('emailUser', 'not valid e-mail, requiered.');
            return false;
        }

        message('emailUser', '');
        const number_user = $('#numberUser').value.replace(/^\s+|\s+$/gm, '');
        if (!/^[0-9\s+-]{10,14}$/.test(number_user)) {
            message('numberUser', 'not valid phone number, requiered');
            return false;
        }

        message('numberUser', '');

        setName(name_user);
        setEmail(email_user);
        setNumber(number_user);

        return true;
    }
    const valid_step_2 = () => {
        const plan_selected = $('input[name="plan"]:checked');
        if (!plan_selected) return false;

        setPlan(Number(plan_selected.value));
        return true;
    }
    const valid_step_3 = () => {
        let adds = [];
        const add_selected = document.querySelectorAll('input[name="addons"]:checked');
        if (add_selected.length !== 0)
            add_selected.forEach(add => adds.push(Number(add.value)));
        setAdds(adds);
        return true;
    }
    const sent_form = () => {
        FORM_DATA.name = nameU;
        FORM_DATA.email = emailU;
        FORM_DATA.number = numberU
        FORM_DATA.plan = PLANS[plan].name;
        FORM_DATA.time = time === 0 ? 'monthly' : 'yearly';
        FORM_DATA.addOns = adds;

        const keys = Object.keys(FORM_DATA);
        keys.map(k => console.log(k, FORM_DATA[k]));
        return true;
    }
    const nextStep = () => {
        let val = false;
        switch (step) {
            case 1:
                val = valid_step_1();
                break;
            case 2:
                val = valid_step_2();
                break;
            case 3:
                val = valid_step_3();
                break;
            case 4:
                val = sent_form();
                break;
            default:
                setStep(4);
                break;
        }

        if (val) setStep(step + 1);
    }
    const goBackStep = () => setStep(step - 1);
    const change = (t) => setTime(t);
    const toggleTime = () => {
        if (time === 0) setTime(1);
        else setTime(0);
    }
    const calculate_total = (t_plan) => {
        let total = 0;
        let price_plan = Number(PLANS[plan].price[t_plan]);
        if (adds.length > 0) {
            adds.map(ind => total += Number(ADD_ONS[ind].price[t_plan]));
        }
        total += price_plan;
        return total;
    }
    const cap_name = (word) => word.charAt(0).toUpperCase() + word.slice(1);
    return (
        <>
            <MenuSteps step={step}></MenuSteps>
            <div className='form-container'>
                <form className='form'>
                    <div className='step-container' style={(step === 1) ? { 'display': 'block' } : { 'display': 'none' }}>
                        <HeaderForm
                            title='Personal info'
                            desc='Please provide your name, email address, and phone number.' />
                        <section>
                            <Input
                                name='nameUser'
                                type='text'
                                eg='Stephen King'>
                                Name
                            </Input>
                            <Input
                                name='emailUser'
                                type='email'
                                eg='stephenking@lorem.com'>
                                Email Address
                            </Input>
                            <Input
                                name='numberUser'
                                type='tel'
                                eg='+1 234 567 890'>
                                Phone Number
                            </Input>
                        </section>
                        <footer>
                            <Button type='go-next' action={nextStep} />
                        </footer>
                    </div>
                    <div className='step-container' style={(step === 2) ? { 'display': 'block' } : { 'display': 'none' }}>
                        <HeaderForm
                            title='Select your plan'
                            desc='You have the option of monthly or yearly billing.' />
                        <section>
                            <div className='plan-container'>
                                {
                                    PLANS.map((pln, ind) =>
                                        <RadioButton
                                            name={pln.name}
                                            time={`$${pln.price[time]}/${time === 0 ? 'mo' : 'yr'}`}
                                            inp='plan'
                                            value={ind}
                                            t_plan={time} />
                                    )
                                }
                            </div>
                            <div className='time-switch'>
                                <strong
                                    className={`${time === 0 ? 'time-selected' : ''}`}
                                    onClick={() => change(0)}>Monthly</strong>
                                <div className='toggleButton'>
                                    <div className={`ball ${time === 0 ? 'mo' : 'yr'}`}></div>
                                </div>
                                <strong
                                    className={`${time === 1 ? 'time-selected' : ''}`}
                                    onClick={() => change(1)}>Yearly</strong>
                            </div>
                        </section>
                        <footer>
                            <Button type='go-back' action={goBackStep} />
                            <Button type='go-next' action={nextStep} />
                        </footer>
                    </div>
                    <div className='step-container' style={(step === 3) ? { 'display': 'block' } : { 'display': 'none' }}>
                        <HeaderForm
                            title='Pick add-ons'
                            desc='Add-ons help enhance your gaming experience.' />
                        <section>
                            {
                                ADD_ONS.map((add, ind) =>
                                    <CheckBoxAddOns
                                        name={`add_ons_${ind}`}
                                        title={add.name}
                                        inp='addons'
                                        desc={add.desc}
                                        price={add.price[time]}
                                        val={ind}
                                        time={(time === 0 ? 'mo' : 'yr')} />
                                )
                            }
                        </section>
                        <footer>
                            <Button type='go-back' action={goBackStep} />
                            <Button type='go-next' action={nextStep} />
                        </footer>
                    </div>
                    <div className='step-container' style={(step === 4) ? { 'display': 'block' } : { 'display': 'none' }}>
                        <HeaderForm
                            title='Finishing up'
                            desc='Double-check everything looks OK before confirming.' />
                        <section>
                            <div className='tableInformation'>
                                <div className='rowInformation'>
                                    <div>
                                        <strong>{`${cap_name(PLANS[plan].name)} (${time === 0 ? 'monthly' : 'yearly'})`}</strong>
                                        <span onClick={toggleTime}>change</span>
                                    </div>
                                    <div>{`$${PLANS[plan].price[time]}/${time === 0 ? 'mo' : 'yr'}`}</div>
                                </div>
                                <span className='line' style={adds.length ? { 'display': 'block' } : { 'display': 'none' }}></span>
                                {
                                    adds.map((add, key) =>
                                        <div className='rowInformation' id={`item_${key}`}>
                                            <div>{ADD_ONS[add].name}</div>
                                            <div>+${ADD_ONS[add].price[time]}/{time === 0 ? 'mo' : 'yr'}</div>
                                        </div>)
                                }
                            </div>
                            <div className='rowInformation totalInformation'>
                                <div>Total (per {time === 0 ? 'month' : 'year'})</div>
                                <div>+${calculate_total(time)}/{time === 0 ? 'mo' : 'yr'}</div>
                            </div>
                        </section>
                        <footer>
                            <Button type='go-back' action={goBackStep} />
                            <Button type="confirm" action={nextStep} />
                        </footer>
                    </div>
                    <div className='step-container' style={(step === 5) ? { 'display': 'block' } : { 'display': 'none' }}>
                        <div className='thank-you-container'>
                            <div>
                                <img src={ThankUIcon} alt='thank' />
                                <strong>Thank you!</strong>
                                <p>
                                    Thanks for confirming your subscription! We hope you have fun
                                    using our platform. If you ever need support, please feel free
                                    to email us at support@loremgaming.com.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}