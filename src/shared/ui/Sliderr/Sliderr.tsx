import { useState, useEffect, ChangeEvent } from "react";
import "./slider.scss";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  initialValue: number;
  onChange: (value: number) => void;
  label?: string;
}

const Slider = ({
  min,
  max,
  step = 1,
  initialValue,
  onChange,
  label = "slider"
}: SliderProps) => {
  const [value, setValue] = useState<number>(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
  };

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const renderMarks = () => {
    const marks = [];
    const totalMarks = Math.ceil((max - min) / step) + 1;
    const gap = (max - min) / (totalMarks - 1);
    
    for (let i = 0; i < totalMarks; i++) {
      const markValue = min + (i * gap);
      const position = `${(i / (totalMarks - 1)) * 100}%`;
      
      marks.push(
        <div
          key={i}
          className="mark"
          style={{ left: position }}
        >
          <div className="mark-line"></div>
          <span className="mark-value">
            {Math.round(markValue)}
          </span>
        </div>
      );
    }
    return marks;
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging]);

  const sliderProgress = ((value - min) * 100) / (max - min);

  return (

      <div
        className="slider-wrapper"
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
      >
        <div className="marks-container">
          {renderMarks()}
        </div>
        
        <div className="slider-input-container">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            onMouseDown={handleMouseDown}
            step={step}
            className={`slider-input ${isDragging ? 'dragging' : ''}`}
            style={{ '--slider-progress': `${sliderProgress}%` } as React.CSSProperties}
          />
          
          <div 
            className={`value-tooltip ${isDragging ? 'visible' : 'hidden'}`}
            style={{ left: `${sliderProgress}%` }}
          >
            {value}
          </div>
        </div>
      </div>
  );
};

export default Slider;