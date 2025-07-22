import { useGetMeetingsQuery } from '../meeting/meetingApiSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import useDebounce from '../../hook/debounce';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data = [], isLoading, isError, isSuccess, error } = useGetMeetingsQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredMeetings = useMemo(() => {
    if (!isSuccess) return [];

    const term = debouncedSearch.toLowerCase();

    return [...data]
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

  const handleUpdate = (id) => {
    navigate(`/dashboard/meetings/${id}`);
  };

  const getPriorityClass = (priority) => {
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
  };

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading meetings...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 font-medium mt-10">
        Error: {error?.data?.message || error?.error || 'Something went wrong'}
      </p>
    );
  }

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">All Meetings</h2>
        <input
          type="text"
          placeholder="Search by name, number, or constituency"
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
            const isScheduled = item.isScheduled;
            const priorityClass = getPriorityClass(item.priorityTag);
            const backgroundClass = isScheduled ? 'bg-green-50' : 'bg-gray-50';

            return (
              <div
                key={item._id}
                className={`border-2 ${priorityClass} ${backgroundClass} rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200`}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.fullName}</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Mobile:</strong> {item.mobileNumber}</p>
                  <p><strong>State:</strong> {item.state}</p>
                  <p><strong>District:</strong> {item.homeDistrict}</p>
                  <p><strong>Constituency:</strong> {item.constituency}</p>
                  <p><strong>Reference:</strong> {item.reference}</p>
                  <p><strong>Occupation:</strong> {item.occupation}</p>
                  <p><strong>Political Affiliation:</strong> {item.politicalAffiliation ? 'Yes' : 'No'}</p>
                  <p><strong>Priority:</strong> {item.priorityTag || 'Normal'}</p>
                  <p>
                    <strong>Arrival:</strong>{' '}
                    {item.arrivalDate ? new Date(item.arrivalDate).toLocaleDateString() : 'N/A'}{' '}
                    {item.arrivalTime}
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
                    onClick={() => handleUpdate(item._id)}
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
