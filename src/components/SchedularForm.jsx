import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateMeetingMutation } from '../features/meeting/meetingApiSlice';

const AdminScheduleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    isScheduled: false,
    priorityTag: 'low',
    arrivalDate: '',
    meetingTime: '',
  });

  const [updateMeeting, { isLoading: isUpdating }] = useUpdateMeetingMutation();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(formData)

    if (!formData.arrivalDate || !formData.meetingTime) {
      return setError('Please provide both arrival date and time.');
    }
    const data = {...formData, isScheduled: 'scheduled'}
    
    try {
      const res = await updateMeeting({
        id,
        ...data,
      }).unwrap();

      alert(res?.message || 'Meeting updated successfully');
      navigate('/adminDashboard');
    } catch (err) {
      console.error('Update error:', err);
      setError(err?.data?.message || 'Failed to update meeting. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-transparent p-6 rounded-xl border shadow-md mt-20 space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center text-white mb-2">
        Update Meeting Schedule
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm border border-red-300">
          {error}
        </div>
      )}

      {/* Scheduled Toggle */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="isScheduled"
          name="isScheduled"
          checked={formData.isScheduled}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label htmlFor="isScheduled" className="text-gray-100 font-medium">
          Schedule Confirmed
        </label>
      </div>

      {/* Priority */}
      <div>
        <label htmlFor="priorityTag" className="block text-gray-100 font-medium mb-1">
          Priority
        </label>
        <select
          id="priorityTag"
          name="priorityTag"
          value={formData.priorityTag}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300  rounded-md"
        >
          <option className='text-black' value="low">Low</option>
          <option className='text-black' value="medium">Medium</option>
          <option className='text-black' value="high">High</option>
        </select>
      </div>

      {/* Arrival Date */}
      <div>
        <label htmlFor="arrivalDate" className="block text-gray-100 font-medium mb-1">
          Meeting Date
        </label>
        <input
          type="date"
          id="arrivalDate"
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300  rounded-md"
          required
        />
      </div>

      {/* Arrival Time */}
      <div>
        <label htmlFor="meetingTime" className="block text-gray-1700 font-medium mb-1">
          Meeting Time
        </label>
        <input
          type="time"
          id="meetingTime"
          name="meetingTime"
          value={formData.meetingTime}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isUpdating}
        className="w-full bg-[#111] text-white py-2 rounded-md hover:bg-[#000] transition disabled:opacity-60"
      >
        {isUpdating ? 'Updating...' : 'Update Schedule'}
      </button>
    </form>
  );
};

export default AdminScheduleForm;
