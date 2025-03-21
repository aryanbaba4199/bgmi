import React, { useState } from 'react'
import Sidebar from './Sidebar'
import CreateMatch from '../Match/CreateMatch';
import Match from '../Match/Match';

const Dashboard = () => {
    const [page, setPage] = useState(0);
  return (
    <div className='flex'>
        
        <div className='w-[20%]'>
            <Sidebar setPage={setPage}/>
        </div>
        <div className='w-[80%]'>
            {page===0 && <Match/>}
        </div>
    </div>
  )
}

export default Dashboard