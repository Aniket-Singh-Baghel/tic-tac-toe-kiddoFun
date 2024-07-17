//player.js

import { useState } from "react";
function Player({ name, icon, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [initalName, setInitialName] = useState(name);

  const handleEditClick = () => {
    setIsEditing(true);
    if (isEditing) {
      onChangeName(icon, initalName)
    }
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    onChangeName(icon, initalName);

  };

  const handleChange = (e) => {
    setInitialName(e.target.value);
  };

  const handleInputFocus = (e) => {
    e.target.select();
  };

  return (
    <li className={`player ${isActive ? "active" : ""}`}>
      <span className="player-info">
        {isEditing ? (
          <input
            type="text"
            value={initalName}
            onChange={handleChange}
            onFocus={handleInputFocus}
            autoFocus
          />
        ) : (
          <span className="player-name">{initalName}</span>
        )}
        <span className="player-icon">{icon}</span>
      </span>
      <div className="player-buttons">
        <button
          className="player-button"
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </li>
  );
}

export default Player;
