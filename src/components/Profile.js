import React, { useState } from 'react'
import {Card, Button,Alert, Container} from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"


const Profile = () => {
  const navigate = useNavigate();
  const[error, setError] = useState("");
  const {currentUser, logout} = useAuth();

  async function handleLogout(){
    setError("")

    try{
      await logout();
      navigate("/login", { replace: true });  
    }
    catch{
      setError("Failed to Logout")
    }
  }



  return (
    <>
    <div className="sticky-profile">
    <Container className="d-flex flex-column w-100">  
    
    <Card>  
          <Card.Body>
              <h2 className='text-center mb-4'>Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>} 
             
              <strong>Email: </strong> {currentUser.email}
              <Link to="/updateProfile" className="btn btn-primary w-100 mt-3" >Update Profile</Link>
          </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Logout</Button>
      </div>

      </Container>

      </div>
    </>
  )
}

export default Profile  