    import '../css/studentlist.css';
    import axios from 'axios';
    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';

    const Studentlist = () => {

        const [userData, setUserData] = useState([]);
        useEffect(()=>{
            getStudentList();
        },[]);

        const getStudentList = ()=>{
            axios.get('https://api.uncodecart.com/students/studentlist').then((response)=>{
                setUserData(response.data.message);
                
            })
        }

        const handleDelete = (student_id)=>{
            axios.delete(`https://api.uncodecart.com/students/studentdelete/${student_id}`).then((response)=>{
                getStudentList()
            })
        }

        const navigate = useNavigate();

        const handleUpdate = (student_id)=>{
            navigate(`/updatestudent/${student_id}`);    
        }
        
        return(
            <>
                <table>
                    <tr>
                        <th>Student Id</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Email ID</th>
                        <th>Password</th>
                        <th>Gender</th>
                        <th>Batch Allotment</th>
                        <th>Action</th>
                    </tr>
                    {userData && userData.map((user)=>(
                        <tr>
                            <td>{user.student_id}</td>
                            <td>{user.student_name}</td>
                            <td>{user.student_mobile}</td>
                            <td>{user.student_email}</td>
                            <td>{user.student_password}</td>
                            <td>{user.student_gender}</td>
                            <td>{user.student_batch}</td>

                            <td>
                                <input className='btn onebtn' type='button' value="Update" onClick={()=>{handleUpdate(user.student_id)}}/>
                                <input className='btn' type='button' value="Delete" onClick={()=>{handleDelete(user.student_id)}}/>
                            </td>
                        </tr>
                    ))}
                    
                    
                </table>
            </>
        )
    }

    export default Studentlist
