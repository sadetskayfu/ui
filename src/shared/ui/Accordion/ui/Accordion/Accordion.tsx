import { classNames } from "@/shared/lib";
import React, { memo, ReactNode, useEffect, useRef, useState } from "react";
import { ClickAnimation } from "@/shared/ui/ClickAnimation";
import { useClickAnimation } from "@/shared/lib/hooks";
import AccordionIcon from "@/shared/assets/icons/opening-arrow.svg?react";
import styles from "./style.module.scss";

type AccordionVariant = "primary" | "clear";

interface AccordionProps {
  className?: string;
  children: ReactNode;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  variant?: AccordionVariant;
  index?: number;
  selectedIndex?: number | null;
  onChangeSelectedIndex?: (index: number | null) => void;
  getOpeningStatus?: (value: boolean, name: string) => void;
  name?: string;
}

export const Accordion = memo((props: AccordionProps) => {
  const {
    className,
    children,
    Icon,
    variant = "primary",
    index,
    selectedIndex,
    onChangeSelectedIndex,
  } = props;

  const isOpenInGroup = Boolean(index && onChangeSelectedIndex && selectedIndex === index)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAnimation, handleToggleAnimation } = useClickAnimation();

  const menuRef = useRef<HTMLDivElement>(null);

  const childArray = React.Children.toArray(children);

  const toggleOpeningDetails = () => {
    if (index && onChangeSelectedIndex) {
      if (index === selectedIndex) {
        onChangeSelectedIndex(null);
      } else {
        onChangeSelectedIndex(index);
      }
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      toggleOpeningDetails();
      handleToggleAnimation();
    }
  };

  useEffect(() => {
    if(menuRef.current) {
      const currentMenu = menuRef.current
         
      if(isOpen || isOpenInGroup) {
        const computedStyle = getComputedStyle(currentMenu)
        const paddingBlock = Number(computedStyle.getPropertyValue('--padding').slice(0, -2)) * 2
        const contentHeight = Number(currentMenu.scrollHeight) + paddingBlock
        currentMenu.style.height = contentHeight + 'px'

      } else {
        currentMenu.style.height = '0px'
      }
    }
  }, [isOpen, isOpenInGroup]);

  const mods: Record<string, boolean> = {
    [styles["open"]]:
      isOpen ||
      isOpenInGroup,
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
  ];

  return (
    <div
      className={classNames(styles["accordion"], additionalClasses, mods)}
      tabIndex={-1}
    >
      <div
        className={styles["summary"]}
        tabIndex={0}
        onClick={toggleOpeningDetails}
        onMouseDown={handleToggleAnimation}
        onKeyDown={handleKeyDown}
      >
        {childArray[0]}
        <span className={styles["opening-icon"]}>{Icon ? <Icon /> : <AccordionIcon/>}</span>
        <ClickAnimation
          isAnimation={isAnimation}
        />
      </div>
      <div className={styles["details"]} ref={menuRef}>
        <div className={styles["content"]}>{childArray[1]}</div>
      </div>
    </div>
  );
});
