import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, FormText, Spinner} from "react-bootstrap";
import FormContainer from "../components/UI/FormContainer";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/UI/Message";
import {register} from "../redux/user/userActions";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessgae] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const {userData, loading, error} = userLogin;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const redirect = urlParams.get('redirect') ? urlParams.get('redirect') : '/'
    let token;
    if (userData && userData.token) {
        token = userData.token;
    }
    //.log(userData!==0)
    useEffect(() => {
        if (token) {
            history.push(redirect)
        }
    }, [redirect, history, token])
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessgae('Passwords dosn`t match')
        } else {
            dispatch(register(name, email, password))

        }
    }
    return (
        <FormContainer classname='my-auto'>
            <h2>Sign Up</h2>
            {error && <Message variant='danger'> {error}</Message>}
            {message && <Message variant='danger'> {message}</Message>}
            {loading && <Spinner animation="grow" />}
            {(userData && userData.message) && <Message variant='danger'> {userData.message}</Message>}

            <Form onSubmit={submitHandler}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name </Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" value={name}
                                  onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                                  onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}/>
                </Form.Group>

                <FormGroup className='my-3'>
                    <FormText>Already a member? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></FormText>
                </FormGroup>
                <Button variant="primary" type="submit">
                  Register
                </Button>
            </Form>
        </FormContainer>
    );
};

export default RegisterPage;