import React from 'react';
import './Avatar.css'; 


function Avatar({ user }) {
  const initials = user.name.split(' ').map(namePart => namePart[0]).join('').toUpperCase();

  return (
    <div className="avatar-icon">
      <span className="avatar-letter">{initials}</span>
      <span className={`status-dot ${user.available ? 'available' : 'unavailable'}`}></span>
    </div>
  );
}
export default Avatar;
