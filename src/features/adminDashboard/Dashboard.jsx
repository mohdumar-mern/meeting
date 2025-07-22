import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMeetingsQuery } from '../meeting/meetingApiSlice';
import useDebounce from '../../hook/debounce';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data = [], isLoading, isError, isSuccess, error } = useGetMeetingsQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const handleUpdate = useCallback((id) => {
    navigate(`/dashboard/meetings/${id}`);
  }, [navigate]);

  const getPriorityClass = useCallback((priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'border-green-400';
      case 'medium':
        return 'border-yellow-400';
      case 'low':
        return 'border-blue-400';
      default:
        return 'border-gray-300';
    }
  }, []);

  const filteredMeetings = useMemo(() => {
    if (!isSuccess || !Array.isArray(data)) return [];

    const term = debouncedSearch.trim().toLowerCase();

    return data
      .filter((item) =>
        item.fullName?.toLowerCase().includes(term) ||
        item.mobileNumber?.toString().includes(term) ||
        item.constituency?.toLowerCase().includes(term)
      )
      .sort((a, b) => {
        if (a.isScheduled && !b.isScheduled) return -1;
        if (!a.isScheduled && b.isScheduled) return 1;

        const aTime = new Date(`${a.arrivalDate}T${a.arrivalTime}`);
        const bTime = new Date(`${b.arrivalDate}T${b.arrivalTime}`);
        return aTime - bTime;
      });
  }, [debouncedSearch, data, isSuccess]);

  // UI states
  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">🔄 Loading meetings...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 font-medium mt-10"> Error: {error?.data?.errors || error?.error || 'Something went wrong'}
      </p>
    );
  }

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">All Meetings</h2>
        <input
          type="text"
          aria-label="Search meetings"
          placeholder="🔍 Search name, number, or constituency"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredMeetings.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">No meetings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetings.map((item) => {
            const {
              _id,
              fullName,
              mobileNumber,
              state,
              homeDistrict,
              constituency,
              reference,
              occupation,
              politicalAffiliation,
              priorityTag,
              arrivalDate,
              arrivalTime,
              isScheduled,
            } = item;

            const priorityClass = getPriorityClass(priorityTag);
            const backgroundClass = isScheduled ? 'bg-green-50' : 'bg-gray-50';

            return (
              <div
                key={_id}
                className={`border-2 ${priorityClass} ${backgroundClass} rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200`}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{fullName}</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Mobile:</strong> {mobileNumber}</p>
                  <p><strong>State:</strong> {state}</p>
                  <p><strong>District:</strong> {homeDistrict}</p>
                  <p><strong>Constituency:</strong> {constituency}</p>
                  <p><strong>Reference:</strong> {reference}</p>
                  <p><strong>Occupation:</strong> {occupation}</p>
                  <p><strong>Political Affiliation:</strong> {politicalAffiliation ? 'Yes' : 'No'}</p>
                  <p><strong>Priority:</strong> {priorityTag || 'Normal'}</p>
                  <p>
                    <strong>Arrival:</strong>{' '}
                    {arrivalDate ? new Date(arrivalDate).toLocaleDateString() : 'N/A'} {arrivalTime}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`font-semibold ${isScheduled ? 'text-green-600' : 'text-gray-500'}`}>
                      {isScheduled ? 'Scheduled' : 'Not Scheduled'}
                    </span>
                  </p>
                </div>

                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleUpdate(_id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
