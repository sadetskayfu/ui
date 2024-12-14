import { ImgHTMLAttributes, memo, ReactElement, useState } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

export type AvatarVariant = "circular" | "rounded" | "square";

type HTMLImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src">;

export interface AvatarProps {
  className?: string;
  children?: ReactElement | string;
  src?: string;
  alt?: string;
  variant?: AvatarVariant;
  height?: string;
  width?: string;
  bgColor?: string;
  imgProps?: HTMLImgProps;
}

const getFirstLetter = (str: string | undefined) => {
  if(!str) return 'U'
  return str.charAt(0);
};

export const Avatar = memo((props: AvatarProps) => {
  const {
    className,
    children,
    src,
    alt,
    variant = "circular",
    bgColor,
    height,
    width,
    imgProps,
  } = props;

  const [imageError, setImageError] = useState(false);

  const isEmptySrc = !src || src.trim() === "";

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
  ];

  const content = children ? children : getFirstLetter(alt);

  return (
    <div
      style={{ backgroundColor: bgColor, height, width }}
      className={classNames(styles["avatar"], additionalClasses)}
    >
      {imageError || isEmptySrc ? (
        content
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className={styles["img"]}
          {...imgProps}
        />
      )}
    </div>
  );
});
