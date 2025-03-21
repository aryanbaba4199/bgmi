import React from 'react'

const Sidebar = ({page, setPage}) => {
  return (
    <div className='bg-gray-900 min-h-screen text-white rounded-sm'>
        <p className='text-xl mt-4 text-center'>Controllers</p>
        <div className='pl-4 p-2'>
            <button className={`bg-red-700 px-12 py-1 rounded-md`}>Matches</button>
        </div>
    </div>
  )
}

export default Sidebar