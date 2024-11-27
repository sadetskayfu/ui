import { memo, ReactNode } from "react";
import { classNames } from "@/shared/lib";
import { Icon as CheckMark } from "@/shared/ui/Icon";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

export interface MenuItemProps {
  className?: string;
  children: ReactNode;
  isHovered?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isLink?: boolean;
  isExternalLink?: boolean;
  onClick?: () => void;
  onSelect?: (value: string) => void
  tabIndex?: number;
  StartIcon?: ReactNode;
  EndIcon?: ReactNode;
  to?: string;
  index?: number;
  setActiveIndex?: (index: number) => void;
  value?: string;
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
    isLink,
    isExternalLink,
    onClick,
    onSelect,
    tabIndex = -1,
    StartIcon,
    EndIcon,
    to = "",
    index,
    setActiveIndex,
    value,
    id,
    role,
  } = props;

  const localTabIndex = isDisabled ? -1 : tabIndex;

  const mods: Record<string, boolean | undefined> = {
    [styles["hovered"]]: isHovered,
    [styles["selected"]]: isSelected,
    [styles["disabled"]]: isDisabled,
  };

  const handleMouseMove = () => {
    if (setActiveIndex && typeof index === "number") {
      setActiveIndex(index);
    }
  };

  const handleClick = () => {
    onClick?.()
    if(value && onSelect) {
      onSelect(value)
    }
  }

  if (isLink)
    return (
      <li
        className={classNames(styles["menu-item"], [className], mods)}
        role={role}
      >
        <Link
          className={styles["link"]}
          onMouseMove={handleMouseMove}
          tabIndex={localTabIndex}
          data-disabled={isDisabled}
          to={to}
          role={role}
          id={id}
        >
          {StartIcon && <>{StartIcon}</>}
          {children}
          {EndIcon && <div className={styles["end-icon"]}>{EndIcon}</div>}
        </Link>
      </li>
    );

  if (isExternalLink)
    return (
      <li
        className={classNames(styles["menu-item"], [className], mods)}
        role={role}
      >
        <a
          className={styles["link"]}
          onMouseMove={handleMouseMove}
          tabIndex={localTabIndex}
          data-disabled={isDisabled}
          href={to}
          role={role}
          id={id}
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
      role={role}
    >
      <button
        className={styles["button"]}
        onMouseMove={handleMouseMove}
        tabIndex={localTabIndex}
        data-disabled={isDisabled}
        disabled={isDisabled}
        onClick={handleClick}
        role={role}
        id={id}
        aria-selected={isSelected ? 'true' : 'false'}
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
      </button>
    </li>
  );
});

export default MenuItem
