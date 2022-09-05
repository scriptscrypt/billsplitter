import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate} from "react-router-dom"
import { db} from '../firebase';
import { getAuth } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"; 

// import {createUserDocument} from "../firebase"

 function Signup(){
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const passwordConfirmRef = useRef();

    const { signup } = useAuth();  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const userId = useRef("");

    async function handleSubmit (e) {
        e.preventDefault();
        // const {email, password, displayName} = user;
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match");
        }
        try{
            setError('')
            setLoading(true)           
            await signup(emailRef.current.value, passwordRef.current.value)
            console.log("Signed up, redirecting to login page")
            storeInDb()
            navigate("/login", { replace: true })

        }catch(err){
            setError("Failed to create an account",err);
        }
            setLoading(false)
    }

   function storeInDb(){
        console.log("In function storeInDb")

            const auth = getAuth();
            const user = auth.currentUser;

            //Error coming here 
            userId.current = user.uid;
            console.log(userId.current)
            
            // catch(err){
            //   console.log("Failed getting user id", err)
            // }

           //Saving signed up details to database
                setDoc(doc(db, "users", userId.current), {
                    username: usernameRef.current.value,
                    email: emailRef.current.value,
                }).then(() => { 
                    // Data saved successfully!
                    console.log('data submitted')}) 
                .catch((error) => {
                    // The write failed...
                    console.log("Failed to store user data",error)})
        
        setLoading(false)
        }
        
  
  return (
    <>

    <Container className="d-flex flex-column align-items-center justify-content-center mt-4"  > 
      <Card className=''>
        <Card.Body>
            <h2 className='text-center mb-4'>SignUp</h2>
        
            {error && <Alert variant="danger">{error}</Alert>} 
           
            <Form onSubmit={handleSubmit}>
                <Form.Group id="dName">
                    <Form.Label>Username</Form.Label>
                     <Form.Control type="text" ref={usernameRef} required /> 
                </Form.Group>

                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                     <Form.Control type="email" ref={emailRef} required /> 
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                     <Form.Control type="password" ref={passwordRef} required /> 
                </Form.Group>

                <Form.Group id="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                     <Form.Control type="password" ref={passwordConfirmRef} required /> 
                </Form.Group>

                <Button disabled={loading} className="w-100 mt-4" type="submit">Sign up</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Login</Link>
        </div>
    </Container>
    </>
  )
}

export default Signup;