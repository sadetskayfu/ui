// VolumeSlider.jsx
import React, { useState } from 'react';
import './VolumeSlider.css';

const VolumeSlider2 = () => {
  const [value, setValue] = useState(50);
  const markers = [0, 25, 50, 75, 100];
  
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    // Находим ближайший маркер при приближении к нему
    const snapThreshold = 5;
    const nearestMarker = markers.find(marker => 
      Math.abs(newValue - marker) <= snapThreshold
    );
    setValue(nearestMarker ?? newValue);
  };

  return (
    <div className="slider-container">
      <div className="slider-track">
        {/* Маркеры */}
        {markers.map((marker) => (
          <div
            key={marker}
            className="slider-marker"
            style={{ left: `${marker}%` }}
          />
        ))}
        
        {/* Заполненная часть */}
        <div 
          className="slider-fill"
          style={{ width: `${value}%` }}
        />
        
        {/* Нативный инпут */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          className="slider-input"
          aria-label="Volume"
        />
      </div>
      
      <div className="slider-value">
        {value}%
      </div>
    </div>
  );
};

export default VolumeSlider2;