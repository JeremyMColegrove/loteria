import React, { useState } from 'react';

function SettingsMenu({velocity, handleVelocityChange, ...props}) {
  // State to store whether the menu is open or not
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle the toggle button click
  function handleToggleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div>
      {/* Toggle button */}
      <button className='settings-open' onClick={handleToggleClick}>Settings</button>
      {/* Settings menu */}
      {isMenuOpen && (
        <div className="popup">
        <div className="settings">
          <p style={{fontSize:"1.5em"}}>Velocity (ms)</p>
          <div className="velocity-container">
            
            <button className="velocity-button"onClick={()=>handleVelocityChange(velocity-500)} >-</button>
              <p style={{fontSize:"1.5em"}}>{velocity}</p>
            <button className="velocity-button" onClick={()=>handleVelocityChange(velocity+500)}>+</button>
          </div>
          <button className="settings-close" onClick={handleToggleClick}>Close</button>
        </div>
      </div>
      )}
    </div>
  );
}

export default SettingsMenu;
