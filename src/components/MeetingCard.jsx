const getPriorityClass = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Low':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const MeetingCard = ({ item, onUpdate, onComplete }) => {
  const {
    _id,
    fullName,
    mobileNumber,
    state,
    reason,
    homeDistrict,
    constituency,
    electionHistory,
    reference,
    occupation,
    politicalAffiliation,
    politicalExperience,
    priorityTag,
    arrivalDate,
    arrivalTime,
    isScheduled,
  } = item;

  const priorityClass = getPriorityClass(priorityTag);

  return (
    <div
      key={_id}
      className={`rounded-2xl ${priorityClass} border shadow-lg p-6 transition-all  hover:shadow-xl duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{fullName}</h3>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            isScheduled
              ? 'bg-green-200 text-green-800'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          {isScheduled }
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-800">
        <p><strong>Reason:</strong> {reason}</p>
        <p><strong>Mobile:</strong> {mobileNumber}</p>
        <p><strong>State:</strong> {state}</p>
        <p><strong>District:</strong> {homeDistrict}</p>
        <p><strong>Constituency:</strong> {constituency}</p>
        <p><strong>Reference:</strong> {reference}</p>
        <p><strong>Occupation:</strong> {occupation}</p>
        <p><strong>Political Exp.:</strong> {politicalExperience ? 'Yes' : 'No'}</p>
        <p><strong>Political Affiliation:</strong> {politicalAffiliation ? 'Yes' : 'No'}</p>
        <p><strong>Election History:</strong> {electionHistory ? 'Yes' : 'No'}</p>
        <p><strong>Arrival:</strong> {arrivalDate ? new Date(arrivalDate).toLocaleDateString() : 'N/A'} {arrivalTime}</p>
        <p>
          <strong>Priority:</strong>{' '}
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${priorityClass}`}>
            {priorityTag || 'Normal'}
          </span>
        </p>
      </div>

      {/* Footer Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={() => onComplete(_id)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-4 py-2 rounded-lg transition"
        >
          Complete
        </button>
        <button
          onClick={() => onUpdate(_id)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-4 py-2 rounded-lg transition"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
