import React from 'react'
import { useNavigate } from "react-router-dom";
import "../css/studentheader.css"


function Studentheader() {

    const navigate = useNavigate();

    const handlelogout = ()=>{
        navigate('/login')
      }
    

    return (
        <>
          <div id="navbar-parent">
            <div id="logo">Gojo Rahul</div>
            <ul class="nav-links">
              <input type="checkbox" id="checkbox-toggle" />
              <label for="checkbox-toggle" class="hamburger">&#9776;</label>
    
              <div className='right-part'>
                <input className="student-btn" type="button" value="Logout"  onClick={handlelogout}/>
              </div>
    
            </ul>
          </div>
        </>
      );
}

export default Studentheader
