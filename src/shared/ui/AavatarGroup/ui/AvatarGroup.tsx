import { Children, cloneElement, memo, ReactElement } from "react";
import { Avatar, AvatarProps, AvatarVariant } from "@/shared/ui/Avatar";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

type AvatarGroupOrientation = "horizontal" | "vertical";
type AvatarGroupSpacing = "small" | "medium";

interface AvatarGroupProps {
  className?: string;
  children: ReactElement[];
  CountAvatar?: ReactElement<AvatarProps>;
  maxAvatars?: number;
  maxCount?: number;
  orientation?: AvatarGroupOrientation;
  spacing?: AvatarGroupSpacing;
  avatarVariant?: AvatarVariant
}

export const AvatarGroup = memo((props: AvatarGroupProps) => {
  const {
    className,
    children,
    CountAvatar,
    maxAvatars,
    maxCount,
    orientation = "vertical",
    spacing = "medium",
    avatarVariant = 'circular',
  } = props;

  const renderAvatars = () => {
    const avatars: ReactElement[] = [];

    if (maxAvatars && children.length > maxAvatars) {
      for (let i = 0; i <= maxAvatars - 1; i++) {
        avatars.unshift(children[i]);
      }
    } else {
      for (let i = 0; i < children.length; i++) {
        avatars.unshift(children[i]);
      }
    }

    return Children.map(avatars, (avatar: ReactElement, index) => {
      if (maxAvatars && children.length > maxAvatars && index === 0) {
        let count = children.length - maxAvatars + 1;

        if (maxCount) {
          count = count > maxCount ? maxCount : count;
        }

        return CountAvatar ? (
          cloneElement(CountAvatar, {
            children: "+" + count,
            alt: "Number of hidden avatars",
          })
        ) : (
          <Avatar alt="Number of hidden avatars">{"+" + count}</Avatar>
        );
      }
      return cloneElement(avatar);
    });
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[orientation],
    styles[spacing],
    styles[avatarVariant]
  ];

  return (
    <div className={classNames(styles["avatar-group"], additionalClasses)}>
      {renderAvatars()}
    </div>
  );
});
