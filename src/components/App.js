import React from "react";
import Login from "./Login"
import Dashboard from "./Dashboard"
import Receive from "./Receive"
import Send from "./Send"
import Signup from "./Signup";
import {Container} from "react-bootstrap"
import { AuthProvider } from "../context/AuthContext";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile";
import Profile from "./Profile";
import Groups from "./Groups"
function App() {
  return (
    <AuthProvider>
        <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100"> 
        <Router>

            <AuthProvider>
                  <Routes>
                    <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>
                          <Route path="/send" element={<PrivateRoute> <Send /> </PrivateRoute>}></Route>
                          <Route path="/receive" element={<PrivateRoute> <Receive /> </PrivateRoute>}></Route>
                          <Route path="/groups" element={<PrivateRoute> <Groups /> </PrivateRoute>}></Route>
                    </Route>
                    <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>}></Route>
                    <Route path="/updateProfile" element={<PrivateRoute> <UpdateProfile /> </PrivateRoute>}></Route>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="forgotPassword" element={<ForgotPassword/>} />
                  </Routes>
            </AuthProvider>
            
        </Router>
          </div>
        </Container>
    </AuthProvider>
  );
}

export default App;
