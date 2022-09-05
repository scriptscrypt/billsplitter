import React,{useState, useRef} from 'react';
import {ListGroup, Button, Badge, Alert, Spinner} from "react-bootstrap"
import { db} from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Pending() {

    const [payError, setPayError] = useState("")
    const [payRes, setPayRes] = useState("PayNow")
    const [btnRes, setBtnRes] = useState(false);
    const userId = useRef('');
    const userEmail = useRef('');
    const g1Name = useRef(''); const toP1Amt = useRef(''); const toP1Email = useRef('');
    const g2Name = useRef(''); const toP2Amt = useRef(''); const toP2Email = useRef('');
    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState("invisible");

function getData(){
addToDb()
setLoading(true)
// setVisibility("invisible")
}
function addToDb(){
        try{
          const auth = getAuth();
          const user = auth.currentUser;
          userId.current = user.uid;
          console.log(userId.current);
          }
        catch(err){
            console.log("Failed getting user id", err)
          }
          getUserEmail();
}
async function getUserEmail(){
await getDoc(doc(db, "users", userId.current)).then(docData =>{
          if(docData.exists()){
              userEmail.current = docData.data().email;
              console.log(userEmail.current)
            }
          else {
              alert("No data found with username")
              console.log('No such a data!');
          }}).catch((error) => {
              // The write failed...
              console.log(error);
          })  
          getPendingDetails();  
}
async function getPendingDetails(){

  await getDoc(doc(db, "pending", userEmail.current)).then(docData =>{
    if(docData.exists()){
          g1Name.current = docData.data().group.name;
          toP1Amt.current = docData.data().group.toAmt;
          toP1Email.current = docData.data().group.toUserEmail;

          g2Name.current = docData.data().group.name;
          toP2Amt.current = docData.data().group.toAmt;
          toP2Email.current = docData.data().group.toUserEmail;
          }
    else {
      alert("No data found with username")
      console.log('No such a data!');
   }}).catch((error) => {
      console.log(error);
  })  
  setLoading(false)
  setVisibility("visible")
}

//Payment integration
    const loadScript = (src) =>{
        return new Promise((resolve)=>{
            const script = document.createElement('script')
            script.src = src

            script.onload = () =>{
                resolve(true)
            }
            script.onError = () =>{
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

const getRazorPay = async (amount) =>{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res){
          setPayError("Payment failed due to Bad network")
          return;
        }
const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      currency: "INR",
      amount: amount * 100,
      name: "Bill splitter",
      description: "Thank you for choosing us",

      handler: function(response) {
          setPayRes("Paid");
          setBtnRes(true)
          alert("Payment Successful", response.razorpay_payment_id);
      },
      prefill:{
          name: "Bill Splitter"
      }     
      }   
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      }
      

  return (
    <>
     <Alert className='mt-4 w-100'>YET TO PAY</Alert>  
      <Button onClick={getData} className="w-100 mt-2">Pending Transactions</Button> <br/>
        {loading && <Spinner className='mt-4' animation="grow"/>}
    <ListGroup className={visibility}> 
            {payError && <Alert>{payError}</Alert>}
            <ListGroup.Item className="mt-4 "> 
            {g1Name.current} 

            <Badge variant='success' > Rs. {toP1Amt.current} </Badge> 
            <Button  className="w-72" variant='danger' disabled={btnRes} onClick={() =>getRazorPay(toP1Amt.current)}>{payRes}</Button>
    </ListGroup.Item>   
              
    </ListGroup>
    </>
  )
}
