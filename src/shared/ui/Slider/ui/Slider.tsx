import { useState, useEffect, ChangeEvent, useRef } from "react";
import styles from "./style.module.scss";
import { Tooltip } from "../../Tooltip";

interface SliderProps {
  min: number;
  max: number;
  step?: number
  initialValue: number;
  onChange: (value: number) => void;
  label?: string
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  initialValue,
  onChange,
  label = 'Slider'
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const thumbRef = useRef<HTMLDivElement | null>(null)

  const translateX = ((value - min) * 100) / (max - min);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(Number(newValue));
  };


  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const renderMarks = () => {
    return [...Array(((max - min) / step) + 1)].map((_, index) => {
        return (
            <span key={index} className={styles['mark']}></span>
        )
    })
  }

  return (
    <div
      className={styles["slider"]}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
      aria-label={label}
    >
      <div className={styles["track"]}>
        {renderMarks()}
        <span className={styles['fill']} style={{width: `${translateX}%`}}></span>
        <div ref={thumbRef} className={styles["thumb"]} style={{left: `${translateX}%`}}>
            <Tooltip parentRef={thumbRef} label={value} />
        </div>
        <input
          className={styles["input"]}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChangeValue}
          aria-hidden="true"
          step={step}
        />
      </div>
    </div>
  );
};
