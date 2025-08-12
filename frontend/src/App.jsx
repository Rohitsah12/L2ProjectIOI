import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router'
import StudentLogin from './StudentLogin'
import Homepage from './Homepage'

import TeacherLogin from "./TeacherLogin";


import InstitutionLogin from "./InstitutionLogin";



function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/student/login' element={<StudentLogin/>}/>
        <Route path='/teacher/login' element={<TeacherLogin/>}/>
        <Route path="/institution/login" element={<InstitutionLogin />} />
      </Routes>
    </>
  )
}

export default App;



