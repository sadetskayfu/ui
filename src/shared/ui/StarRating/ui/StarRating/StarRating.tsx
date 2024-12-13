import { classNames } from "@/shared/lib";
import { Star, StarSize } from "../Star/Star";
import styles from "./style.module.scss";
import { memo, useEffect, useState } from "react";

interface StarRatingProps {
  className?: string;
  size?: StarSize;
  selectedValue: number;
  onChange: (value: number) => void;
  name: string;
  label: string;
  maxStars?: number;
  tabIndex?: number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  precise?: boolean;
  hiddenLabel?: boolean;
}

export const StarRating = memo((props: StarRatingProps) => {
  const {
    className,
    size = "medium",
    selectedValue,
    onChange,
    name,
    label,
    maxStars = 5,
    tabIndex = 0,
    disabled,
    readonly,
    precise,
    hiddenLabel,
    required,
  } = props;

  const [fillValue, setFillValue] = useState<number>(selectedValue);

  const handleChangeValue = (value: number) => {
    onChange(value);
  };

  const handleChangeFillValue = (value: number) => {
    setFillValue(value);
  };

  useEffect(() => {
    setFillValue(selectedValue);
  }, [selectedValue]);

  const mods: Record<string, boolean | undefined> = {
    [styles["hidden-label"]]: hiddenLabel,
  };

  const renderStars = () => {
    return [...Array(maxStars)].map((_, index) => {
      const starValue = index + 1;
      const isFullFilled = starValue <= fillValue;
      const isThreeQuartersFilled =
        !isFullFilled && starValue - 0.25 <= fillValue;
      const isHalfFilled =
        !isFullFilled && !isThreeQuartersFilled && starValue - 0.5 <= fillValue;
      const isQuarterFilled =
        !isFullFilled &&
        !isThreeQuartersFilled &&
        !isHalfFilled &&
        starValue - 0.75 <= fillValue;

      const fillProps = {
        isFullFilled,
        isThreeQuartersFilled,
        isHalfFilled,
        isQuarterFilled,
      };

      return (
        <Star
          name={name}
          value={starValue}
          selectedValue={selectedValue}
          onChange={handleChangeValue}
          onChangeFillValue={handleChangeFillValue}
          precise={precise}
          disabled={disabled}
          readonly={readonly}
          tabIndex={tabIndex}
          size={size}
          {...fillProps}
        />
      );
    });
  };

  return (
    <fieldset
      className={classNames(styles["star-rating"], [className], mods)}
      aria-disabled={disabled ? "true" : undefined}
      aria-readonly={readonly ? "true" : undefined}
      aria-required={required ? "true" : undefined}
    >
      <legend className={styles["legend"]}>{label}</legend>
      <div
        role="radiogroup"
        className={styles["stars-group"]}
        onMouseLeave={() => handleChangeFillValue(selectedValue)}
      >
        {renderStars()}
      </div>
    </fieldset>
  );
});
