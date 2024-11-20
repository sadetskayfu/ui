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
  isReadonly?: boolean;
  isLink?: boolean;
  isExternalLink?: boolean;
  onClick?: () => void;
  onMouseMove?: () => void;
  tabIndex?: number;
  Icon?: ReactNode;
  to?: string;
}

export const MenuItem = memo((props: MenuItemProps) => {
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
    onMouseMove,
    tabIndex = -1,
    Icon,
    to = "",
  } = props;

  const currentTabIndex = isDisabled || isReadonly ? -1 : tabIndex;

  const mods: Record<string, boolean | undefined> = {
    [styles["hovered"]]: isHovered,
    [styles["selected"]]: isSelected,
    [styles["disabled"]]: isDisabled,
    [styles["readonly"]]: isReadonly,
  };

  if (isLink)
    return (
      <li
        className={classNames(styles["menu-item"], [className], mods)}
        role="menuitem"
        aria-disabled={isDisabled ? "true" : "false"}
        aria-readonly={isReadonly ? "true" : "false"}
      >
        <Link
          className={styles["link"]}
          onMouseMove={onMouseMove}
          tabIndex={currentTabIndex}
          to={to}
        >
          {children}
          {Icon && <>{Icon}</>}
        </Link>
      </li>
    );

  if (isExternalLink)
    return (
      <li
        className={classNames(styles["menu-item"], [className], mods)}
        role="menuitem"
        aria-disabled={isDisabled ? "true" : "false"}
        aria-readonly={isReadonly ? "true" : "false"}
      >
        <a
          className={styles["link"]}
          onMouseMove={onMouseMove}
          tabIndex={currentTabIndex}
          href={to}
        >
          {children}
          {Icon && <>{Icon}</>}
        </a>
      </li>
    );

  return (
    <li
      className={classNames(styles["menu-item"], [className], mods)}
      role="menuitem"
      aria-readonly={isReadonly ? "true" : "false"}
    >
      <button
        className={styles["button"]}
        onClick={onClick}
        onMouseMove={onMouseMove}
        tabIndex={currentTabIndex}
        disabled={isDisabled}
      >
        {children}
        {Icon && <>{Icon}</>}
        {isSelected && <CheckMark variant="check-mark" size="small-l" />}
      </button>
    </li>
  );
});
