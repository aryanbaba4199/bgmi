import React, { useState, useEffect, useCallback, act } from 'react';
import { FaCalendarAlt, FaTrophy, FaMoneyBillWave, FaUserFriends, FaUsers, FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { activityApi, getterFunction, posterFunction, removerFunction, userApi } from '../../../Api';
import CreateMatch from './CreateMatch';
import Swal from 'sweetalert2';

const Match = () => {
  const [matches, setMatches] = useState([]);
  const [createMode, setCreateMode] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)
  
 
  useEffect(() => {
    getMatch();
  }, []);

  const getMatch = async () => {
    try {
      const matches = await getterFunction(activityApi.getMatch);
      setMatches(matches);
    } catch (e) {
      console.error('Error in getting match', e);
    }
  };

  const handleClose = useCallback(()=>{
    setCreateMode(false);
    setUpdateMode(false);
    setSelectedMatch(null);
  }, [createMode, updateMode])

  const handleRemove = async(id)=>{
    try {
      const res = await removerFunction(`${activityApi.deleteMatch}/${id}`)
      Swal.fire({
        title : 'Deleted',
        icon : 'success'
      })
      getMatch();
    } catch (e) {
      Swal.fire({
        title : 'Failed', 
        text : e,
        icon : 'error'
      })
      console.error('Error in Removing', e)
    }
  }


  const updateRoom = async (id) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Room",
      html: `
        <input id="swal-roomId" class="swal2-input" placeholder="Enter Room ID">
        <input id="swal-password" class="swal2-input" placeholder="Enter Password">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          roomId: document.getElementById("swal-roomId").value.trim(),
          password: document.getElementById("swal-password").value.trim(),
        };
      },
    });
  
    if (formValues && formValues.roomId && formValues.password) {
      try {
        await posterFunction(activityApi.updateRoom, {
          id, // Send ID
          roomId: formValues.roomId,
          password: formValues.password,
        });
  
        Swal.fire({
          title: "Room Updated",
          text: "Room ID and Password Updated Successfully",
          icon: "success",
        });
      } catch (e) {
        console.error("Error in updating room", e);
        Swal.fire({
          title: "Failure",
          text: "Room ID and Password Updation failed",
          icon: "error",
        });
      }
    }
  };
  


  return (
    <>
    {createMode ? <CreateMatch mode={'create'} handleClose={handleClose}/> : 
    <>
    {updateMode ? <CreateMatch mode={'update'} data={selectedMatch} handleClose={handleClose}/> : 
    <div className="container mx-auto px-4 py-8">
        <div className=' flex justify-center  items-center'>
      <h1 className="text-2xl font-bold text-center mb-6 text-slate-900">Match Details</h1>
      <p className=' ml-96 bg-slate-950 text-white px-8 py-2 rounded-md shadow-md shadow-red-600 hover:bg-blue-950 hover:cursor-pointer' onClick={()=>setCreateMode(true)}>Create Match</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, index) => (
          <div onClick={()=>updateRoom(match._id)} key={index} className="bg-white hover:cursor-pointer shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">{match.title}</h2>
              <p className="text-sm text-slate-700 mb-4">{match.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-slate-700">
                  <FaCalendarAlt className="mr-2" />
                  <span>{new Date(match.startTime).toLocaleString()} - {new Date(match.endTime).toLocaleString()}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <FaTrophy className="mr-2" />
                  <span>Prize Pool: रु {match.prizePool}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <FaTrophy className="mr-2" />
                  <span>Entry Fee : रु {match.fee}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <FaMoneyBillWave className="mr-2" />
                  <span>Per Kill: ${match.perKill}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <FaUserFriends className="mr-2" />
                  <span>Teams: {match.team}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <FaUsers className="mr-2" />
                  <span>Players: {match.players}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <FaInfoCircle className="mr-2" />
                  <span>Status: {match.status}</span>
                </div>
                {match.winner && (
                  <div className="flex items-center text-slate-700">
                    <FaTrophy className="mr-2" />
                    <span>Winner: {match.winner}</span>
                  </div>
                )}
                {match.mom && (
                  <div className="flex items-center text-slate-700">
                    <FaTrophy className="mr-2" />
                    <span>Man of the Match: {match.mom}</span>
                  </div>
                )}
              </div>
              <div className='flex justify-between items-center text-lg mt-4    px-4'>
           
                <FaTrash onClick={()=>handleRemove(match._id)} className='text-red-600 hover:cursor-pointer hover:text-red-500'/>
                <FaEdit onClick={()=>{setSelectedMatch(match); setUpdateMode(true)}} className='text-green-600 hover:cursor-pointer hover:text-green-500'/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
}
    </>
}
    </>
  );
};

export default Match;