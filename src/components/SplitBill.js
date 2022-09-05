import React, {useState, useRef} from 'react';
import {InputGroup, Form, Button, Alert,FloatingLabel, Row, Col, Spinner} from "react-bootstrap"
import { db} from '../firebase';
import { doc, setDoc, getDoc, updateDoc, addDoc, collection} from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

export default function SplitBill() {

    const [visibility, setVisibility] = useState("visible")
    const userEmail = useRef('');
    const userId = useRef("");
    const amount = useRef(0)
    const people = useRef(0)
    const [perPerson, setPerPerson] = useState(0);
  //Initializing and creating name and email instances  
    const p1Name = useRef(''); const p2Name = useRef('');  const p3Name = useRef('');
    const p4Name = useRef(''); const p5Name = useRef('');
   
    const p1Email = useRef(''); const p2Email = useRef('');  const p3Email = useRef('');
    const p4Email = useRef(''); const p5Email = useRef('');
    const gName = useRef('');
    
    function handleSubmit(e){
        e.preventDefault();
        setVisibility("invisible")
        setPerPerson(amount.current.value / people.current.value)
        console.log(perPerson)
        addToDb();
    }
      async function addToDb(){
        try{
          const auth = getAuth();
          const user = auth.currentUser;
          userId.current = user.uid;
          console.log(userId.current);
          }
        catch(err){
            console.log("Failed getting user id", err)
          }
        await getDoc(doc(db, "users", userId.current)).then(docData =>{
          if(docData.exists()){
              userEmail.current = docData.data().email;
            }
          else {
              alert("No data found with username")
          }}).catch((error) => {
              // The write failed...
              console.log(error);
          })    
          //Add here
          addToEmail()
      } 
      
   
      async function addToEmail(){
    
      await setDoc(doc(db, "groups", userEmail.current),{

              group: { name:gName.current.value,    
              people: people.current.value, 
              totAmount: amount.current.value,  
              p1:{name:p1Name.current.value, email: p1Email.current.value, pendingAmt: perPerson, paid: "no"},         
              p2:{name:p2Name.current.value, email: p2Email.current.value, pendingAmt: perPerson, paid: "no"},         
              p3:{name:p3Name.current.value, email: p3Email.current.value, pendingAmt: perPerson, paid: "no"},         
              p4:{name:p4Name.current.value, email: p4Email.current.value, pendingAmt: perPerson, paid: "no"},         
              p5:{name:p5Name.current.value, email: p5Email.current.value, pendingAmt: perPerson, paid: "no"},
          },
          created: new Date(),
      }).then(()=>{
        addToPending(p1Email.current.value);
        addToPending(p2Email.current.value);
        addToPending(p3Email.current.value);
        addToPending(p4Email.current.value);
        addToPending(p5Email.current.value);
        console.log("Data submitted")
      })     
      .catch((err)=>{
        console.log("Can't store in database", err)
      }).finally(setVisibility("visible"))
  
    }

    //Set new Document pending and append values
     function addToPending(varMail){
      setDoc(doc(db, "pending", varMail),{ 
      group:{ 
      name: gName.current.value,
      toUserEmail: userEmail.current,
      toAmt: perPerson,
      created: new Date(),
      }
      })
    }


  return (
    <>
    <Alert className='mt-4'>CREATE A GROUP</Alert>  
    <Form onSubmit={handleSubmit}>
    <FloatingLabel
        controlId="floatingInput"
        label="Group Name"
        className="mb-3"
      >
        <Form.Control  type="text" ref={gName} placeholder="Group Name" />
      </FloatingLabel>
      <Row className="g-2">
        <Col md>
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">
                    Total Money Spent
            </InputGroup.Text>
        <Form.Control id="" ref={amount} required aria-describedby="basic-addon3" />
       </InputGroup>
     
        <InputGroup className="mb-3">
            <InputGroup.Text  id="basic-addon3">
            Number of people
            </InputGroup.Text>
        <Form.Control id="" type="number" required ref={people} aria-describedby="basic-addon3" />
        </InputGroup>

        </Col>
      </Row>

   {/* <Alert className="mt-2" variant={"primary"}>{perPerson}</Alert> */}

    <Row>
     <Col>
        <Form.Control required ref={p1Name} placeholder="Name"/> 
      </Col>
      <Col>
        <Form.Control required ref={p1Email} placeholder="Email"/> 
      </Col>
    </Row>  

    <Row>
     <Col>
        <Form.Control required ref={p2Name} placeholder="Name"/> 
      </Col>
      <Col>
        <Form.Control required ref={p2Email}  placeholder="Email"/> 
      </Col>
    </Row>    

    <Row>
     <Col>
        <Form.Control required ref={p3Name} placeholder="Name"/> 
      </Col>
      <Col>
        <Form.Control required ref={p3Email} placeholder="Email"/> 
      </Col>
    </Row>  

    <Row>
     <Col>
        <Form.Control required ref={p4Name} placeholder="Name"/> 
      </Col>
      <Col>
        <Form.Control required ref={p4Email} placeholder="Email"/> 
      </Col>
    </Row>  

    <Row>
     <Col>
        <Form.Control required ref={p5Name} placeholder="Name"/> 
      </Col>
      <Col>
        <Form.Control required ref={p5Email} placeholder="Email"/> 
      </Col>
    </Row>  
       
    
    {visibility==="invisible" && <Spinner className='mt-4' animation="grow"/>}
    {visibility==="visible" && <Button type="submit" className='mt-4 w-100'> Split</Button>}
    
    </Form>
  
  </>
  )
} 