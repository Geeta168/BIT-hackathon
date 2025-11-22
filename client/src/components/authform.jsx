import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import './authform.css';
import { useTranslation } from "react-i18next";



export default function Authform(){
    
    const[isLogin,setIsLogin]=useState(true);

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
<<<<<<< HEAD
    const navigate = useNavigate();  //hook to navigate to different route

=======
    const navigate=useNavigate();
>>>>>>> 21bfc8e17500e38d45349fb7fe658fe686bfb231
    //login function
    const handleLogin=async()=>{
        const res=await fetch("http://localhost:4000/login",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify({email,password})
        });
<<<<<<< HEAD
     
        const data=await res.json();
        console.log(data);

         if (data.message === "login successful") {     
        navigate("/dashboard");    
    } else {
        alert(data.message); 
    }
    }
=======
        
        const data=await res.json();
        console.log(data);

        if(data.message==="login successful"){
            return navigate("/dashboard");
        }
        else{
            alert("invalid login");
            }
        }
    
>>>>>>> 21bfc8e17500e38d45349fb7fe658fe686bfb231


   //signup function
   const handleSignup = async () => {
    const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //“I’m sending JSON data.”
        body: JSON.stringify({ email, password })  //This is the actual data sent to the server,
    });

    const data = await res.json();
    console.log(data);

    if (data.message === "Signup successful") {
        navigate("/dashboard");    
    } else {
        alert(data.error); 
    }
};



    return (
        <>
        
        

        <div className='container'>
            <div className='form-container'>
                
                <div className="form-toggle">
                    <button className={isLogin ? 'active': ""} onClick={()=>setIsLogin(true)}>{t("Login")}</button>
                    <button className={!isLogin ? 'active':""} onClick={()=>setIsLogin(false)}>Signup</button>
                </div>
                {isLogin ? <>
                <div className="form">
                    <h2>Login Form</h2>
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <a href="#">Forgot password?</a>
                    <button onClick={handleLogin}>Login</button>
                    <p>not a member?<a href="#"onClick={()=>
                        setIsLogin(false)
                    }> Signup now</a></p>
                    </div></>:<>
                    <div className="form">
                    <h2>Signup Form</h2>
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <input type="text" placeholder="confirm password"/>
                    <button onClick={handleSignup}>Signup</button>
                    </div>
                    </>
                    }
                    
                  {/* <div>
                    <button onClick={()=>{navigate(/home)}}>
                        logout
                    </button>
                  </div> */}
            </div>
        </div>
        </>
    )
}