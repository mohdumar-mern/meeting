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
  const [createMeeting, { isLoading, isError, error, isSuccess }] = useCreateMeetingMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.homeDistrict.trim()) newErrors.homeDistrict = 'Home district is required';
    if (!formData.constituency.trim()) newErrors.constituency = 'Constituency is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
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
    const updated = formData.accompanyingPersons.filter((_, i) => i !== index);
    setFormData({ ...formData, accompanyingPersons: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    try {
      await createMeeting(formData).unwrap();
      alert('Meeting request submitted successfully!');
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
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-xl shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Meeting Request Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['fullName', 'mobileNumber', 'state', 'homeDistrict', 'constituency'].map((field) => (
            <div key={field}>
              <label className="block font-medium mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>

        {/* Reference */}
        <div>
          <label className="block font-medium mb-1">Reference</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block font-medium mb-1">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          ></textarea>
          {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
        </div>

        {/* Occupation */}
        <div>
          <label className="block font-medium mb-1">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

        {/* Accompanying Persons */}
        <div>
          <label className="block font-medium mb-2">Accompanying Persons</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter name"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <button
              type="button"
              onClick={addPerson}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add
            </button>
          </div>

          {formData.accompanyingPersons.length > 0 && (
            <ul className="space-y-2">
              {formData.accompanyingPersons.map((person, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white font-semibold ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </button>

        {/* Error Message */}
        {isError && (
          <p className="text-center text-red-600 text-sm mt-2">
            {error?.data?.message || 'Failed to submit request'}
          </p>
        )}
      </form>
    </div>
  );
};

export default MeetingForm;
