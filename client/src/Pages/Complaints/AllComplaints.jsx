import { useState, useEffect } from "react";
import ComplaintModal from "./ComplaintModal";
import { FaSearch } from "react-icons/fa";

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
    const mockResponse = {
      total: 5,
      complaints: [
    {
      "_id": "68076dd815a56fc32e283be7",
      "name": "Ranjeet Singh",
      "phone": "9696942692",
      "complaintId": "T2VE85",
      "location": "Lucknow, Uttar Pradesh, IND",
      "issue": "foul smell",
      "additionalInfo": "Needs cleaning asap",
      "images": [
        {
          "url": "https://res.cloudinary.com/do1uuncsr/image/upload/v1745317335/events/mtduxig43wpjh3jnmt2q.webp",
          "_id": "68076dd815a56fc32e283be8"
        },
        {
          "url": "https://res.cloudinary.com/do1uuncsr/image/upload/v1745317335/events/hkqmou9e31gwwa4emtgo.jpg",
          "_id": "68076dd815a56fc32e283be9"
        }
      ],
      "status": "pending",
      "action": "Pending to Inspection",
      "createdBy": {
        "_id": "680005d9b65f25283ba52410",
        "email": "ranjeet.fb12@gmail.com",
        "name": "Ranjeet Singh"
      },
      "assignedTo": null,
      "updatedStatus": "pending",
      "createdAt": "2025-04-22T10:22:16.585Z",
      "updatedAt": "2025-04-22T10:22:16.586Z",
      "__v": 0
    },
    {
      "_id": "68076dd615a56fc32e283be2",
      "name": "Ranjeet Singh",
      "phone": "9696942692",
      "complaintId": "9584CL",
      "location": "Lucknow, Uttar Pradesh, IND",
      "issue": "foul smell",
      "additionalInfo": "Needs cleaning asap",
      "images": [
        {
          "url": "https://res.cloudinary.com/do1uuncsr/image/upload/v1745317333/events/cfu3r13xcb193vmjlfsu.webp",
          "_id": "68076dd615a56fc32e283be3"
        },
        {
          "url": "https://res.cloudinary.com/do1uuncsr/image/upload/v1745317333/events/vqkss9oewtoiz0nf4pdd.jpg",
          "_id": "68076dd615a56fc32e283be4"
        }
      ],
      "status": "pending",
      "action": "Pending to Inspection",
      "createdBy": {
        "_id": "680005d9b65f25283ba52410",
        "email": "ranjeet.fb12@gmail.com",
        "name": "Ranjeet Singh"
      },
      "assignedTo": null,
      "updatedStatus": "pending",
      "createdAt": "2025-04-22T10:22:14.447Z",
      "updatedAt": "2025-04-22T10:22:14.454Z",
      "__v": 0
    },
    {
      "_id": "68076a7b0165c5c59ce77cce",
      "name": "Testing2",
      "phone": "9026321074",
      "complaintId": "X8H7CX",
      "location": "gomti river",
      "issue": "foul smell",
      "additionalInfo": "Repaired",
      "images": [
        {
          "url": "https://res.cloudinary.com/do1uuncsr/image/upload/v1745316475/events/uckwcrmm4mu92yiniy3j.jpg",
          "_id": "68076a7b0165c5c59ce77ccf"
        }
      ],
      "status": "pending",
      "action": "Pending to Inspection",
      "createdBy": {
        "_id": "67f6d259f23c16047373de45",
        "email": "kumarpriyanshu762@gmail.com",
        "name": "Priyanshu Kumar"
      },
      "assignedTo": null,
      "updatedStatus": "pending",
      "createdAt": "2025-04-22T10:07:56.001Z",
      "updatedAt": "2025-04-22T10:07:56.006Z",
      "__v": 0
    },
    {
      "_id": "6803c1617b2ef21ff0936a4b",
      "name": "Priyanshu",
      "phone": "9026321076",
      "location": "Plot 20",
      "issue": "foul smell",
      "additionalInfo": "sfwefsdf",
      "images": [
        {
          "url": "https://res.cloudinary.com/do1uuncsr/image/upload/v1745076576/events/ptf2dfzvtzxxfhxae2gr.jpg",
          "_id": "6803c1617b2ef21ff0936a4c"
        }
      ],
      "status": "pending",
      "action": "Pending to Inspection",
      "createdBy": {
        "_id": "67f6d259f23c16047373de45",
        "email": "kumarpriyanshu762@gmail.com",
        "name": "Priyanshu Kumar"
      },
      "assignedTo": null,
      "updatedStatus": "pending",
      "createdAt": "2025-04-19T15:29:37.241Z",
      "updatedAt": "2025-04-19T15:29:37.245Z",
      "__v": 0
    },
    {
      "_id": "6802bb9c6ba384b7158ba3e8",
      "name": "Priyanshu",
      "phone": "8855220033",
      "location": "Plot 20",
      "issue": "dead aquatic life",
      "additionalInfo": "sad",
      "images": [
        {
          "url": "/uploads/1745009564465-951891573.png",
          "_id": "6802bb9c6ba384b7158ba3e9"
        }
      ],
      "status": "resolved",
      "action": "Pending to Inspection",
      "createdBy": {
        "_id": "67f6d259f23c16047373de45",
        "email": "kumarpriyanshu762@gmail.com",
        "name": "Priyanshu Kumar"
      },
      "assignedTo": null,
      "updatedStatus": "resolved",
      "createdAt": "2025-04-18T20:52:44.530Z",
      "updatedAt": "2025-04-18T20:52:44.534Z",
      "__v": 0
    }
  ]
    };
    setTimeout(() => {
      setComplaints(mockResponse.complaints || []);
      setLoading(false);
    }, 1000);
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

  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * complaintsPerPage,
    currentPage * complaintsPerPage
  );

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading...</div>;
  }


  return (
    <div className="h-[90vh] p-4 ">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        📋 All Complaints
      </h2>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by Complaint ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          onUpdate={(updated) => {
            setComplaints((prev) =>
                prev.map((c) => c._id.toString() === updated._id.toString() ? { ...c, ...updated } : c)
            );
            setSelectedComplaint(null);
            }}

        />
      )}
    </div>
  );
}
