import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userform.css'; // Import the CSS file

const UserForm = ({ fetchUsers, selectedUser, setSelectedUser }) => {
    const [formData, setFormData] = useState({ username: '', age: '', hobbies: [] });

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                username: selectedUser.username,
                age: selectedUser.age,
                hobbies: selectedUser.hobbies,
            });
        }
    }, [selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (selectedUser) {
                // Update User
                await axios.put(`http://localhost:8080/api/users/${selectedUser.id}`, formData);
                alert('User updated successfully!');
                setSelectedUser(null);
            } else {
                // Create New User
                await axios.post('http://localhost:8080/api/users/', formData);
                alert('User created successfully!');
            }
            fetchUsers();
            setFormData({ username: '', age: '', hobbies: [] });
        } catch (err) {
            alert('Failed to save user.');
        }
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2>{selectedUser ? 'Update User' : 'Create User'}</h2>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Age</label>
                <input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Hobbies</label>
                <input
                    type="text"
                    placeholder="Hobbies (comma-separated)"
                    value={formData.hobbies.join(', ')}
                    onChange={(e) =>
                        setFormData({ ...formData, hobbies: e.target.value.split(',').map((h) => h.trim()) })
                    }
                    required
                />
            </div>
            <button className="submit-button" type="submit">
                {selectedUser ? 'Update User' : 'Create User'}
            </button>
        </form>
    );
};

export default UserForm;