import { AsideMenu } from "@/shared/ui/AsideMenu";
import { Button } from "@/shared/ui/Button";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useRef, useState } from "react";
import styles from "./styles.module.scss";

const AsideMenuPage = () => {
  const [isVisibleLeftMenu, setIsVisibleLeftMenu] = useState<boolean>(false);
  const [isVisibleRightMenu, setIsVisibleRightMenu] = useState<boolean>(false);
  const [isVisibleTopMenu, setIsVisibleTopMenu] = useState<boolean>(false);
  const [isVisibleBottomMenu, setIsVisibleBottomMenu] =
    useState<boolean>(false);
  const [isVisibleDarkBackdropMenu, setIsVisibleDarkBackdropMenu] =
    useState<boolean>(false);
  const [isVisibleClearBackdropMenu, setIsVisibleClearBackdropMenu] =
    useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleToggleVisibleLeftMenu = () => {
    setIsVisibleLeftMenu((prev) => !prev);
  };
  const handleToggleVisibleRightMenu = () => {
    setIsVisibleRightMenu((prev) => !prev);
  };
  const handleToggleVisibleTopMenu = () => {
    setIsVisibleTopMenu((prev) => !prev);
  };
  const handleToggleVisibleBottomMenu = () => {
    setIsVisibleBottomMenu((prev) => !prev);
  };
  const handleToggleVisibleDarkBackdropMenu = () => {
    setIsVisibleDarkBackdropMenu((prev) => !prev);
  };
  const handleToggleVisibleClearBackdropMenu = () => {
    setIsVisibleClearBackdropMenu((prev) => !prev);
  };

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Aside menu</SectionTitle>
        <PreviewComponents title="Aside menu">
          <Button onClick={handleToggleVisibleLeftMenu} ref={buttonRef}>
            Left
          </Button>
          <Button onClick={handleToggleVisibleRightMenu}>Right</Button>
          <Button onClick={handleToggleVisibleTopMenu}>Top</Button>
          <Button onClick={handleToggleVisibleBottomMenu}>Bottom</Button>
          <AsideMenu
            isVisible={isVisibleLeftMenu}
            onClose={() => setIsVisibleLeftMenu(false)}
            parentRef={buttonRef}
          >
            <div className={styles["horizontal-content"]}>
              <Button onClick={() => setIsVisibleLeftMenu(false)}>Close</Button>
            </div>
          </AsideMenu>
          <AsideMenu
            isVisible={isVisibleRightMenu}
            positionVariant="right"
            onClose={() => setIsVisibleRightMenu(false)}
            parentRef={buttonRef}
          >
            <div className={styles["horizontal-content"]}>
              <Button onClick={() => setIsVisibleRightMenu(false)}>
                Close
              </Button>
            </div>
          </AsideMenu>
          <AsideMenu
            isVisible={isVisibleTopMenu}
            positionVariant="top"
            onClose={() => setIsVisibleTopMenu(false)}
            parentRef={buttonRef}
          >
            <div className={styles["vertical-content"]}>
              <Button onClick={() => setIsVisibleTopMenu(false)}>Close</Button>
            </div>
          </AsideMenu>
          <AsideMenu
            isVisible={isVisibleBottomMenu}
            positionVariant="bottom"
            onClose={() => setIsVisibleBottomMenu(false)}
            parentRef={buttonRef}
          >
            <div className={styles["vertical-content"]}>
              <Button onClick={() => setIsVisibleBottomMenu(false)}>
                Close
              </Button>
            </div>
          </AsideMenu>
        </PreviewComponents>
        <PreviewComponents title="With backdrop">
          <Button onClick={handleToggleVisibleDarkBackdropMenu}>
            Dark backdrop
          </Button>
          <Button onClick={handleToggleVisibleClearBackdropMenu}>
            Clear backdrop
          </Button>
          <AsideMenu
            isVisible={isVisibleDarkBackdropMenu}
            positionVariant="left"
            backdropVariant="dark"
            onClose={() => setIsVisibleDarkBackdropMenu(false)}
            parentRef={buttonRef}
          >
            <div className={styles["horizontal-content"]}>
              <Button onClick={() => setIsVisibleDarkBackdropMenu(false)}>
                Close
              </Button>
            </div>
          </AsideMenu>
          <AsideMenu
            isVisible={isVisibleClearBackdropMenu}
            positionVariant="right"
            backdropVariant="clear"
            onClose={() => setIsVisibleClearBackdropMenu(false)}
            parentRef={buttonRef}
          >
            <div className={styles["horizontal-content"]}>
              <Button onClick={() => setIsVisibleClearBackdropMenu(false)}>
                Close
              </Button>
            </div>
          </AsideMenu>
        </PreviewComponents>
      </section>
    </div>
  );
};

export default AsideMenuPage;
