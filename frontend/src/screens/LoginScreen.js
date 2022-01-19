import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ history, location }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)

    const { loading, error, userInfo } = userLogin

    const redirect1 = useLocation().search

    const redirect = redirect1 ? redirect1.split('=')[1] : '/'

    // const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && (
                <Message variant='danger'>
                    {error}
                </Message>
            )}
            {loading && (
                <Loader />
            )}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email' >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button style={{ marginTop: '10px' }} type='submit' variant='primary'>
                    Sign In
                </Button>

            </Form>
            <Row className='py-3'>
                {/* <Col>
                    New Customer? <Link style={{ textDecoration: "none" }} to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col> */}
                <Col>
                    New Customer?{" "}
                    <Link style={{ textDecoration: "none" }} to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen