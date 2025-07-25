import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMeetingsQuery } from '../meeting/meetingApiSlice';
import useDebounce from '../../hook/debounce';
import MeetingCard from '../../components/MeetingCard';
// import InputModal from '../../components/Modal';

const FILTER_OPTIONS = ['All', 'Scheduled', 'NotScheduled', 'Completed'];

const ManageMeeting = () => {
  const navigate = useNavigate();
  const { data = [], isLoading, isError, isSuccess, error } = useGetMeetingsQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [showDateInput, setShowDateInput] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedMeetingId, setSelectedMeetingId] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);
  const dropdownRef = useRef(null);

  const handleUpdate = useCallback(
    (id) => {
      navigate(`/dashboard/meetings/${id}`);
    },
    [navigate]
  );

  // const handleModalSubmit = async (reason) => {
  //   try {
  //     const payload = {
  //       isScheduled: 'completed',
  //       reason,
  //     };
  //     await completeMeeting({ id: selectedMeetingId, meeting: payload }).unwrap();
  //   } catch (err) {
  //     console.error('Error completing meeting:', err);
  //   } finally {
  //     setModalOpen(false);
  //     setSelectedMeetingId(null);
  //   }
  // };

  // const handleComplete = (id) => {
  //   setSelectedMeetingId(id);
  //   setModalOpen(true);
  // };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDateInput(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredMeetings = useMemo(() => {
    if (!isSuccess || !Array.isArray(data)) return [];

    const term = debouncedSearch.trim().toLowerCase();

    return data
      .filter((item) => {
        const matchesSearch =
          item.fullName?.toLowerCase().includes(term) ||
          item.mobileNumber?.toString().includes(term) ||
          item.reason?.toLowerCase().includes(term) ||
          item.constituency?.toLowerCase().includes(term);

        const matchesStatus =
          statusFilter === 'All' ||
          (statusFilter === 'Scheduled' && item.isScheduled === 'scheduled') ||
          (statusFilter === 'NotScheduled' && item.isScheduled === 'notScheduled') ||
          (statusFilter === 'Completed' && item.isScheduled === 'completed'); // or use item.isCompleted === true if your schema supports it

        const itemDate = item.arrivalDate?.split('T')[0];
        const matchesDate = !dateFilter || itemDate === dateFilter;

        return matchesSearch && matchesStatus && matchesDate;
      })
      .sort((a, b) => {
        const aTime = new Date(`${a.arrivalDate}T${a.arrivalTime}`);
        const bTime = new Date(`${b.arrivalDate}T${b.arrivalTime}`);
        return aTime - bTime;
      });
  }, [debouncedSearch, statusFilter, dateFilter, data, isSuccess]);

  if (isLoading) {
    return <p className="text-center text-gray-400 mt-10">Loading meetings...</p>;
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
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 relative">
        {/* Status Buttons */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {FILTER_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 text-sm rounded-2xl font-medium transition-all ${
                statusFilter === status
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'bg-yellow-500 text-black hover:bg-yellow-400'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="w-full md:w-[350px] relative" ref={dropdownRef}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search name, number, or constituency"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />

            <button
              onClick={() => setShowDateInput((prev) => !prev)}
              className="text-sm text-black font-semibold bg-yellow-500 px-4 py-1.5 rounded hover:bg-yellow-400 transition"
            >
              Filter
            </button>
          </div>

          {showDateInput && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-[250px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full border border-gray-300 text-black rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />

              <div className="flex justify-between mt-3">
                <button
                  className="text-xs text-red-500 hover:underline"
                  onClick={() => {
                    setDateFilter('');
                    setShowDateInput(false);
                  }}
                >
                  Clear
                </button>
                <button
                  className="text-xs text-blue-500 hover:underline"
                  onClick={() => setShowDateInput(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meeting List */}
      {filteredMeetings.length === 0 ? (
        <p className="text-center text-gray-300 mt-10 text-lg">No meetings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:p-0  gap-6">
          {filteredMeetings.map((item) => (
            <MeetingCard
              key={item._id}
              item={item}
              onUpdate={handleUpdate}
              // onComplete={() => handleComplete(item._id)}
              apointment={false}

            />
          ))}
        </div>
      )}

      {/* Modal */}
      {/* <InputModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        label="Meeting Remark"
      /> */}
    </div>
  );
};

export default ManageMeeting;
