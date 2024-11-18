import { Button } from "@/shared/ui/Button";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import styles from "./style.module.scss";
import { useRef } from "react";
import { Tooltip } from "@/shared/ui/Tooltip";

const TooltipPage = () => {
  const topButtonRef = useRef<HTMLButtonElement | null>(null);
  const bottomButtonRef = useRef<HTMLButtonElement | null>(null);
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Tooltip</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Tooltip">
            <div className={styles["button"]}>
              <Button ref={topButtonRef} onClick={() => undefined}>
                Top
              </Button>
              <Tooltip parentRef={topButtonRef}>I am top</Tooltip>
            </div>
            <div className={styles["button"]}>
              <Button ref={bottomButtonRef} onClick={() => undefined}>
                Bottom
              </Button>
              <Tooltip position="bottom" parentRef={bottomButtonRef}>
                I am bottom
              </Tooltip>
            </div>
            <div className={styles["button"]}>
              <Button ref={leftButtonRef} onClick={() => undefined}>
                Left
              </Button>
              <Tooltip position="left" parentRef={leftButtonRef}>
                I am left
              </Tooltip>
            </div>
            <div className={styles["button"]}>
              <Button ref={rightButtonRef} onClick={() => undefined}>
                Right
              </Button>
              <Tooltip position="right" parentRef={rightButtonRef}>
                I am right
              </Tooltip>
            </div>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default TooltipPage;
