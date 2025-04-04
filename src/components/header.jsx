import { useNavigate } from "react-router-dom";
import "../css/header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="navbar-parent">
        <div id="logo">Gojo Rahul</div>
        <ul class="nav-links">
          <input type="checkbox" id="checkbox-toggle" />
          <label for="checkbox-toggle" class="hamburger">&#9776;</label>

          <div class="menu">
            <li className="one">
              <a onClick={()=>{navigate('/')}}>Home</a>
            </li>

            
            <li>
              <a>Registration</a> 
              <ul className="dropdown">
                <li><a onClick={()=>{navigate('/register')}}>Student Registration</a></li>
                <li><a onClick={()=>{navigate('/trainer-register')}}>Trainer Registration</a></li>
              </ul>
            </li>

            <li><a onClick={()=>{navigate('/createbatch')}}>Createbatch</a></li>

            <li>
              <a> List</a>
              <ul className="dropdown">
                <li><a onClick={()=>{navigate('/batchlist')}}>Batchlist</a></li>
                <li><a onClick={()=>{navigate('/studentlist')}}>Studentlist</a></li>
                <li><a onClick={()=>{navigate('/trainerlist')}}>Trainerlist</a></li>
              </ul>
            </li>




            <li>
              <a>Dashboard</a>
              <ul className="dropdown">
                <li><a onClick={()=>{navigate('/studentdashboard')}}>Studnet Dashboard</a></li>
                <li><a onClick={()=>{navigate('/trainerdashboard')}}>Trainer Dashboard</a></li>
              </ul>
            </li>

            <li><a onClick={()=>{navigate('/login')}}>Login</a></li>
            
          </div> 

        </ul>
      </div>
    </>
  );
};

export default Header;
