import { memo, useMemo, useRef } from "react";
import { CustomLink } from "@/shared/ui/CustomLink";
import { navigationLinks } from "../model/NavigationLink";
import styles from "./style.module.scss";

export const AsideBar = memo(() => {
  const menuRef = useRef<HTMLDivElement>(null);

  const renderNavigationLinks = useMemo(() => {
    return navigationLinks.map((link) => {
      return (
        <li className={styles['item']} role="menu-item">
          <CustomLink direction="vertical" to={link.path}>{link.label}</CustomLink>
        </li>
      );
    });
  }, []);

  return (
    <aside className={styles["aside-bar"]} ref={menuRef}>
      <nav className={styles['navigation-menu']}>
        <ul className={styles['list']} role="menu">{renderNavigationLinks}</ul>
      </nav>
    </aside>
  );
});
