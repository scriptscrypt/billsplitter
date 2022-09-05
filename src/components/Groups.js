import React,{useState, useRef} from 'react';
import { Badge,Table, Button, Alert, Spinner} from 'react-bootstrap';
import { doc, getDoc} from "firebase/firestore"; 
import { db} from '../firebase';
import { getAuth } from "firebase/auth";

export default function Groups() {
    const [loading, setLoading] = useState(false)
    const [visibility, setVisibility] = useState("invisible")
    const userEmail = useRef('')
    const userId = useRef('')
    const gName = useRef("GROUPS")
    const p1Name = useRef(''); const p2Name = useRef('');  const p3Name = useRef('');
    const p4Name = useRef(''); const p5Name = useRef('');

    const p1PendingAmt = useRef(''); const p2PendingAmt = useRef('');  const p3PendingAmt = useRef('');
    const p4PendingAmt = useRef(''); const p5PendingAmt = useRef('');
 
    const p1Status = useRef('Pending'); const p2Status = useRef('Pending');  const p3Status = useRef('Pending');
    const p4Status = useRef('Pending'); const p5Status = useRef('Pending');

    function fetchUserId(){
        //Fetch current userId
        try{
           const auth = getAuth();
           const user = auth.currentUser;
           userId.current = user.uid;
           console.log(userId.current)
           }
         catch(err){
             console.log("Failed getting user id", err)
           }
      
        fetchUserEmail();
        setLoading(true)
        setVisibility("invisible")
        }

     async function fetchUserEmail(){
        //Fetch current user email id linked to user id
        await getDoc(doc(db, "users", userId.current)).then(docData => { 
          if(docData.exists()){
            userEmail.current = docData.data().email;
            console.log(userEmail.current)
            } 
            else {
            alert("No data found")
             }   
            }).catch((err)=>{
                console.log(err)        
            })
            fetchUserDetails();

    }
    
     async function fetchUserDetails(){
    //Fetch current groups linked to user email id
       await getDoc(doc(db, "groups", userEmail.current)).then(docData => {
          
            if (docData.exists()) {
            gName.current = docData.data().group.name 
            p1Name.current = docData.data().group.p1.name
            console.log(p1Name.current)
            p1PendingAmt.current = docData.data().group.p1.pendingAmt;
            if(docData.data().group.p1.paid === "yes"){
                p1Status.current = "Paid"
            }
            p2Name.current = docData.data().group.p2.name
            p2PendingAmt.current = docData.data().group.p2.pendingAmt;
            if(docData.data().group.p2.paid === "yes"){
                p2Status.current = "Paid"    
            } 
            p3Name.current = docData.data().group.p1.name
            p3PendingAmt.current = docData.data().group.p1.pendingAmt;
            if(docData.data().group.p3.paid === "yes"){
                p3Status.current = "Paid"    
            }
            p4Name.current = docData.data().group.p1.name
            p4PendingAmt.current = docData.data().group.p1.pendingAmt;
            if(docData.data().group.p4.paid === "yes"){
                p4Status.current = "Paid"    
            }
            p5Name.current = docData.data().group.p1.name
            p5PendingAmt.current = docData.data().group.p1.pendingAmt;
            if(docData.data().group.p5paid === "yes"){
                p5Status.current = "Paid"    
            }
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
        setLoading(false)
        setVisibility("visible")
    }

  return (
    <>

    <Alert className='mt-4'>{gName.current}</Alert>  
    <Button className="w-100 mt-2" onClick={fetchUserId}>Fetch details</Button> <br/>
    
    {loading && <Spinner className="mt-4" animation="grow"/>}

    <Table className={`mt-4 ${visibility}`} striped bordered >
    <thead>
        <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Status</th>
        </tr>
    </thead>
    
    <tbody>
        <tr>
          <td>{p1Name.current}</td>
          <td>{p1PendingAmt.current}</td>
          <td><Badge bg="danger">{p1Status.current}</Badge></td>
        </tr>
        <tr>
          <td>{p2Name.current}</td>
          <td>{p2PendingAmt.current}</td>
          <td><Badge bg="danger">{p2Status.current}</Badge></td>
        </tr>
        <tr>
          <td>{p3Name.current}</td>
          <td>{p3PendingAmt.current}</td>
          <td><Badge bg="danger">{p3Status.current}</Badge></td>
        </tr>
        <tr>
          <td>{p4Name.current}</td>
          <td>{p4PendingAmt.current}</td>
          <td><Badge bg="danger">{p4Status.current}</Badge></td>
        </tr>
        <tr>
          <td>{p5Name.current}</td>
          <td>{p5PendingAmt.current}</td>
          <td><Badge bg="danger">{p5Status.current}</Badge></td>
        </tr>
    </tbody>
    </Table>

    </>
  )
}
