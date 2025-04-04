import React, { useState } from "react";
import "../css/studentdashboard.css";
import axios from "axios";



const StudentDashboard = () => {


  
  const [studata, setStudata] = useState('')
  
  const [trainerfull, setTrainerfull] = useState('')
  
  const [studate, setStudate] = useState('')
  

  
  const handleProfile = ()=> {
    // !student id 
    var x = localStorage.getItem('student_id')
    // console.log(x)

    // !trainer short name 
    var trainershortname = localStorage.getItem('stname')
    // console.log(trainershortname)

    //  !joinnigon date 
    setStudate(localStorage.getItem('datee'))
    
    

    // !student details 
    axios.get(`https://api.uncodecart.com/students/singlestudent/${x}`).then((response)=>{
      setStudata(response.data.message)
      
    })

    //! trainer full name 
    axios.get(`https://api.uncodecart.com/students/singletrainerslist/${trainershortname}`).then((response)=>{
      setTrainerfull(response.data.message[0].trainer_name)
    })

  }
  

  // console.log(stubatch)


  return (
    <div className="container">
      <div className="left">
        <div className="head-text">
          <h1>Student Dashboard</h1>
        </div>
        <h3 onClick={handleProfile} className="profile">Profile</h3>
        <h3>Courses</h3>
        <h3>Attendence</h3>
        <h3>Project</h3>
        <h3>Fee</h3>

        
      </div>

      <div className="right">
        <div className="pic">
          <img src="https://images.unsplash.com/photo-1670202602615-ec8ee6c2ea7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" />
        </div>

          
      {studata && studata.map((student)=> (
           <table>
          <tr>
            <td className="shead">Student Id</td>
            <td>{student.student_id}</td>
            </tr>
          <tr>
            <td className="shead">Name</td>
            <td>{student.student_name}</td>
          </tr>
          <tr>
            <td className="shead">Number</td>
            <td>{student.student_mobile}</td>
          </tr>
          <tr>
            <td className="shead">Email ID</td>
            <td>{student.student_email}</td>
          </tr>
          <tr>
            <td className="shead">Gender</td>
            <td>{student.student_gender}</td>
          </tr>
          <tr>
            <td className="shead">Batch Allotment</td>
            <td>{student.student_batch}</td>
          </tr>
          <tr>
            <td className="shead">Trainer Name</td>
            <td>{trainerfull}</td>
          </tr>
          <tr>
            <td className="shead">Joining On</td>
            <td>{studate}</td>
          </tr>
        </table> 
      ))}
        
       
      </div>
    </div>
  );
};

export default StudentDashboard;
