import { memo, ReactNode } from "react";
import { classNames } from "@/shared/lib";
import { IconButton } from "@/shared/ui/IconButton";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

export interface MenuItemProps {
  className?: string;
  children: ReactNode;
  isHovered?: boolean;
  isSelected?: boolean;
  isLink?: boolean;
  isExternalLink?: boolean;
  onClick?: () => void;
  onMouseMove?: () => void;
  tabIndex?: number;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  to?: string;
}

export const MenuItem = memo((props: MenuItemProps) => {
  const {
    className,
    children,
    isHovered,
    isSelected,
    isLink,
    isExternalLink,
    onClick,
    onMouseMove,
    tabIndex = -1,
    Icon,
    to = '',
  } = props;

  const mods: Record<string, boolean | undefined> = {
    [styles["hovered"]]: isHovered,
    [styles["selected"]]: isSelected,
  };

  if (isLink)
    return (
      <li
        className={classNames(styles["menu-item"], [className], mods)}
        role="menuitem"
      >
        <Link
          className={styles["link"]}
          onMouseMove={onMouseMove}
          tabIndex={tabIndex}
          to={to}
        >
          {children}
          {Icon && (
            <span className={styles["icon"]}>
              <Icon />
            </span>
          )}
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
          onMouseMove={onMouseMove}
          tabIndex={tabIndex}
          href={to}
        >
          {children}
          {Icon && (
            <span className={styles["icon"]}>
              <Icon />
            </span>
          )}
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
        onClick={onClick}
        onMouseMove={onMouseMove}
        tabIndex={tabIndex}
      >
        {children}
        {Icon && (
          <span className={styles["icon"]}>
            <Icon />
          </span>
        )}
        {isSelected && (
          <IconButton
            className={styles["check-mark"]}
            isClickable={false}
            variant="check-mark"
            size="small"
          >
            Check mark
          </IconButton>
        )}
      </button>
    </li>
  );
});
