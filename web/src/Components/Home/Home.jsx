import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-black text-red-600'>
        <Link to='/admin/dashboard'>Dashboard</Link>
    </div>
  )
}

export default Home