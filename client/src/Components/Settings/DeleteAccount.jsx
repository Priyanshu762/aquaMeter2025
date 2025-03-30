import React, { useState } from 'react';

const DeleteAccount = () => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (confirmText === 'DELETE') {
      setIsDeleting(true);
      setTimeout(() => {
        console.log('Account Deleted');
        alert('Your account has been deleted.');
        setIsDeleting(false);
      }, 2000); 
    } else {
      alert('Please type DELETE to confirm.');
    }
  };

  return (
    <div >
      <h2 className="text-xl font-semibold mb-4 text-red-600 ">Delete Account</h2>
      <p className="mb-4">
        Once you delete your account, there is no going back. Please be sure before proceeding.
      </p>
      
      <label className="block mb-4">
        <span className="dark:text-gray-300 text-gray-700">Type <b>DELETE</b> to confirm:</span>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="w-full p-2 mt-2 border rounded"
        />
      </label>

      <button
        onClick={handleDelete}
        className={`py-2 px-4 rounded ${
          confirmText === 'DELETE'
            ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={confirmText !== 'DELETE' || isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
};

export default DeleteAccount;
