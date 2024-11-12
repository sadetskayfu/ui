import { SectionTitle } from "../../../shared/ui/SectionTitle/ui/SectionTitle";
import { DropdownMenu } from "@/shared/ui/DropdownMenu";
import { MenuList } from "@/shared/ui/MenuList";
import { options } from "../model/Dropdown";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { MenuItem } from "@/shared/ui/MenuItem";
import Icon from "@/shared/assets/icons/news.svg?react";
import styles from "./style.module.scss";

const DropdownPage = () => {
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleToggleVisibleMenu = useCallback(() => {
    setIsVisibleMenu((prev) => !prev);
  }, []);
  const handleOpenMenu = useCallback(() => {
    setIsVisibleMenu(true);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setIsVisibleMenu(false);
  }, []);
  const handleClick = useCallback(() => {
    console.log("click");
    setTimeout(() => {
      handleCloseMenu()
    }, 0)
  }, [handleCloseMenu]);

  const renderMenuOptions = useMemo(() => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} Icon={Icon} onClick={handleClick}>
          <span>{option.label}</span>
        </MenuItem>
      );
    });
  }, [handleClick]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Dropdown</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Dropdown menu">
            <div className={styles["open-menu-button"]}>
              <Button
                ref={buttonRef}
                onClick={handleToggleVisibleMenu}
                isKeyBlocked={isVisibleMenu}
                onBlur={handleCloseMenu}
              >
                Open
              </Button>
              <DropdownMenu
                className={styles["menu"]}
                parentRef={buttonRef}
                isVisible={isVisibleMenu}
                onClose={handleCloseMenu}
              >
                <MenuList
                  parentRef={buttonRef}
                  onClose={handleCloseMenu}
                  onOpen={handleOpenMenu}
                  startIndex={0}
                  isVisible={isVisibleMenu}
                >
                  {renderMenuOptions}
                </MenuList>
              </DropdownMenu>
            </div>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default DropdownPage;
