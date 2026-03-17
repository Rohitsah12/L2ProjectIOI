
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
import CollegeSetting from './Pages/CollegeSetting'

import Entry from './Pages/Entry';
import BatchSetting from './Pages/BatchSetting'
import TeacherSetting from './Pages/TeacherSetting'
import Sot23B1 from './Pages/BatchDashboard'
import Dashboard from './Pages/Sot23b1Dashboard';
import Students from './Pages/Sot23b1Students';
import Teachers from './Pages/BatchTeachers';
import Content from './Pages/Sot23b1Content';
import TeacherEnd from './Pages/TeacherEnd'
import TeacherEndBatch  from './Pages/TeacherEndBatch'
import TeacherEndProblemList from './Pages/TeacherEndProblemList'
import TeacherEndContent from './Pages/TeacherEndContent'
import TeacherEndLeaderboard from './Pages/TeacherEndLeaderbord'
import TeacherEndAnalytics from './Pages/TeacherEndAnalytics'
import TeacherProblemsPage from "./Pages/TeacherProblemsPage";
import BatchMasterTable from './Pages/TableMaster'
import WeeklyProgressTable from './Pages/TableWeekly'
import Table from './Pages/Table'
import Visual from './Pages/Visual'
import StudentProfile from './Pages/StudentProfile';
import TeacherDetails from './Pages/TeacherDetails';




function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Entry/>}></Route>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/student/login' element={<StudentLogin/>}/>
        <Route path='/teacher/login' element={<TeacherLogin/>}/>
        <Route path="/college/login" element={<InstitutionLogin />} />
        {/* <Route
          path="/student-dashboard"
          element={<ProtectedRoute role="STUDENT" element={<StudentDashboard />} />}
        /> */}
        {/* <Route
          path="/teacher-dashboard"
          element={<ProtectedRoute role="TEACHER" element={<TeacherDashboard />} />}
        /> */}
        
        <Route path='/entry' element={<Entry/>}></Route>
        <Route path='/college-dashboard' element={<CollegeDashboard/>}/>
        <Route path='/college-dashboard/:collegeId' element={<CollegeDashboard/>}/>

        
        <Route path='/college-setting' element={<CollegeSetting/>}/>

        <Route path='/batch-setting' element={<BatchSetting />} />
        <Route path='/batch-setting/:collegeId' element={<BatchSetting />} />
        <Route path='/teacher-setting' element={<TeacherSetting />} />
        <Route path='/teacher-setting/:collegeId' element={<TeacherSetting />} />
        <Route path='/teacher/:id' element={<TeacherDetails/>}></Route>

        <Route path='/batch/:batchId' element={<Sot23B1/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="content" element={<Content />} />
        </Route>


        <Route path='/teacherEnd' element={<TeacherEnd/>}></Route>
        <Route path='/teacher/batch' element={<TeacherEndBatch />}>
          <Route index element={<TeacherEndContent/>}/>
          <Route path='problemslist' element={<TeacherEndProblemList/>}/>
          <Route path='content' element={<TeacherEndContent/>}/>
          <Route path='leaderboard' element={<TeacherEndLeaderboard/>}/>
          <Route path='analytics' element={<TeacherEndAnalytics/>}>
              <Route index element={<Visual/>}></Route>
              <Route path='visual' element={<Visual/>}></Route>    
              {/* Table */}
              <Route path='tables' element={<Table/>}>
                <Route index element={<BatchMasterTable/>}></Route>
                <Route path='mastertable' element={<BatchMasterTable/>}></Route>
                <Route path='weeklyProgressTable' element={<WeeklyProgressTable/>}></Route>
              </Route>

          </Route>
        </Route>
        <Route path="/teacher/problems" element={<TeacherProblemsPage />} />

      <Route
        path="/student-dashboard"
        element={<StudentDashboard />}
      />
      <Route path='/student/assignment' element={<TeacherEndProblemList/>}></Route>
      <Route path='/student/profile' element={<StudentProfile/>}></Route>
      </Routes>
    </>
  )
}

export default App



