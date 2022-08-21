import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserProfile = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3001/getUserProfile",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then((res)=> {setData(res.data.profileData)}).catch((err)=> console.log(err));
    },[]);
    const handleBack = ()=>{
        navigate("/home");
    }

    const handleUPassword = ()=>{
        navigate("/upassword");
    }

    const handleDeactivate= ()=>{
        axios.get("http://localhost:3001/deactivate",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then((res)=> navigate("/")).catch((err)=> console.log(err));
    }

    return ( 
    <div className="container mt-5">
        <button className="btn btn-dark" onClick={handleBack}>Back to Home</button>
        <div className="text-center mt-5">
            <img className="profile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMM7C-JMBgnTwYjpOHc-PRI6mDiVkFfafHNg&usqp=CAU" alt="" />
            <h1 className="fs-5 mt-3 text-white">Hello <span className="text-primary">{data.name}</span>, Welcome</h1>
            <div className="mt-5 p-5 pt-4 w-100 bg-dark rounded">
                <h1 className="fs-3 text-light"> Your Profile Details</h1>
                <div className="mt-5">
                    <h1 className="fs-5 text-light"> Name: <span className="text-success">{data.name}</span></h1>
                    <h1 className="fs-5 text-light"> Email: <span className="text-success">{data.email}</span></h1>
                    <h1 className="fs-5 text-light"> City: <span className="text-success">{data.city}</span></h1>
                    <h1 className="fs-5 text-light"> Status: <span className="text-success">{data.active?"Active":"Deactivated"}</span></h1>
                </div>
                <div className="mt-4 text-end">
                    <button className="btn btn-primary" onClick={handleUPassword}>Update Password</button>
                    <button className="btn btn-danger ms-3" onClick={handleDeactivate}>Deactivate</button>
                </div>
            </div>
        </div>
    </div> );
}
 
export default UserProfile;