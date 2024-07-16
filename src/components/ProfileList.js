import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/profiles/${id}`);
      setProfiles(profiles.filter(profile => profile._id !== id));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div>
      <h2>Profile List</h2>
      {profiles.map(profile => (
        <Profile key={profile._id} profile={profile} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ProfileList;


