import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { Tooltip } from "../../Tooltip";
import { classNames, insertArrayInSortedArray } from "@/shared/lib";
import styles from "./style.module.scss";

export type SliderSize = 'small' | 'medium'

export interface SliderCustomMarker {
  value: number;
  label: string;
}

interface SliderProps {
  className?: string
  size?: SliderSize
  name: string
  minName?: string
  maxName?: string
  label: string;
  min: number;
  max: number;
  step?: number;
  minRange?: number;
  isWalkingMarkers?: boolean;
  isVisibleMarkers?: boolean;
  isDisabled?: boolean
  customMarkers?: SliderCustomMarker[];
  initialValue: number | [number, number];
  onChange?: (value: number | [number, number], name: string) => void;
  tabIndex?: number
}

export const Slider = memo((props: SliderProps) => {
  const {
    className,
    size = 'medium',
    name,
    minName,
    maxName,
    label = "Slider",
    min = 0,
    max = 100,
    step = 1,
    minRange = 1,
    isWalkingMarkers,
    isVisibleMarkers,
    isDisabled,
    customMarkers = [],
    initialValue,
    onChange,
    tabIndex = 0
  } = props;

  const [value, setValue] = useState<number | [number, number]>(initialValue)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isVisibleMinTooltip, setIsVisibleMinTooltip] =
    useState<boolean>(false);
  const [isVisibleMaxTooltip, setIsVisibleMaxTooltip] =
    useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const minThumbRef = useRef<HTMLDivElement | null>(null);
  const maxThumbRef = useRef<HTMLDivElement | null>(null);

  const isActiveMinThumb = document.activeElement === minThumbRef.current;
  const isActiveMaxThumb = document.activeElement === maxThumbRef.current;

  const calculateTranslateThumb = (value: number) =>
    ((value - min) * 100) / (max - min);

  const markers = useMemo((): number[] => {
    const markers = [];

    // Add markers
    if (step > 1) {
      for (let i = min; i <= max; i += step) {
        markers.push(i);
      }
    }
    // Add custom markers
    if (customMarkers.length > 0) {
      const valuesCustomMarkers = customMarkers.map((marker) => marker.value);
      insertArrayInSortedArray(markers, valuesCustomMarkers, true);
    }

    return markers;
  }, [max, min, step, customMarkers]);

  // JSX Markers
  const renderMarkers = useMemo(() => {
    if (!isVisibleMarkers && customMarkers.length <= 0) {
      return;
    }
    return markers.map((marker, index) => {
      const position = `${((marker - min) / (max - min)) * 100}%`;
      const customMarkerLabel = customMarkers.filter(
        (item) => item.value === marker
      )[0]?.label;
      const isCustomMarker = !!customMarkerLabel

      const mods: Record<string, boolean | undefined> = {
        [styles["active"]]: typeof value === "number" && marker <= value || Array.isArray(value) && marker >= value[0] && marker <= value[1],
        [styles["visible"]]: isVisibleMarkers || isCustomMarker,
      };

      return (
        <div
          key={index}
          className={classNames(styles["marker"], [], mods)}
          style={{ left: position }}
        >
          {isCustomMarker && (
            <span className={styles["marker-label"]}>{customMarkerLabel}</span>
          )}
        </div>
      );
    });
  }, [markers, isVisibleMarkers, customMarkers, max, min, value]);

  // Walking on markers
  const findNearestMarker = useCallback(
    (currentValue: number): number => {
      return markers.reduce((prevMarker, nextMarker): number => {
        return Math.abs(currentValue - nextMarker) <
          Math.abs(currentValue - prevMarker)
          ? nextMarker
          : prevMarker;
      });
    },
    [markers]
  );

  const updateValue = useCallback(
    (event: MouseEvent) => {
      const currentSlider = sliderRef.current;
      const currentMinThumb = minThumbRef.current;
      const currentMaxThumb = maxThumbRef.current;

      if (!currentSlider) return;

      const sliderRect = currentSlider.getBoundingClientRect();
      const clickPosition = event.clientX - sliderRect.left;
      const percentage = Math.min(
        Math.max((clickPosition / sliderRect.width) * 100, 0),
        100
      );
      const newValue = Math.round(((max - min) / 100) * percentage + min);

      if (Array.isArray(value) && currentMinThumb && currentMaxThumb) {
        // Range slider
        const minThumbRect = currentMinThumb?.getBoundingClientRect();
        const maxThumbRect = currentMaxThumb?.getBoundingClientRect();

        const minThumbPosition = Math.round(
          minThumbRect.left - sliderRect.left + minThumbRect.width / 2
        );
        const maxThumbPosition = Math.round(
          maxThumbRect.left - sliderRect.left + maxThumbRect.width / 2
        );

        const thumbIndex =
          Math.abs(clickPosition - minThumbPosition) <
          Math.abs(clickPosition - maxThumbPosition)
            ? 0
            : 1;

        thumbIndex === 0 ? currentMinThumb.focus() : currentMaxThumb.focus();

        if (isActiveMinThumb && newValue + minRange - 1 >= value[1]) return;
        if (isActiveMaxThumb && newValue - minRange + 1 <= value[0]) return;

        const updatedValues: [number, number] = [...value];
        updatedValues[thumbIndex] = isWalkingMarkers
          ? findNearestMarker(newValue)
          : newValue;
        setValue(updatedValues)
        onChange?.(updatedValues, name);
      } else {
        // Default slider
        const updatedValue = isWalkingMarkers
          ? findNearestMarker(newValue)
          : newValue;
        setValue(updatedValue)
        onChange?.(updatedValue, name);
      }
    },
    [
      findNearestMarker,
      isWalkingMarkers,
      max,
      min,
      minRange,
      isActiveMaxThumb,
      isActiveMinThumb,
      value,
      onChange,
      name
    ]
  );

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
    updateValue(event);
    if (typeof value === "number") {
      minThumbRef.current?.focus();
    }
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, thumbIndex: number = 0) => {
    const isArrowKey = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(event.key);
    if (!isArrowKey) return;

    const direction = event.key === "ArrowUp" || event.key === "ArrowRight" ? 1 : -1;

    const currentValue: number = Array.isArray(value) ? value[thumbIndex] : value
    let newValue: number
    
    if(customMarkers.length > 0 && isWalkingMarkers) {
      const currentMarkerIndex = markers.indexOf(currentValue) 
      if(direction === 1 && currentMarkerIndex === markers.length - 1) return
      if(direction === -1 && currentMarkerIndex === 0) return
      newValue = direction === 1 ? markers[currentMarkerIndex + 1] : markers[currentMarkerIndex - 1]
    } else {
      const newLocalValue = currentValue + direction * (isWalkingMarkers ? step : 1);
      newValue = Math.min(Math.max(newLocalValue, min), max);
    }

    if(Array.isArray(value)) {
      if (isActiveMinThumb && newValue + minRange - 1 >= value[1]) return;
      if (isActiveMaxThumb && newValue - minRange + 1 <= value[0]) return;
      
      const currentValues: [number, number] = [...value]
      currentValues[thumbIndex] = newValue
      setValue(currentValues)
      onChange?.(currentValues, name)
      return
    }
    setValue(newValue)
    onChange?.(newValue, name)
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

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const mods: Record<string, boolean | undefined> = {
    [styles["dragging"]]: isDragging,
    [styles['disabled']]: isDisabled,
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size]
  ]

  return (
    <div
      className={classNames(styles["container"], additionalClasses, mods)}
      ref={sliderRef}
      // @ts-ignore
      onMouseDown={handleMouseDown}
      aria-label={label}
      aria-disabled={isDisabled}
    >
      <div className={styles["track"]}>
        {Array.isArray(value) ? (
          // Range slider
          <>
            <div
              className={styles["fill"]}
              style={{
                left: `${calculateTranslateThumb(value[0])}%`,
                width: `${
                  calculateTranslateThumb(value[1]) -
                  calculateTranslateThumb(value[0])
                }%`,
              }}
            />
            <div
              tabIndex={isDisabled? -1 : tabIndex}
              className={styles["thumb"]}
              style={{
                left: `${calculateTranslateThumb(value[0])}%`,
                zIndex: isActiveMinThumb ? 2 : 1,
              }}
              ref={minThumbRef}
              onKeyDown={(event) => handleKeyDown(event, 0)}
              onFocus={() => setIsVisibleMinTooltip(true)}
              onBlur={() => setIsVisibleMinTooltip(false)}
              aria-label="Minimum value"
              aria-valuenow={value[0]}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-orientation="horizontal"
              role='slider'
            >
              <Tooltip
                parentRef={minThumbRef}
                label={value[0]}
                initialVisibility={isVisibleMinTooltip}
                onToggle={setIsVisibleMinTooltip}
                anotherVisibilityCondition={
                  document.activeElement === minThumbRef.current
                }
              />
              <input tabIndex={-1} className="visually-hidden" name={minName} type="range" max={max} min={min} value={value[0]} aria-hidden disabled={isDisabled}/>
            </div>
            <div
              tabIndex={isDisabled? -1 : tabIndex}
              className={styles["thumb"]}
              style={{
                left: `${calculateTranslateThumb(value[1])}%`,
                zIndex: isActiveMaxThumb ? 2 : 1,
              }}
              ref={maxThumbRef}
              onKeyDown={(event) => handleKeyDown(event, 1)}
              onFocus={() => setIsVisibleMaxTooltip(true)}
              onBlur={() => setIsVisibleMaxTooltip(false)}
              aria-label="Maximum value"
              aria-valuenow={value[1]}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-orientation="horizontal"
              role='slider'
            >
              <Tooltip
                parentRef={maxThumbRef}
                label={value[1]}
                initialVisibility={isVisibleMaxTooltip}
                onToggle={setIsVisibleMaxTooltip}
                anotherVisibilityCondition={
                  document.activeElement === maxThumbRef.current
                }
              />
              <input tabIndex={-1} className="visually-hidden" name={maxName} type="range" max={max} min={min} value={value[1]} aria-hidden disabled={isDisabled}/>
            </div>
          </>
        ) : (
          // Default slider
          <>
            <div
              className={styles["fill"]}
              style={{ width: `${calculateTranslateThumb(value)}%` }}
            />
            <div
              tabIndex={isDisabled? -1 : tabIndex}
              className={styles["thumb"]}
              style={{ left: `${calculateTranslateThumb(value)}%` }}
              ref={minThumbRef}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsVisibleMinTooltip(true)}
              onBlur={() => setIsVisibleMinTooltip(false)}
              aria-label={label}
              aria-valuenow={value}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-orientation="horizontal"
              role='slider'
            >
              <Tooltip
                parentRef={minThumbRef}
                label={value}
                initialVisibility={isVisibleMinTooltip}
                onToggle={setIsVisibleMinTooltip}
                anotherVisibilityCondition={
                  document.activeElement === minThumbRef.current
                }
              />
              <input tabIndex={-1} className="visually-hidden" name={name} type="range" max={max} min={min} value={value} aria-hidden disabled={isDisabled}/>
            </div>
          </>
        )}
        {renderMarkers}
      </div>
    </div>
  );
});
