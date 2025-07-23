import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetMeetingsQuery,
  useCompleteMeetingMutation,
} from '../meeting/meetingApiSlice';
import useDebounce from '../../hook/debounce';
import MeetingCard from '../../components/MeetingCard';

const FILTER_OPTIONS = ['All', 'scheduled', 'notScheduled', 'completed'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data = [], isLoading, isError, isSuccess, error } = useGetMeetingsQuery();
  const [completeMeeting] = useCompleteMeetingMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const handleUpdate = useCallback((id) => {
    navigate(`/dashboard/meetings/${id}`);
  }, [navigate]);

  const handleComplete = async (id) => {
    try {
      await completeMeeting({ id, meeting: { isScheduled: 'completed' } }).unwrap();
      
    } catch (err) {
      console.error(' Error completing meeting:', err);
    }
  };

  const filteredMeetings = useMemo(() => {
    if (!isSuccess || !Array.isArray(data)) return [];

    const term = debouncedSearch.trim().toLowerCase();

    return data
      .filter((item) => {
        const matchesSearch =
          item.fullName?.toLowerCase().includes(term) ||
          item.mobileNumber?.toString().includes(term) ||
          item.reason?.toString().includes(term) ||
          item.constituency?.toLowerCase().includes(term);

        const matchesFilter =
          statusFilter === 'All' || item.isScheduled === statusFilter;

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const aTime = new Date(`${a.arrivalDate}T${a.arrivalTime}`);
        const bTime = new Date(`${b.arrivalDate}T${b.arrivalTime}`);
        return aTime - bTime;
      });
  }, [debouncedSearch, statusFilter, data, isSuccess]);

  // UI Rendering
  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading meetings...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 font-medium mt-10">
        Error: {error?.data?.errors || error?.error || 'Something went wrong'}
      </p>
    );
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Meetings Dashboard</h2>

          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 text-sm rounded-3xl font-medium text-white transition-all ${
                  statusFilter === status
                    ? 'bg-gray-900 shadow-md'
                    : 'bg-gray-700 hover:bg-gray-500'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          aria-label="Search meetings"
          placeholder="Search name, number, or constituency"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {filteredMeetings.length === 0 ? (
        <p className="text-center text-gray-600 mt-10 text-lg">
           No meetings found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetings.map((item) => (
            <MeetingCard
              key={item._id}
              item={item}
              onUpdate={handleUpdate}
              onComplete={handleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
