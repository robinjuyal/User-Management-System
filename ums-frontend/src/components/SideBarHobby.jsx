import React from 'react';

const SidebarHobby = ({ hobbies, onDragStart }) => {
    return (
        <aside>
            <h4>Hobbies</h4>
            {hobbies.map((hobby) => (
                <div
                    key={hobby}
                    draggable
                    onDragStart={(e) => onDragStart(e, hobby)}
                    style={{ margin: '5px', padding: '5px', border: '1px solid #ccc' }}
                >
                    {hobby}
                </div>
            ))}
        </aside>
    );
};

export default SidebarHobby;
