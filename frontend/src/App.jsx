import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import StudentLogin from './Pages/StudentLogin'
import Homepage from './Pages/Homepage'
import TeacherLogin from "./Pages/TeacherLogin";
import InstitutionLogin from "./Pages/InstitutionLogin";
import ProtectedRoute from './Components/ProtectedRoute'
import StudentDashboard from './Pages/StudentDashboard'
import TeacherDashboard from './Pages/TeacherDashboard'
import CollegeDashboard from './Pages/CollegeDashboard'
import Entry from './Pages/Entry';
import BatchSetting from './Pages/BatchSetting'
import TeacherSetting from './Pages/TeacherSetting'
import Sot23B1 from './Pages/Sot23b1'
import Dashboard from './Pages/Sot23b1Dashboard';
import Students from './Pages/Sot23b1Students';
import Teachers from './Pages/Sot23b1Teachers';
import Content from './Pages/Sot23b1Content';




function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Entry/>}></Route>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/student/login' element={<StudentLogin/>}/>
        <Route path='/teacher/login' element={<TeacherLogin/>}/>
        <Route path="/institution/login" element={<InstitutionLogin />} />
        <Route
          path="/student-dashboard"
          element={<ProtectedRoute role="STUDENT" element={<StudentDashboard />} />}
        />
        {/* <Route
          path="/teacher-dashboard"
          element={<ProtectedRoute role="TEACHER" element={<TeacherDashboard />} />}
        /> */}
        
        <Route path='/entry' element={<Entry/>}></Route>
        <Route path='/college-dashboard' element={<CollegeDashboard/>}/>
        <Route path='/batch-setting' element={<BatchSetting/>}></Route>
        <Route path='/teacher-setting' element={<TeacherSetting/>}></Route>

        <Route path='/batch/:batchId' element={<Sot23B1/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="content" element={<Content />} />
        </Route>

      </Routes>
    </>
  )
}

export default App



