import { Button } from "@/shared/ui/Button";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Tooltip } from "@/shared/ui/Tooltip";
import styles from "./style.module.scss";
import { useState } from "react";
import { Snackbar } from "@/shared/ui/Snackbar";
import { Alert } from "@/shared/ui/Alert";
import { Icon } from "@/shared/ui/Icon";
import { IconButton } from "@/shared/ui/IconButton";

const TooltipPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClose = () => {
    setIsVisible(false);
  };
  const handleOpen = () => {
    setIsVisible(true);
  };

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Tooltip</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Tooltip">
            <Tooltip Component={<Button>Top</Button>} position="top">
              <p>I am top</p>
            </Tooltip>
            <Tooltip Component={<Button>Bottom</Button>} position="bottom">
              <p>I am bottom</p>
            </Tooltip>
            <Tooltip Component={<Button>Left</Button>} position="left">
              <p>I am left</p>
            </Tooltip>
            <Tooltip
              Component={<Button>Right</Button>}
              position="right"
              clickableTooltip
            >
              <div className={styles["content"]}>
                I am clickable, i am right. I am clickable, i am right
              </div>
            </Tooltip>
          </PreviewComponents>
          <Snackbar
            isVisible={isVisible}
            onClose={handleClose}
            autoHideDuration={5000}
            variant="clear"
          >
            <Alert
              variant="filled"
              severity="success"
              Icon={<Icon variant="check-mark" />}
              title="Success"
              Action={
                <IconButton variant="clear" color="custom-color" size="small-m">
                  <Icon variant="x-mark" />
                </IconButton>
              }
            >
              This is a filled success Alert.
            </Alert>
          </Snackbar>
          <Snackbar
            position="bottom-left"
            isVisible={isVisible}
            onClose={handleClose}
            autoHideDuration={5000}
            message="I am dark"
          />
          <div>
            <Button onClick={handleOpen}>Open snackbar</Button>
            <Button onClick={() => setIsVisible(false)}>Close snackbar</Button>
          </div>
          <div className={styles["alerts"]}></div>
        </div>
      </section>
    </div>
  );
};

export default TooltipPage;
