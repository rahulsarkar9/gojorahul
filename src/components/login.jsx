import React, { useState } from 'react'
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Login() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword ] = useState('')

  const role = ['student', 'trainer', 'admin'];
  const [userrole, setUserRole] = useState('')

  const handleUserRole = (event)=> {
    setUserRole(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }


  const handleSubmit =(event)=>{
    event.preventDefault();
     var createloginjson ={
        "student_email":email,
        "student_password":password ,
        "role":userrole
      }
    
      console.log(createloginjson)
      axios.post('https://api.uncodecart.com/students/login',createloginjson).then((response)=>{
        // console.log(response.data.message[0].trainer_short_name)
        // localStorage.setItem('student_name',response.data.message[0].student_name)
        localStorage.setItem('student_id',response.data.message[0].student_id)
        // localStorage.setItem('t_name',response.data.message[0].trainer_short_name)
        localStorage.setItem('stname',response.data.message[0].student_batch.split('-')[2])
        localStorage.setItem('datee',response.data.message[0].student_batch.split('-')[4])
       })
       .catch((error) => {
        console.error("API Error:", error); // Log any API errors
      });
     
       if(userrole=='student'){
        navigate('/studentdashboard/')
       } else if(userrole=='trainer'){
     navigate('/trainerdashboard/')
      }
    }

  return (
    <>
      <div className="main">
          <div className="login-form-container">
            <h2>Login Page</h2>

            <form >

            <div className="login-form">
              <label for="email">Email ID</label>
              <input type="email" id="email" name="email" placeholder="Enter your email ID" onChange={handleEmail} />
            </div>

            <div className="login-form">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" onChange={handlePassword} />
            </div>

            <div className="form-group">
              <label for="role">Role</label>
              <select value={userrole} onChange={handleUserRole}>
                <option>Select Role</option>
                {role.map((role) => (
                  <option key={role}>{role} </option>
                ))}
              </select>
            </div>

            <div className='login-a'>
            {/* <a className='new' onClick={()=>{navigate('/register')}}>New User</a> */}
            </div>

              <input className='submit-btn' type="button" value="Login"  onClick={handleSubmit} />
              
          </form>
            
          
          </div>
        </div>
    </>
  )
}

export default Login
