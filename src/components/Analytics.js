import React,{useState, useRef} from 'react'
import { Chart } from "react-google-charts";
import { doc, getDoc} from "firebase/firestore"; 
import { db} from '../firebase';
import { getAuth } from "firebase/auth";
import { Button, Alert, Spinner} from 'react-bootstrap';



export default function Analytics() {

    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState("visible");
    const [dataError, setDataError] = useState(false)
    const userEmail = useRef('')
    const userId = useRef('');
    const pendingGroupName = useRef(''); const pendingAmt = useRef(0);
  
    const spentGroupName = useRef(''); const spentAmt = useRef(0);
   

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
            fetchChartDetails();
    }
    async function fetchChartDetails(){
        //Fetch current user email id linked to user id
        await getDoc(doc(db, "pending", userEmail.current)).then(docData => { 
          if(docData.exists()){
          pendingAmt.current = docData.data().group.toAmt;
          pendingGroupName.current = docData.data().group.name;
          console.log(pendingAmt.current,  pendingGroupName.current)
        }
        else{
            setDataError(true);
            alert("No pending data");
        }
        }).catch((err)=>{
            console.log(err);
        })

        await getDoc(doc(db, "groups", userEmail.current)).then(docData => { 
            if(docData.exists()){
            spentAmt.current = docData.data().group.totAmount;
            spentGroupName.current = docData.data().group.name;
            console.log(spentAmt.current, spentGroupName.current)
          }
          else{
              setDataError(true);
              alert("No Spent data");
          }
          }).catch((err)=>{
              console.log(err);
          }).finally(
            setLoading(false),
            setVisibility("visible")
            )
    }


//Analytics ---
  const data = [
  ["Group", "Amount"],
  [pendingGroupName.current, pendingAmt.current],
  [spentGroupName.current, spentAmt.current],
];

 const options = {
  title: "Dashboard analytics",
  is3D: true,
};
//Analytics ---

  return (
    <>
    <Alert className='mt-4'>ANALYTICS</Alert> 
    <Button className="w-100 mt-2" onClick={fetchUserId}>Get analytics</Button>

    {loading && <Spinner className='mt-4' animation="grow"/>}

    {!dataError &&
    <Chart
      className={` ${visibility}`}
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"512px"}
    />
    }
    </>
  )
}
