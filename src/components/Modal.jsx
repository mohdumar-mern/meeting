import React, { useState } from "react";

const InputModal = ({ isOpen, onClose, onSubmit, label }) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!inputValue.trim()) return alert("Please enter something");
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-2">{label}</h2>
        <input
          type="text"
          className="border p-2 w-full rounded mb-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type here..."
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
