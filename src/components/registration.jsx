import "../css/registration.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const Registration = () => {
  const [status, setStatus] = useState("");

  // Name of Student
  const [studentName, setStudentName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const handelName = (event) => {
    setStudentName(event.target.value);
    setTrainerName(event.target.value);
  };
  
  const [trainershortname, setTrainerShortName] = useState('')
  const handleShortName = (event) => {
    setTrainerShortName(event.target.value)
  }

  // Number
  const [studentNumber, setStudentNumber] = useState("");
  const [trainerNumber, setTrainerNumber] = useState("");
  const handelNumber = (event) => {
    setStudentNumber(event.target.value);
    setTrainerNumber(event.target.value);
  };
  //Trainer Number
  // const handelTrainerNumber = (event) => {};

  // Email
  const [studentEmail, setStudentEmail] = useState("");
  const [trainerEmail, setTrainerEmail] = useState("");
  const handelEmail = (event) => {
    setStudentEmail(event.target.value);
    setTrainerEmail(event.target.value);
  };
  //Trainer Email
  const handelTrainerEmail = (event) => {};

  // Password
  const [studentPassword, setStudentPassword] = useState("");
  const [trainerPassword, setTrainerPassword] = useState("");
  const handelPassword = (event) => {
    setStudentPassword(event.target.value);
    setTrainerPassword(event.target.value);
  };
  //Trainer Password
  const handelTrainerPassword = (event) => {};

  //Batch Allotment data
  const [studentBatch, setStudentBatch] = useState("");
  const handleStudentBatch = (evant) => {
    setStudentBatch(evant.target.value);
  };

  //Genders
  const [studentGender, setStudentGender] = useState("");
  const genders = ["Male", "Female", "Transgender", "Other"];
  const handleStudentGender = (evnt) => {
    setStudentGender(evnt.target.value);
  };

  // state to hold user data
  const [batchData, setbatchData] = useState("");
  // api call
  const getBatchList = () => {
    axios.get("https://api.uncodecart.com/students/studentbatchlist").then((response) => {
        setbatchData(response.data.message);
      });
  };

  //13-2-25
  const [formName, setFormName] = useState("");
  const [buttonName, setButtonName] = useState("");

  // 11-3-25
  const [courselist, setCourselist] = useState('');
  const trainingcourselist = () => {
    axios.get("https://api.uncodecart.com/students/trainingcourselist").then((response) => {
        setCourselist(response.data.message);
      });
  };

  const [techlist, setTechList] = useState([])
  const handleList = (evant) => {
    setTechList(evant.target.value);
  }


  const params = useParams();
  const location = useLocation();

  // for single time call
  useEffect(() => {
    // 11-3-25
    trainingcourselist();
    getBatchList();

    if (location.pathname.split("/")[1] == "register") {
      setFormName("Student Registration Form");
      setButtonName("Register ");
      setStatus("student");
    } else if (location.pathname.split("/")[1] == "updatestudent") {
      setFormName("Update Student Form");
      setButtonName("Update");
      setStatus("student");
      axios.get(`https://api.uncodecart.com/students/singlestudent/${params.id}`).then((response) => {
          setStudentName(response.data.message[0].student_name);
          setStudentNumber(response.data.message[0].student_mobile);
          setStudentEmail(response.data.message[0].student_email);
          setStudentPassword(response.data.message[0].student_password);
          setStudentGender(response.data.message[0].student_gender);
          setStudentBatch(response.data.message[0].student_batch);
          console.log(response.data.message[0]);
        });
    } else if (location.pathname.split("/")[1] == "trainer-register") {
      setFormName("Trainer Registration Form");
      setButtonName("Register");
      setStatus("trainer");
    } else if (location.pathname.split("/")[1] == "updatetrainer") {
      axios.get(`https://api.uncodecart.com/trainers/singletrainerslist/${params.id}`).then((response) => {
        setTrainerName(response.data.message[0].trainer_name)
        setTrainerShortName(response.data.message[0].trainer_short_name)
        setTrainerNumber(response.data.message[0].trainer_mobileno)
        setTrainerEmail(response.data.message[0].trainer_email)
        setTrainerPassword(response.data.message[0].trainer_password)
        setTechList(response.data.message[0].trainer_dept)
        console.log(response.data.message[0])

      })
      setFormName("Update Trainer Form");
      setButtonName("Update");
      setStatus("trainer");
    }
  }, []);

  // form submit event
  const handleSubmit = (event) => {
    event.preventDefault();

    var createStudentJson = {
      student_name: studentName,
      student_batch: studentBatch,
      student_mobile: studentNumber,
      student_email: studentEmail,
      student_password: studentPassword,
      student_gender: studentGender,
      batch_id: ""
    };

    var createTrainerJson = {
      trainer_name: trainerName,
      trainer_mobileno: trainerNumber,
      trainer_email: trainerEmail,
      trainer_password: trainerPassword,
      trainer_short_name: trainershortname,
      trainer_dept: techlist,
      role: "",
    };

    if (location.pathname.split("/")[1] == "updatestudent") {
      // put api
      axios.put(`https://api.uncodecart.com/students/studentupdate/${params.id}`,createStudentJson).then((response) => {
          console.log(response.data.message);
          alert("Student update successfully");
        });
    } else if (location.pathname.split("/")[1] == "trainer-register") {
      axios.post(`https://api.uncodecart.com/trainers/trainerregistration`,createTrainerJson).then((response) => {
          console.log(createTrainerJson);
          console.log(response.data.message)
          alert("Trainer registered successfully");
        })
    }else if (location.pathname.split("/")[1] == "updatetrainer") {
      axios.put(`https://api.uncodecart.com/trainers/trainerupdate/${params.id}`,createTrainerJson).then((response) => {
        console.log(response.data.message);
        alert("Trainer update successfully");
        })
    } else {
      axios.post(`https://api.uncodecart.com/students/studentregistration`,createStudentJson).then((response) => {
          // console.log(response.data);
          console.log(response);
          console.log(createStudentJson);
          alert("Student registered successfully");
        });
    }
    

    // console.log(createStudentJson);
  };

  return (
    <>
      <div className="main">

        <div className="form-container">
          <h1>{formName}</h1>
          <form>
            
            <div className="form-group">
              <label for="course">Name</label>
              <input type="text" id="name" value={studentName} name="name" placeholder="Enter your name" onChange={handelName} />
            </div>

            {status == 'trainer' &&(
              <div className="form-group">
              <label for="course">Short Name</label>
              <input type="text" id="name" value={trainershortname} name="name" placeholder="Enter short name" onChange={handleShortName} />
            </div>
            )}

            <div className="form-group">
              <label for="batch">Mobile Number</label>
              <input type="text" id="mobile" value={studentNumber} name="mobile" placeholder="Enter your mobile number" onChange={handelNumber} />
            </div>

            <div className="form-group">
              <label for="email">Email ID</label>
              <input type="email" id="email" value={studentEmail} name="email" placeholder="Enter your email ID" onChange={handelEmail} />
            </div>

            <div className="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" value={studentPassword} name="password" placeholder="Enter your password" onChange={handelPassword} />
            </div>

            <div className="form-group">
              <label for="gender">Gender</label>
              <select id="gender" name="gender" value={studentGender} onChange={handleStudentGender}>
                <option>Select Gender</option>
                {genders.map((gender) => (
                  <option key={gender}>{gender} </option>
                ))}
              </select>
            </div>

            {status == "student" && (
              <div className="form-group">
                <label>Batch Allotment</label>
                <select id="batch" name="batch" value={studentBatch} onChange={handleStudentBatch} >
                  <option>Select Batch</option>
                  {batchData && batchData.map((user) => (
                      <option value={user.batch_complete_name}> {user.batch_complete_name} </option>
                    ))}
                </select>
              </div>
            )}

            {/* 11-3-25 */}

            {status == "trainer" && (
              <div className="form-group">
                <label> Tech</label>
                <select id="batch" name="techlist" value={techlist} onChange={handleList} >
                  <option>Select Tech</option>
                  {courselist && courselist.map((course) => (
                      <option value={course.training_course_name}> {course.training_course_name} </option>
                    ))}
                </select>
              </div>
            )}

            <button type="submit" className="submit-btn" onClick={handleSubmit}>{" "}{buttonName}{" "}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
