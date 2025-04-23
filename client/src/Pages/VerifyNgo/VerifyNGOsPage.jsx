import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaFilePdf,
  FaMapMarkerAlt,
  FaSpinner,
  FaClipboard
} from 'react-icons/fa';

const VerifyNGOsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const dummyData = [
      {
        _id: '1',
        ngoName: 'Helping Hands Foundation',
        registrationNumber: 'REG123456',
        address: '123 Charity Street, Lucknow, India',
        website: 'https://helpinghands.org',
        description:
          'We help underprivileged children with education and nutrition.',
        contactName: 'Rohit Sharma',
        contactEmail: 'rohit@helpinghands.org',
        contactPhone: '+91-9876543210',
        documentSubmission: 'documents/helpinghands-doc.pdf',
      },
      {
        _id: '2',
        ngoName: 'Green Earth Society',
        registrationNumber: 'REG7891011',
        address: '45 Environment Avenue, Delhi, India',
        website: 'https://greenearth.org',
        description:
          'Dedicated to environmental sustainability and afforestation.',
        contactName: 'Anita Verma',
        contactEmail: 'anita@greenearth.org',
        contactPhone: '+91-9123456780',
        documentSubmission: 'documents/greenearth-doc.pdf',
      },
    ];

    setApplications(dummyData);
  }, []);

  const verifyNgo = async (userId) => {
    try {
      setLoadingId(userId); // Start loading for the specific NGO
      await axios.post(`/api/admin/verify-ngo/${userId}`);
      setApplications(applications.filter((app) => app._id !== userId));
      setLoadingId(null); // Reset loading state
    } catch (err) {
      console.error(err);
      setLoadingId(null); 
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => {
        setCopied(null); // Clear the "Copied!" message after 2 seconds
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen  px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
        🏢 NGO Verification Dashboard
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No pending applications.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white dark:bg-gray-950/40 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {app.ngoName}
                </h3>
                <div className='flex gap-2'>
                <span
                  onClick={() => handleCopy(app.registrationNumber)}
                  className=" inline-block text-sm font-semibold mt-1 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full mt-2 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                >
                  {app.registrationNumber}
                </span>
                {copied === app.registrationNumber && (
                  <span className="mt-2 text-sm text-blue-600 dark:text-green-400 flex items-center">
                    <FaCheckCircle className="mr-1" />
                    Copied!
                  </span>
                )}
                </div>
              </div>

              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" /> {app.address}
                </p>
                <p className="flex items-center gap-2">
                  <FaGlobe className="text-green-500" />
                  <a
                    href={app.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    {app.website}
                  </a>
                </p>
                <p>
                  <strong className="text-sm text-gray-600 dark:text-gray-400">Description:</strong>{' '}
                  {app.description}
                </p>
              </div>

              <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4 space-y-2">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  👤 Contact Info
                </h4>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-red-400" /> {app.contactEmail}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-green-600" /> {app.contactPhone}
                </p>
                <p className="flex items-center gap-2">
                  <FaFilePdf className="text-red-500" />
                  <a
                    href={`/${app.documentSubmission}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    View Document
                  </a>
                </p>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => verifyNgo(app._id)}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-4 py-2 rounded-xl shadow-md transition"
                  disabled={loadingId === app._id} 
                >
                  {loadingId === app._id ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaCheckCircle />
                  )}
                  {loadingId === app._id ? ' Verifying...' : 'Verify NGO'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifyNGOsPage;
