import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router'
import StudentLogin from './Pages/StudentLogin'
import Homepage from './Pages/Homepage'
import TeacherLogin from "./Pages/TeacherLogin";
import InstitutionLogin from "./Pages/InstitutionLogin";
import ProtectedRoute from './Components/ProtectedRoute'
import StudentDashboard from './Pages/StudentDashboard'



function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/student/login' element={<StudentLogin/>}/>
        <Route path='/teacher/login' element={<TeacherLogin/>}/>
        <Route path="/institution/login" element={<InstitutionLogin />} />
        <Route
          path="/student-dashboard"
          element={<ProtectedRoute role="STUDENT" element={<StudentDashboard />} />}
        />
        <Route
          path="/teacher-dashboard"
          element={<ProtectedRoute role="TEACHER" element={<TeacherDashboard />} />}
        />
        <Route
          path="/college-dashboard"
          element={<ProtectedRoute role="COLLEGE" element={<CollegeDashboard />} />}
        />
              </Routes>
    </>
  )
}

export default App;



