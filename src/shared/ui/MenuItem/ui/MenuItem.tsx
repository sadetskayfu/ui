import { memo, ReactNode } from "react";
import { classNames } from "@/shared/lib";
import { Icon as CheckMark } from "@/shared/ui/Icon";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

export interface MenuItemProps {
  className?: string;
  children: ReactNode;
  isHovered?: boolean;
  isDisabled?: boolean;
  isLink?: boolean;
  isExternalLink?: boolean;
  onClick?: (value?: string) => void;
  onMouseMove?: () => void;
  tabIndex?: number;
  StartIcon?: ReactNode;
  EndIcon?: ReactNode;
  to?: string;
  index?: number;
  setActiveIndex?: (index: number) => void;
  selectedValue?: string | string[];
  value?: string;
}

export const MenuItem = memo((props: MenuItemProps) => {
  const {
    className,
    children,
    isHovered,
    isDisabled,
    isLink,
    isExternalLink,
    onClick,
    tabIndex = -1,
    StartIcon,
    EndIcon,
    to = "",
    index,
    setActiveIndex,
    selectedValue,
    value,
  } = props;

  const localTabIndex = isDisabled ? -1 : tabIndex;

  const isSelected = Array.isArray(selectedValue)
    ? selectedValue.filter((selectedValue) => selectedValue === value).length >
      0
    : value === selectedValue;

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

  if (isLink)
    return (
      <li
        className={classNames(styles["menu-item"], [className], mods)}
        role="menuitem"
      >
        <Link
          className={styles["link"]}
          onMouseMove={handleMouseMove}
          tabIndex={localTabIndex}
          to={to}
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
        role="menuitem"
      >
        <a
          className={styles["link"]}
          onMouseMove={handleMouseMove}
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
      role="menuitem"
    >
      <button
        className={styles["button"]}
        onMouseMove={handleMouseMove}
        tabIndex={localTabIndex}
        disabled={isDisabled}
        onClick={() => onClick?.(value)}
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
