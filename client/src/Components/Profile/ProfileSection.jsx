import React, { useState } from "react";

const ProfileSection = () => {
  const [profile, setProfile] = useState({
    name: "Jenny Wilson",
    bio: "A social media influencer and singer",
    phone: "+1 234 567 890",
    email: "jenny@example.com",
    address: "123, Hollywood Blvd, Los Angeles, CA",
    location: "New York, USA",
    occupation: "Content Creator",
    linkedin: "https://linkedin.com/in/jennywilson",
    twitter: "https://twitter.com/jennywilson",
    instagram: "https://twitter.com/jennywilson",
    facebook: "https://twitter.com/jennywilson",
    imageUrl: "https://pagedone.io/asset/uploads/1705471668.png",
  });

  const [previewImage, setPreviewImage] = useState(profile.imageUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState(false);

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

  const handleSave = () => {
    console.log("Saved Data:", profile);
    setProfile({ ...profile, imageUrl: previewImage });
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreviewImage(profile.imageUrl);
    setIsEditing(false);
  };

  return (
    <section className="relative pt-36 pb-24">
      <img
        src="https://pagedone.io/asset/uploads/1705471739.png"
        alt="Cover"
        className="w-full absolute top-0 left-0 h-60 object-cover z-[-10]"
      />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-0">
        <div 
            className="flex items-center justify-center mb-4 relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
          <img
            src={previewImage}
            alt="Profile"
            className="cursor-pointer border-4 border-white dark:border-gray-800 rounded-full object-cover w-32 h-32"
          />
          {hovered && (
            <label className="absolute bottom-0 left-160  w-10 h-10 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white">
                ✎
              </span>
            </label>
          )}
        </div>

        <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
          <ul className="flex items-center gap-5">
            {["Home", "Account", "Profile"].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center gap-2 cursor-pointer group ${
                    item === "Home"
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {index > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="20"
                      viewBox="0 0 5 20"
                      fill="none"
                    >
                      <path
                        d="M4.12567 1.13672L1 18.8633"
                        stroke="#E5E7EB"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  <span className="font-medium text-base leading-7">{item}</span>
                  {item === "Profile" && (
                    <span className="rounded-full py-1.5 px-2.5 bg-indigo-200 dark:bg-indigo-900 text-xs text-indigo-800 dark:text-indigo-200">
                      New
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          
        </div>

        <div className="max-w-lg mx-auto text-center">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full text-center font-bold text-3xl text-gray-900 dark:text-gray-100 bg-transparent border p-2 rounded-full"
              />
              <input
                type="text"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full text-base text-gray-500 dark:text-gray-400 text-center bg-transparent border p-2 rounded-full mt-2"
              />
            </>
          ) : (
            <>
              <h3 className="text-center font-bold text-3xl text-gray-900 dark:text-gray-100 mb-3">{profile.name}</h3>
              <p className="text-base text-gray-500 dark:text-gray-400 text-center mb-8">{profile.bio}</p>
            </>
          )}

          <div className="mt-4 space-y-3">
            {["phone", "email", "address"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={profile[field]}
                onChange={handleChange}
                disabled={!isEditing || field === "email" ? true : false}
                className={`w-full text-base text-gray-600 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-700 e p-2 rounded-xl ${
                  !isEditing ? "cursor-pointer" : ""
                }`}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="rounded-full border border-indigo-600 bg-indigo-600 py-3 px-6 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="ml-4 rounded-full border border-gray-400 bg-gray-200 py-3 px-6 text-sm font-semibold text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-full border border-gray-400 bg-gray-200 py-3 px-6 text-sm font-semibold text-gray-800 hover:bg-gray-300"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
