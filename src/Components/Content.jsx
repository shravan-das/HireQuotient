import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Content = ({ users, onDeleteUser, onEditUser }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelectedRows([]);
    setSelectAll(false);
  }, [users]);

  const handleRowClick = (userId) => {
    const isSelected = selectedRows.includes(userId);

    if (isSelected) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== userId)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, userId]);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : users.map((user) => user.id));
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((userId) => onDeleteUser(userId));
    setSelectedRows([]);
    setSelectAll(false);
  };

  return (
    <div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="font-bold text-gray-600 p-4 text-left border-b">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="font-bold text-gray-600 p-4 text-left border-b">ID</th>
            <th className="font-bold text-gray-600 p-4 text-left border-b">Name</th>
            <th className="font-bold text-gray-600 p-4 text-left border-b">Email</th>
            <th className="font-bold text-gray-600 p-4 text-left border-b">Role</th>
            <th className="font-bold text-gray-600 p-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={selectedRows.includes(user.id) ? 'bg-gray-200' : ''}
            >
              <td className="p-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowClick(user.id)}
                />
              </td>
              <td className="font-bold p-4 border-b">{user.id}</td>
              <td className="font-bold p-4 border-b">{user.name}</td>
              <td className="font-bold p-4 border-b">{user.email}</td>
              <td className="font-bold p-4 border-b">{user.role}</td>
              <td className="p-4 border-b">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDeleteUser(user.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="bg-blue-500 ml-3 text-white px-2 py-1 rounded"
                  onClick={() => onEditUser(user.id)}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       
      <button
  className={`absolute top-10 right-8 bg-red-500 text-white px-2 py-1 rounded ${selectedRows.length === 0 ? 'bg-opacity-50' : ''}`}
  onClick={handleDeleteSelected}
  disabled={selectedRows.length === 0}
>
  <FaTrash className="mr-1" />
</button>


        
      

      <div className="text-gray-600 font-bold pl-4 mt-2">
        {selectedRows.length > 0
          ? `${selectedRows.length} of ${users.length} rows selected`
          : `0 of ${users.length} row(s) selected`}
      </div>
    </div>
  );
};

export default Content;
