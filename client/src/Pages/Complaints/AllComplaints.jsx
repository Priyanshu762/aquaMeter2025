import { useState, useEffect } from "react";
import ComplaintModal from "./ComplaintModal";
import { FaSearch } from "react-icons/fa";
import { Loader } from "../../Components";
import axios from 'axios';

export default function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const complaintsPerPage = 5;

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      console.log("Token in allCOmplaints :", token);
      try {
        const response = await axios.get("http://localhost:8080/api/complaints", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });
        console.log(response);
        setComplaints(response.data.complaints || []);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
        // Optional: Show an error message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);


  useEffect(() => {
    let filtered = complaints;
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }
    if (searchId.trim()) {
      filtered = filtered.filter((c) =>
        c.complaintId?.toLowerCase().includes(searchId.toLowerCase())
      );
    }
    setFilteredComplaints(filtered);
    setCurrentPage(1);
  }, [complaints, searchId, statusFilter]);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "in-Progress":
        return "bg-blue-500";
      case "resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleUpdate = (updatedComplaint) => {
    setComplaints((prev) =>
      prev.map((c) => (c._id === updatedComplaint._id ? updatedComplaint : c))
    );
  };




  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * complaintsPerPage,
    currentPage * complaintsPerPage
  );

  if (loading) {
    return <div> <Loader /> </div>;
  }


  return (
    <div className="h-[90vh] p-4 ">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        📋 All Complaints
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by Complaint ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100 text-gray-800"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-500" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
        >
          <option value="all">All </option>
          <option value="pending">Pending</option>
          <option value="in-Progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto scrollbar h-96">
        <table className="w-full text-left border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <thead className="bg-indigo-600 text-white text-sm">
            <tr>
              <th className="px-6 py-3">Complaint ID</th>
              <th className="px-6 py-3">Issue</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedComplaints.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No complaints found.
                </td>
              </tr>
            ) : (
              paginatedComplaints.map((complaint, index) => (
                <tr
                  key={`${complaint._id}-${index}`}
                  className={`border-t border-gray-200 dark:border-gray-700 ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  <td className="px-6 py-4 font-medium">{complaint.complaintId}</td>
                  <td className="px-6 py-4">
                    {complaint.issue?.length > 40
                      ? `${complaint.issue.substring(0, 40)}...`
                      : complaint.issue}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getStatusClass(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedComplaint(complaint)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium bg-blue-400/10 p-1 px-2 rounded-xl cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(filteredComplaints.length / complaintsPerPage) }).map(
          (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === idx + 1
                  ? "bg-indigo-600 text-white "
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white cursor-pointer"
              }`}
            >
              {idx + 1}
            </button>
          )
        )}
      </div>

      {/* Modal */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onUpdate={handleUpdate}

        />
      )}
    </div>
  );
}
