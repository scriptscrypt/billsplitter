import React, { useRef } from 'react';
import {Badge, Button, ListGroup} from "react-bootstrap";
import { doc, getDoc} from "firebase/firestore"; 
import { db} from '../firebase';
import { getAuth } from "firebase/auth";

export default function YetToPay() {
    const userEmail = useRef('')
    const userId = useRef('')

    const p1Name = useRef(''); const p2Name = useRef('');  const p3Name = useRef('');
    const p4Name = useRef(''); const p5Name = useRef('');


    function fetchUserId(){
     //Fetch current userId
    try{
        const auth = getAuth();
        const user = auth.currentUser;
        userId.current = user.uid;
        console.log(userId.current.value)
        }
      catch(err){
          console.log("Failed getting user id", err)
        }
    }
       function fetchUserEmail(){
            //Fetch current user email id linked to user id
    getDoc(doc(db, "users", userId.current)).then(docData => { 
        if(docData.exists()){
            userEmail.current = docData.data().email;
        } 
        else {
        alert("No data found")
        console.log('No such a data!');
        }   
    }).catch((err)=>{
        console.log(err)
    })
    fetchUserDetails();
    }
  
    
    async function fetchUserDetails(){
        // Data saved successfully!
            await getDoc(doc(db, "persons", userEmail.current)).then(docData => { 
                // Data saved successfully!

                if (docData.exists()) {
                // console.log(docData.data().group.p1.name);
                p1Name.current = docData.data().group.p1.name;
                // p2Name.current = docData.data().p2.name;   
                // p3Name.current = docData.data().p3.name;   
                // p4Name.current = docData.data().p4.name;   
                // p5Name.current = docData.data().p5.name;   
                console.log("Data fetched successfully")     
                }
                else {
                    alert("No data found")
                console.log('No such a data!');
                }
            }).catch((error) => {
                    // The write failed...
                    console.log(error);
            })
        }

  return (
     <>
        <ListGroup.Item>{p1Name.current.value} <Badge bg="danger">Pending</Badge> </ListGroup.Item>
        <ListGroup.Item>{p2Name.current.value} <Badge bg="danger">Pending</Badge> </ListGroup.Item>
        <ListGroup.Item>{p3Name.current.value} <Badge bg="danger">Pending</Badge> </ListGroup.Item>
        <ListGroup.Item>{p4Name.current.value} <Badge bg="danger">Pending</Badge> </ListGroup.Item>
        <ListGroup.Item>{p5Name.current.value} <Badge bg="danger">Pending</Badge> </ListGroup.Item>
        <Button bg="primary mt-3" onClick={fetchUserId}>Fetch Data</Button>
        
    </>
  )
}