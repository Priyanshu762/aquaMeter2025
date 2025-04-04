import React, { useState } from "react";
import EditPermissionsModal from "./EditPermissionModal";
const AccessControl = () => {
  const defaultRoles = [
    {
      name: "Admin",
      permissions: [
        "Create Users",
        "Delete Users",
        "Modify System Settings",
        "View Logs",
        "Manage Roles",
      ],
    },
    {
      name: "Editor",
      permissions: [
        "Edit Content",
        "Publish Content",
        "Access Reports",
        "Comment Moderation",
      ],
    },
    {
      name: "Viewer",
      permissions: ["View Content", "Download Reports"],
    },
  ];

  const allPermissions = [
    "Create Users",
    "Delete Users",
    "Modify System Settings",
    "View Logs",
    "Manage Roles",
    "Edit Content",
    "Publish Content",
    "Access Reports",
    "Comment Moderation",
    "View Content",
    "Download Reports",
  ];

  const [roles, setRoles] = useState(defaultRoles);
  const [selectedRole, setSelectedRole] = useState(defaultRoles[0]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedPermissions, setEditedPermissions] = useState([]);

  const openEditModal = (role) => {
    setSelectedRole(role);
    setEditedPermissions(role.permissions);
    setEditModalOpen(true);
  };

  const togglePermission = (perm) => {
    setEditedPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const saveChanges = () => {
      const updatedRoles = roles.map((role) =>
        role.name === selectedRole.name
          ? { ...role, permissions: editedPermissions }
          : role
      );

      setRoles(updatedRoles);

      const updatedSelectedRole = updatedRoles.find(r => r.name === selectedRole.name);
      setSelectedRole(updatedSelectedRole);

      setEditModalOpen(false);
    };


  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md relative">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Access Control</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Manage roles, permissions, and security policies.</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Roles</h3>
          {roles.map((role) => (
            <div key={role.name} className="relative">
              <button
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                  selectedRole.name === role.name
                    ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-white border-indigo-400 dark:border-indigo-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-700"
                }`}
              >
                {role.name}
              </button>
              <button
                onClick={() => openEditModal(role)}
                className="absolute right-4 top-[11px] text-sm text-indigo-600 dark:text-indigo-300 hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Permissions</h3>
          <ul className="space-y-2">
            {selectedRole.permissions.map((perm, idx) => (
              <li
                key={idx}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600"
              >
                {perm}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editModalOpen && (
        <EditPermissionsModal
          roleName={selectedRole.name}
          allPermissions={allPermissions}
          editedPermissions={editedPermissions}
          setEditedPermissions={setEditedPermissions}
          onClose={() => setEditModalOpen(false)}
          onSave={saveChanges}
        />
      )}

    </div>
  );
};

export default AccessControl;
