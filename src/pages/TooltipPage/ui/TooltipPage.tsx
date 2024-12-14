import { Button } from "@/shared/ui/Button";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Tooltip } from "@/shared/ui/Tooltip";
import styles from "./style.module.scss";
import { Avatar } from "@/shared/ui/Avatar";
import { AvatarGroup } from "@/shared/ui/AavatarGroup";
import { Badge } from "@/shared/ui/Badge";
import { Icon } from "@/shared/ui/Icon";
import { Alert } from "@/shared/ui/Alert";

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
        <AvatarGroup orientation="horizontal" maxAvatars={4} spacing="small">
          <Avatar
            src="https://avatars.mds.yandex.net/i?id=9a4179bc9da61a441aca01e5fc653b6a305fc700-5858292-images-thumbs&n=13"
            alt="1"
          ></Avatar>
          <Badge
            badgeContent={""}
            size="small"
            isVisible
            overlap="circular"
            position="bottom-right"
            color="green"
          >
            <Avatar
              src="https://avatars.mds.yandex.net/i?id=55712890ea8bfe633b2e0078d9fcfa2c381f02d7-10262551-images-thumbs&n=13"
              alt="2"
            ></Avatar>
          </Badge>
          <Avatar
            src="https://i.pinimg.com/736x/ed/46/06/ed46062cacfa64f1ace3394f73de39b0.jpg"
            alt="3"
          ></Avatar>
          <Avatar className={styles["avatar"]} alt="4"></Avatar>
          <Avatar className={styles["avatar"]} alt="5"></Avatar>
        </AvatarGroup>
        <div>
          <Badge badgeContent={5}>
            <Icon variant="envelope" color="dark" size="large" />
          </Badge>
        </div>
        <div>
        </div>
      </section>
    </div>
  );
};

export default TooltipPage;
