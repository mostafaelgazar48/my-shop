import React, {useEffect, useState} from 'react';
import FormContainer from "./UI/FormContainer";
import Message from "./UI/Message";
import {Button, Form, FormGroup, FormText} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, updateUserProfile} from "../redux/user/userActions";

const UserProfileForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const {userData} = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const {user, error} = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {success} = userUpdateProfile;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const redirect = urlParams.get('redirect') ? urlParams.get('redirect') : '/'
    let token;
    if (userData && userData.token) {
        token = userData.token;
    }
    //.log(userData!==0)
    useEffect(() => {
        if(!token){
            history.push('/login')
        }
            if (user &&!user.name){
                dispatch(getUserDetails('profile'))
            }else {
                setName(user.name);
                setEmail(user.email)
            }

    }, [history, token,dispatch,user])
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords dosn`t match')
        } else {
        dispatch(updateUserProfile({id:user._id,name,email, password}))
        }
    }
    return (
        <FormContainer classname='my-auto'>
          {user &&  <h2>Update Profile  - {user.name}</h2>}
            {error && <Message variant='danger'> {error}</Message>}
            {message && <Message variant='danger'> {message}</Message>}
            {success && <Message variant='success'> {`Profile Updated Successfully`}</Message>}
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
                    Update
                </Button>
            </Form>
        </FormContainer>
    );
};

export default UserProfileForm;