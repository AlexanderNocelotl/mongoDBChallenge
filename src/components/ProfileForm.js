import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [height, setHeight] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of history

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, birthday, height }),
      });

      if (response.ok) {
        navigate('/profiles'); // Use navigate to redirect
      } else {
        console.error('Error creating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Birthday:</label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <button type="submit">Create Profile</button>
    </form>
  );
};

export default ProfileForm;

