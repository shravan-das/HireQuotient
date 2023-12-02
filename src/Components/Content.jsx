// Content.jsx
import React from 'react';

const Content = ({ users, onDeleteUser }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="font-bold text-gray-600 p-4 text-left border-b">ID</th>
            <th className="font-bold text-gray-600 p-4 text-left border-b">Name</th>
            <th className="font-bold text-gray-600 p-4 text-left border-b">Email</th>
            <th className="font-bold text-gray-600 p-4 text-left border-b">Role</th>
            <th className="font-bold text-gray-600  p-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="border-b">
          {users.map(user => (
            <tr key={user.id}>
              <td className="font-bold p-4 border-b">{user.id}</td>
              <td className="font-bold p-4 border-b">{user.name}</td>
              <td className="font-bold p-4 border-b">{user.email}</td>
              <td className="font-bold p-4 border-b">{user.role}</td>
              <td className="p-4 border-b">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDeleteUser(user.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-red-500 ml-3 text-white px-2 py-1 rounded"
                  onClick={() => onDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
             

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
