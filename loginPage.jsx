import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [status,setStatus] = useState(false);
    const [msg, setMsg] = useState("");
    const handleChange= (e)=>{
        if(e.target.name === "email"){
            setEmail(e.target.value);
        }
        if(e.target.name === "password"){
            setPwd(e.target.value); 
        }
        
    }
    const handleRedirect= ()=>{
        navigate("/signup");
    }
   //console.log(email, pwd);
   const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("hi")
    const data = {
        email:email,
        password:pwd
    }
    fetch("http://localhost:3001/signin",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{'Content-type': 'application/json'}
    }).then((res)=>res.json()).then((res)=>{
        setStatus(res.status)
        setMsg(res.msg);
        if(res.status){
            localStorage.setItem("token", res.token);
        }
    }).catch((err)=> console.log(err)); 
   }
   if(status){
    navigate("/home");
    }
    if(msg === "activated succefully"){
        navigate("/home");
    }
    const handleActivate = ()=>{
        axios.post("http://localhost:3001/activate",{
            "email":email,
            "password":pwd
        }).then((res)=> {
            setMsg(res.data.msg);
        }).catch((err)=> console.log(err));
    }
   
    return ( <div>
        <h1 className="text-white text-center mt-5">Login Page</h1>
        <div className="d-flex justify-content-center">
        <form className="mt-5 bg-white p-5 pb-4 w-25 rounded" onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="#email" className="d-block  mt-4">Email</label>
            <input type="email" id="email" name="email" className="p-2 w-100 rounded" placeholder="email" onChange={(e)=>handleChange(e)} required />
            <label htmlFor="#password" className="d-block  mt-4">Password</label>
            <input type="password" id="password" name="password" className="p-2 w-100 rounded" placeholder="password" onChange={(e)=>handleChange(e)} required />
            <div className="mt-5 text-end mb-4">
                <button className="btn btn-dark text-white">Login</button>
            </div>
            <div className="text-center">
                <hr />
                <p className="text-danger fs-6">{msg}</p>
                <p className="text-dark fs-6">New user?</p>
                {msg==="Activate your account to login"?<button className="btn btn-primary me-3" onClick={handleActivate}>Activate</button>:""}
                <button className="btn btn-dark text-white" onClick={handleRedirect}>SignUp</button>
            </div>
        </form>
        </div>
    </div> );
}
 
export default LoginPage;