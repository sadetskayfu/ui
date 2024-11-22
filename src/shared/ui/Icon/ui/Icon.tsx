import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { lazy, Suspense } from "react";

const Arrow = lazy(() => import("@/shared/assets/icons/arrow.svg?react"));
const CheckMark = lazy(
  () => import("@/shared/assets/icons/check-mark.svg?react")
);
const Cart = lazy(() => import("@/shared/assets/icons/cart.svg?react"));
const Envelope = lazy(() => import("@/shared/assets/icons/envelope.svg?react"));
const Eye = lazy(() => import("@/shared/assets/icons/eye.svg?react"));
const Bell = lazy(() => import("@/shared/assets/icons/bell.svg?react"));
const BookMark = lazy(() => import("@/shared/assets/icons/book-mark.svg?react"));
const ThumbsUp = lazy(() => import("@/shared/assets/icons/thumbs-up.svg?react"));
const Trash = lazy(() => import("@/shared/assets/icons/trash.svg?react"));
const User = lazy(() => import("@/shared/assets/icons/user.svg?react"));
const XMark = lazy(() => import("@/shared/assets/icons/x-mark.svg?react"));
const Gear = lazy(() => import("@/shared/assets/icons/gear.svg?react"));
const Heart = lazy(() => import("@/shared/assets/icons/heart.svg?react"));
const House = lazy(() => import("@/shared/assets/icons/house.svg?react"));
const Search = lazy(() => import("@/shared/assets/icons/search.svg?react"));

export type IconVariant = "arrow" | "check-mark" | "cart" | "envelope" | "eye" | "bell" | "book-mark" | "thumbs-up" | "trash" | "user" | "x-mark" | "gear" | "heart" | "house" | "search";
export type IconFillVariant = "filled" | "outlined";
export type IconSize = "small-s" | "small-m" | "small-l" | "medium" | "large" | "custom-size";
export type IconColor = "primary" | "secondary" | "light" | "red" | "custom-color";

interface IconProps {
  className?: string;
  variant: IconVariant;
  fillVariant?: IconFillVariant;
  color?: IconColor;
  size?: IconSize;
  fontSize?: string;
}

export const Icon = (props: IconProps) => {
  const {
    className,
    variant,
    fillVariant = "filled",
    size = "custom-size",
    color = "custom-color",
    fontSize,
  } = props;

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
    styles[fillVariant],
    styles[color],
  ];

  return (
    <Suspense>
      <span className={classNames(styles["icon"], additionalClasses)} style={{fontSize}}>
        {variant === "arrow" && <Arrow />}
        {variant === "check-mark" && <CheckMark />}
        {variant === "cart" && <Cart />}
        {variant === "envelope" && <Envelope />}
        {variant === "eye" && <Eye />}
        {variant === "bell" && <Bell />}
        {variant === "book-mark" && <BookMark />}
        {variant === "thumbs-up" && <ThumbsUp />}
        {variant === "trash" && <Trash />}
        {variant === "user" && <User />}
        {variant === "x-mark" && <XMark />}
        {variant === "gear" && <Gear />}
        {variant === "heart" && <Heart />}
        {variant === "house" && <House />}
        {variant === "search" && <Search />}
      </span>
    </Suspense>
  );
};
