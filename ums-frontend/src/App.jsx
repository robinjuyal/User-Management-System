import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NodeVisualization from './components/NodeVisualization';
import SideBarHobby from './components/SideBarHobby';
import UserForm from './components/UserForm';
import "./app.css";

const App = () => {
    const [users, setUsers] = useState([]);
    const [hobbies, setHobbies] = useState(['Playing', 'Travelling', 'Swimming']);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            console.log(response)
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDragStart = (e, hobby) => {
        e.dataTransfer.setData('hobby', hobby);
    };

    const handleDrop = async (hobby, userId) => {
        try {
            console.log(userId);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                        user.id === userId
                        ? { ...user, hobbies: [...user.hobbies, hobby] }
                        : user
                )
            );
            const user_find=users.find((user)=>user.id===userId);
            user_find.hobbies.push(hobby);
            setSelectedUser(user_find);
            alert(`Hobby "${hobby}" added to user!`);
        } catch (error) {
            alert('Failed to add hobby.');
        }
    };
    

    return (
        <div className="app">
            <div className="sidebar-dropdown">
                <SideBarHobby hobbies={hobbies} onDragStart={handleDragStart} />
            </div>
            <div className="node-visualization">
                <NodeVisualization users={users || null} fetchUsers={fetchUsers} setSelectedUser={setSelectedUser} onDrop={handleDrop}/>
            </div>
            <div className="user-form">
                <UserForm fetchUsers={fetchUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </div>
        </div>
    );
};

export default App;
