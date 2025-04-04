import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const EditPermissionsModal = ({
  roleName,
  allPermissions,
  editedPermissions,
  setEditedPermissions,
  onClose,
  onSave,
}) => {
  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const togglePermission = (perm) => {
    setEditedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit Permissions: {roleName}
          </h2>
          <button onClick={onClose}>
            <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />
          </button>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar">
          {allPermissions.map((perm) => (
            <label
              key={perm}
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <input
                type="checkbox"
                checked={editedPermissions.includes(perm)}
                onChange={() => togglePermission(perm)}
                className="accent-indigo-600 dark:accent-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded"
              />
              <span>{perm}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded transition hover:bg-gray-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded transition hover:bg-indigo-900 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPermissionsModal;
