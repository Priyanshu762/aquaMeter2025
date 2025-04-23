import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../Store/authSlice';
import axios from 'axios';
const ProfileSettings = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    name: user.name ,
    email: user.email,
    avatar: user.profilePicture || 'https://www.pngitem.com/pimgs/m/146-1468479_transparent-avatar-png-default-avatar-png-transparent-png.png',
  });

  const [previewImage, setPreviewImage] = useState(profile.avatar);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSave = async () => {
    console.log('Profile Updated:', profile);
    try {
        const res = await axios.post("http://localhost:8080/api/auth/update-profile", profile, {
          withCredentials: true
        });
        dispatch(updateUserProfile(res.data.profile));
        console.log("profile data",res.data.profile)
        toast.success("Profile updated successfully!")
      } catch (error) {
        toast.error("Failed to update profile");
      }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>

      <div className="flex items-center mb-6">
        <img
          src={previewImage}
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4 border-4 border-indigo-500"
        />
        <label className="cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          <span className="text-indigo-400 p-2 text-sm  bg-indigo-500 hover:bg-indigo-900 p-2 rounded-full text-white">Change Avatar</span>
        </label>
      </div>

      <div className="space-y-4">
        <input
          className="w-full pl-10 pr-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:placeholder-gray-300 dark:focus:border-gray-100 dark:focus:bg-gray-900 dark:text-gray-200"
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          className="w-full pl-10 pr-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:placeholder-gray-300 dark:focus:border-gray-100 dark:focus:bg-gray-900 dark:text-gray-200 cursor-not-allowed"
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled={true}
          placeholder="Email Address"
        />
        <button
          onClick={handleSave}
          className="bg-indigo-500 font-semibold border border-2 border-indigo-500 hover:border-indigo-700 hover:hover-bg-indigo-900 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 cursor-pointer duration-200"
        //   hover:bg-primary cursor-pointer text-white font-semibold hover:text-white rounded-md border-2 border-primary px-6 py-2 duration-200 hidden md:block
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
