import { memo, ReactNode, useRef } from "react";
import { classNames, handleRippleMousePosition } from "@/shared/lib";
import { Icon as CheckMark } from "@/shared/ui/Icon";
import { RippleWrapper } from "@/shared/ui/RippleWrapper";
import styles from './style.module.scss';

export interface OptionItemProps {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  readonly?: boolean;
  StartIcon?: ReactNode;
  EndIcon?: ReactNode;
  index?: number;
  value?: string;
  label?: string;
  id?: string;
  role?: string;
  setFocusedOptionIndex?: (index: number) => void;
}

export const OptionItem = memo((props: OptionItemProps) => {
  const {
    className,
    children,
    disabled,
    selected,
    readonly,
    index,
    setFocusedOptionIndex,
    StartIcon,
    EndIcon,
    value,
    label,
    id,
    role = "option",
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);

  const mods: Record<string, boolean | undefined> = {
    [styles["disabled"]]: disabled,
    [styles["readonly"]]: readonly,
    [styles["selected"]]: selected,
  };

  const handleMouseMove = () => {
    if (typeof index === 'number' && setFocusedOptionIndex) setFocusedOptionIndex(index);
  };

  const handleClick = (event: React.MouseEvent) => {
    handleRippleMousePosition(rippleWrapperRef, event);
  };

  return (
    <li
      className={classNames(styles["menu-item"], [className], mods)}
      id={id}
      role={role}
      tabIndex={-1}
      data-disabled={disabled || readonly ? true : undefined}
      data-index={typeof index === "number" ? index : undefined}
      data-value={value || undefined}
      aria-selected={selected ? "true" : undefined}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {StartIcon && StartIcon}
      {children ? children : label}
      {EndIcon && <span className={styles["end-icon"]}>{EndIcon}</span>}
      {selected && (
        <CheckMark
          className={styles["check-mark"]}
          variant="check-mark"
          size="small-l"
          color="primary"
        />
      )}
      <span className={styles['bg']}></span>
      <RippleWrapper ref={rippleWrapperRef} />
    </li>
  );
});
