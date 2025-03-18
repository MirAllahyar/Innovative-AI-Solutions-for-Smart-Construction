import React, { useState } from "react";
import "./AvatarUpload.css";
import defaultAvatar from "../../assets/images/avatar.jpeg";

const AvatarUpload = ({ onAvatarChange }) => {
  const [avatar, setAvatar] = useState(defaultAvatar);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        onAvatarChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-container">
      <label htmlFor="avatar-upload">
        <img src={avatar} alt="User Avatar" className="avatar-image" />
      </label>
      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
};

export default AvatarUpload;
