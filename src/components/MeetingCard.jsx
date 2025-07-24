import { useState } from "react";
import { useCompleteMeetingMutation, useDeleteMeetingMutation } from "../features/meeting/meetingApiSlice";
import InputModal from "./Modal";
import { Trash } from "lucide-react";

const getPriorityClass = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const MeetingCard = ({ item, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [completeMeeting] = useCompleteMeetingMutation();
  const [deleteMeeting] = useDeleteMeetingMutation();
  const [selectedId, setSelectedId] = useState(null);

  const handleInputSubmit = async (inputValue) => {
    const data = {
      isScheduled: "completed",
      message: inputValue,
    };

    try {
      await completeMeeting({ id: selectedId, meeting: data }).unwrap();
      alert("Meeting marked as completed.");
    } catch (err) {
      console.error("Error completing meeting:", err);
      alert("Failed to complete meeting.");
    } finally {
      setModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this meeting?");
    if (!confirm) return;

    try {
      const res = await deleteMeeting(id).unwrap();
      alert(res?.message || "Meeting deleted successfully.");
    } catch (err) {
      console.error("Error deleting meeting:", err);
      alert("Failed to delete meeting.");
    }
  };

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
    message,
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
    <div className={`rounded-2xl ${priorityClass} border shadow-lg p-6 transition-all hover:shadow-xl duration-300`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{fullName}</h3>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
          isScheduled === "completed" ? "bg-green-200 text-green-800" : "bg-gray-300 text-gray-800"
        }`}>
          {isScheduled}
        </span>
      </div>

      {/* Info Grid */}
      <div className="gap-x-4 gap-y-2 text-sm text-gray-800">
        {isScheduled === "completed" ? (
          <>
            <p><strong>Message:</strong> {message}</p>
            <p><strong>Mobile:</strong> {mobileNumber}</p>
            <p><strong>Arrival:</strong> {arrivalDate ? new Date(arrivalDate).toLocaleDateString() : "N/A"} {arrivalTime}</p>
            <p>
              <strong>Priority:</strong>{" "}
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${priorityClass}`}>
                {priorityTag || "Normal"}
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="font-medium"><strong className="text-lg">Reason:</strong> {reason}</p>
            <p>
              <strong>Priority:</strong>{" "}
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${priorityClass}`}>
                {priorityTag || "Normal"}
              </span>
            </p>
            <p><strong>Mobile:</strong> {mobileNumber}</p>
            <p><strong>Meeting Time:</strong> {arrivalDate ? new Date(arrivalDate).toLocaleDateString() : "N/A"} {arrivalTime}</p>
            <p><strong>State:</strong> {state}</p>
            <p><strong>District:</strong> {homeDistrict}</p>
            <p><strong>Constituency:</strong> {constituency}</p>
            <p><strong>Reference:</strong> {reference}</p>
            <p><strong>Occupation:</strong> {occupation}</p>
            <p><strong>Political Exp.:</strong> {politicalExperience ? "Yes" : "No"}</p>
            <p><strong>Political Affiliation:</strong> {politicalAffiliation ? "Yes" : "No"}</p>
            <p><strong>Election History:</strong> {electionHistory ? "Yes" : "No"}</p>
          </>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
        {isScheduled !== "completed" && (
          <>
         { isScheduled === 'scheduled' &&    <button
              onClick={() => {
                setSelectedId(_id);
                setModalOpen(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Meeting Remark
            </button>}
            <button
              onClick={() => onUpdate(_id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-4 py-2 rounded transition"
            >
              {isScheduled === "scheduled" ? "Re Schedule" : "Schedule"}
            </button>

           

          </>
        )}
          {
          isScheduled === "completed" &&(
            <button
              onClick={() => handleDelete(_id)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition flex items-center justify-center gap-1"
            >
              <Trash size={16} /> Delete
            </button>
          )
        }
       
      </div>

      {/* Input Modal */}
      <InputModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleInputSubmit}
        label="Enter reason for completion"
      />
    </div>
  );
};

export default MeetingCard;
