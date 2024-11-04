import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import styles from "./style.module.scss";
import { Tooltip } from "../Tooltip";
import { classNames, insertArrayInSortedArray } from "@/shared/lib";

interface CustomMarker {
  value: number
  label: string
}

interface SliderProps {
  label?: string;
  min: number;
  max: number;
  step?: number;
  isMarkers?: boolean;
  customMarkers?: CustomMarker[]
}

const VolumeSlider = memo((props: SliderProps) => {
  const {
    label = "Slider",
    min = 0,
    max = 100,
    step = 10,
    isMarkers = true,
    customMarkers = []
  } = props;

  const [value, setValue] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const isVisibleMinTooltip = document.activeElement === thumbRef.current && isDragging

  const translateX = ((value - min) * 100) / (max - min);

  // Array value markers
  const markers = useMemo((): number[] => {
    const markers = [];

    if(isMarkers) {
      for (let i = min; i <= max; i += step) {
        markers.push(i);
      }
    }
    const valuesCustomMarkers = customMarkers.map((marker) => marker.value)
    insertArrayInSortedArray(markers, valuesCustomMarkers, true)

    return markers;
  }, [max, min, step, isMarkers, customMarkers]);

  // JSX Markers
  const renderMarkers = useMemo(() => {
    return markers.map((marker, index) => {
      const position = `${(index / (markers.length - 1)) * 100}%`;
      const isCustomMarker = Boolean(customMarkers.filter((item) => item.value === marker))

      const mods: Record<string, boolean | undefined> = {
        [styles['active']]: marker < value,
        [styles['visible']]: isCustomMarker
      }
      return (
        <div
          key={index}
          className={classNames(styles["marker"], [], mods)}
          style={{ left: position }}
        >
          <span className={styles['marker__label']}>{marker}</span>
        </div>
      );
    });
  }, [markers, value]);

  const findNearestMarker = useCallback(
    (currentValue: number): number => {
      const nearest = markers.reduce((prevMarker, nextMarker): number => {
        return Math.abs(currentValue - nextMarker) <
          Math.abs(currentValue - prevMarker)
          ? nextMarker
          : prevMarker;
      });

      return nearest;
    },
    [markers]
  );

  const updateValue = useCallback(
    (event: MouseEvent) => {
      const currentSlider = sliderRef.current;

      if (currentSlider) {
        const sliderRect = currentSlider.getBoundingClientRect();
        const clickPosition = event.clientX - sliderRect.left;
        const percentage = Math.min(
          Math.max((clickPosition / sliderRect.width) * 100, 0),
          100
        );

        const newValue = ((max - min) / 100) * percentage + min;

        if (isMarkers) {
          const snappedValue = findNearestMarker(Math.round(newValue));
          setValue(snappedValue);
        } else {
          setValue(newValue);
        }
      }
    },
    [findNearestMarker, isMarkers, max, min]
  );

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    setIsDragging(true);
    updateValue(event);
    thumbRef.current?.focus()
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        updateValue(event);
      }
    },
    [isDragging, updateValue]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  const mods: Record<string, boolean | undefined> = {
    [styles['dragging']]: isDragging,
  }

  return (
    <div
      className={classNames(styles["container"], [], mods)}
      ref={sliderRef}
      onMouseDown={handleMouseDown}
    >
      <div className={styles["track"]}>
        <div className={styles["fill"]} style={{ width: `${translateX}%` }} />
        {renderMarkers}
        <div
          tabIndex={0}
          className={styles["thumb"]}
          style={{ left: `${translateX}%` }}
          ref={thumbRef}
        >
          <Tooltip parentRef={thumbRef} label={Math.round(value)} anotherVisibilityCondition={isVisibleMinTooltip} />
        </div>
      </div>
    </div>
  );
});

export default VolumeSlider;
