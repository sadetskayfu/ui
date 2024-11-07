import { classNames } from "@/shared/lib";
import React, {
  memo,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import AccordionIcon from "@/shared/assets/icons/opening-arrow.svg?react";
import { IconButton } from "@/shared/ui/IconButton";
import styles from "./style.module.scss";

type AccordionVariant = "primary" | "clear";
type AccordionTitleVariant = "h3" | "h4";

interface AccordionProps {
  className?: string;
  children: ReactNode;
  title: string;
  titleVariant?: AccordionTitleVariant;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  variant?: AccordionVariant;
  index?: number;
  selectedIndex?: number | null;
  isBorderRadius?: boolean;
  isDisabled?: boolean;
  tabIndex?: number;
  onChangeSelectedIndex?: (index: number | null) => void;
}

export const Accordion = memo((props: AccordionProps) => {
  const {
    className,
    children,
    title,
    titleVariant = "h3",
    Icon,
    variant = "primary",
    index,
    selectedIndex,
    isBorderRadius,
    isDisabled,
    tabIndex = 0,
    onChangeSelectedIndex,
  } = props;

  const isOpenInGroup = Boolean(
    index && onChangeSelectedIndex && selectedIndex === index
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  const id = useId() + "accordion-body";

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
    if (event.key === "Enter" || event.key === " ") {
      toggleOpeningDetails();
    }
  };

  useEffect(() => {
    if (bodyRef.current) {
      const focusableElements = bodyRef.current.querySelectorAll<HTMLElement>(
        "a, button, input, textarea, select, [tabindex]"
      );

      focusableElements.forEach((el) => {
        if (!el.hasAttribute("data-tabindex")) {
          el.setAttribute("data-tabindex", el.getAttribute("tabindex") ?? "0");
        }
        if (isOpen || isOpenInGroup) {
          const originalTabIndex = el.getAttribute("data-tabindex");
          el.tabIndex =
            originalTabIndex !== null ? parseInt(originalTabIndex, 10) : 0;
        } else {
          el.tabIndex = -1;
        }
      });
    }
  }, [isOpen, isOpenInGroup]);

  useEffect(() => {
    if (bodyRef.current) {
      const currentBody = bodyRef.current;

      if (isOpen || isOpenInGroup) {
        const computedStyle = getComputedStyle(currentBody);
        const paddingBlock =
          parseInt(computedStyle.getPropertyValue("--padding-medium")) * 2;
        const contentHeight = currentBody.scrollHeight;
        currentBody.style.height = contentHeight + paddingBlock + "px";
        setTimeout(() => {
          currentBody.style.height = "auto";
        }, 100);
      } else {
        currentBody.style.height = "0px";
      }
    }
  }, [isOpen, isOpenInGroup]);

  const mods: Record<string, boolean | undefined> = {
    [styles["open"]]: isOpen || isOpenInGroup,
    [styles["border-radius"]]: isBorderRadius,
    [styles["disabled"]]: isDisabled,
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
  ];

  return (
    <div className={classNames(styles["accordion"], additionalClasses, mods)}>
      <div
        className={styles["header"]}
        tabIndex={isDisabled ? -1 : tabIndex}
        onClick={toggleOpeningDetails}
        onKeyDown={handleKeyDown}
        role="button"
        aria-disabled={isDisabled ? "true" : "false"}
        aria-expanded={isOpen || isOpenInGroup ? "true" : "false"}
        aria-controls={id}
      >
        {titleVariant === "h3" && <h3 className={styles["title"]}>{title}</h3>}
        {titleVariant === "h4" && <h4 className={styles["title"]}>{title}</h4>}
        <span className={styles["opening-icon"]}>
          {Icon ? (
            <Icon />
          ) : (
            <IconButton Icon={AccordionIcon} isClickable={false} size="medium">
              Opening status icon
            </IconButton>
          )}
        </span>
      </div>
      <div
        className={styles["body"]}
        ref={bodyRef}
        aria-hidden={isOpen || isOpenInGroup ? "false" : "true"}
        id={id}
      >
        <div className={styles["content"]}>{children}</div>
      </div>
    </div>
  );
});
