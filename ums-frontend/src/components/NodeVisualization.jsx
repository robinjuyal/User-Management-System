import React, { useEffect, useState } from 'react';
import { ReactFlow, Controls, useNodesState, useEdgesState, MiniMap, Background, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './NodeVisualization.css'; // Import the CSS file
import axios from 'axios';

const NodeVisualization = ({ users, fetchUsers, setSelectedUser, onDrop }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        const newNodes = users.map((user, idx) => ({
            id: user.id,
            data: {
                label: (
                    <div className="user-node">
                        <strong>{user.username} ({user.age})</strong>
                        <button onClick={() => setSelectedUser(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                ),
            },
            position: { x: idx * 400, y: 50 },
            type: 'input',
        }));

        const hobbyNodes = users.flatMap((user) =>
            user.hobbies.map((hobby, index) => ({
                id: `${user.id}-hobby-${index}`,
                data: { label: hobby },
                position: { x: newNodes.find(node => node.id === user.id)?.position.x + (index * 120) - (user.hobbies.length-1)*60 || 0, y: 200 }, // Safe navigation and default value
                className: "hobby-node"
            }))
        );

        const hobbyEdges = users.flatMap((user) =>
            user.hobbies.map((hobby, index) => ({
                id: `${user.id}-hobby-${index}`,
                source: user.id,
                target: `${user.id}-hobby-${index}`,
                animated: true,
                style: { strokeWidth: 2 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                },
                type: 'smoothstep',
                className:"hobby-edge"
            }))
        );

        setNodes([...newNodes, ...hobbyNodes]);
        setEdges(hobbyEdges);
    }, [setSelectedUser, users]);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:8080/users/${userId}`);
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
                fitView
            >
                <Background variant="dots" gap={12} size={1} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};

export default NodeVisualization;