import React, { useEffect, useState} from 'react';
import { ReactFlow, Controls, useNodesState, useEdgesState, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from 'axios';


const NodeVisualization = ({ users, fetchUsers, setSelectedUser, onDrop }) => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    useEffect(() => {
        const newNodes = users.map((user, idx) => ({
            id: user.id,
            data: {
                label: (
                    <div>
                        <strong>{user.username} ({user.age})</strong>
                        <button onClick={() => setSelectedUser(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                ),
            },
            position: { x: idx * 600, y: 10 },
        }));

        const hobbyEdges = users.flatMap((user) =>
            user.hobbies.map((hobby, index) => ({
                id: `${user.id}-hobby-${index}`,
                source: user.id,
                target: `${user.id}-hobby-${index}`,
            }))
        );

        const hobbyNodes = users.flatMap((user, idx) =>
            user.hobbies.map((hobby, index) => ({
                id: `${user.id}-hobby-${index}`,
                data: { label: hobby },
                position: { x: idx*600+(index*160), y: 200 },
            }))
        );

        setNodes([...newNodes, ...hobbyNodes]);
        setEdges(hobbyEdges);
        console.log(nodes);
    }, [setSelectedUser, users]);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:8080/api/users/${userId}`);
                alert('User deleted successfully!');
                fetchUsers();
            } catch (error) {
                alert('Failed to delete user.');
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '87%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onDrop={(event) => {
                    const hobby = event.dataTransfer.getData('hobby');
                    const dropTarget = event.target.closest('.react-flow__node');
                    if (dropTarget) {
                        const userId = dropTarget.getAttribute('data-id');
                        if (hobby && userId && !JSON.stringify(userId).toLowerCase().includes('hobby')) {
                            onDrop(hobby, userId);
                        }
                    }
                }}
                onDragOver={(event) => event.preventDefault()}
            >
                <Controls />
                <MiniMap />
            </ReactFlow>

        </div>
    );
};

export default NodeVisualization;
