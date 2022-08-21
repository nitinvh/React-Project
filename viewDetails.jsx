import React from "react";
import './viewDetails.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewDetails = () => {
    const [data,setData]= useState([]);
    const [deleteStatus,setStatus] = useState(false);
    useEffect(()=>{
        axios.get("http://localhost:3001/getDetails").then((result)=>setData(result.data)).catch((err)=>console.log(err));
    },[deleteStatus]);
    const navigate = useNavigate()
    const handleAdd = ()=>{
        navigate("/adddetails");
    }
    const handleUpdate = (item)=>{
        navigate(`/form/${item.userId}/${item.fname}/${item.email}/${item.role}`);
    }

    const handleDelete = (item)=>{
        axios.delete(`http://localhost:3001/deleteDetail/${item.userId}`).then((result)=>setStatus(result.data.acknowledged)).catch((err)=>console.log(err));
    }

    const handleProfile = ()=>{
        navigate("/userprofile");
    }

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/");
    }

    return ( 
    <div>
        <nav className="w-100 px-4 p-2 bg-dark text-end">
            <button className="btn btn-outline-light" onClick={handleProfile}>Profile</button>
            <button className="btn btn-danger ms-2" onClick={handleLogout}>Logout</button>
        </nav>
        <div className="container mt-5">
            <h1 className="text-center text-white fs-3 font-monospace">Contact Manager</h1>
            <div className="w-100 text-end mt-1">
                <button className="btn btn-outline-primary" onClick={handleAdd}>+Contact</button>
            </div>
            <div className="p-3 d-flex justify-content-center">
                <div className="mt-2 row">
                    {data.map((item)=>(
                    <div className="card card-bg col-lg-3 col-sm-4 m-3" key={item.userId} style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title" name="id">{item.userId}</h5>
                        <h6 className="card-subtitle mb-2 text-dark text-muted" name="fname">{item.fname}</h6>
                        <p className="card-text" name="email">{item.email}</p>
                        <p className="card-text" name="role">{item.role}</p>
                        <div>
                            <button className="btn bg-dark text-white me-3" onClick={()=>handleUpdate(item)}>Update</button>
                            <button className="btn btn-danger" onClick={()=>handleDelete(item)}>Delete</button>
                        </div>
                    </div>
                    </div>)) }
                </div>
            </div>
        </div>
    </div> );
}
 
export default ViewDetails;
