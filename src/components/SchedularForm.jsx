import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ added useNavigate
import { useUpdateMeetingMutation } from '../features/meeting/meetingApiSlice';

const AdminScheduleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ initialize navigate

  const [formData, setFormData] = useState({
    isScheduled: false,
    priorityTag: 'low',
    arrivalDate: '',
    arrivalTime: '',
  });

  const [updateMeeting, { isLoading: isUpdating }] = useUpdateMeetingMutation();

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

    try {
      const res = await updateMeeting({
        id,
        ...formData,
      }).unwrap();

      alert(res.message || 'Meeting updated successfully');
      navigate('/dashboard'); // ✅ go to dashboard
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update meeting');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-20"
    >
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
