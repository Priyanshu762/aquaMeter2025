import React, { useState, useEffect } from "react";
import { use } from "react";
import { FaSearch, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { complaintService } from "../../Services/complaintService";
import ComplaintStatusSkeleton from "../../Skeletons/ComplaintStatusSkeleton";

const ComplaintStatus = () => {
  const [searchId, setSearchId] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [complaints,setComplaints] = useState([]);

  // const filteredComplaints = complaints.filter((complaint) =>
  //   complaint._id.includes(searchId)
  // );

  const getStatusClass = ({status}) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "in-Progress":
        return "bg-blue-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        console.log("Fetching complaints...");
        const res = await complaintService.getComplaintByUser();
        console.log("Complaints fetched:", res);
        setComplaints(res || []);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }finally{
        setLoading(false)
      }
    };
    fetchComplaints();
  }, []);
  
if(loading){
  if (loading) return <ComplaintStatusSkeleton rows={3} />;
}
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        📌 Complaint Status
      </h2>

      {/* Search Bar */}

      {complaints.length > 0 ? 
        (<>
           {isAuthenticated ? (
        <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder="Enter Complaint ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 pr-10 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 w-5 h-5 mt-1 mr-1"  />
      </div>
      ) : (<></>) }
      
      {/* Table */}

      {isAuthenticated ? (<div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th className="border p-3 text-left">Complaint ID</th>
              <th className="border p-3 text-left">Issue</th>
              <th className="border p-3 text-center">Status</th>
              <th className="border p-3 text-left">Actions</th>
              <th className="border p-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <React.Fragment key={complaint._id}>
                <tr className="even:bg-gray-50 dark:even:bg-gray-700 text-gray-900 dark:text-white">
                  <td className="border p-3">{complaint.complaintId}</td>
                  <td className="border p-3">{complaint.issue}</td>
                  <td className="border p-3 text-center">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass({status:complaint.status})}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="border p-3">{complaint.actions}</td>
                  <td className="border p-3 text-center">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => setExpandedRow(expandedRow === complaint._id ? null : complaint._id)}
                    >
                      {expandedRow === complaint._id ? <FaEyeSlash /> : <FaEye />}
                      {expandedRow === complaint._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>
                
                {expandedRow === complaint._id && (
                  <tr className="bg-gray-100 dark:bg-gray-800 transition-all duration-300 border-1 border-gray-300">
                    <td colSpan={5} className="p-6 border-t border-gray-300 dark:border-gray-600 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Complaint Details
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Actions Taken:</strong> {complaint.action}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Updated Status:</strong> {complaint.updatedStatus}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                            Before Inspection
                          </h4>
                          <div className="flex gap-3">
                            {complaint.images.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt="Before Inspection"
                                className="w-32 h-32 object-cover rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                            After Inspection
                          </h4>
                          <div className="flex gap-3">
                            {complaint.images.length > 0 ? (
                              complaint.images.map((url, index) => (
                                <img
                                  key={index}
                                  src={url}
                                  alt="After Inspection"
                                  className="w-32 h-32 object-cover rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
                                />
                              ))
                            ) : (
                              <p className="text-gray-600 dark:text-gray-400 italic">No after-inspection images available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>):(
        
        <div className="text-center text-gray-600 dark:text-gray-300 mt-6">
          <p className="text-lg font-semibold">Please login to view your complaint status.</p>
        </div>
      )}
        </>) : 
        !isAuthenticated ? 
        (
          <>
            <div className="text-center text-gray-600 dark:text-gray-300 mt-6">
              <p className="text-lg font-semibold">Please login to view your complaint status.</p>
            </div>
          </>
        ) 
        :
        (<>
          <div className="text-center text-gray-600 dark:text-gray-300 mt-6">
            <p className="text-lg font-semibold">Please file a complaint to view its status.</p>
          </div>
        </>) 
      }

     

    </div>
  );
};

export default ComplaintStatus;
