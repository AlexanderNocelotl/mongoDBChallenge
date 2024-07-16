import React from 'react';

const Profile = ({ profile, onDelete }) => {
  const { _id, name, birthday, height } = profile;

  const handleDelete = () => {
    onDelete(_id);
  };

  return (
    <div className="profile">
      <h3>{name}</h3>
      <p>Birthday: {birthday}</p>
      <p>Height: {height} cm</p>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
};

export default Profile;
