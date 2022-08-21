import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDetails = () => {
    const [dataId,setId]= useState("");
    const [dataFname,setFname]= useState("");
    const [dataEmail,setEmail]= useState("");
    const [dataRole,setRole]= useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
        if(e.target.name === "id" ){
            setId(e.target.value);
        }
        if(e.target.name === "fname" ){
            setFname(e.target.value);
        }
        if(e.target.name === "email" ){
            setEmail(e.target.value);
        }
        if(e.target.name === "role" ){
            setRole(e.target.value);
        }
    }
    console.log(dataRole);
    const handleSubmit = (e)=>{
        
        e.preventDefault();
        axios.post("http://localhost:3001/addDetails",{
            "userId": dataId,
            "fname": dataFname,
            "email": dataEmail,
           "role": dataRole
        }).then((res)=>navigate("/home")).catch((err)=> console.log(err));
       // console.log("i am hit")
    }
    const handleBack = ()=>{
        navigate("/home");
    }
    return ( <div className="mt-5 container">
        <button className="btn btn-dark" onClick={handleBack}>Back to Home</button>
        <h1 className="fs-4 bolder font-monospace text-white text-center">Add Contact</h1>
        <div className="d-flex justify-content-center">
        <form className="mt-5 bg-white p-5 w-50 rounded" onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="#id" className="d-block">ID</label>
            <input type="text" id="id" name="id" className="p-2 w-100 rounded" placeholder="id" onChange={(e)=> handleChange(e)} />
            <label htmlFor="#fname" className="d-block mt-4">Fname</label>
            <input type="text" id="fname" name="fname" className="p-2 w-100 rounded" placeholder="fname" onChange={(e)=> handleChange(e)} />
            <label htmlFor="#email" className="d-block  mt-4">Email</label>
            <input type="text" id="email" name="email" className="p-2 w-100 rounded" placeholder="email" onChange={(e)=> handleChange(e)} />
            <label htmlFor="#role" className="d-block  mt-4">Role</label>
            <input type="text" id="role" name="role" className="p-2 w-100 rounded" placeholder="role" onChange={(e)=> handleChange(e)} />
            <div className="mt-5 text-end">
                <button className="btn bg-dark text-white">Submit</button>
            </div>
        </form>
        </div>
    </div> );
}
 
export default AddDetails;