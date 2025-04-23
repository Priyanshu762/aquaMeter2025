import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../Services/authService';
import { setLoading } from '../../Store/loaderSlice';
import { logout } from '../../Store/authSlice';
import { toast } from 'react-toastify'; 
import axios from 'axios';
const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState('');
    const user = useSelector((state) => state.auth.user);
  
  const loading = useSelector((state) => state.loader.loading);
  const handleDelete = async () => {
    if (confirmText === 'DELETE') {
      dispatch(setLoading(true));
      try {
        // Call the delete account API
        // const response= await authService.deleteAccont();
        const response = await axios.delete("http://localhost:8080/api/auth/delete-account", {withCredentials: true});
        console.log('Account deleted:', response.data);
        toast.success('Your account has been deleted successfully.');
        dispatch(logout()); 
        navigate('/');

      } catch (error) {
        console.error('Error deleting account:', error);
        toast.error('Error deleting account. Please try again later.');
      }
      finally {
        dispatch(setLoading(false));
      }
    } else {
      toast.error('Please type DELETE to confirm account deletion.');
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
        className={`py-2 px-4 rounded ${confirmText === 'DELETE'
            ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
            : 'bg-gray-400 cursor-not-allowed'
          }`}
        disabled={confirmText !== 'DELETE' || loading}
      >
        {loading ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
};

export default DeleteAccount;
