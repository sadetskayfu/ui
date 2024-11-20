import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";

type LinkCheckMarkPosition = "right" | "left";

interface LinkCheckMarkProps {
  position?: LinkCheckMarkPosition;
  isActive: boolean
}

export const LinkCheckMark = (props: LinkCheckMarkProps) => {
  const { position = "right", isActive } = props;

    const mods: Record<string, boolean | undefined> = {
        [styles['active']]: isActive
    }

  return (
    <span
      className={classNames(styles["check-mark"], [styles[position]], mods)}
    ></span>
  );
};
