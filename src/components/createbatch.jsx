import { useEffect } from 'react';
import { useState } from 'react';
import '../css/createbatch.css';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
const Createbatch = () => { 

        const [courselist, setCourselist] = useState('');
        const [batchlist, setBatchlist] = useState('');
        const [trainerlist, setTrainerlist] = useState('');



        const [courseName, setCourseName] = useState('')
        const [courseBatch, setCourseBatch] = useState('')
        const [courseTrainer, setCourseTrainer] = useState('')
        const [courseHour, setCourseHour] = useState('')
        const [courseMin, setCourseMin] = useState('')
        const [courseDay, setCourseDay] = useState('')
        const [courseMonth, setCourseMonth] = useState('')
        
        const [formName, setFormName] = useState('');
        const [buttonName, setButtonName] = useState('')

        const params = useParams()

        const location = useLocation();
        // console.log(location.pathname.split('/')[1])
  
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        
        const days = [];
        for (let i = 1; i <= 31; i++) {
          days.push(i);
        }
        

        const hours = [];
        for(let i = 8; i <=20; i++){
          hours.push(i);
        }
        const minutes = ['00','15','30','45'];
        
        
  

        const trainingcourselist = () => {
          axios.get('https://api.uncodecart.com/students/trainingcourselist').then((response) => {
            setCourselist(response.data.message);
          })
        };

        const batchtypelist = () => {
          axios.get('https://api.uncodecart.com/students/batchtypelist').then((response) => {
            setBatchlist(response.data.message);
          })
        };
        
        const trainerslist = () => {
          axios.get('https://api.uncodecart.com/students/trainerslist').then((response) => {
            setTrainerlist(response.data.message);
          })
        };


        useEffect(()=> {
          trainingcourselist();
          batchtypelist();
          trainerslist();
          // console.log(params.id);

          if(location.pathname.split('/')[1] == 'createbatch'){
            setFormName('Create Batch');
            setButtonName('Register ');
          } else if(location.pathname.split('/')[1] == 'update'){
            setFormName('Update Batch')
            setButtonName('Update')
            axios.get(`https://api.uncodecart.com/students/singlestudentbatchlist/${params.id}`).then((response) => {
              setCourseName(response.data.message[0].batch_course_name)
              
              setCourseBatch(response.data.message[0].batch_type)
              setCourseTrainer(response.data.message[0].batch_trainer)
              setCourseHour(response.data.message[0].batch_timing.split(':')[0])
              setCourseMin(response.data.message[0].batch_timing.split(':')[1])
              setCourseMin(response.data.message[0].batch_timing.split(':')[1])

              setCourseDay(response.data.message[0].batch_start_date.split('-')[0])
              setCourseMonth(response.data.message[0].batch_start_date.split('-')[1])

              

              
              console.log(response.data.message[0]);
            })
          }

        },[]);
 



        const handleCourseName = (evant) => {
          setCourseName(evant.target.value);
        }

        const handleCourseBatch = (evant) => {
          setCourseBatch(evant.target.value);
        }

        const handleCourseTrainer = (evant) => {
          setCourseTrainer(evant.target.value);
        }

        const handleCourseHour = (evant) => {
          setCourseHour(evant.target.value);
        }
        const handleCourseMin = (evant) => {
          setCourseMin(evant.target.value);
        }

        const handleCourseDay = (evant) => {
          setCourseDay(evant.target.value);
        }



        const handleCourseMonth = (evant) => {
          setCourseMonth(evant.target.value);
        }
        // console.log(courseName);
        // console.log(courseBatch);
        // console.log(courseTrainer);
        // console.log(courseTime);
        // console.log(courseDay);
        // console.log(courseMonth);



        const handleSubmit = (evant) => {
          evant.preventDefault();

          let batchCompleteName = `${courseName}-${courseBatch}-${courseTrainer}-${courseHour}:${courseMin}-${courseDay}${courseMonth}`;
          
          var createBatchJson = {
            "batch_course_name":courseName,
            "batch_type":courseBatch,
            "batch_trainer":courseTrainer,
            "batch_timing":courseHour+":"+courseMin,
            "batch_start_date":courseDay+"-"+courseMonth,
            "batch_complete_name": batchCompleteName.toLowerCase()
          }
          console.log(courseName)
          if(location.pathname.split('/')[1] == 'update') {
            axios.put(`https://api.uncodecart.com/students/studentbatchupdate/${params.id}`, createBatchJson).then((response) => {
              // console.log(response);
              alert('Batch update Successfully');
            });
          } else {
            axios.post('https://api.uncodecart.com/students/studentbatch', createBatchJson).then((response) => {
              // console.log(response);
              alert('Batch Created Successfully');
            });
          }
          
          
        }

        
        

    return(   
        <>  
        <div className="main">
          <div className="form-container">
            <h2>{formName}</h2>

            <form>

              <div className="form-group">
                  <label htmlFor="course">Select a Course:</label>
                    <select id="course" value={courseName} onChange={handleCourseName}>
                      <option value="" disabled selected> Select a course </option>
                        {courselist && courselist.map((course) => (
                          <option value={course.training_course_short_name}>{course.training_course_name}</option>
                        ))}
                    </select>
              </div>


              <div className="form-group">
                <label htmlFor="batch">Batch Type:</label>
                <select id="batch" value={courseBatch} onChange={handleCourseBatch}>
                  <option value="" disabled selected> Select batch </option>
                  {batchlist && batchlist.map((batch)=> (
                      <option key={batch.batch_type_name}>{batch.batch_type_name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="trainer">Pick a Trainer:</label>
                <select id="trainer" value={courseTrainer} onChange={handleCourseTrainer}>
                  <option value="" disabled selected> Select a trainer </option>
                  {trainerlist && trainerlist.map((trainer)=>(
                      <option value={trainer.trainer_short_name}>{trainer.trainer_name}</option>
                  ))}
                </select>
              </div>



              <div className="form-group">
                <label htmlFor="time">Select Time:</label>
                <div className='date-select'>
                <select id="hour" value={courseHour} onChange={handleCourseHour}>
                  <option value="" disabled selected> Hour </option>
                  {hours.map((hours)=> (
                      <option key={hours}>{hours}</option>
                  ))}
                </select>
                <select id="min" value={courseMin} onChange={handleCourseMin}>
                  <option value="" disabled selected> Min </option>
                  {minutes.map((minutes)=> (
                      <option key={minutes}>{minutes}</option>
                  ))}
                </select>
                </div>
              </div>

              <div className="form-group">
                
                <label htmlFor="day">Starting Day:</label>
                <div className='date-select'>
                  <select id="day" value={courseDay} onChange={handleCourseDay}>
                    <option  value="" disabled selected> Select a day </option>
                    {days.map((day) => (
                      <option key={day}>{day}</option>
                    ))}
                  </select>
                  <select id="month" value={courseMonth} onChange={handleCourseMonth}>
                    <option value="" disabled selected> Select a month</option>
                    {months.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                </div>

              </div>

              
                <input className='submit-btn' type="button" value={buttonName} onClick={handleSubmit} />
              
          </form>
            
          
          </div>
        </div>

        </>
    )
 }

 export default Createbatch;