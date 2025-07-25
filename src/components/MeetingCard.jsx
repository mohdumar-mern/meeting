import { useState } from "react";
import { useCompleteMeetingMutation, useDeleteMeetingMutation } from "../features/meeting/meetingApiSlice";
import InputModal from "./Modal";
import { Trash } from "lucide-react";

const getPriorityClass = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-300 capitalize";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300 capitalize";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-300 capitalize";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300 capitalize";
  }
};

const MeetingCard = ({ item, onUpdate, apointment }) => {
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
  <div className={`overflow-x-auto rounded-2xl border shadow-lg p-6 transition-all hover:shadow-xl duration-300 ${priorityClass}`}>
  <table className="min-w-full table-auto text-sm text-left text-gray-800">
    <thead>
      <tr className="text-gray-900 font-bold text-base border-b">
        <th colSpan="2" className="pb-4">
          <div className="flex justify-between items-center">
            <span>{fullName}</span>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                isScheduled === "completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {isScheduled}
            </span>
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      {isScheduled === "completed" ? (
        <>
          <tr>
            <td className="font-bold py-2 pr-4">Message:</td>
            <td className="py-2">{message}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Mobile:</td>
            <td className="py-2">{mobileNumber}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Arrival:</td>
            <td className="py-2">
              {arrivalDate ? new Date(arrivalDate).toLocaleDateString() : "N/A"} {arrivalTime}
            </td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Priority:</td>
            <td className="py-2">
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${priorityClass}`}>
                {priorityTag || "Normal"}
              </span>
            </td>
          </tr>
        </>
      ) : (
        <>
          <tr>
            <td className="font-bold py-2 pr-4">Reason:</td>
            <td className="py-2">{reason}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Priority:</td>
            <td className="py-2">
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${priorityClass}`}>
                {priorityTag || "Normal"}
              </span>
            </td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Mobile:</td>
            <td className="py-2">{mobileNumber}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Meeting Time:</td>
            <td className="py-2">
              {arrivalDate ? new Date(arrivalDate).toLocaleDateString() : "N/A"} {arrivalTime}
            </td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">State:</td>
            <td className="py-2">{state}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">District:</td>
            <td className="py-2">{homeDistrict}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Constituency:</td>
            <td className="py-2">{constituency}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Reference:</td>
            <td className="py-2">{reference}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Occupation:</td>
            <td className="py-2">{occupation}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Political Exp.:</td>
            <td className="py-2">{politicalExperience ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Political Affiliation:</td>
            <td className="py-2">{politicalAffiliation ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="font-bold py-2 pr-4">Election History:</td>
            <td className="py-2">{electionHistory ? "Yes" : "No"}</td>
          </tr>
        </>
      )}
    </tbody>
  </table>

  {/* Footer Buttons */}
  {!apointment && (
    <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
      {isScheduled !== "completed" && (
        <>
          {isScheduled === "scheduled" && (
            <button
              onClick={() => {
                setSelectedId(_id);
                setModalOpen(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Meeting Remark
            </button>
          )}
          <button
            onClick={() => onUpdate(_id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-4 py-2 rounded transition"
          >
            {isScheduled === "scheduled" ? "Re Schedule" : "Schedule"}
          </button>
        </>
      )}
      {isScheduled === "completed" && (
        <button
          onClick={() => handleDelete(_id)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition flex items-center justify-center gap-1"
        >
          <Trash size={16} /> Delete
        </button>
      )}
    </div>
  )}

  {/* Modal */}
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
