import { forwardRef } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

interface RippleWrapperProps {
  className?: string
}

export const RippleWrapper = forwardRef((props: RippleWrapperProps, ref: React.ForwardedRef<HTMLSpanElement | null>) => {

  const {className} = props

  return (
    <span
      ref={ref && ref}
      className={classNames(styles['wrapper'], [className])}
    ></span>
  );
});
