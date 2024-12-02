import { memo, ReactNode, useRef } from "react";
import { classNames, handleRipple, handleRippleMousePosition } from "@/shared/lib";
import { Icon as CheckMark } from "@/shared/ui/Icon";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { RippleWrapper } from "../../RippleWrapper";

export interface MenuItemProps {
  className?: string;
  children: ReactNode;
  isHovered?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isReadonly?: boolean
  isLink?: boolean;
  isExternalLink?: boolean;
  onClick?: () => void;
  onSelect?: (value: string) => void
  tabIndex?: number;
  StartIcon?: ReactNode;
  EndIcon?: ReactNode;
  to?: string;
  index?: number;
  value?: string;
  label?: string
  id?: string
  role?: string
}

const MenuItem = memo((props: MenuItemProps) => {
  const {
    className,
    children,
    isHovered,
    isSelected,
    isDisabled,
    isReadonly,
    isLink,
    isExternalLink,
    onClick,
    onSelect,
    tabIndex = -1,
    StartIcon,
    EndIcon,
    to = "",
    index,
    value,
    label,
    id,
    role = 'menuitem',
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null)

  const localTabIndex = isDisabled ? -1 : tabIndex;

  const mods: Record<string, boolean | undefined> = {
    [styles["focused"]]: isHovered,
    [styles["selected"]]: isSelected,
    [styles["disabled"]]: isDisabled,
    [styles["readonly"]]: isReadonly,
  };

  const handleClick = (event: React.MouseEvent) => {
    onClick?.()

    if(value && onSelect) {
      onSelect(value)
    }

    handleRippleMousePosition(rippleWrapperRef, event)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.()
      handleRipple(rippleWrapperRef)
    }
  }

  if (isLink)
    return (
      <li
        className={classNames(styles["menu-item"], [className], mods)}
        role='none'
      >
        <Link
          className={styles["link"]}
          id={id}
          role={role}
          tabIndex={localTabIndex}
          to={to}
        >
          {StartIcon && <>{StartIcon}</>}
          {children}
          {EndIcon && <div className={styles["end-icon"]}>{EndIcon}</div>}
          <RippleWrapper ref={rippleWrapperRef}/>
        </Link>
      </li>
    );

  if (isExternalLink)
    return (
      <li
        className={classNames(styles["menu-item"], [className], mods)}
        role='none'
      >
        <a
          className={styles["link"]}
          id={id}
          role={role}
          tabIndex={localTabIndex}
          href={to}
        >
          {StartIcon && <>{StartIcon}</>}
          {children}
          {EndIcon && <div className={styles["end-icon"]}>{EndIcon}</div>}
        </a>
      </li>
    );

  return (
    <li
      className={classNames(styles["menu-item"], [className], mods)}
      role='none'
    >
      <button
        className={styles["button"]}
        id={id}
        role={role}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={localTabIndex}
        data-disabled={(isDisabled || isReadonly) ? true : undefined}
        data-index={typeof index === 'number' ? index : undefined}
        data-value={value || undefined}
        disabled={isDisabled}
        aria-selected={isSelected ? 'true' : undefined}
      >
        {StartIcon && <>{StartIcon}</>}
        {children}
        {EndIcon && <div className={styles["end-icon"]}>{EndIcon}</div>}
        {isSelected && (
          <CheckMark
            className={styles["check-mark"]}
            variant="check-mark"
            size="small-l"
            color="primary"
          />
        )}
        <RippleWrapper ref={rippleWrapperRef}/>
      </button>
    </li>
  );
});

export default MenuItem
