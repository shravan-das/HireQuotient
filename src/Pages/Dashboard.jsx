import React, { useState, useEffect } from 'react';
import Content from '../Components/Content';
import axios from 'axios';
import Pagination from '../Components/Pagination';
import EditModal from '../Components/EditModal';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [noContent, setNoContent] = useState(false);
  const [maxPaginationPages, setMaxPaginationPages] = useState(5);
  const [editingUser, setEditingUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        const data = response.data;
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setFilteredUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUser(userToEdit);
    setEditModalVisible(true);
  };

  const handleSearch = () => {
    const filteredResults = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm)
    );

    setFilteredUsers(filteredResults);
    setCurrentPage(1);
    setNoContent(filteredResults.length === 0);
    setMaxPaginationPages(3);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
    setEditingUser(null);
  };

  const handleUserUpdate = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setEditModalVisible(false);
    setEditingUser(null);
  };
  const handleBack = () =>{
    navigate('/');
  }

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container mx-auto mt-8">
        <button
        className="bg-blue-500 text-white px-4 py-2 rounded absolute top-0 left-0 m-4"
        onClick={handleBack}
      >
        Back
      </button>
      <h1 className="text-2xl font-bold text-center text-yellow-400 mb-4">Admin Dashboard</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border p-2 w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded search-icon"
        >
          Search
        </button>
      </div>
      {noContent ? (
        <p className="text-center font-bold">No content to display</p>
      ) : (
        <>
          <Content
            users={currentUsers}
            onDeleteUser={handleDeleteUser}
            onEditUser={handleEditUser}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.min(totalPages, maxPaginationPages)}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {editModalVisible && (
        <EditModal
          user={editingUser}
          onClose={handleEditModalClose}
          onUpdate={handleUserUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
