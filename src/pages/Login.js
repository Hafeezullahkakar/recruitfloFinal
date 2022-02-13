import { ArrowForward, ArrowRight } from "@mui/icons-material";
import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import BcImage from "../assets/backImg.svg";
import axios from "axios";

function Login() {
  const[error,setError]= useState(false); 
  const [myemail, setEmail] = useState("");
  const [mypassword, setPassword] = useState("");

  const data ={
    email:myemail,
    password:mypassword,    
    returnSecureToken: true    
  }

 let webApi_key = "AIzaSyDF6Sb22x0ZjplAfRKllT8OfpkiJ9TJ1uY";
  const APiurl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${webApi_key}`;
  


  const handleSubmit = async (e) => {
    e.preventDefault();   
    await axios
    .post(APiurl, data)
    .then((res) => {
      setError(false);
      console.log("response:",res);
     window.location.replace("/dashboard");

    })
    .catch((err) => {
        setError(true);             
       console.log(err);
    });}

    
  return (
    <div
      className="flex flex-row h-screen w-screen relative bg-white "
      style={{ overflow: "hidden" }}
    >
      <div className="bg-white w-[400px] h-[500px] mt-[60px] ml-[80px] absolute z-10 shadow-xl">
        <div className="h-[5px] w-[400px] bg-[#6169F6]"></div>
        <div className="w-[400px] h-[500px] flex flex-col items-center">
          <div className="flex flex-col justify-center items-start">
            <p
              className="my-4"
              style={{
                fontFamily: "Lato",
                fontSize: "24px",
                fontWeight: "700px",
                color: "#6C7989",
              }}
            >
              Sign In to RecruitFlo
            </p>

            <input
              className="p-2 w-[300px] h-[50px] my-2 bg-white rounded border-[1px] border-sky-200"
              placeholder="Email Address"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-2 w-[300px] h-[50px] my-2 bg-white rounded border-[1px] border-sky-200"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
             
             {
               error ? (
                 <>
                <button onClick={handleSubmit} className="p-2 w-[300px] h-[50px] my-2 bg-[#6169F6] text-white rounded border-[1px] border-sky-200">
                Sign In
              </button>
              <p className ="text-red-500 mb-2">Password or email is not correct </p>
                 </>

               ) : (
                  <>
                 <button onClick={handleSubmit} className="p-2 w-[300px] h-[50px] my-2 bg-[#6169F6] text-white rounded border-[1px] border-sky-200">
               Sign In
             </button>
                  </>
             )
            }
            
            

           
             
              {/* <p className="text-red-500">Invalid Email or Password</p> */}
          

            
            
            <a
              href="#"
              style={{
                fontFamily: "Lato",
                fontSize: "15px",
                fontWeight: "400px",
                color: "#6C7989",
              }}
            >
              Forget Password?
            </a>
          </div>

          <div className="mt-[60px] flex flex-row justify-between items-center p-2 px-2 w-[300px] h-[50px] my-2 bg-[#E5E8ED] rounded">
            <button className="  text-[#6C7989] ">Create New Account</button>
            <ArrowForward style={{ color: "#6C7989" }} />
          </div>
        </div>
      </div>
      <div className="bg-white w-[400px]"></div>
      <div className="" style={{width:'100vw',height:'auto', background: `url(${BcImage})`,objectFit:'cover',objectPosition:'top left'}}>
        <div className="flex flex-col justify-center items-center text-white h-screen w-full" style ={{background:'rgba(0, 0, 0, 0.5)',color:'white'}}>
        <h1
        style={{
            marginTop:'200px',
            marginLeft:'100px',
            width:'600px',
            color:'white',
            opacity:'1',
            fontFamily: "Lato",
            fontSize: "50px",
            fontWeight: "bold",
            lineHeight:'150%',
            
          }}
        >We help you recruit track athletes</h1>
        <p
        style={{
            width:'600px',
            marginLeft:'100px',
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "normal",
            lineHeight:'150%',
            
          }}
        >Browse through athletes,  and search for the criteria needed to recruit athletes for your program.</p>
        </div>
      </div>
    </div>
  );
}

export default Login