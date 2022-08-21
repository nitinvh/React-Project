import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignupPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [city, setCity] = useState('');
    const [status,setStatus] = useState(false);
    const [msg, setMsg] = useState("");
    const handleChange= (e)=>{
        if(e.target.name === "name"){
            setName(e.target.value);
        }
        if(e.target.name === "email"){
            setEmail(e.target.value);
        }
        if(e.target.name === "password"){
            setPwd(e.target.value); 
        }
        if(e.target.name === "city"){
            setCity(e.target.value);
        }
        
    }
   //console.log(email, pwd);
   const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("hi")
    const data = {
        name: name,
        email:email,
        password:pwd,
        city: city
    }
    fetch("http://localhost:3001/signup",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{'Content-type': 'application/json'}
    }).then((res)=>res.json()).then((res)=>{
        setStatus(res.status)
        setMsg(res.msg);
    }).catch((err)=> console.log(err)); 
   }

   const handleUserExist=()=>{
    setStatus(true);
   }

   if(status){
    navigate("/login");
    }
    
    return ( <div>
        <h1 className="text-white text-center mt-5">Sign-Up Page</h1>
        <div className="d-flex justify-content-center">
        <form className="mt-5 bg-white p-5 pb-3 w-25 rounded" onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="#name" className="d-block  mt-4">Name</label>
            <input type="text" id="name" name="name" className="p-2 w-100 rounded" placeholder="name" onChange={(e)=>handleChange(e)} required />
            <label htmlFor="#email" className="d-block  mt-4">Email</label>
            <input type="email" id="email" name="email" className="p-2 w-100 rounded" placeholder="email" onChange={(e)=>handleChange(e)} required />
            <label htmlFor="#password" className="d-block  mt-4">Password</label>
            <input type="password" id="password" name="password" className="p-2 w-100 rounded" placeholder="password" onChange={(e)=>handleChange(e)} required />
            <label htmlFor="#city" className="d-block  mt-4">City</label>
            <input type="text" id="city" name="city" className="p-2 w-100 rounded" placeholder="city" onChange={(e)=>handleChange(e)} required />
            <div>
                <p className="text-danger fs-6 text-center">{msg}</p>
            </div>
            <div className="mt-5 text-end">
                {msg==="user already exists"? <button className="btn btn-primary me-3" onClick={handleUserExist}>Login</button>:""}
                <button className="btn bg-dark text-white">Register</button>
            </div>
        </form>
        </div>
    </div> );
}
 
export default SignupPage;