// src/components/Users.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    axios.get('https://power-canada-group-backend-ei7l.onrender.com/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://power-canada-group-backend-ei7l.onrender.com/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleUpdate = () => {
    axios.put(`https://power-canada-group-backend-ei7l.onrender.com/api/users/${editUser._id}`, { name: editName, email: editEmail })
      .then(() => {
        setUsers(users.map(user => user._id === editUser._id ? { ...user, name: editName, email: editEmail } : user));
        setEditUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="users">
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <div className="user-info">
            Name : {user.name}<br></br>Email : {user.email}
            </div>
            <div className="user-actions">
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <input type="text" value={editName} onChange={e => setEditName(e.target.value)} />
          <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
          <button onClick={handleUpdate}>Update</button>   
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Users;
