import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate } from "react-router-dom"


function Login(){
    let navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function handleSubmit (e) {
        e.preventDefault();

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/", { replace: true });  
        }
        catch(err){
            setError("Failed to Sign-in");
        }
            setLoading(false)
    }
  

  return (
    <>
         
    <Container className="d-flex flex-column align-items-center justify-content-center h100">  
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Login</h2>
        
            {error && <Alert variant="danger">{error}</Alert>} 
           
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                     <Form.Control type="email" ref={emailRef} required /> 
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                     <Form.Control type="password" ref={passwordRef} required /> 
                </Form.Group>

                <Button disabled={loading} className="w-100 mt-4" type="submit">Login</Button>
            </Form>
             
                <div className="w-100 text-center mt-2">
                    <Link to="/forgotPassword" >Forgot Password?</Link>
                </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
            New user? <Link to="/signup">Sign up </Link> 
        </div>
    </Container>
  
    </>
  )
}

export default Login;