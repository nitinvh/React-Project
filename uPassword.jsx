import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UPassword = () => {
    const [pwd,setpwd] = useState('');
    const navigate = useNavigate();
    const handleBack = ()=>{
        navigate("/userprofile");
    }

    const handleChange = (e)=>{
        if(e.target.name === "password"){
            setpwd(e.target.value);
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/upassword",{
            "password": pwd
        },{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res)=> navigate("/")).catch((err)=> console.log(err));
    }
    console.log(pwd);
    return ( 
    <div className="container mt-4">
        <button className="btn btn-dark" onClick={handleBack}>Back</button>
        <h1 className="text-white text-center mt-5">Update Password</h1>
        <div className="d-flex justify-content-center">
            <form className="mt-5 bg-white p-5 pb-4 w-50 rounded" onSubmit={(e)=> handleSubmit(e)}>
                <label htmlFor="#password" className="d-block  mt-4">Password</label>
                <input type="password" id="password" name="password" className="p-2 w-100 rounded" placeholder="password" required onChange={(e)=> handleChange(e)} />
                <div className="mt-5 text-end mb-4">
                    <button className="btn btn-dark text-white">Update</button>                
                </div>
            </form>
        </div>
    </div> );
}
 
export default UPassword;