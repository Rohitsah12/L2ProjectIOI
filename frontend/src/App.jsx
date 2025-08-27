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
import TeacherDashboard from './Pages/TeacherDashboard'
import CollegeDashboard from './Pages/CollegeDashboard'
import Entry from './Pages/Entry';
import CollegeDashboard2 from './Pages/CollegeDashboard2'
import BatchSetting from './Pages/BatchSetting'
import Sot23B1 from './Pages/Sot23b1'
import Sot23b1Dashboard from './Pages/Sot23b1Dashboard';
import Sot23b1Students from './Pages/Sot23b1Students';
import Sot23b1Teachers from './Pages/Sot23b1Teachers';
import Sot23b1Content from './Pages/Sot23b1Content';




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
        <Route path='/homepage/entry' element={<Entry/>}></Route>
        <Route path='/college-dashboard2' element={<CollegeDashboard2/>}/>
        <Route path='/batch-setting' element={<BatchSetting/>}></Route>

        <Route path='/batch/sot23b1' element={<Sot23B1/>}>
          <Route path="dashboard" element={<Sot23b1Dashboard />} />
          <Route path="students" element={<Sot23b1Students />} />
          <Route path="teachers" element={<Sot23b1Teachers />} />
          <Route path="content" element={<Sot23b1Content />} />
        </Route>

      </Routes>
    </>
  )
}

export default App



