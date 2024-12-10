import { Button } from "@/shared/ui/Button";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Tooltip } from "@/shared/ui/Tooltip";
import styles from "./style.module.scss";

const TooltipPage = () => {
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
        </div>
      </section>
    </div>
  );
};

export default TooltipPage;
