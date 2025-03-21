import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaTrophy, FaMoneyBillWave, FaUserFriends, FaUsers, FaInfoCircle, FaYoutube, FaFacebook, FaUser } from 'react-icons/fa';
import { activityApi, posterFunction, updaterFunction } from '../../../Api';
import Swal from 'sweetalert2';

const CreateMatch = ({ mode, data, handleClose }) => {
  // Initialize formData with additional fields for edit mode
  const [formData, setFormData] = useState({
    title: '',
    matchType: '',
    rteam: 25,
    rplayer: 100,
    prizePool: '',
    perKill: '',
    fee: '',
    description: '',
    startTime: '',
    endTime : '',
    status: 'upcoming',
    winner: '',
    ytUri: '',
    fbUri: '',
    mom: '',
  });

  // Update formData when data prop changes
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleWinnerChange = (e) => {
    const { name, value } = e.target;

    if (name === "winner") {
      // Allow commas while typing
      setFormData((prev) => ({ ...prev, winner: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = () => {
    // Convert the comma-separated string to an array when input loses focus
    const winnersArray = formData.winner
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0)
      .slice(0, 4); // Limit to 4 entries

    setFormData((prev) => ({ ...prev, winner: winnersArray }));
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(formData)
    try {
    
      const res = await mode==='update' ? updaterFunction(activityApi.updateMatch, formData) :  posterFunction(activityApi.createMatch, formData);
      Swal.fire({
        title: 'Success',
        text: mode === 'edit' ? 'Match Updated Successfully' : 'Match Created Successfully',
        icon: 'success',
      });
      handleClose(); // Close the form after successful submission
    } catch (e) {
      console.error('Error in submission', e);
      Swal.fire({
        title: 'Error',
        text: e.message || 'An error occurred',
        icon: 'error',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        {mode === 'edit' ? 'Edit Match' : 'Create New Match'}
      </h1>
      <form  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            <FaTrophy className="inline-block mr-2" />Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Match Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="matchType">
            <FaUsers className="inline-block mr-2" />Map
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="matchType"
            type="text"
            name="matchType"
            value={formData.matchType}
            onChange={handleChange}
            required
          />
        </div>

        {/* Prize Pool */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prizePool">
            <FaMoneyBillWave className="inline-block mr-2" />Prize Pool
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="prizePool"
            type="number"
            name="prizePool"
            value={formData.prizePool}
            onChange={handleChange}
            required
          />
        </div>

        {/* Per Kill */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="perKill">
            <FaMoneyBillWave className="inline-block mr-2" />Per Kill
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="perKill"
            type="number"
            name="perKill"
            value={formData.perKill}
            onChange={handleChange}
            required
          />
        </div>

        {/* Fee */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fee">
            <FaMoneyBillWave className="inline-block mr-2" />Fee
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fee"
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            <FaInfoCircle className="inline-block mr-2" />Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
            <FaCalendarAlt className="inline-block mr-2" />Start Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startTime"
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        {mode==='update' && 
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
            <FaCalendarAlt className="inline-block mr-2" />End Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endTime"
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
}

        {/* Required Teams */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rteam">
            <FaUserFriends className="inline-block mr-2" />Required Teams
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rteam"
            type="number"
            name="rteam"
            value={formData.rteam}
            onChange={handleChange}
            required
          />
        </div>

        {/* Required Players */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rplayer">
            <FaUsers className="inline-block mr-2" />Required Players
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rplayer"
            type="number"
            name="rplayer"
            value={formData.rplayer}
            onChange={handleChange}
            required
          />
        </div>

        {/* Additional Fields for Edit Mode */}
        {mode === 'update' && (
          <>
            {/* Status */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                <FaInfoCircle className="inline-block mr-2" />Status
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="finished">Finished</option>
              </select>
            </div>

            <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="winner"
      >
        <FaTrophy className="inline-block mr-2" />
        Winner BGMI ID (Max 4)
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="winner"
        type="text"
        name="winner"
        value={Array.isArray(formData.winner) ? formData.winner.join(", ") : formData.winner}
        onChange={handleWinnerChange}
        onBlur={handleBlur} // Convert to an array when the user exits the field
        placeholder="Enter winner IDs (e.g., ida, idb, idc, idd)"
      />
    </div>

            {/* YouTube Live URL */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ytUri">
                <FaYoutube className="inline-block mr-2" />YouTube Live URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ytUri"
                type="url"
                name="ytUri"
                value={formData.ytUri}
                onChange={handleChange}
              />
            </div>

            {/* Facebook Live URL */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fbUri">
                <FaFacebook className="inline-block mr-2" />Facebook Live URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fbUri"
                type="url"
                name="fbUri"
                value={formData.fbUri}
                onChange={handleChange}
              />
            </div>

            {/* Man of the Match */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mom">
                <FaUser className="inline-block mr-2" />Man of the Match
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mom"
                type="text"
                name="mom"
                value={formData.mom}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
          <button
          onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {mode === 'update' ? 'Update Match' : 'Create Match'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(CreateMatch);