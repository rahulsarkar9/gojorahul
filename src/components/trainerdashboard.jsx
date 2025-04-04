import axios from 'axios';
import React, { useState } from 'react'
import "../css/studentdashboard.css";

function Trainerdashboard() {
  
  // const [courseTrainer, setCourseTrainer] = useState('')
  const [trainerlist, setTrainerlist] = useState('');
  
  const [bname, setBname] = useState('')


    //! trainer short name 
    var y = localStorage.getItem('stname')
    console.log(y)

    const handleTrainerCourse = ()=> {
      //! Trainer's course list 
      axios.get(`https://api.uncodecart.com/students/studentbatchlistbytrainer/${y}`).then((response) => {
        setTrainerlist(response.data.message);
        console.log(response)
        
      })
    }

    //! Trainer's courses 
    const handleCourseTrainer = (courseTrainer) => {
      // setCourseTrainer(evant.target.value);
      // console.log(evant.target.value)
     console.log(courseTrainer)
     
     axios.get('https://api.uncodecart.com/students/studentlistbatchwise/'+courseTrainer).then((res) => {
      console.log(res.data.message)
      setBname(res.data.message)

    })
    }
  
    

    
  
    
    return (
        <div className="container">

          <div className="left">
            <div className="head-text">
              <h1>Trainer Dashboard</h1>
            </div>

              <h3 onClick={handleTrainerCourse}>Show Course List <span>&#x25BC;</span></h3>

                <div className='trainercourselist'> 
                  {trainerlist && trainerlist.map((trainer)=>( 
                      <h4 onClick={()=>{handleCourseTrainer(trainer.batch_complete_name)}}>{trainer.batch_complete_name}</h4>
                  ))}
                </div>
          </div>
    
          

          <div className='right'>
          <table>
                <tr>
                    <th>Student Id</th>
                    <th>Name</th>
                    <th>Email ID</th>
                    <th>Attendance</th>
                </tr>
                {bname && bname.map((u)=>(
                    <tr>
                        <td>{u.student_id}</td>
                        <td>{u.student_name}</td>
                        <td>{u.student_email}</td>

                        <td>
                          <select name="" id="">
                            <option value=""></option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </select>
                        </td>
                        
                    </tr>
                ))}
                
                
            </table>
        
    
          </div>
          
          
        </div>
      );
}

export default Trainerdashboard
