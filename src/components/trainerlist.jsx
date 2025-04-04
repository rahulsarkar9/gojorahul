import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Trainerlist() {

    const [trainerData, setTrainerData] = useState([]);

    useEffect(()=>{
        getTrainerList();
    },[]);

    const getTrainerList = ()=>{
        axios.get('https://api.uncodecart.com/trainers/trainerslist').then((response)=>{
            setTrainerData(response.data.message);
            console.log(response.data.message)
            
        })
    }

    
    const handleDelete = (trainer_id)=>{
        axios.delete(`https://api.uncodecart.com/trainers/trainerdelete/${trainer_id}`).then((response)=>{
            getTrainerList()
        })
    }

    const navigate = useNavigate();

    const handleUpdate = (trainer_id)=>{
        navigate(`/updatetrainer/${trainer_id}`);    
    } 


  return (
    <>
      <table>
                <tr>
                    <th>Trainer Id</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Email ID</th>
                    <th>Password</th>
                    <th>Short name</th>
                    <th>Tech</th>
                    <th>Action</th>
                </tr>
                {trainerData && trainerData.map((user)=>(
                    <tr>
                        <td>{user.trainer_id}</td>
                        <td>{user.trainer_name}</td>
                        <td>{user.trainer_mobileno}</td>
                        <td>{user.trainer_email}</td>
                        <td>{user.trainer_password}</td>
                        <td>{user.trainer_short_name}</td>
                        <td>{user.trainer_dept}</td>

                        <td>
                            <input className='btn onebtn' type='button' value="Update" onClick={()=>{handleUpdate(user.trainer_id)}}/>
                            <input className='btn' type='button' value="Delete" onClick={()=>{handleDelete(user.trainer_id)}}/>
                        </td>
                    </tr>
                ))}
                
                
            </table>
    </>
  )
}

export default Trainerlist
