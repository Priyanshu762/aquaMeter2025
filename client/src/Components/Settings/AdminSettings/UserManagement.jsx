import React, { useState } from "react";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal"; 
import useModal from "../../../hooks/useModal";
import { FaUserPlus } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Moderator" },
  ]);

  const { isOpen, openModal, closeModal } = useModal();
  const [editUser, setEditUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleRoleChange = (id, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    closeModal();
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="flex flex-col items-center min-h-[70vh] p-6">
      <div className="flex justify-between items-center w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          🛠 Users Table
        </h2>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex px-6 py-2 font-medium uppercase transition-all duration-200 cursor-pointer bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-800"
        >
          <span className="mr-2 mt-1">
            <FaUserPlus size={16} />
          </span>
          <span>Add User</span>
        </button>
      </div>

      <div className="mt-6 w-full max-w-5xl overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 dark:bg-indigo-800 text-white">
            <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-center">Actions</th>
            </tr>
            </thead>

            <tbody>
            {users.map((user, index) => (
                <tr
                key={user.id}
                className={`border-b border-gray-300 dark:border-gray-700 transition-all 
                    ${index % 2 === 0 ? "bg-gray-200 dark:bg-gray-900" : "bg-gray-200 dark:bg-gray-900"}
                    hover:bg-gray-100 dark:hover:bg-gray-700`
                }
                >
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{user.name}</td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{user.email}</td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200 ">
                    {user.role}
                </td>

                <td className="py-3 px-4 text-center flex justify-center space-x-3">
                    <button
                    onClick={() => {
                        setEditUser(user);
                        openModal();
                    }}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 
                        hover:scale-105 transition-all duration-200 hover:text-green-600 dark:hover:text-green-400 cursor-pointer"
                    >
                    <svg
                        className="w-5 h-5 stroke-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span className="font-medium text-sm">Edit</span>
                    </button>

                    <button
                    onClick={() => handleDelete(user.id)}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 
                        hover:scale-105 transition-all duration-200 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                    >
                    <svg
                        className="w-5 h-5 stroke-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                    </svg>
                    <span className="font-medium text-sm">Delete</span>
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    
    <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddUser={handleAddUser} />

      <EditUserModal isOpen={isOpen} user={editUser} onClose={closeModal} onUpdate={handleUpdateUser} />
    </div>
  );
};

export default UserManagement;
