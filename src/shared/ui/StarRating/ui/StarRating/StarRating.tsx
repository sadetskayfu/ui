import { classNames } from "@/shared/lib";
import { Star, StarSize } from "../Star/Star";
import styles from "./style.module.scss";
import { memo, useCallback, useEffect, useState } from "react";
import { useAnimation } from "@/shared/lib/hooks";

interface StarRatingProps {
  className?: string;
  size?: StarSize;
  initialRating: number;
  onChange: (value: number) => void;
  name: string;
  label: string;
  maxStars?: number;
  tabIndex?: number;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isPrecise?: boolean
}

export const StarRating = memo((props: StarRatingProps) => {
  const {
    className,
    size = "medium",
    initialRating = 0,
    onChange,
    label,
    maxStars = 5,
    tabIndex = 0,
    isDisabled,
    isReadonly,
    isPrecise
  } = props;

  const { isAnimating, startAnimation } = useAnimation(1000);
  const [rating, setRating] = useState<number>(initialRating); // Копия стейта, для ховера и навигации клавиш

  const handleChangeRating = useCallback(
    (value: number) => {
      setRating(value);
      onChange(value);
      startAnimation()
    },
    [onChange, startAnimation]
  );

  const handleMouseEnter = useCallback((value: number) => {
    setRating(value);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (isReadonly || isDisabled) return;

    const step = isPrecise ? 0.5 : 1

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        if(rating < maxStars) {
            setRating(rating + step);
        }
        break;

      case "ArrowLeft":
        event.preventDefault();
        if(rating > 0) {
            setRating(rating - step);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault()
            handleChangeRating(rating)
        break
        
      default:
        break;
    }
  };

  const handleBlur = () => {
      setRating(initialRating); 
  };

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <div
      className={classNames(styles["star-rating"], [className])}
      tabIndex={isDisabled || isReadonly ? -1 : tabIndex}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      role='group'
      area-label={label}
      aria-valuemin={1}
      aria-valuemax={maxStars}
      aria-valuenow={rating}
      aria-orientation="horizontal"
      aria-disabled={isDisabled}
      aria-readonly={isReadonly}
    >
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        const isThreeQuartersFilled = !isFilled && starValue - 0.25 <= rating
        const isHalfFilled = !isFilled && !isThreeQuartersFilled && starValue - 0.5 <= rating;
        const isQuarterFilled = !isFilled && !isThreeQuartersFilled && !isHalfFilled && starValue - 0.75 <= rating

        const starStatusProps = {isFilled, isThreeQuartersFilled, isHalfFilled, isQuarterFilled}

        const mods: Record<string, boolean | undefined> = {
          [styles["animated"]]: isAnimating && (isFilled || isHalfFilled),
        };

        return (
          <Star
            className={classNames(styles["star"], [], mods)}
            size={size}
            key={starValue}
            value={starValue}
            onChange={handleChangeRating}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isReadonly={isAnimating || isReadonly}
            isDisabled={isDisabled}
            isPrecise={isPrecise}
            {...starStatusProps}
          />
        );
      })}
    </div>
  );
});
