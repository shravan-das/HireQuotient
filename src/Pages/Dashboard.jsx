// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Content from '../Components/Content';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDeleteUser = userId => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredResults = users.filter(
      user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm)
    );

    setFilteredUsers(filteredResults);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or role"
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 w-1/2"
        />
      </div>
      <Content users={filteredUsers} onDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default Dashboard;
