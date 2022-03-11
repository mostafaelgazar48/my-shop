import React, {useState} from 'react';
import FormContainer from "../components/UI/FormContainer";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../redux/cart/cartActions";
import {useHistory} from "react-router-dom";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";

const ShippingPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector(state =>state.cart);
    const {shippingAddress} = cart;
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, postalCode, country, city}))
        history.push('/payment')
    }

    return (
        <>
        <CheckoutSteps step1 step2 />

        <form onSubmit={submitHandler}>
            <FormContainer>
                <Form.Group>
                    <Form.Label>address </Form.Label>
                    <Form.Control type="text" placeholder="Enter your Address" value={address} required
                                  onChange={(e) => setAddress(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>City </Form.Label>
                    <Form.Control type="text" placeholder="Enter your City" value={city} required
                                  onChange={(e) => setCity(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Postal Code  </Form.Label>
                    <Form.Control type="text" placeholder="Enter your postal code" value={postalCode} required
                                  onChange={(e) => setPostalCode(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Country  </Form.Label>
                    <Form.Control type="text" placeholder="Enter your Country" value={country} required
                                  onChange={(e) => setCountry(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" className='my-3' type="submit">
                    Keep Going
                </Button>
            </FormContainer>
        </form>
        </>
    );
};

export default ShippingPage;