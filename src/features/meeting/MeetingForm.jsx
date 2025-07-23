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

    if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
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
    <div className="max-w-3xl mx-auto px-6 py-10 bg-transparent text-white border  backdrop:blur-2xl rounded-xl shadow-lg mt-10 mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Meeting Request Form</h2>

      {isError && (
        <p className="text-red-600 text-center mb-4">
          {error?.data?.message || ' Failed to submit request. Please try again.'}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['fullName', 'state', 'homeDistrict', 'constituency'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors[field]
                    ? 'border-red-400 focus:ring-red-300'
                    : 'border-slate-300 focus:ring-blue-400'
                }`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            maxLength={10}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.mobileNumber ? 'border-red-400' : 'border-slate-300'
            }`}
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
        </div>

        <div>
          <label htmlFor="reference" className="block text-sm font-medium mb-1">Reference (optional)</label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason for Meeting</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.reason ? 'border-red-400' : 'border-slate-300'
            }`}
          />
          {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium mb-1">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.occupation ? 'border-red-400' : 'border-slate-300'
            }`}
          />
          {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
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
            <label key={field} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name={field}
                checked={formData[field]}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Accompanying Persons</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter name"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
              className="border border-slate-300 text-white px-3 py-2 rounded outline-none w-full"
            />
            <button
              type="button"
              onClick={addPerson}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
          {formData.accompanyingPersons.length > 0 && (
            <ul className="space-y-2">
              {formData.accompanyingPersons.map((person, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-slate-100 px-4 py-2 rounded"
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
          className={`w-full py-3 text-lg font-semibold text-white rounded transition ${
            isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit Meeting Request'}
        </button>
      </form>
    </div>
  );
};

export default MeetingForm;
