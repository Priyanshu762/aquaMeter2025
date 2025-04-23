import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUpload, FaFileCsv, FaClock } from "react-icons/fa";
import Papa from "papaparse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmitReportsPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const validHeaders = ["deviceId", "temperature", "turbidity", "phLevel", "tds", "timestamp"];

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      parseCsv(file);
    } else {
      toast.error("Please upload a valid CSV file.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      parseCsv(file);
    } else {
      toast.error("Please upload a valid CSV file.");
    }
  };

  const parseCsv = (file) => {
    setFileName(file.name);
    setCsvData([]);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // const headers = Object.keys(results.data[0]);
        // const isValid = validHeaders.every((header) => headers.includes(header));

        // if (!isValid) {
        //   toast.error("Invalid CSV headers. Required: " + validHeaders.join(", "));
        //   setFileName(null);
        //   return;
        // }

        setCsvData(results.data);
        toast.success("CSV uploaded and parsed successfully!");
      },
      error: () => toast.error("Failed to parse CSV file."),
    });
  };

  const handleView = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const reportHistory = [
    {
      title: "Yamuna Monitoring",
      date: "2024-04-20",
      user: "NGO X",
      type: "CSV",
      data: csvData,
    },
    {
      title: "Drain Survey South Zone",
      date: "2024-04-18",
      user: "Admin",
      type: "PDF",
      data: [],
    },
  ];

  return (
    <div className="px-6 py-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <ToastContainer position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">📄 Submit Reports</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg px-6 py-6 mb-8">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
            type="text"
            placeholder="Report Title"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

             <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Category...</option>
                <option value="Water Quality">Water Quality</option>
                <option value="Drain Monitoring">Drain Monitoring</option>
                <option value="Waste Management">Waste Management</option>
            </select>

            <input type="text" placeholder="Latitude (optional)" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="Longitude (optional)" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />

            {/* <input type="text" placeholder="Tags (comma-separated)" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" /> */}

            <textarea
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            />


          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-blue-400 rounded-xl px-6 py-6 text-center md:col-span-2 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-100 cursor-pointer"
          >
            <label htmlFor="file-upload" className="cursor-pointer block">
              <FaUpload className="text-2xl mx-auto mb-2" />
              {fileName ? (
                <span className="font-semibold">{fileName}</span>
              ) : (
                "Drag & drop CSV here or click to upload"
              )}
              <input id="file-upload" type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg md:col-span-2">
            Submit Report
          </button>
        </form>
      </div>

      {csvData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 px-4 py-4 rounded-xl shadow mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaFileCsv className="text-green-500" /> CSV Preview
          </h3>
          <div className="overflow-x-auto max-h-60 border rounded-lg">
            <table className="min-w-full text-sm table-auto">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  {Object.keys(csvData[0]).map((key, index) => (
                    <th key={index} className="px-4 py-2 font-medium text-left">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 5).map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((cell, i) => (
                      <td key={i} className="px-4 py-2 border-t border-gray-300 dark:border-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 px-4 py-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaClock className="text-indigo-500" /> Report History
        </h3>
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Uploaded By</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportHistory.map((report, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{report.title}</td>
                <td className="px-4 py-2">{report.date}</td>
                <td className="px-4 py-2">{report.user}</td>
                <td className="px-4 py-2">{report.type}</td>
                <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer" onClick={() => handleView(report.data)}>
                  View
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 w-11/12 max-w-4xl rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Report Data Preview</h2>
            <div className="overflow-x-auto max-h-72 border rounded-lg">
              <table className="min-w-full text-sm table-auto">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    {modalData.length > 0 &&
                      Object.keys(modalData[0]).map((key, index) => (
                        <th key={index} className="px-4 py-2 text-left font-medium">
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {modalData.slice(0, 10).map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-4 py-2 border-t border-gray-300 dark:border-gray-700">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-right mt-4">
              <button onClick={() => setShowModal(false)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitReportsPage;
