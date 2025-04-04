import '../css/batchlist.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Batchlist = ()=>{


    const [userData, setUserData] = useState([]);

    useEffect(()=>{
        getBatchList();
    },[]);

    const getBatchList = ()=>{
        axios.get('https://api.uncodecart.com/students/studentbatchlist').then((response)=>{
            setUserData(response.data.message);
            // console.log(response)
            
        })
    }

    const handleDelete = (batch_id)=>{
        axios.delete(`https://api.uncodecart.com/students/studentbatchdelete/${batch_id}`).then((response)=>{
            getBatchList()
        })
    }

    const navigate = useNavigate();

    const handleUpdate = (batch_id)=>{
        navigate(`/update/${batch_id}`);    
    }

    return(
        <>
            <table>
                <tr>
                    <th>Batch Id</th>
                    <th>Course Name</th>
                    <th>Trainer</th>
                    <th>Batch Type</th>
                    <th>Timing</th>
                    <th>Start Day</th>
                    <th>Batch Name</th>
                    <th>Action</th>
                </tr>
                {userData && userData.map((user)=>(
                    <tr>
                        <td>{user.batch_id}</td>
                        <td>{user.batch_course_name}</td>
                        <td>{user.batch_trainer}</td>
                        <td>{user.batch_type}</td>
                        <td>{user.batch_timing}</td>
                        <td>{user.batch_start_date}</td>
                        <td>{user.batch_complete_name}</td>

                        <td>
                            <input className='btn onebtn' type='button' value="Update" onClick={()=>{handleUpdate(user.batch_id)}}/>
                            <input className='btn' type='button' value="Delete" onClick={()=>{handleDelete(user.batch_id)}}/>
                        </td>
                    </tr>
                ))}
                
                
            </table>
        </>
    )
}
export default Batchlist;