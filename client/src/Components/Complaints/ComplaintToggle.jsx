import React, { useState } from "react";
import ComplaintForm from "./ComplaintForm";
import ComplaintStatus from "./ComplaintStatus";


const ComplaintToggle = () => {
  const [showStatus, setShowStatus] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 mt-[-120px]">
      <div className="flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700 shadow-lg">
        <button
          onClick={() => setShowStatus(false)}
          className={`px-6 py-2 font-medium uppercase transition-all duration-200 ${
            !showStatus
              ? "bg-indigo-700 text-white dark:bg-gray-700 text-gray-900 dark:text-white"
              : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          Register a Complaint
        </button>
        <button
          onClick={() => setShowStatus(true)}
          className={`px-6 py-2 font-medium uppercase transition-all duration-200 ${
            showStatus
              ? "bg-indigo-700 text-white bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              : " text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          View Complaint Status
        </button>
      </div>

      <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 mb-20">
        {showStatus ? <ComplaintStatus /> : <ComplaintForm />}
      </div>
    </div>
  );
};

export default ComplaintToggle;
