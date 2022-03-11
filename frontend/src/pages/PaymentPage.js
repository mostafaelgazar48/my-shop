import React, {useState} from 'react';
import FormContainer from "../components/UI/FormContainer";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import {Button, Col, Form, FormCheck, FormGroup, FormLabel} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {savePaymentMethod} from "../redux/cart/cartActions";

const PaymentPage = () => {
    const history=  useHistory();
    const dispatch = useDispatch();
    const cart = useSelector(state =>state.cart);
    const {shippingAddress} =  cart;

    if(!shippingAddress){
            history.push('/shipping');
    }
    const [paymentMethod,setPaymentMethod] =useState('PayPal');


    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder')
    }

    return (
       <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <h2>Payment Method</h2>
                <FormGroup>
                    <FormLabel as='legend'> Select Method</FormLabel>
                    <br/>
                </FormGroup>
                <Col>
                <FormCheck
                    type='radio'
                    name='paymentMethod'
                    id='paypal'
                    label='PayPal or Credit'
                    checked
                    value='PayPal'
                    onChange={ event => setPaymentMethod(event.target.value)}

                />
                </Col>
                <Button type='submit' variant='primary'>
                    Keep Going
                </Button>
            </Form>
       </FormContainer>
    );
};

export default PaymentPage;