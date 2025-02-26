import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [rollNo, setRollNo] = useState("");
  const [classSection, setClassSection] = useState("");
  const [section, setSection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation to ensure no field is empty
    if (!rollNo || !classSection || !section) {
      alert("Please fill out all fields.");
      return;
    }

    const userData = { rollNo, classSection, section };
    onSubmit(userData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
      <div className="bg-black bg-opacity-50 p-8 rounded-2xl shadow-lg w-96 text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">Login Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Roll Number:</label>
            <select
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
            >
              <option value="">Select Roll Number</option> {/* Placeholder */}
              {[...Array(40).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Class:</label>
            <select
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
            >
              <option value="">Select Class</option> {/* Placeholder */}
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Section:</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
            >
              <option value="">Select Section</option> {/* Placeholder */}
              <option value="Science">Science</option>
              <option value="Management">Management</option>
              <option value="Arts">Arts</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
