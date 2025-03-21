import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/auth/Login'
import Dashboard from './Components/admin/dashboard/Dashboard'
const App = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/home' element = {<Home/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
   
     </>
  )
}

export default App