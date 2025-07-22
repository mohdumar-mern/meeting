import React, { useState } from 'react';
import { useCreateMeetingMutation } from './meetingApiSlice';

const MeetingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    state: '',
    homeDistrict: '',
    constituency: '',
    metBefore: false,
    reference: '',
    politicalExperience: false,
    reason: '',
    occupation: '',
    janSuraajMember: false,
    janSuraajWorker: false,
    electionHistory: false,
    politicalAffiliation: false,
    accompanyingPersons: [],
  });

  const [newPerson, setNewPerson] = useState('');
  const [errors, setErrors] = useState({});
  const [createMeeting, { isLoading, isError, error }] = useCreateMeetingMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'mobileNumber', 'state', 'homeDistrict', 'constituency', 'reason', 'occupation'];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    // Phone number validation (must be exactly 10 digits)
    const phone = formData.mobileNumber.trim();
    if (!/^\d{10}$/.test(phone)) {
      newErrors.mobileNumber = 'Mobile number must be exactly 10 digits';
    }

    return newErrors;
  };

  const addPerson = () => {
    if (newPerson.trim()) {
      setFormData((prev) => ({
        ...prev,
        accompanyingPersons: [...prev.accompanyingPersons, newPerson.trim()],
      }));
      setNewPerson('');
    }
  };

  const removePerson = (index) => {
    setFormData((prev) => ({
      ...prev,
      accompanyingPersons: prev.accompanyingPersons.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    try {
      await createMeeting(formData).unwrap();
      alert('✅ Meeting request submitted successfully!');
      setFormData({
        fullName: '',
        mobileNumber: '',
        state: '',
        homeDistrict: '',
        constituency: '',
        metBefore: false,
        reference: '',
        politicalExperience: false,
        reason: '',
        occupation: '',
        janSuraajMember: false,
        janSuraajWorker: false,
        electionHistory: false,
        politicalAffiliation: false,
        accompanyingPersons: [],
      });
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-xl shadow-md my-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Meeting Request Form</h2>

      {isError && (
        <p className="text-red-600 text-center mb-4">
          {error?.data?.message || '❌ Failed to submit request. Please try again.'}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['fullName', 'state', 'homeDistrict', 'constituency'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block font-medium mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="mobileNumber" className="block font-medium mb-1">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            maxLength={10}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="reference" className="block font-medium mb-1">Reference</label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block font-medium mb-1">Reason</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.reason && (
            <p className="text-red-500 text-sm">{errors.reason}</p>
          )}
        </div>

        <div>
          <label htmlFor="occupation" className="block font-medium mb-1">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.occupation && (
            <p className="text-red-500 text-sm">{errors.occupation}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'metBefore',
            'politicalExperience',
            'janSuraajMember',
            'janSuraajWorker',
            'electionHistory',
            'politicalAffiliation',
          ].map((field) => (
            <label key={field} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={field}
                checked={formData[field]}
                onChange={handleChange}
              />
              <span className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>

        <div>
          <label className="block font-medium mb-2">Accompanying Persons</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter name"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
            <button
              type="button"
              onClick={addPerson}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>
          {formData.accompanyingPersons.length > 0 && (
            <ul className="space-y-2">
              {formData.accompanyingPersons.map((person, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
                >
                  <span>{person}</span>
                  <button
                    type="button"
                    onClick={() => removePerson(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default MeetingForm;
