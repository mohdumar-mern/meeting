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
    arrivalTime: '',
  });

  const [updateMeeting, { isLoading: isUpdating }] = useUpdateMeetingMutation();
  const [error, setError] = useState(null); // 🔴 UI error state

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
    setError(null); // clear previous error

    try {
      const res = await updateMeeting({
        id,
        ...formData,
      }).unwrap();

      alert(res.message || 'Meeting updated successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error('Update error:', err);
      setError(err?.data?.error || err?.data?.message || 'Failed to update meeting. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-20"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800">Update Meeting Schedule</h2>

      {/*Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm border border-red-300">
          {error}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <label htmlFor="isScheduled" className="text-gray-700 font-medium">
          Schedule Confirmed:
        </label>
        <input
          type="checkbox"
          id="isScheduled"
          name="isScheduled"
          checked={formData.isScheduled}
          onChange={handleChange}
          className="h-4 w-4"
        />
      </div>

      <div>
        <label htmlFor="priorityTag" className="block text-gray-700 font-medium">
          Priority
        </label>
        <select
          id="priorityTag"
          name="priorityTag"
          value={formData.priorityTag}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="arrivalDate" className="block text-gray-700 font-medium">
          Arrival Date
        </label>
        <input
          type="date"
          id="arrivalDate"
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="arrivalTime" className="block text-gray-700 font-medium">
          Arrival Time
        </label>
        <input
          type="time"
          id="arrivalTime"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={isUpdating}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isUpdating ? 'Updating...' : 'Update Schedule'}
      </button>
    </form>
  );
};

export default AdminScheduleForm;
